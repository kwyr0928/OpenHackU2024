import { type NextRequest, NextResponse } from "next/server";
import { createNewTask } from "~/server/service/create";

type RequestBody = {
  userId: string;
}

export async function POST(req: NextRequest) {
  try {
    // const { userId, limit, q1, m1, q2, m2, q3, m3 } = await req.json();
  
    // userId to userName TEST
    const { userId }: RequestBody = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Invalid input: userId is required" }, { status: 400 });
    }
    // const userName = await getUserName(userId);

    // create task TEST
    const taskId = await createNewTask(userId);

    return NextResponse.json({
      message: "Task created successfully",
      taskId: taskId,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
