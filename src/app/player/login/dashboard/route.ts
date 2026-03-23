import consola from "consola";

export async function POST(req: Request) {
  const tData: Record<string, string> = {};

  try {
    const body = await req.text();

    // 1. Decode URL-encoded string
    const decoded = decodeURIComponent(body);

    // 2. Split ke baris
    const lines = decoded.split('\n');

    // 3. Pecah setiap baris jadi key|value
    for (const line of lines) {
      if (!line.includes('|')) continue;
      const [key, value] = line.split('|');
      tData[key] = value;
    }

  } catch (err) {
    consola.error("Error:", err);
  }

  return new Response(null,
    {
      status: 302,
      headers: {
        'Location': `dashboard/home?data=${encodeURIComponent(JSON.stringify(tData))}&server_name=${process.env.NEXT_PUBLIC_SERVER_NAME}&domain=${process.env.NEXT_PUBLIC_DOMAIN}`
      }
    }
  );
}