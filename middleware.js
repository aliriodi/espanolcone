// export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server'

export async function middleware(req){

    const session = await getToken({req})
    
    if(!session && !req.nextUrl.pathname.startsWith('/api/')){
        const url = req.nextUrl.clone();
        
        url.pathname = '/'

        return NextResponse.redirect( url )
    }


    //#region Apis Protegidas
    const url = req.nextUrl.clone();
    url.pathname = '/inicio/home'
    // console.log("////////////////",req.headers['user-agent'],"////////////////")
    if(!session && req.nextUrl.pathname.startsWith('/api/class/')) return NextResponse.redirect( url );
    if(!session && req.nextUrl.pathname.startsWith('/api/featureclass/')) return NextResponse.redirect( url );
    if(!session && req.nextUrl.pathname.startsWith('/api/guides/')) return NextResponse.redirect( url );
    if(!session && req.nextUrl.pathname.startsWith('/api/teachers/')) return NextResponse.redirect( url );
    if(!session && req.nextUrl.pathname.startsWith('/api/users/')) return NextResponse.redirect( url );
    //#endregion
        
    return NextResponse.next()
}

export const config = {
    matcher:[
        '/inicio/:path*',
        '/api/:path*'
    ]
}


