import { prismaClient } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { startOfDay, endOfDay,parseISO } from "date-fns";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateString = searchParams.get('date') as unknown as number;
  const todayStart = startOfDay(dateString); // 00:00:00 of today
  const todayEnd = endOfDay(dateString);  
  console.log("todayStart"+todayStart);
  console.log("todayEnd"+todayEnd);
  if (!dateString) {
    return NextResponse.json({
      message: "Date query parameter is required"
    }, { status: 400 });
  }
  try {
    const date = dateString;
      console.log(date)
    const todaysRecords = await prismaClient.availableTiming.findMany({
        where: {
          date: {
            gte: todayStart, // Start of the day
            lte: todayEnd,   // End of the day
          },
        },
      });
      return NextResponse.json({
        data: todaysRecords
      }, { status: 200 });
  }
   catch (e) {
   console.error(e);
   return NextResponse.json({
   message: "Something went wrong"
    },
    { status: 500 });
  }
}
