// middleware.js
import { NextResponse } from "next/server";

// Function to check if the route is an article route
function isArticleRoute(url) {
  const pathRegex = /^\/courses\/\d+\/article\/\d+$/; // Regex to match /courses/:courseId/article/:articleId
  return pathRegex.test(url.pathname);
}

// Function to validate token via Strapi `/users/me` endpoint
async function validateToken(token) {
  try {
    const response = await fetch(
      `${process.env.PRODUCTION_URL || "http://localhost:1337"}/api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      // Token is valid
      return true;
    }
  } catch (error) {
    console.error("Token validation error:", error);
  }
  // Token is invalid
  return false;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only apply middleware if it's an article route (e.g., /courses/3/article/5)
  // if (isArticleRoute(request.nextUrl)) {
  //   const token = request.cookies.get("accessToken");

  //   // If no token is found, redirect to login
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/signin", request.url));
  //   }

  //   // console.log("--------------------------------------------");
  //   // console.log({ token });
  //   // console.log("--------------------------------------------");

  //   // Validate the token by calling Strapi's `/users/me` API
  //   const isValidToken = await validateToken(token.value);

  //   // If token is invalid, redirect to login
  //   if (!isValidToken) {
  //     return NextResponse.redirect(new URL("/signin", request.url));
  //   }
  // }

  // If route isn't an article or token is valid, continue
  return NextResponse.next();
}

// Apply middleware to all `/courses/*` routes
export const config = {
  matcher: ["/courses/:path*"],
};
