import { NextResponse } from "next/server";
import { deleteTime } from "~/server/repositry/deletedata";

export async function PUT() {
  return NextResponse.json({
    message: "特定のプリセットを更新",
  });
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
