import LoginForm from '@/components/auth/LoginForm';
import { FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';

export const metadata = {
  title: 'Login | BrokerBoss',
  description: 'Log in to your BrokerBoss account to manage your properties and connections.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8 text-center">
          <span className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
            <FaSignInAlt className="h-7 w-7 text-primary" />
          </span>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">
            Log in to your account to continue.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-6">
          <LoginForm />
        </div>

        {/* Registration links */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm">
            <Link href="/register/buyer" className="text-primary font-medium hover:underline">
              Register as Buyer
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/register/owner" className="text-primary font-medium hover:underline">
              Register as Owner
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/register/broker" className="text-primary font-medium hover:underline">
              Register as Broker
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
