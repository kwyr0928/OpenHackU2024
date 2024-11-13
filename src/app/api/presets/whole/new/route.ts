import { NextResponse } from "next/server";
import type { wholeSetPostBody } from "~/server/repositry/constants";
import { createNewWhole } from "~/server/service/create";

export async function POST(req: Request) {
  try {
    const { userId, wholeSet }: wholeSetPostBody =
      (await req.json()) as wholeSetPostBody;

    if (!userId || !wholeSet) {
      return NextResponse.json(
        { error: "Invalid input: userId and name and wholeSet are required" },
        { status: 400 },
      );
    }

    const res = await createNewWhole(
      userId,
      wholeSet.name,
      wholeSet.timeId,
      wholeSet.items,
    );
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
