'use client';

import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DraggableField {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface FieldButtonProps {
  field: DraggableField;
  className?: string;
}

export default function FieldButton({ field, className }: FieldButtonProps) {
  const IconComponent = field.icon;
  return (
    <Button
      variant="outline"
      className={cn(
        "w-full h-auto justify-start p-2 text-left text-xs font-normal bg-card hover:bg-accent/10 border-border",
        "flex items-center space-x-2",
        className
      )}
      // Add draggable props here in the future
    >
      <IconComponent size={16} className="text-muted-foreground shrink-0" />
      <span className="truncate">{field.name}</span>
    </Button>
  );
}
