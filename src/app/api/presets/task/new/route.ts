import { NextResponse } from "next/server";
import { optionStruct } from "~/server/repositry/constants";
import { createNewTask } from "~/server/service/create";

type RequestBody = {
  userId: string;
  task: {
    name: string;
    isStatic: boolean;
    options: {
      name: string;
      time: number;
    }[];
  };
};

export async function POST(req: Request) {
  try {
    const { userId, task }: RequestBody = await req.json() as RequestBody;

    if (!userId || !task) {
      return NextResponse.json(
        { error: "Invalid input: userId and task are required" },
        { status: 400 }
      );
    }

    // test data
    let options: optionStruct[] = [];

    if(task.isStatic){
      const opst: optionStruct = {
        name: task.options[0]!.name,
        optionTime: task.options[0]!.time,
        order: 0,
        isStatic: true,
        taskId: "",
      };
      options.push(opst);
    } else {
      let order = 0;
      for(const op of task.options){
        const opst: optionStruct = {
          name: op.name,
          optionTime: op.time,
          order: order,
          isStatic: false,
          taskId: "",
        }
        options.push(opst);
        order++;
      }
    }


    // create task TEST
    const taskId = await createNewTask(userId, task.name, options);

    return NextResponse.json({
      message: "Task created successfully",
      taskId: taskId,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
