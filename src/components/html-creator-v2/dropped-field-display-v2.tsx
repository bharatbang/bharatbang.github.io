
'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import type { DroppedFieldItem } from './html-creator-client-v2'; // Updated import
import { iconMap } from './html-creator-client-v2'; // Updated import
import { cn } from '@/lib/utils';

interface DroppedFieldDisplayProps {
  field: DroppedFieldItem;
  onRemove: (instanceId: string) => void;
  onNameChange: (instanceId: string, newName: string) => void;
}

const DroppedFieldDisplayV2: React.FC<DroppedFieldDisplayProps> = ({ field, onRemove, onNameChange }) => { // Renamed component
  const IconComponent = iconMap[field.typeId] || (() => <span className="text-xs">?</span>);

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(field.instanceId, e.target.value);
  };

  return (
    <div
      className="flex items-center justify-between p-3 bg-muted/70 hover:bg-muted rounded-md shadow-sm border border-border transition-all group"
    >
      <div className="flex items-center space-x-2 flex-grow mr-2">
        <IconComponent size={18} className="text-muted-foreground shrink-0" />
        <Input
          type="text"
          value={field.name}
          onChange={handleNameInputChange}
          className={cn(
            "text-sm font-medium text-foreground bg-transparent border-0 shadow-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0",
            "hover:bg-background/50 focus:bg-background/80 rounded-sm px-1 py-0.5" // Add slight bg on hover/focus for better UX
          )}
          aria-label={`Edit name for ${field.name} field`}
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(field.instanceId);
        }}
        className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-50 group-hover:opacity-100 transition-opacity shrink-0"
        aria-label={`Remove ${field.name} field`}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
};

export default DroppedFieldDisplayV2; // Renamed export
