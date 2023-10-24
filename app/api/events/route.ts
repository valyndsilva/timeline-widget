import dbConnect from "@/lib/dbConnect";
import Event from "@/models/event";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const events = await Event.find();
  return NextResponse.json({ events });
}

export async function POST(request: NextRequest) {
  // Connect to dbConnect
  const { title, desc, imgUrl, isChecked } = await request.json();
  await dbConnect();
  await Event.create({ title, desc, imgUrl, isChecked });
  return NextResponse.json({ message: "Event created" }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await dbConnect();
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ message: "Event deleted" }, { status: 200 });
}
