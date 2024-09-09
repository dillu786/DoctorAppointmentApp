// pages/signin.tsx
"use client"
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import { useEffect, useState } from 'react';
export default function SignInPage() {
    let router=useRouter();
     const session=useSession();
     let isSidnedIn= session.data?.user?true:false;
     const[isUserSidnedIn,setIsUserignedIn]=useState(isSidnedIn);
    useEffect(()=>{

    },[isUserSidnedIn]);
  return (
    <div className='flex flex-col justify-center items-center m-20'>
      <h1 className='text-2xl font-bold'>Sign In</h1>
      <Button className='w-72' onClick={async() => {
           let res= await signIn()
           console.log(res);
           router.push("/");
      }}>Sign in with Google</Button>
    </div>
  );
}
