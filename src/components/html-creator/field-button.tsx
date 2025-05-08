'use client';

import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface DraggableFieldData {
  typeId: string;
  name: string;
  iconName: string;
}

export interface DraggableField {
  id: string; // This is the typeId
  name: string;
  icon: LucideIcon;
}


interface FieldButtonProps {
  field: DraggableField;
  className?: string;
  onAddField: (fieldData: DraggableFieldData) => void; // New prop for click action
}

export default function FieldButton({ field, className, onAddField }: FieldButtonProps) {
  const IconComponent = field.icon;

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    const dragData: DraggableFieldData = {
      typeId: field.id,
      name: field.name,
      iconName: (IconComponent as any)?.displayName || field.id,
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleClick = () => {
    const fieldToAdd: DraggableFieldData = {
      typeId: field.id,
      name: field.name,
      iconName: (IconComponent as any)?.displayName || field.id,
    };
    onAddField(fieldToAdd);
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
      onClick={handleClick} // Added onClick handler
    >
      <IconComponent size={16} className="text-muted-foreground shrink-0" />
      <span className="truncate">{field.name}</span>
    </Button>
  );
}
