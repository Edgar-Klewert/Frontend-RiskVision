'use client';

import { Toast } from '@/components/atoms/toast';
import { useState } from 'react';
import { PAGES } from '@/enums/pages.enum';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import LogoRV from 'public/images/risk-vision-logo.svg';
import { Container } from '@/components/atoms/container';
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from '@/schemas/forgot-password.schema';
import { ForgotPasswordAction } from '@/actions/forgot-password.actions';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      new_password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: ForgotPasswordSchemaType) {
    setLoading(true);

    Toast({
      description: 'Verificando e-mail...',
      variant: 'loading',
    });

    const response = await ForgotPasswordAction(data);

    if (!response.success) {
      Toast({
        description: response.message,
        variant: 'error',
      });
      setLoading(false);
    }

    if (response.success) {
      Toast({
        description: response.message,
        variant: 'success',
      });
      setLoading(false);
      router.push(PAGES.HOME);
    }
  }

  return (
    <div className='font-roboto flex min-h-screen w-full items-center justify-center'>
      <Container className='px-6'>
        <div className='flex w-full flex-col items-center gap-10 rounded-xl bg-white px-8 py-6 text-black'>
          <Button
            className='self-start text-center text-black'
            variant='router'
            size='icon'
            onClick={() => router.back()}
          >
            <ArrowLeft className='ml-1 h-5 w-5' />
          </Button>
          <Image src={LogoRV} alt='RiskVision' loading='eager' />
          <h1 className='text-center text-[2.625rem]/[110%] font-bold md:text-5xl'>
            Esqueceu a <span className='text-primary-100'>senha?</span>
          </h1>
          <p className='w-full text-center text-lg text-balance text-[#21272A]'>
            Não se preocupe. Iremos te ajudar a alterar sua senha
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex w-full flex-col items-center gap-10'
            >
              <div className='flex w-full flex-col items-center gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='flex w-full max-w-[420px] flex-col'>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='Ex: johndoe@example.com'
                          {...field}
                          className='md:focus-visible:outline-primary-100 w-full focus-visible:outline-2'
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors('email');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='new_password'
                  render={({ field }) => (
                    <FormItem className='flex w-full max-w-[420px] flex-col'>
                      <FormLabel>Nova Senha</FormLabel>
                      <FormControl className='w-full'>
                        <Input
                          className='md:focus-visible:outline-primary-100 w-full focus-visible:outline-2'
                          type='password'
                          placeholder='Insira sua nova senha'
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors('new_password');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem className='flex w-full max-w-[420px] flex-col'>
                      <FormLabel>Confirme sua nova senha</FormLabel>
                      <FormControl className='w-full'>
                        <Input
                          className='md:focus-visible:outline-primary-100 w-full focus-visible:outline-2'
                          type='password'
                          placeholder='Confirme sua nova senha'
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors('confirmPassword');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type='submit'
                className='w-full max-w-60 cursor-auto self-center'
                disabled={loading || !form.formState.isValid}
                variant={loading ? 'loading' : 'default'}
                size={'lg'}
              >
                {loading ? (
                  <Loader className='h-5 w-5 animate-spin justify-self-center' />
                ) : (
                  'Redefinir Senha'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </Container>
    </div>
  );
}
