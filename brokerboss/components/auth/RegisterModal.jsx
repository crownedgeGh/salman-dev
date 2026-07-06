'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { FaUserAlt, FaHome, FaHandshake, FaFlask } from 'react-icons/fa';

const roles = [
  {
    id: 'buyer',
    label: 'Buyer',
    icon: FaUserAlt,
    description: 'Looking for properties to buy or rent',
    tester: false,
  },
  {
    id: 'owner',
    label: 'Owner',
    icon: FaHome,
    description: 'I own property and want to list it',
    tester: false,
  },
  {
    id: 'broker',
    label: 'Broker',
    icon: FaHandshake,
    description: 'Professional agent representing clients',
    tester: false,
  },
  {
    id: 'tester',
    label: 'Tester',
    icon: FaFlask,
    description: 'Instant login — no details needed',
    tester: true,
  },
];

export default function RegisterModal({ open, onClose }) {
  const router = useRouter();
  const { register } = useAuth();

  const handleSelect = (role) => {
    if (role.tester) {
      // Instantly log in as an owner so POST PROPERTIES button is visible
      const randomStr = Math.random().toString(36).substring(2, 8);
      register('owner', { 
        name: 'Tester', 
        email: `tester_${randomStr}@test.com`,
        password: 'testerpassword',
        phone: '0000000000', 
        city: 'Raipur', 
        area: 'Test Area', 
        propertyType: 'Flat' 
      });
      onClose();
      return;
    }
    onClose();
    router.push(`/register/${role.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[580px] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">Register As</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your role to get started on BrokerBoss
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                id={`register-role-${role.id}`}
                onClick={() => handleSelect(role)}
                className={`w-full flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-3 sm:gap-3 rounded-xl border-2 transition-all duration-200 p-4 sm:p-5 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  role.tester
                    ? 'border-dashed border-muted-foreground/40 bg-muted/30 hover:border-primary hover:bg-accent hover:text-accent-foreground'
                    : 'border-border bg-card hover:border-primary hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <span
                  className={`shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground ${
                    role.tester ? 'bg-muted text-muted-foreground' : 'bg-accent'
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div className="flex flex-col gap-0.5 sm:gap-1 flex-1">
                  <span className="font-semibold text-base leading-tight flex items-center gap-2">
                    {role.label}
                    {role.tester && (
                      <span className="sm:hidden inline-block text-[9px] font-bold tracking-wider uppercase text-muted-foreground border border-dashed border-muted-foreground/40 rounded-full px-1.5 py-0.5 ml-1">
                        Dev Only
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground leading-snug">
                    {role.description}
                  </span>
                </div>
                {role.tester && (
                  <span className="hidden sm:inline-block text-[10px] font-bold tracking-wider uppercase text-muted-foreground border border-dashed border-muted-foreground/40 rounded-full px-2 py-0.5 mt-1">
                    Dev Only
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
