import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "GETはこういう風に作るよ！src/app/api/route 参照",
        num: 1 + 1
    });
}

export async function POST() {
    return NextResponse.json({
        message: "POSTはこういう風に作るよ！src/app/api/route 参照",
    });
}