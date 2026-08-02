export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-secondary">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
