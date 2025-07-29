import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";



export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl
    const pathname = url.pathname

    const isAuthRoute = ['/sign-in', '/sign-up', '/verify'].some(path => pathname.startsWith(path))
    const isProtectedRoute = pathname.startsWith('/dashboard')

    if (token && (isAuthRoute || pathname === '/')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if(!token && isProtectedRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    return NextResponse.next()

}

export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/verify',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ]
}