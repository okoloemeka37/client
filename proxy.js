import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export default function proxy(request){
  const role=request.cookies.get('role')?.value

 
  try {
    const decoded=jwt.verify(role,process.env.jsonkey)

    console.log(decoded)
  } catch (error) {
    console.log(error)
  }


    return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
};