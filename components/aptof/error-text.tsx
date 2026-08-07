import { cn } from '@/lib/utils';

export default function ErrorText({ message, className }: { message: string; className?: string }) {
  return <p className={cn(className, 'text-destructive')}>{message}</p>;
}
