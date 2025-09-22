'use server';

import { LoginSchemaType } from '@/schemas/login.schema';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

export async function LoginAction(
  data: LoginSchemaType,
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (response.status === 400) {
      return {
        success: false,
        message:
          JSON.stringify(response.json()) ||
          `Campos obrigatórios não preenchidos ou inválidos. ${response.json()}`,
      };
    }

    if (response.status === 401) {
      return {
        success: false,
        message:
          JSON.stringify(response.json()) ||
          `Credenciais inválidas. ${response.json()}`,
      };
    }

    if (response.status !== 200) {
      return {
        success: false,
        message: `Erro ao fazer login. ${JSON.stringify(response.statusText)}`,
      };
    }

    const setCookieHeader = response.headers.get('set-cookie');

    if (!setCookieHeader) {
      return {
        success: false,
        message: 'Cookie não encontrado',
      };
    }

    const parsed = parse(setCookieHeader);

    const token = parsed['access_token'];

    if (!token) {
      return {
        success: false,
        message: 'Token de autenticação não encontrado no cookie',
      };
    }

    (await cookies()).set('access_token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 60 * 60 * 4 * 1000), // 4 horas
      maxAge: 60 * 60 * 4, // 4 horas
    });

    return {
      success: true,
      message: `${response.statusText}` || 'Login realizado com sucesso.',
    };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return {
      success: false,
      message: `Erro ao fazer login. ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
    };
  }
}
