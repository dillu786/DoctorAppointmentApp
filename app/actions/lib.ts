"use server"

import { prismaClient as db } from "@/db/db"
import { authConfig } from "@/lib/auth"
import { getServerSession } from "next-auth"

export async function getDoctorbyEmail(email:string){
  let user=await  db.user.findFirst({
        where:{
            email:email
        }
    })
    console.log("user"+user)
   let doctor= await db.doctor.findFirst({
        where:{
            userId:user?.id
        }
    })
    if(doctor){
        console.log(doctor);
        return doctor;
    }
    else{
        null;
    }
}

export async function getAllAppointments(email:string){
    
        const session=await getServerSession(authConfig);
        if(session?.user.isDoctor){
            try{
                const user=await db.user.findFirst({
                    where:{
                       email:email
                    },
                    include:{
                        doctor:true
                    }
              })

                const patients=db.patient.findMany({
                    where:{
                        doctorId:user?.doctor?.id
                    }
                })
               
                return patients


        }
           

             catch(e){
                console.error(e);
                return null;
           }
        }
       return null
    }
        
export async function IsUserDoctor(email:string) {
    const session=await getServerSession(authConfig);
    if(session?.user.isDoctor){
        return true;
      
      }
      else{
        return false;
      }
    }
    

