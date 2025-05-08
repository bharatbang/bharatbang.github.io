'use client';

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface HtmlPreviewAreaProps {
  html: string;
  onDownload: () => void;
}

const HtmlPreviewArea: React.FC<HtmlPreviewAreaProps> = ({ html, onDownload }) => {
  return (
    <div className="bg-card p-4 rounded-lg shadow-md border border-border space-y-3">
      <div className="flex justify-between items-center">
        <Label htmlFor="htmlOutput" className="text-lg font-semibold">Generated HTML</Label>
        <Button onClick={onDownload} variant="outline" size="sm">
          <Download size={16} className="mr-2" />
          Download HTML
        </Button>
      </div>
      <Textarea
        id="htmlOutput"
        value={html}
        readOnly
        className="w-full h-64 bg-muted/30 font-mono text-xs border-input"
        placeholder="HTML code will appear here..."
        aria-label="Generated HTML code"
      />
    </div>
  );
};

export default HtmlPreviewArea;
