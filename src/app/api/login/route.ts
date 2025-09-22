'use server';

import { loginSchema } from '@/schemas/login.schema';

export async function POST(request: Request) {
  const data = await request.json();
  const parsedData = loginSchema.parse(data);
  const { password, ...safe } = parsedData;

  return new Response(JSON.stringify({ success: true, data: safe }), {
    status: 200,
    statusText: `Bem-vindo de volta, ${safe}`,
    headers: { 'Content-Type': 'application/json' },
  });
}
