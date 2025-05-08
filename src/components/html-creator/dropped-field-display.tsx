
'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { DroppedFieldItem } from './html-creator-client';
import { iconMap } from './html-creator-client'; // Import iconMap

interface DroppedFieldDisplayProps {
  field: DroppedFieldItem;
  onRemove: (instanceId: string) => void;
}

const DroppedFieldDisplay: React.FC<DroppedFieldDisplayProps> = ({ field, onRemove }) => {
  const IconComponent = iconMap[field.typeId] || (() => <span className="text-xs">?</span>); // Fallback for unknown icons

  return (
    <div 
      className="flex items-center justify-between p-3 bg-muted/70 hover:bg-muted rounded-md shadow-sm border border-border transition-all group"
      // onClick={() => onSelect(field.instanceId)} // For future property editing
      // Add draggable props here for reordering if needed later
    >
      <div className="flex items-center space-x-2">
        <IconComponent size={18} className="text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">{field.name}</span>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={(e) => {
          e.stopPropagation(); // Prevent onSelect if it's implemented on the parent div
          onRemove(field.instanceId);
        }}
        className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-50 group-hover:opacity-100 transition-opacity"
        aria-label={`Remove ${field.name} field`}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
};

export default DroppedFieldDisplay;

    