
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

const HtmlPreviewAreaV2: React.FC<HtmlPreviewAreaProps> = ({ html, onDownload }) => { // Renamed component
  return (
    <div className="bg-card p-4 rounded-lg shadow-md border border-border space-y-3">
      <div className="flex justify-between items-center">
        <Label htmlFor="htmlOutputV2" className="text-lg font-semibold">Generated HTML (V2)</Label> {/* Added V2 */}
        <Button onClick={onDownload} variant="outline" size="sm">
          <Download size={16} className="mr-2" />
          Download HTML
        </Button>
      </div>
      <Textarea
        id="htmlOutputV2" // Changed ID
        value={html}
        readOnly
        className="w-full h-64 bg-muted/30 font-mono text-xs border-input"
        placeholder="HTML code will appear here..."
        aria-label="Generated HTML code (V2)" // Added V2
      />
    </div>
  );
};

export default HtmlPreviewAreaV2; // Renamed export
