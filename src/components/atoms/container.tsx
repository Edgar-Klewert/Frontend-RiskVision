import { cn } from '@/lib/utils';

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'flex w-full max-w-[1280px] flex-col items-center gap-10 px-7.5 py-12.5 md:px-12.5 lg:px-20 lg:py-20',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Container };
