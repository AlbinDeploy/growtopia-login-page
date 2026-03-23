import { NextResponse } from 'next/server';
import { URLSearchParams } from 'url';

export async function POST(req: Request) {
    const rawBody = await req.text();

    // 2. Parse teks mentah tersebut sebagai URLSearchParams
    // Ini akan mengubah "key=value&key2=value2" menjadi objek yang bisa diakses
    const params = new URLSearchParams(rawBody);

    const _token = params.get('_token') || "";
    const growId = params.get('growId') || "";
    const password = params.get('password') || "";
    const server_name = params.get('nameServer') || "";

    const token = Buffer.from(
        `_token=${_token}&nameServer=${server_name}&growId=${growId}&password=${password}`
    ).toString('base64');

    // Mengirim respons JSON
    return new NextResponse(
        JSON.stringify({
            status: "success",
            message: "Account Validated.",
            token: token || "",
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