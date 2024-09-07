import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient as db } from "../../../db/db";
import { z } from "zod";
import { NextApiRequest } from "next";
const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Phone number must be in E.164 format"),
  email: z.string().email("Invalid email address"),
  age: z.number().int().positive().max(120, "Age must be a positive integer not exceeding 120"),
  gender: z.enum(["Male", "Female", "Other"]),
  reason: z.string().min(5, "Reason must be at least 5 characters long"),
  date: z.coerce.date(),
  time: z.string(),
});

export async function POST(req: NextRequest) {
  // Get session to check if the user is authenticated
  const session = await getServerSession(authConfig);

 // Check if the user is logged in
  if (!session?.user) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 }
    );
  }

  try {
    // Parse the request body
    const data = await req.json();
      console.log(data);
    // Validate the input data using Zod schema
    const patient = patientSchema.safeParse(JSON.parse(data.body));
     console.log("patient1"+patient);
    if (!patient.success) {
      return NextResponse.json(
        { message: "Invalid request", errors: patient.error.errors },
        { status: 400 }
      );
    }
     console.log("safe parse")
    // Create a new patient record in the database
    await db.patient.create({
      data: {
        userId: session.user?.uid,
        name: patient.data.name,
        age: patient.data.age,
        //@ts-ignore
        gender: patient.data.gender ,
        reasonOfAppointment: patient.data.reason,
        mobileNumber: patient.data.phone as unknown as bigint,
        timeOfAppointment: patient.data.time,
        dateOfAppointment: patient.data.date,
      },
    });

    // Respond with success message
    return NextResponse.json(
      { message: "Your appointment has been booked" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while booking appointment:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req:NextApiRequest,res:NextResponse) {
   const session=await getServerSession(authConfig);
    if(!session?.user){
        return NextResponse.json({
            message:"You are not logged in"
        },{
            status:401
        });
    }
 
    try{
        let appointments=await db.patient.findMany({
            where:{
                userId:session?.user.uid
            }
    });
    console.log(appointments);
    return NextResponse.json({data:appointments});
}
     catch(e){
        return NextResponse.json({
            message:"Something went wrong",
            error:JSON.stringify(e)
        },{
            status:500
        })
     }
}

