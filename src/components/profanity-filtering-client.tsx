
'use client';

import React, { useState, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// A simple list of "bad words". In a real application, this list would be more extensive
// and potentially managed externally or via an API.
const BAD_WORDS_LIST: string[] = [
  'badword',
  'curse',
  'damn',
  'heck',
  'explicit',
  'profane',
  'inappropriate',
  'offensive',
  'example', // For testing
  'fuck',
  'screw',
  'idiot',
  'mc',
  'bc',
];

export default function ProfanityFilteringClient() {
  const [inputText, setInputText] = useState<string>('');

  const filterProfanity = useCallback((text: string): string => {
    if (!text.trim()) return text;

    let filteredText = text;
    // Regex to split words, keeping original delimiters if possible, or just spaces
    // This regex tries to match whole words.
    const wordRegex = new RegExp(`\\b(${BAD_WORDS_LIST.join('|')})\\b`, 'gi');
    
    filteredText = filteredText.replace(wordRegex, (match) => '*'.repeat(match.length));
    
    return filteredText;
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentText = event.target.value;
    const lastChar = currentText.slice(-1);
    
    // Filter immediately if the last character is a space or punctuation (indicating word completion)
    // or if the text itself has changed in a way that might need filtering (e.g. paste)
    if (/\s|[.,!?;:]/.test(lastChar) || currentText.length < inputText.length || currentText.length > inputText.length + 10 /* heuristic for paste */ ) {
      setInputText(filterProfanity(currentText));
    } else {
      setInputText(currentText);
    }
  };

  const handleBlur = () => {
    // Ensure final filtering on blur
    setInputText(filterProfanity(inputText));
  };

  return (
    <Card className="w-full max-w-2xl shadow-xl">
      <CardHeader>
        <CardTitle>Test Profanity Filter</CardTitle>
        <CardDescription>
          Type in the text area below. Words like: "{BAD_WORDS_LIST.slice(0,3).join(', ')}, etc." will be replaced with asterisks when you complete the word (e.g., by typing a space or punctuation).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message-2" className="text-muted-foreground">Your Message</Label>
          <Textarea
            placeholder="Type your message here..."
            id="message-2"
            value={inputText}
            onChange={handleInputChange}
            onBlur={handleBlur} // Added onBlur for final check
            rows={8}
            className="resize-none text-base"
          />
          <p className="text-sm text-muted-foreground">
            Filtered words will appear as asterisks (e.g., *******).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
