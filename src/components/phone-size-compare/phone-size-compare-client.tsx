
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { PHONE_DATA, VIEWS, SORT_OPTIONS, type PhoneSpec, type PhoneView, type SortOption } from './phone-data';
import { X, HelpCircle, ArrowLeft } from 'lucide-react';

const pixelsPerMm = 3.78; // Approximate, can be calibrated

export default function PhoneSizeCompareClient() {
  const [selectedPhoneId, setSelectedPhoneId] = useState<string | null>(PHONE_DATA[0]?.id || null);
  const [selectedView, setSelectedView] = useState<PhoneView>(VIEWS[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(50); // Slider 0-100, represents a zoom factor
  const [showOutline, setShowOutline] = useState<boolean>(false);
  const [showCreditCard, setShowCreditCard] = useState<boolean>(true);
  const [isStacked, setIsStacked] = useState<boolean>(false); 
  const [sortBy, setSortBy] = useState<SortOption>(SORT_OPTIONS[0]); 

  const currentPhone: PhoneSpec | undefined = useMemo(() => {
    return PHONE_DATA.find(p => p.id === selectedPhoneId);
  }, [selectedPhoneId]);

  const handleClearPhone = () => {
    setSelectedPhoneId(null);
  };
  
  const getImageDimensions = () => {
    if (!currentPhone) return { displayWidth: 0, displayHeight: 0, imageSrc: '' };

    const scale = 0.5 + (zoomLevel / 100);

    let phonePhysicalWidthMm: number;
    let phonePhysicalHeightMm: number;
    let imageSrc: string;

    if (selectedView === 'side') {
      phonePhysicalWidthMm = currentPhone.dimensions.thickness;
      phonePhysicalHeightMm = currentPhone.dimensions.height;
      imageSrc = currentPhone.imageUrls.side;
    } else {
      phonePhysicalWidthMm = currentPhone.dimensions.width;
      phonePhysicalHeightMm = currentPhone.dimensions.height;
      imageSrc = selectedView === 'front' ? currentPhone.imageUrls.front : currentPhone.imageUrls.rear;
    }
    
    const displayWidth = phonePhysicalWidthMm * pixelsPerMm * scale;
    const displayHeight = phonePhysicalHeightMm * pixelsPerMm * scale;

    return { displayWidth, displayHeight, imageSrc };
  };

  const { displayWidth, displayHeight, imageSrc } = getImageDimensions();

  const creditCardPhysicalWidthMm = 85.6;
  const creditCardPhysicalHeightMm = 53.98;
  const creditCardDisplayWidth = creditCardPhysicalWidthMm * pixelsPerMm; 
  const creditCardDisplayHeight = creditCardPhysicalHeightMm * pixelsPerMm;


  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="mb-4">
        <Link href="/" legacyBehavior>
          <Button variant="outline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
      <div className="bg-card p-4 rounded-lg shadow border space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select
            value={selectedPhoneId || ''}
            onValueChange={(value) => setSelectedPhoneId(value || null)}
          >
            <SelectTrigger className="w-full sm:w-[280px]">
              <SelectValue placeholder="Select a phone" />
            </SelectTrigger>
            <SelectContent>
              {PHONE_DATA.map(phone => (
                <SelectItem key={phone.id} value={phone.id}>
                  {phone.name} ({phone.dimensions.height} x {phone.dimensions.width} x {phone.dimensions.thickness} mm)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedView}
            onValueChange={(value) => setSelectedView(value as PhoneView)}
          >
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              {VIEWS.map(view => (
                <SelectItem key={view} value={view} className="capitalize">{view}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2 flex-1 min-w-[150px] sm:min-w-[200px]">
            <Label htmlFor="zoomSlider" className="whitespace-nowrap text-sm">Zoom:</Label>
            <Slider
              id="zoomSlider"
              min={0}
              max={100}
              step={1}
              value={[zoomLevel]}
              onValueChange={(value) => setZoomLevel(value[0])}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="outline" checked={showOutline} onCheckedChange={(checked) => setShowOutline(Boolean(checked))} />
            <Label htmlFor="outline" className="text-sm">Outline</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="creditCard" checked={showCreditCard} onCheckedChange={(checked) => setShowCreditCard(Boolean(checked))} />
            <Label htmlFor="creditCard" className="text-sm">Credit Card Object</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="stacked" checked={isStacked} onCheckedChange={(checked) => setIsStacked(Boolean(checked))} />
            <Label htmlFor="stacked" className="text-sm">Stacked</Label>
          </div>
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger className="w-full sm:w-[150px] text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Link href="#" className="flex items-center text-sm text-primary hover:underline">
            <HelpCircle size={16} className="mr-1" />
            How to use?
          </Link>
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        Tap on a device for additional information. Swipe to scroll, and Use the slider to resize the devices.
      </p>

      <div className="flex items-end justify-center gap-8 py-8 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] bg-muted/30 p-4 rounded-md overflow-x-auto">
        {showCreditCard && (
          <div 
            className="shrink-0 rounded-xl overflow-hidden" // Added rounded-xl and overflow-hidden
            style={{ width: `${creditCardDisplayWidth}px`, height: `${creditCardDisplayHeight}px` }}
          >
            <div className="relative w-full h-full">
              <Image 
                className="rounded-xl" // Also apply to Image for Next/Image handling
                src="https://placehold.co/338x213.png" 
                alt="Credit Card" 
                layout="fill" 
                objectFit="contain"
                data-ai-hint="credit card bank"
              />
            </div>
          </div>
        )}

        {currentPhone && imageSrc && displayWidth > 0 && displayHeight > 0 && (
          <div 
            className="relative shrink-0"
            style={{ 
              width: `${displayWidth}px`, 
              height: `${displayHeight}px`,
              border: showOutline ? '2px dashed hsl(var(--primary))' : 'none',
              boxShadow: isStacked ? '0 0 0 4px hsl(var(--border)), 0 0 0 8px hsl(var(--muted))' : 'none'
            }}
          >
            <Image
              key={imageSrc} 
              src={imageSrc}
              alt={`${currentPhone.name} - ${selectedView}`}
              layout="fill"
              objectFit="contain"
              data-ai-hint={currentPhone.dataAiHint}
              priority
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white h-6 w-6 z-10"
              onClick={handleClearPhone}
              aria-label="Clear phone selection"
            >
              <X size={16} />
            </Button>
            <p className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
              {currentPhone.name}
            </p>
          </div>
        )}
        {!currentPhone && (
          <p className="text-muted-foreground">Select a phone to display.</p>
        )}
      </div>
    </div>
  );
}
