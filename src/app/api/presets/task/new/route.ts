import { NextResponse } from "next/server";
import type {
  optionStruct,
  taskSetPostBody,
} from "~/server/repositry/constants";
import { createNewTask } from "~/server/service/create";

export async function POST(req: Request) {
  try {
    const { userId, taskSet }: taskSetPostBody =
      (await req.json()) as taskSetPostBody;

    if (!userId || !taskSet) {
      return NextResponse.json(
        { error: "Invalid input: userId and task are required" },
        { status: 400 },
      );
    }

    const options: optionStruct[] = [];

    if (taskSet.isStatic) {
      const opst: optionStruct = {
        optionTime: taskSet.options[0]!.time,
        order: 0,
        isStatic: true,
        taskId: "",
      };
      options.push(opst);
    } else {
      let order = 0;
      for (const op of taskSet.options) {
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

    const taskObj = await createNewTask(
      userId,
      taskSet.name,
      options,
      taskSet.select,
    );

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
