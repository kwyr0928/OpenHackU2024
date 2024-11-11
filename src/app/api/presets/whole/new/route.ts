import { NextResponse } from "next/server";
import type { wholeSetPostBody } from "~/server/repositry/constants";
import { createNewWhole } from "~/server/service/create";

export async function POST(req: Request) {
  try {
    const { userId, name, wholeSet }: wholeSetPostBody =
      (await req.json()) as wholeSetPostBody;

    if (!userId || !name || !wholeSet) {
      return NextResponse.json(
        { error: "Invalid input: userId and name and wholeSet are required" },
        { status: 400 },
      );
    }

    const res = await createNewWhole(userId, name, wholeSet.timeId, wholeSet.itemIds);
    return NextResponse.json({
      message: "whole created successfully",
      wholeSet: res,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
