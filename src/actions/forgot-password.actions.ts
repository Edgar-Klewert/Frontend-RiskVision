'use server';

import { ForgotPasswordSchemaType } from '@/schemas/forgot-password.schema';
import { env } from '@/lib/env';

interface ForgotPsswordDataResponse {
  success: boolean;
  message: string;
}

interface ForgotPsswordResponse extends ForgotPsswordDataResponse {
  detail?: string;
}

export async function ForgotPasswordAction(
  data: ForgotPasswordSchemaType,
): Promise<{ success: boolean; message: string }> {
  const { confirmPassword, ...dataFilter } = data;

  try {
    const response = await fetch(`${env.API_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataFilter),
      credentials: 'include',
    });

    const responseData: ForgotPsswordResponse = await response.json();

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
        message: `Erro ao redefinir a senha. ${JSON.stringify(responseData.detail) || 'Erro desconhecido'} \n Status: ${response.status} `,
      };
    }

    return {
      success: true,
      message: 'Senha redefinida com sucesso.',
    };
  } catch (error) {
    console.error('Erro ao redefinir a senha:', error);
    return {
      success: false,
      message: `Erro ao redefinir a senha. ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
    };
  }
}
