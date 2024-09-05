import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT, apiAuthPrefix } from "./routes"

const { auth } = NextAuth(authConfig)

export default auth((req): any => { 
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // don't do anything. let everyone access this route.
    if(isApiAuthRoutes) {
        return null;
    }

    if(isAuthRoute) {
        if(isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null
    }

    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/signin", nextUrl))
    }

    return null;

    
})

// all routes mentioned here will invoke the above auth function, when the below routes are called. 
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
// all routes specific next static an dimages files will invoke middleware.