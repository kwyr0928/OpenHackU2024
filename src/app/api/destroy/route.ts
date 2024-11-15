import { NextResponse } from "next/server";
import { deleteUser } from "~/server/repositry/deletedata";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    }
    const ret = await deleteUser(userId);
    if(!ret) throw new Error("Failed to deleteUser");

    return NextResponse.json({
      message: "delete user successfully",
    });
  } catch (error) {
    console.error("Error in DELETE user request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
