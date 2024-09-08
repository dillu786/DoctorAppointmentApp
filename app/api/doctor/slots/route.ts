import { NextRequest, NextResponse } from "next/server";
import z from 'zod'
import { prismaClient as db } from "@/db/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
const slotSchema=z.object({
    date:z.coerce.date(),
    slot:z.string()
})
const slotsArraySchema = z.array(slotSchema);
export async  function POST(req:NextRequest,res:NextResponse){
    const session=await getServerSession(authConfig);
    if(!session?.user){
        return NextResponse.json({
            message:"You are not logged in"
        },{
            status:201
        })
    }
     console.log(session);
    let data=await req.json();
     let parsedBody=  slotsArraySchema.safeParse(JSON.parse(data.body));
     console.log("parsedBody"+JSON.stringify(parsedBody));
     if(!parsedBody.success){
          return NextResponse.json({
            message:"Invalid input"
          },{
            status:400
          })
     }
     try{
        const IsUserDoctor= await db.doctor.findFirst({
            where:{
                id:session.user.uid
            }
         });
         console.log("isUserDoctor"+IsUserDoctor);
         if(!IsUserDoctor){
            return NextResponse.json({
                message:"Only doctor can define slots"
            },{
                status:201
            })
         }
         console.log(JSON.stringify(parsedBody))
         parsedBody.data.forEach(async row=>{
            await db.availableTiming.create({
                data:{
                    doctorId:session.user.uid,
                    date:row.date,
                    slot:row.slot
                }
            })
         })
        return NextResponse.json({
            message:"slots added"
        },{
            status:200
        })
     }
     catch(e){
        console.log(JSON.stringify(e))
        return NextResponse.json({
            message:"Something went wrong"
        },{
            status:500
        })
     }
}