'use server';

import { registerSchema } from '@/schemas/register.schema';

export async function POST(request: Request) {
  const data = await request.json();
  const parsedData = registerSchema.parse(data);

  const { password, confirmPassword, ...safe } = parsedData;

  return new Response(JSON.stringify({ success: true, data: safe }), {
    status: 201,
    statusText: 'Cadastro realizado com sucesso.',
    headers: { 'Content-Type': 'application/json' },
  });
}
