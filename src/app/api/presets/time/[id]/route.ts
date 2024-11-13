import { NextResponse } from "next/server";
import { timeSetPostBody } from "~/server/repositry/constants";
import { deleteTime } from "~/server/repositry/deletedata";
import { updateTime } from "~/server/service/update";

export async function PUT(  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const timeId = params.id;
    const { userId, timeSet }: timeSetPostBody =
      (await req.json()) as timeSetPostBody;
      if (!timeId || !userId || !timeSet) {
        return NextResponse.json(
          { error: "Invalid input: userId and timeSet are required" },
          { status: 400 },
        );
      }

    const updatedTime = await updateTime(timeId, timeSet.name, timeSet.time);
    return NextResponse.json({
      message: "update timeSet successfully",
      time: updatedTime,
    });
  } catch (error) {
    console.error("Error in UPDATE timeSet request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const timeId = params.id;
    const res = await deleteTime(timeId);
    if (res == null) {
      return NextResponse.json(
        { error: "Invalid input: timeId is required" },
        { status: 400 },
      );
    }

    // この時間プリセットが入っていた全体プリセットがあるなら、
    // nullにする？
    // @here

    return NextResponse.json({
      message: "delete timeSet successfully",
    });
  } catch (error) {
    console.error("Error in DELETE wholeSet request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
