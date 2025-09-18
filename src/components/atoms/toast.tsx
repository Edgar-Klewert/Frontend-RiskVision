'use client';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { CheckCircle, XCircle } from 'lucide-react';
import { ToasterProps } from 'sonner';
import { toast } from 'sonner';

const toasterVariants = cva('toaster font-inter', {
  variants: {
    variant: {
      success:
        'bg-purple-600 flex text-sm items-center w-full h-fit gap-3.75 justify-between rounded-[0.5rem] p-3.5 text-white shadow-xl shadow-black/30',
      error:
        'bg-[#D32F2F] text-sm items-center flex w-full h-fit gap-3.75 justify-between rounded-[0.5rem] p-3.5 text-white shadow-xl shadow-black/30',
      loading:
        'bg-yellow-500 text-sm items-center flex w-full h-fit gap-3.75 justify-between rounded-[0.5rem] p-3.5 text-white shadow-xl shadow-black/30',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

type ToasterVariants = 'success' | 'error' | 'loading';

export interface ToasterCustomProps
  extends ToasterProps,
    VariantProps<typeof toasterVariants> {
  description: string;
  variant: ToasterVariants;
  className?: string;
  duration?: number;
}

const Toast = ({
  description,
  variant,
  className,
  duration = 4500,
  ...props
}: ToasterCustomProps) => {
  return toast.custom(
    (id) => (
      <div className={cn(toasterVariants({ variant, className }))}>
        <div className='flex w-full items-center gap-3.75'>
          {variant === 'success' ? (
            <CheckCircle className='size-5 min-h-5 min-w-5' />
          ) : (
            <XCircle className='size-5 min-h-5 min-w-5' />
          )}
          <p>{description}</p>
        </div>
        <span
          onClick={() => toast.dismiss(id)}
          className='relative flex h-5 min-h-5 w-5 min-w-5 cursor-pointer items-center justify-center'
        >
          <span className='absolute h-0.5 w-full rotate-45 rounded-full bg-white' />
          <span className='absolute h-0.5 w-full -rotate-45 rounded-full bg-white' />
        </span>
      </div>
    ),
    { duration, ...props },
  );
};

export { Toast };
