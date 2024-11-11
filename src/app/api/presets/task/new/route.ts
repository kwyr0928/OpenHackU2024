import { NextResponse } from "next/server";
import { taskSetPostBody, type optionStruct } from "~/server/repositry/constants";
import { createNewTask } from "~/server/service/create";

export async function POST(req: Request) {
  try {
    const { userId, task }: taskSetPostBody = (await req.json()) as taskSetPostBody;

    if (!userId || !task) {
      return NextResponse.json(
        { error: "Invalid input: userId and task are required" },
        { status: 400 },
      );
    }

    const options: optionStruct[] = [];

    if (task.isStatic) {
      const opst: optionStruct = {
        optionTime: task.options[0]!.time,
        order: 0,
        isStatic: true,
        taskId: "",
      };
      options.push(opst);
    } else {
      let order = 0;
      for (const op of task.options) {
        const opst: optionStruct = {
          name: op.name,
          optionTime: op.time,
          order: order,
          isStatic: false,
          taskId: "",
        };
        options.push(opst);
        order++;
      }
    }

    const taskObj = await createNewTask(userId, task.name, options, task.select);

    return NextResponse.json({
      message: "Task created successfully",
      task: taskObj,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
