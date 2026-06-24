'use client';

import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { FaUserAlt, FaHome, FaHandshake } from 'react-icons/fa';

const roles = [
  {
    id: 'buyer',
    label: 'Buyer',
    icon: FaUserAlt,
    description: 'Looking for properties to buy or rent',
  },
  {
    id: 'owner',
    label: 'Owner',
    icon: FaHome,
    description: 'I own property and want to list it',
  },
  {
    id: 'broker',
    label: 'Broker',
    icon: FaHandshake,
    description: 'Professional agent representing clients',
  },
];

export default function RegisterModal({ open, onClose }) {
  const router = useRouter();

  const handleSelect = (roleId) => {
    onClose();
    router.push(`/register/${roleId}`);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[520px] p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">Register As</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your role to get started on BrokerBoss
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-4">
          {roles.map(({ id, label, icon: Icon, description }) => (
            <button
              key={id}
              id={`register-role-${id}`}
              onClick={() => handleSelect(id)}
              className="flex-1 flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-accent hover:text-accent-foreground transition-all duration-200 p-6 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="h-12 w-12 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                <Icon className="h-6 w-6" />
              </span>
              <span className="font-semibold text-lg leading-tight">{label}</span>
              <span className="text-xs text-muted-foreground text-center leading-snug">
                {description}
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
