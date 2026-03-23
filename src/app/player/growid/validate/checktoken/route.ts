import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const params = new URLSearchParams(body);

  return new NextResponse(
    JSON.stringify({
      status: "success",
      message: "Account Validated.",
      token: params.get("refreshToken") || "",
      url: "",
      accountType: "growtopia",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}