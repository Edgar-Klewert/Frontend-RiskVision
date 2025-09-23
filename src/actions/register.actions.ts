'use server';

import { env } from '@/lib/env';
import { RegisterSchemaType } from '@/schemas/register.schema';

interface RegisterDataResponse {
  name: string;
  surname: string;
  email: string;
  created_at: string;
}

interface RegisterResponse extends RegisterDataResponse {
  detail?: string;
}

export async function RegisterAction(
  data: RegisterSchemaType,
): Promise<{ success: boolean; message: string }> {
  try {
    const nameComplete = `${data.name} ${data.surname}`.trim();
    const dataFilter = {
      name: nameComplete,
      email: data.email,
      password: data.password,
      role_id: 2, // Usuário padrão
    };

    const response = await fetch(`${env.API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataFilter),
      credentials: 'include',
    });

    const responseData: RegisterResponse = await response.json();

    if (response.status !== 200) {
      return {
        success: false,
        message: `Erro ao fazer cadastro. ${responseData.detail || 'Erro desconhecido'} \n Status: ${response.status} `,
      };
    }

    return {
      success: true,
      message:
        `Cadastro de ${responseData.name} realizado com sucesso.` ||
        'Cadastro realizado com sucesso.',
    };
  } catch (error) {
    console.error('Erro ao fazer cadastro:', error);
    return {
      success: false,
      message: `Erro ao fazer cadastro. ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
    };
  }
}
