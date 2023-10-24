import dbConnect from "@/lib/dbConnect";
import Event from "@/models/event";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: number;
  };
};
export async function PUT(request: NextRequest, { params }: Props) {
  // Connect to dbConnect
  const { id } = params;
  const {
    newTitle: title,
    newDesc: desc,
    newImgUrl: imgUrl,
    newIsChecked: isChecked,
  } = await request.json();
  await dbConnect();
  await Event.findByIdAndUpdate(id, { title, desc, imgUrl, isChecked });
  return NextResponse.json({ message: "Event edited" }, { status: 200 });
}
// Find by single event
export async function GET(request: NextRequest, { params }: Props) {
  const { id } = params;
  await dbConnect();
  const event = await Event.findOne({ _id: id });
  return NextResponse.json({ event }, { status: 200 });
}
