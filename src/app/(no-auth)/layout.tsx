export default function NoAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen w-full bg-[image:var(--color-gradient-noauth)]'>
      {children}
    </div>
  );
}
