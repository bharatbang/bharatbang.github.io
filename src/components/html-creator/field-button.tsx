'use client';

import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface DraggableFieldData {
  typeId: string;
  name: string;
  iconName: string; // Keep iconName if needed for display on canvas, or derive from typeId
}

export interface DraggableField extends DraggableFieldData {
  icon: LucideIcon;
}


interface FieldButtonProps {
  field: DraggableField;
  className?: string;
}

export default function FieldButton({ field, className }: FieldButtonProps) {
  const IconComponent = field.icon;

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    const dragData: DraggableFieldData = {
      typeId: field.id, // Use field.id which is the typeId
      name: field.name,
      iconName: field.icon.displayName || field.id, // Attempt to get icon name or fallback
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Button
      variant="outline"
      className={cn(
        "w-full h-auto justify-start p-2 text-left text-xs font-normal bg-card hover:bg-accent/10 border-border",
        "flex items-center space-x-2 cursor-grab",
        className
      )}
      draggable
      onDragStart={handleDragStart}
    >
      <IconComponent size={16} className="text-muted-foreground shrink-0" />
      <span className="truncate">{field.name}</span>
    </Button>
  );
}
