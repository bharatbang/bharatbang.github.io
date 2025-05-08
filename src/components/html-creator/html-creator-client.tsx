
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button'; // Button is imported but not directly used in this file after removal, can be removed if not needed by other parts
import FieldButton from './field-button';
import type { DraggableFieldData } from './field-button';
import DroppedFieldDisplay from './dropped-field-display';
import HtmlPreviewArea from './html-preview-area';
import { generateHtml } from '@/lib/html-generator';
import {
  AlignLeft, Mail, FileText, CalendarDays, CalendarClock, ChevronDownSquare,
  CircleDot, ListChecks, CheckSquare, Hash, Percent, DollarSign, Link as LinkIcon,
  Image as ImageIcon, ClipboardCheck, FileUp, Search, StickyNote, LayoutGrid,
  Briefcase, ListOrdered, FunctionSquare, PenTool, Users, Type
  // Icons like Minus, Workflow, Share, Settings, Palette were part of the removed sidebar
} from 'lucide-react';

// Represents a field that has been dropped onto the canvas
export interface DroppedFieldItem extends DraggableFieldData {
  instanceId: string; // Unique ID for this specific instance on the canvas
}

// Defines the structure of a field type available for dragging
interface DraggableFieldDefinition {
  id: string; // This is the typeId
  name: string;
  icon: LucideIcon;
}

const draggableFieldsList: DraggableFieldDefinition[] = [
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
  { id: 'decimal', name: 'Decimal', icon: FunctionSquare }, // Changed icon from Minus to FunctionSquare for clarity
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


export default function HtmlCreatorClient() {
  const [formTitle, setFormTitle] = useState('Vacation Requests');
  const [droppedFields, setDroppedFields] = useState<DroppedFieldItem[]>([]);
  const [generatedHtml, setGeneratedHtml] = useState('');
  // const [selectedFieldInstanceId, setSelectedFieldInstanceId] = useState<string | null>(null); // For future property editing

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fieldDataString = e.dataTransfer.getData('application/json');
    if (fieldDataString) {
      try {
        const fieldData = JSON.parse(fieldDataString) as DraggableFieldData;
        // Basic validation of the parsed data
        if (fieldData && typeof fieldData.typeId === 'string' && typeof fieldData.name === 'string') {
          const newField: DroppedFieldItem = {
            ...fieldData,
            instanceId: crypto.randomUUID(),
          };
          setDroppedFields((prevFields) => [...prevFields, newField]);
        } else {
          console.error("Parsed field data is invalid or missing required properties:", fieldData);
        }
      } catch (error) {
        console.error("Failed to parse dropped field data:", error);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleRemoveField = useCallback((instanceIdToRemove: string) => {
    setDroppedFields((prevFields) => prevFields.filter(field => field.instanceId !== instanceIdToRemove));
  }, []);

  useEffect(() => {
    const html = generateHtml(formTitle, droppedFields);
    setGeneratedHtml(html);
  }, [droppedFields, formTitle]);

  const handleDownloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${formTitle.replace(/\s+/g, '_') || 'form'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="flex h-screen bg-muted/40 text-foreground">
      {/* Left Panel - Fields */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-background p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold text-muted-foreground px-2 mb-3">FIELDS</h2>
        <div className="grid grid-cols-2 gap-2">
          {draggableFieldsList.map((field) => (
            <FieldButton key={field.id} field={field} />
          ))}
        </div>
      </aside>

      {/* Center Panel - Canvas & HTML Output */}
      <main className="flex-1 p-6 overflow-y-auto bg-muted/30 flex flex-col space-y-6">
        <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg border border-border flex-grow flex flex-col">
          <h1 className="text-2xl font-semibold mb-6 pb-4 border-b border-border">{formTitle}</h1>
          
          <div 
            className="border-2 border-dashed border-muted-foreground/30 rounded-md p-4 min-h-[300px] flex-grow bg-background/50 space-y-3"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {droppedFields.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-center">Drop fields here to build your form</p>
              </div>
            )}
            {droppedFields.map((field) => (
              <DroppedFieldDisplay 
                key={field.instanceId} 
                field={field} 
                onRemove={handleRemoveField} 
              />
            ))}
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto w-full">
          <HtmlPreviewArea html={generatedHtml} onDownload={handleDownloadHtml} />
        </div>
      </main>

      {/* Right Panel - Properties */}
      <aside className="w-80 flex-shrink-0 border-l border-border bg-background p-0 overflow-y-auto">
        <Tabs defaultValue="form-properties" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-border">
            <TabsTrigger value="form-properties" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">FORM PROPERTIES</TabsTrigger>
            <TabsTrigger value="field-properties" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">FIELD PROPERTIES</TabsTrigger>
          </TabsList>
          <TabsContent value="form-properties" className="p-4 space-y-6">
            <div>
              <Label htmlFor="formTitleProp" className="text-xs font-semibold text-muted-foreground">Form Title</Label>
              <Input id="formTitleProp" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="mt-1 h-8 bg-background"/>
            </div>
            <div>
              <Label htmlFor="formLinkName" className="text-xs font-semibold text-muted-foreground">Form Link Name</Label>
              <Input id="formLinkName" defaultValue="Vacation_Requests" className="mt-1 h-8 bg-background"/>
            </div>

            <h3 className="text-sm font-semibold text-foreground pt-2 border-t border-border">Appearance</h3>
            <div>
              <Label htmlFor="labelPlacement" className="text-xs font-semibold text-muted-foreground">Label Placement</Label>
              <Select defaultValue="left">
                <SelectTrigger id="labelPlacement" className="mt-1 h-8 bg-background">
                  <SelectValue placeholder="Select placement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="labelWidth" className="text-xs font-semibold text-muted-foreground">Label Width</Label>
              <Select defaultValue="auto">
                <SelectTrigger id="labelWidth" className="mt-1 h-8 bg-background">
                  <SelectValue placeholder="Select width" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="25%">25%</SelectItem>
                  <SelectItem value="50%">50%</SelectItem>
                  <SelectItem value="75%">75%</SelectItem>
                  <SelectItem value="100%">100%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <h3 className="text-sm font-semibold text-foreground pt-2 border-t border-border">Success</h3>
            <div>
              <Label htmlFor="successMessage" className="text-xs font-semibold text-muted-foreground">Data Added Successfully Message</Label>
              <Textarea id="successMessage" placeholder="e.g., Your request has been submitted." className="mt-1 bg-background text-sm" rows={2}/>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sendConfirmationEmail" />
              <Label htmlFor="sendConfirmationEmail" className="text-sm font-normal">Send Confirmation Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="goToNextUrl" />
              <Label htmlFor="goToNextUrl" className="text-sm font-normal">Go to Next URL</Label>
            </div>

             <h3 className="text-sm font-semibold text-foreground pt-2 border-t border-border">Validation</h3>
            <div className="flex items-center space-x-2">
              <Checkbox id="enableCaptcha" />
              <Label htmlFor="enableCaptcha" className="text-sm font-normal">Enable Captcha</Label>
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="oneEntryIp" />
              <Label htmlFor="oneEntryIp" className="text-sm font-normal">One Entry Per IP Address</Label>
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="oneEntryUser" />
              <Label htmlFor="oneEntryUser" className="text-sm font-normal">One Entry Per User</Label>
            </div>
             <div>
              <Label htmlFor="maxEntries" className="text-xs font-semibold text-muted-foreground">Maximum Entries</Label>
              <Select defaultValue="unlimited">
                <SelectTrigger id="maxEntries" className="mt-1 h-8 bg-background">
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          <TabsContent value="field-properties" className="p-4">
            <p className="text-sm text-muted-foreground">Select a field on the canvas to see its properties. (Feature coming soon)</p>
          </TabsContent>
        </Tabs>
      </aside>
    </div>
  );
}
