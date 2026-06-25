'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => router.back()}
      className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted"
    >
      <FaArrowLeft className="h-4 w-4" />
    </Button>
  );
}
