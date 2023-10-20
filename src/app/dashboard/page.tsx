'use client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Confetti from './confetti';

export default function Page() {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <Confetti />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-semibold">Congratulations!!</h1>
        <p className="text-sm text-muted-foreground font-semibold">
          Your video upload was successful.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          className={cn(
            buttonVariants({
              variant: 'default',
            })
          )}
          href="/record"
        >
          Record again
        </Link>
      </div>
    </div>
  );
}
