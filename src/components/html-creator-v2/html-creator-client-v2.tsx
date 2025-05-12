
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { LucideIcon } from 'lucide-react';
import FieldButtonV2 from './field-button-v2'; // Updated import
import type { DraggableFieldData } from './field-button-v2'; // Updated import
import DroppedFieldDisplayV2 from './dropped-field-display-v2'; // Updated import
import HtmlPreviewAreaV2 from './html-preview-area-v2'; // Updated import
import { generateHtml } from '@/lib/html-generator'; // Keep using the same generator for now
import {
  AlignLeft, Mail, FileText, CalendarDays, CalendarClock, ChevronDownSquare,
  CircleDot, ListChecks, CheckSquare, Hash, Percent, DollarSign, Link as LinkIcon,
  Image as ImageIcon, ClipboardCheck, FileUp, Search, StickyNote, LayoutGrid,
  Briefcase, ListOrdered, FunctionSquare, PenTool, Users, Type, Tag
} from 'lucide-react';

// Represents a field that has been dropped onto the canvas
export interface DroppedFieldItem extends DraggableFieldData {
  instanceId: string; // Unique ID for this specific instance on the canvas
  // name property is inherited from DraggableFieldData and can be edited
}

// Defines the structure of a field type available for dragging
interface DraggableFieldDefinition {
  id: string; // This is the typeId
  name: string; // This is the base name / type
  icon: LucideIcon;
}

const draggableFieldsList: DraggableFieldDefinition[] = [
  { id: 'label', name: 'Label', icon: Tag }, // New "Label" field
  { id: 'single-line', name: 'Single Line', icon: Type },
  { id: 'multi-line', name: 'Multi Line', icon: AlignLeft },
  { id: 'email', name: 'Email', icon: Mail },
  { id: 'rich-text', name: 'Rich Text', icon: FileText },
  { id: 'date', name: 'Date', icon: CalendarDays },
  { id: 'date-time', name: 'Date-Time', icon: CalendarClock },
  { id: 'drop-down', name: 'Drop Down', icon: ChevronDownSquare },
  { id: 'radio', name: 'Radio', icon: CircleDot },
  { id: 'multi-select', name: 'Multi Select', icon: ListChecks },
  { id: 'checkbox', name: 'Checkbox', icon: CheckSquare },
  { id: 'number', name: 'Number', icon: Hash },
  { id: 'decimal', name: 'Decimal', icon: FunctionSquare },
  { id: 'percent', name: 'Percent', icon: Percent },
  { id: 'currency', name: 'Currency', icon: DollarSign },
  { id: 'url', name: 'URL', icon: LinkIcon },
  { id: 'image', name: 'Image', icon: ImageIcon },
  { id: 'decision-box', name: 'Decision Box', icon: ClipboardCheck },
  { id: 'file-upload', name: 'File Upload', icon: FileUp },
  { id: 'lookup', name: 'Lookup', icon: Search },
  { id: 'add-notes', name: 'Add Notes', icon: StickyNote },
  { id: 'subform', name: 'SubForm', icon: LayoutGrid },
  { id: 'zoho-crm', name: 'Zoho CRM', icon: Briefcase },
  { id: 'auto-number', name: 'Auto Number', icon: ListOrdered },
  { id: 'formula', name: 'Formula', icon: FunctionSquare },
  { id: 'signature', name: 'Signature', icon: PenTool },
  { id: 'users', name: 'Users', icon: Users },
];

export const iconMap: Record<string, LucideIcon> = draggableFieldsList.reduce((acc, field) => {
  acc[field.id] = field.icon;
  return acc;
}, {} as Record<string, LucideIcon>);


export default function HtmlCreatorClientV2() { // Renamed component
  const [formTitle, setFormTitle] = useState('Vacation Requests V2'); // Default V2 Title
  const [droppedFields, setDroppedFields] = useState<DroppedFieldItem[]>([]);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [fieldCounters, setFieldCounters] = useState<Record<string, number>>({});


  const getNextFieldName = (baseName: string): string => {
    const currentCount = fieldCounters[baseName] || 0;
    const nextCount = currentCount + 1;
    setFieldCounters(prev => ({ ...prev, [baseName]: nextCount }));
    // For the "Label" field, just use its name or append count if multiple labels are named "Label"
    if (baseName === "Label" && nextCount === 1 && !droppedFields.some(f => f.name === "Label" && f.typeId === 'label')) {
      return baseName;
    }
    return `${baseName} ${nextCount}`;
  };


  const handleAddField = useCallback((fieldData: DraggableFieldData) => {
    if (fieldData && typeof fieldData.typeId === 'string' && typeof fieldData.name === 'string') {
      const newField: DroppedFieldItem = {
        ...fieldData,
        name: getNextFieldName(fieldData.name),
        instanceId: crypto.randomUUID(),
      };
      setDroppedFields((prevFields) => [...prevFields, newField]);
    } else {
      console.error("Clicked field data is invalid or missing required properties:", fieldData);
    }
  }, [fieldCounters, droppedFields]); // Added fieldCounters and droppedFields

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fieldDataString = e.dataTransfer.getData('application/json');
    if (fieldDataString) {
      try {
        const fieldData = JSON.parse(fieldDataString) as DraggableFieldData;
        if (fieldData && typeof fieldData.typeId === 'string' && typeof fieldData.name === 'string') {
          const newField: DroppedFieldItem = {
            ...fieldData,
            name: getNextFieldName(fieldData.name),
            instanceId: crypto.randomUUID(),
          };
          setDroppedFields((prevFields) => [...prevFields, newField]);
        } else {
          console.error("Parsed dropped field data is invalid or missing required properties:", fieldData);
        }
      } catch (error) {
        console.error("Failed to parse dropped field data:", error);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveField = useCallback((instanceIdToRemove: string) => {
    setDroppedFields((prevFields) => prevFields.filter(field => field.instanceId !== instanceIdToRemove));
  }, []);

  const handleFieldNameChange = useCallback((instanceIdToUpdate: string, newName: string) => {
    setDroppedFields((prevFields) =>
      prevFields.map(f =>
        f.instanceId === instanceIdToUpdate ? { ...f, name: newName } : f
      )
    );
  }, []);

  useEffect(() => {
    const html = generateHtml(formTitle, droppedFields);
    setGeneratedHtml(html);
  }, [droppedFields, formTitle]);

  const handleDownloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${formTitle.replace(/\s+/g, '_') || 'form_v2'}.html`; // Added _v2
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="flex h-screen bg-muted/40 text-foreground">
      {/* Left Panel - Fields */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-background p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold text-muted-foreground px-2 mb-3">FIELDS (V2)</h2>
        <div className="grid grid-cols-2 gap-2">
          {draggableFieldsList.map((field) => (
            <FieldButtonV2 // Updated component
              key={field.id}
              field={field}
              onAddField={handleAddField}
            />
          ))}
        </div>
      </aside>

      {/* Center Panel - Canvas & HTML Output */}
      <main className="flex-1 p-6 overflow-y-auto bg-muted/30 flex flex-col space-y-6">
        <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg border border-border flex-grow flex flex-col">
          {/* Form Title - editable for form properties */}
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="text-2xl font-semibold mb-6 pb-4 border-b border-border bg-transparent focus:outline-none focus:ring-0 focus:border-primary w-full"
            placeholder="Enter Form Title"
          />

          <div
            className="border-2 border-dashed border-muted-foreground/30 rounded-md p-4 min-h-[300px] flex-grow bg-background/50 grid grid-cols-1 sm:grid-cols-2 gap-3"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {droppedFields.length === 0 && (
              <div className="flex items-center justify-center h-full col-span-1 sm:col-span-2">
                <p className="text-muted-foreground text-center">Drop or click fields here to build your form (V2)</p>
              </div>
            )}
            {droppedFields.map((field) => (
              <DroppedFieldDisplayV2 // Updated component
                key={field.instanceId}
                field={field}
                onRemove={handleRemoveField}
                onNameChange={handleFieldNameChange}
              />
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto w-full">
          <HtmlPreviewAreaV2 html={generatedHtml} onDownload={handleDownloadHtml} /> {/* Updated component */}
        </div>
      </main>
    </div>
  );
}
