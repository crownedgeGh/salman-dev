import BrokerForm from '@/components/auth/BrokerForm';
import { FaHandshake } from 'react-icons/fa';

export const metadata = {
  title: 'Register as Broker | BrokerBoss',
  description: 'Create your professional broker account on BrokerBoss and grow your real estate business in Raipur.',
};

export default function BrokerRegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8 text-center">
          <span className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
            <FaHandshake className="h-7 w-7 text-primary" />
          </span>
          <h1 className="text-3xl font-bold tracking-tight">Register as Broker</h1>
          <p className="text-muted-foreground max-w-sm">
            Join BrokerBoss as a professional agent and connect with property seekers across Raipur.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <BrokerForm />
        </div>
      </div>
    </div>
  );
}
