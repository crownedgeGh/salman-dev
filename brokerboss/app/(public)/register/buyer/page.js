import BuyerForm from '@/components/auth/BuyerForm';
import { FaUserAlt } from 'react-icons/fa';

export const metadata = {
  title: 'Register as Buyer | BrokerBoss',
  description: 'Create your buyer account on BrokerBoss and find your perfect property in Raipur, Chhattisgarh.',
};

export default function BuyerRegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8 text-center">
          <span className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
            <FaUserAlt className="h-7 w-7 text-primary" />
          </span>
          <h1 className="text-3xl font-bold tracking-tight">Register as Buyer</h1>
          <p className="text-muted-foreground max-w-sm">
            Tell us what you're looking for and we'll help you find the perfect property in Raipur.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <BuyerForm />
        </div>
      </div>
    </div>
  );
}
