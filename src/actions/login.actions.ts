'use server';

import { LoginSchemaType } from '@/schemas/login.schema';
import { cookies } from 'next/headers';
import { env } from '@/lib/env';

interface LoginDataResponse {
  access_token: string;
  token_type: string;
}

interface LoginResponse extends LoginDataResponse {
  detail?: string;
}

export async function LoginAction(
  data: LoginSchemaType,
): Promise<{ success: boolean; message: string }> {
  try {
    const { rememberMe, ...dataTest } = data;

    const response = await fetch(`${env.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataTest),
      credentials: 'include',
    });

    const responseData: LoginResponse = await response.json();

    if (response.status === 400) {
      return {
        success: false,
        message:
          `${JSON.stringify(responseData.detail)}` ||
          `Campos obrigatórios não preenchidos ou inválidos. ${JSON.stringify(JSON.stringify(responseData.detail)) || ''}`,
      };
    }

    if (response.status === 401) {
      return {
        success: false,
        message:
          `${JSON.stringify(responseData.detail)}` ||
          `Credenciais inválidas. ${JSON.stringify(responseData.detail) || ''}`,
      };
    }

    if (response.status !== 200) {
      return {
        success: false,
        message: `Erro ao fazer login. ${JSON.stringify(responseData.detail) || 'Erro desconhecido'} \n Status: ${response.status} `,
      };
    }

    const token = responseData.access_token;

    if (!token) {
      return {
        success: false,
        message: 'Cookie não encontrado',
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
      message: 'Login realizado com sucesso.',
    };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return {
      success: false,
      message: `Erro ao fazer login. ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
    };
  }
}
