import { signIn, useSession } from 'next-auth/react'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  
  console.log(request.nextUrl.pathname)
  // if ( request.nextUrl.pathname.startsWith('/doctor')) {
  //   console.log("Inside doctor")
  //   //signIn();
  //   return NextResponse.redirect(new URL('/signin', request.url))
  // }
 
  if (request.nextUrl.pathname.startsWith('/')) {
    return NextResponse.next()
  }
}
