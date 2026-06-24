import Link from 'next/link';
import { FaPlusCircle, FaArrowLeft } from 'react-icons/fa';

export const metadata = {
  title: 'Post Properties | BrokerBoss',
  description: 'Post your property listing on BrokerBoss for free. Coming soon.',
};

export default function PostAdPage() {
  return (
    <div className="min-h-[70vh] bg-background flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        {/* Icon */}
        <span className="h-20 w-20 rounded-full bg-accent flex items-center justify-center">
          <FaPlusCircle className="h-9 w-9 text-primary" />
        </span>

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Post Properties</h1>
          <p className="text-muted-foreground leading-relaxed">
            Our property listing tool is being built for you. It will let Owners and Brokers
            publish detailed listings quickly — without needing a full address or photos.
          </p>
        </div>

        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground font-medium">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Coming Soon
        </span>

        {/* Back link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-primary hover:underline mt-2"
        >
          <FaArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
