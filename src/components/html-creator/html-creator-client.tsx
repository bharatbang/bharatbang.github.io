'use client';

import React, { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import FieldButton from './field-button';
import {
  Minus, AlignLeft, Mail, FileText, CalendarDays, CalendarClock, ChevronDownSquare,
  CircleDot, ListChecks, CheckSquare, Hash, Percent, DollarSign, Link as LinkIcon,
  Image as ImageIcon, ClipboardCheck, FileUp, Search, StickyNote, LayoutGrid,
  Briefcase, ListOrdered, FunctionSquare, PenTool, Users, Workflow, Settings, Share, Palette, Type
} from 'lucide-react';

interface DraggableField {
  id: string;
  name: string;
  icon: LucideIcon;
}

const draggableFields: DraggableField[] = [
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
  { id: 'decimal', name: 'Decimal', icon: FunctionSquare }, // Using FunctionSquare as stand-in for Decimal
  { id: 'percent', name: 'Percent', icon: Percent },
  { id: 'currency', name: 'Currency', icon: DollarSign },
  { id: 'url', name: 'URL', icon: LinkIcon },
  { id: 'image', name: 'Image', icon: ImageIcon },
  { id: 'decision-box', name: 'Decision Box', icon: ClipboardCheck },
  { id: 'file-upload', name: 'File Upload', icon: FileUp },
  { id: 'lookup', name: 'Lookup', icon: Search },
  { id: 'add-notes', name: 'Add Notes', icon: StickyNote },
  { id: 'subform', name: 'SubForm', icon: LayoutGrid },
  { id: 'zoho-crm', name: 'Zoho CRM', icon: Briefcase }, // Placeholder
  { id: 'auto-number', name: 'Auto Number', icon: ListOrdered },
  { id: 'formula', name: 'Formula', icon: FunctionSquare },
  { id: 'signature', name: 'Signature', icon: PenTool },
  { id: 'users', name: 'Users', icon: Users },
];


export default function HtmlCreatorClient() {
  const [formTitle, setFormTitle] = useState('Vacation Requests');

  return (
    <div className="flex h-screen bg-muted/40 text-foreground">
      {/* Left Panel - App Navigation (Mimicking Zoho Creator) */}
      <aside className="w-20 flex-shrink-0 bg-card border-r border-border flex flex-col items-center py-4 space-y-4">
        <div className="p-2 mb-4">
           {/* Placeholder for logo */}
          <Palette size={32} className="text-primary"/>
        </div>
        <Button variant="ghost" size="icon" className="w-12 h-12 flex flex-col items-center text-muted-foreground hover:text-primary">
          <LayoutGrid size={24} />
          <span className="text-xs mt-1">Dashboard</span>
        </Button>
         <Button variant="ghost" size="icon" className="w-12 h-12 flex flex-col items-center text-primary bg-accent/20">
          <Minus size={24} /> {/* Using Minus for "Create New" - needs better icon */}
          <span className="text-xs mt-1">Create New</span>
        </Button>
        <Button variant="ghost" size="icon" className="w-12 h-12 flex flex-col items-center text-muted-foreground hover:text-primary">
          <Workflow size={24} />
          <span className="text-xs mt-1">Workflow</span>
        </Button>
        <Button variant="ghost" size="icon" className="w-12 h-12 flex flex-col items-center text-muted-foreground hover:text-primary">
          <Share size={24} />
          <span className="text-xs mt-1">Share</span>
        </Button>
        <div className="flex-grow"></div> {/* Spacer */}
        <Button variant="ghost" size="icon" className="w-12 h-12 flex flex-col items-center text-muted-foreground hover:text-primary">
          <Settings size={24} />
          <span className="text-xs mt-1">Settings</span>
        </Button>
      </aside>

      {/* Second Left Panel - Fields */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-background p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold text-muted-foreground px-2 mb-3">FIELDS</h2>
        <div className="grid grid-cols-2 gap-2">
          {draggableFields.map((field) => (
            <FieldButton key={field.id} field={field} />
          ))}
        </div>
      </aside>

      {/* Center Panel - Canvas */}
      <main className="flex-1 p-6 overflow-y-auto bg-muted/30">
        <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg border border-border">
          <h1 className="text-2xl font-semibold mb-6 pb-4 border-b border-border">{formTitle}</h1>
          
          <form className="space-y-6">
            <div>
              <Label htmlFor="employeeName" className="text-sm font-medium">Employee Name</Label>
              <Input id="employeeName" type="text" className="mt-1 bg-background" />
            </div>
            <div>
              <Label htmlFor="beginningOn" className="text-sm font-medium">Beginning on</Label>
              <Input id="beginningOn" type="date" className="mt-1 bg-background" />
            </div>
            <div>
              <Label htmlFor="endingOn" className="text-sm font-medium">Ending on</Label>
              <Input id="endingOn" type="date" className="mt-1 bg-background" />
            </div>
            <div>
              <Label htmlFor="daysRequested" className="text-sm font-medium">Number of Days Requested</Label>
              <Input id="daysRequested" type="number" className="mt-1 bg-background" />
            </div>
            <div className="flex justify-end space-x-3 pt-6">
              <Button type="submit" variant="default">Submit</Button>
              <Button type="reset" variant="outline">Reset</Button>
            </div>
          </form>
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
              <Label htmlFor="formTitle" className="text-xs font-semibold text-muted-foreground">Form Title</Label>
              <Input id="formTitle" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="mt-1 h-8 bg-background"/>
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
            <p className="text-sm text-muted-foreground">Select a field on the canvas to see its properties.</p>
          </TabsContent>
        </Tabs>
      </aside>
    </div>
  );
}
