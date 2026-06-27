import OwnerForm from '@/components/auth/OwnerForm';
import { FaHome } from 'react-icons/fa';

export const metadata = {
  title: 'Register as Owner | BrokerBoss',
  description: 'Create your property owner account on BrokerBoss and start listing your properties in Raipur.',
};

export default function OwnerRegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8 text-center">
          <span className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
            <FaHome className="h-7 w-7 text-primary" />
          </span>
          <h1 className="text-3xl font-bold tracking-tight">Register as Owner</h1>
          <p className="text-muted-foreground max-w-sm">
            List your properties on BrokerBoss and connect with serious buyers and tenants.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <OwnerForm />
        </div>
      </div>
    </div>
  );
}
