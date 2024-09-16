import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
} from "./routes";
import { withAuth } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export default withAuth(
  async function middleware(request) {
    const isLoggedIn = !!request.cookies.get("next-auth.session-token");
    const { nextUrl } = request;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      console.log("API AUTH");
      return;
    }
    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      console.log("API ROUTE");
      return;
    }
    // console.log("IS LOGGEDIN: ", isLoggedIn)
    // console.log("ROUTE: ", req.nextUrl.pathname)
    if (!isLoggedIn && isPrivateRoute) {
      console.log("--", isLoggedIn);
      return Response.redirect(new URL("/", nextUrl));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
