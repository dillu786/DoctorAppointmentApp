import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {prismaClient as db} from "../db/db";

import { Session } from "next-auth";

export interface session extends Session{
    user:{
        email:string,
        name:string,
        image:string,
        uid:string
    }
}
export const authConfig={
    secret: process.env.NEXTAUTH_SECRET || 'secr3t',
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID ??"",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ??""
        })
    ],
    callbacks: {
     session:({session,token}:any) :session=>{
     const newSession :session=session as session;
     if(newSession.user && token.uid){
        //@ts-ignore

        newSession.user.uid = token.uid ?? "";
     }
     return newSession!;

     },
     async jwt({token,account,profile}:any){
        console.log("profile"+profile);
        const user =await db.user.findFirst({
            where:{
                email:profile?.email
            }
        })
        if(user){
            token.uid= user.id
        }

        return token;
     },
      async signIn({ user, account, profile, email, credentials }:any) {
        if(account?.provider==="google"){
          const email = user.email;
          if(!email){
            return false;
          }

          const userDb= await db.user.findFirst({
            where:{
              email: email
            }
          });
          if(userDb){
            return true;
          }
         await db.user.create({
          data:{
            email:email,
            name:profile?.name,
            image:user?.image
          }
         })

        }
        return true
      }
    }
}