import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Video Recorder</h1>
      <p className="text-muted text-sm">
        A Simple Video recording interface built by{' '}
        <Link
          href={'https://ygkr.vercel.app'}
          className="text-gray-400 hover:text-blue-200 duration-300"
        >
          Yash.
        </Link>
      </p>
      <Link
        href={'/record'}
        className={
          (cn(
            buttonVariants({
              variant: 'ghost',
            })
          ),
          'hover:text-blue-200 duration-300 mt-4 p-3 rounded-md border-muted-foreground border')
        }
      >
        Start Recording
      </Link>
    </main>
  );
}
