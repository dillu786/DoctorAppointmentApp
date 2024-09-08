// pages/signin.tsx
"use client"
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function SignInPage() {
    let router=useRouter();
  return (
    <div className='flex flex-col justify-center items-center m-20'>
      <h1 className='text-2xl font-bold'>Sign In</h1>
      <Button className='w-72' onClick={() => {
        signIn()
        window.location.href="/";
      }}>Sign in with Google</Button>
    </div>
  );
}
