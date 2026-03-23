import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Kalau akses /player/growid/checktoken -> redirect ke /player/growid/validate/checktoken
  if (pathname === "/player/growid/checktoken") {
    const url = req.nextUrl.clone();
    url.pathname = "/player/growid/validate/checktoken";
    return NextResponse.redirect(url, 307); // 307 biar POST tetep POST
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/player/growid/checktoken"],
};