'use server';

import { RegisterSchemaType } from '@/schemas/register.schema';

interface RegisterResponse {
  success: boolean;
  data: {
    name: string;
    surname: string;
    email: string;
  };
}

export async function RegisterAction(
  data: RegisterSchemaType,
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const responseData: RegisterResponse = await response.json();

    if (response.status !== 201) {
      return {
        success: false,
        message: `Erro ao fazer cadastro. ${response.statusText || 'Erro desconhecido'}`,
      };
    }

    return {
      success: true,
      message:
        `Cadastro de ${responseData.data.name} ${responseData.data.surname} realizado com sucesso.` ||
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
