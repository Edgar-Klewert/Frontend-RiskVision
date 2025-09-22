'use client';

import { Toast } from '@/components/atoms/toast';
import { useState } from 'react';
import { PAGES } from '@/enums/pages.enum';
import { registerSchema, RegisterSchemaType } from '@/schemas/register.schema';
import { RegisterAction } from '@/actions/register.actions';
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
import { Container } from '@/components/atoms/container';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: RegisterSchemaType) {
    setLoading(true);

    Toast({
      description: 'Realizando cadastro...',
      variant: 'loading',
    });

    const response = await RegisterAction(data);

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
      // router.push(PAGES.HOME);
    }
  }

  return (
    <div className='font-roboto flex min-h-screen w-full items-center justify-center'>
      <Container className='px-0'>
        <div className='md flex w-full flex-col items-center gap-10 rounded-xl px-8 py-6 max-md:text-white md:max-w-lg md:bg-white'>
          <h1 className='text-center text-[2.625rem]/[110%] font-bold md:text-5xl'>
            Cadastre-se <span className='text-primary-100'>gratuitamente</span>
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex w-full flex-col items-center gap-10'
            >
              <div className='flex w-full flex-col items-center gap-4'>
                <div className='flex w-full flex-row items-center gap-4'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col'>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='Ex: John'
                            {...field}
                            className='md:focus-visible:outline-primary-100 w-full focus-visible:outline-2'
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              form.clearErrors('name');
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='surname'
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col'>
                        <FormLabel>Surname</FormLabel>
                        <FormControl>
                          <Input
                            type='surname'
                            placeholder='Ex: Doe'
                            {...field}
                            className='md:focus-visible:outline-primary-100 w-full focus-visible:outline-2'
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              form.clearErrors('surname');
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem className='flex w-full flex-col'>
                      <FormLabel>Confirme your Password</FormLabel>
                      <FormControl className='w-full'>
                        <Input
                          className='md:focus-visible:outline-primary-100 w-full focus-visible:outline-2'
                          type='password'
                          placeholder='Confirm your password'
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
                <Link
                  href={PAGES.FORGOT_PASSWORD}
                  className='text-primary-100 self-start text-sm focus-visible:underline focus-visible:underline-offset-2 focus-visible:outline-0 max-md:text-white'
                >
                  Forgot your password?
                </Link>
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
                  'Confirm'
                )}
              </Button>
            </form>
          </Form>
          <div className='flex w-full flex-col items-center gap-[1.625rem]'>
            <span className='bg-primary-100 h-px w-full max-md:bg-white' />
            <span className='text-sm text-nowrap text-black max-md:text-white'>
              Already have an account?
              <Link
                href={PAGES.LOGIN}
                className='text-primary-100 text-sm focus-visible:underline focus-visible:underline-offset-2 focus-visible:outline-0 max-md:text-white'
              >
                Sign in
              </Link>
            </span>
            <span className='bg-primary-100 h-px w-full max-md:bg-white' />
          </div>
        </div>
      </Container>
    </div>
  );
}
