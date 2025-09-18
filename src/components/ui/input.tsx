import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 outline-input flex h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base shadow-xs outline transition-[color,box-shadow] file:inline-flex file:h-7 file:bg-transparent file:text-sm file:font-medium file:outline-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:outline-destructive',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
