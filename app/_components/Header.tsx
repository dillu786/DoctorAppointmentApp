"use-client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import { CrossIcon } from 'lucide-react'
import Link from 'next/link';
import { Toaster } from 'sonner'
import { showSuccessToast } from './BookAppointmet'
export default  function Header () {
    const session=useSession();
    const router=useRouter();
    const Menu=[
        {
            id:1,
            name:"Home",
            path:"/"
        },
        {
            id:2,
            name:"Explore",
            path:"/explore"
        },
        {
            id:3,
            name:"Contact Us",
            path:"/"
        },
        {
            id:1,
            name:"Home",
            path:"/"
        },
    ]
  return (
    <>
    <div className='flex items-center  justify-between border shadow-sm p-2'>
       <div className='flex items-center pl-2'>
       <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <CrossIcon className="h-6 w-6" />
        </Link>
       <div className='md:flex ml-2 gap-6 text-xl font-bold text-slate-700'>Family Health Care Center</div>
    <div className='pl-6 md:flex gap-6 text-xl font-bold text-slate-700 hidden'>
       
       {Menu.map(ele=><div key={ele.id}>
        <Link href={ele.path}></Link>
               <div className='hover:text-blue-700 cursor-pointer hover:scale-105 transition-all ease-in-out' onClick={()=>{router.push(ele.path)}}>{ele.name}</div>
   </div>)}
   </div>
       </div>
    
        <div className='flex-row-reverse'>
            {session.data?.user?.email &&  <Button onClick={()=>{
                signOut();
                showSuccessToast("User Logged out Successfully");
                }}>SignOut</Button>}
            {!session.data?.user?.email &&  <Button onClick={()=>{
                signIn();
                showSuccessToast("User Logger In successfully");
                }}>SignIn</Button>}
        </div>
        <Toaster position="bottom-center" />
    </div>
    </>
  )
}
