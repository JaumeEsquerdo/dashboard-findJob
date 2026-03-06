import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://empllo.com/api/v1?limit=100");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch jobs" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
