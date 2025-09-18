'use client';

import { Toast } from '@/components/atoms/toast';
import { useState } from 'react';
import { PAGES } from '@/enums/pages.enum';
import { loginSchema, LoginSchemaType } from '@/schemas/login.schema';
import { LoginAction } from '@/actions/login.actions';
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
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Link } from '@/components/atoms/link';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import LogoRV from 'public/images/risk-vision-logo.svg';
import { Container } from '@/components/atoms/container';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginSchemaType) {
    setLoading(true);

    Toast({
      description: 'Realizando login...',
      variant: 'loading',
    });

    const response = await LoginAction(data);

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
      <Container>
        <div className='md flex w-full flex-col items-center gap-6 rounded-xl px-8 py-6 max-md:text-white md:max-w-lg md:bg-white'>
          <Image src={LogoRV} alt='RiskVision' loading='eager' />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex w-full flex-col items-center gap-6'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='flex w-full flex-col'>
                    <FormLabel>Email</FormLabel>
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
                name='password'
                render={({ field }) => (
                  <FormItem className='flex w-full flex-col'>
                    <FormLabel>Password</FormLabel>
                    <FormControl className='w-full'>
                      <Input
                        className='md:focus-visible:outline-primary-100 w-full focus-visible:outline-2'
                        type='password'
                        placeholder='Enter your password'
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          form.clearErrors('password');
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                href={PAGES.FORGOT_PASSWORD}
                className='text-primary-100 self-start text-sm focus-visible:underline focus-visible:underline-offset-2 focus-visible:outline-0 max-md:text-white'
              >
                Forgot your password?
              </Link>
              <span className='bg-primary-100 h-px w-full max-md:bg-white' />
              <span className='text-nowrap text-black max-md:text-white'>
                Don't have an account?{' '}
                <Link
                  href={PAGES.REGISTER}
                  className='text-primary-100 text-sm focus-visible:underline focus-visible:underline-offset-2 focus-visible:outline-0 max-md:text-white'
                >
                  Register here
                </Link>
              </span>
              <span className='bg-primary-100 h-px w-full max-md:bg-white' />
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
                  'Confirm'
                )}
              </Button>
            </form>
          </Form>
          <div className='flex w-full flex-col items-center gap-6'>
            <p>Access with:</p>
            <Button
              variant={'ghost'}
              className='md:outline-primary-100 md:text-primary-100 flex w-full items-center justify-center gap-4'
            >
              <FcGoogle />
              Google
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
