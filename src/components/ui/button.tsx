import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 font-inter",
  {
    variants: {
      variant: {
        default:
          'bg-primary-300 hover:bg-primary-500 active:bg-primary-700 text-base/[16px] font-medium text-white focus-visible:outline-3 focus-visible:outline-black',
        loading:
          'bg-primary-300 hover:bg-primary-500 text-base/[16px] font-medium text-white',
        favorite:
          'bg-terciary-100 hover:bg-terciary-200 active:bg-terciary-300/60 active:text-terciary-300 text-terciary-400 focus-visible:outline-3 focus-visible:outline-black',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          "hover:bg-primary-100 border-2 border-white rounded-full hover:text-white active:bg-primary-300 focus-visible:text-white active:text-white focus-visible:bg-primary-100 text-white [&_svg:not([class*='size-'])]:size-6",
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'min-h-9 px-4 py-2',
        sm: 'min-h-6 rounded-md gap-1.5 px-3',
        lg: 'px-7 py-3 rounded-full',
        icon: 'size-9',
        navigation: 'p-2 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
