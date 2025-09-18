'use server';

import { loginSchema } from '@/schemas/login.schema';

export async function POST(request: Request) {
  const data = await request.json();
  const parsedData = loginSchema.parse(data);

  return new Response(JSON.stringify(parsedData), { status: 200 });
}
