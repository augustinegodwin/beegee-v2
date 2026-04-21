import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "./app/lib/async_data";
export async function middleware(req: NextRequest) {
  let protectedRoutesIfNotLoggedIn = ["/account"];
  let protcttedRoutesIfLoggedIn = ["/sign-in", "/sign-up"];
  const refreshToken = req.cookies.getAll("RFTFL");
  const accessToken = req.cookies.getAll("ACTFL");
  // try {
  //   let loggedin =await getAuthenticatedUser();
  // console.log(loggedin);
  // } catch (error) {
  //   console.error("Error fetching authenticated user in middleware:", error);
  // }
  if (!refreshToken.length && protectedRoutesIfNotLoggedIn.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (
    refreshToken.length &&
    protcttedRoutesIfLoggedIn.includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/store", req.url));
  }
}
