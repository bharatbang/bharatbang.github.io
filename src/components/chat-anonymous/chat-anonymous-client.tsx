
'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
}

export default function ChatAnonymousClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue('');
  };

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      // ShadCN ScrollArea nests the actual scrollable viewport.
      // We need to select it to control its scrollTop property.
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    // Focus input on load
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-full p-4 md:p-6 bg-muted/30 flex-grow">
      <Card className="flex-grow flex flex-col shadow-lg border border-border rounded-lg overflow-hidden">
        <CardContent className="p-0 flex-grow flex flex-col">
          <ScrollArea className="flex-grow p-4 space-y-3" ref={scrollAreaRef}>
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No messages yet. Start chatting!</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="flex flex-col items-start">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-bl-none shadow max-w-xs sm:max-w-md md:max-w-lg break-words">
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-primary-foreground/80 mt-1 text-right">
                    {format(msg.timestamp, 'p')} {/* 'p' for short time, e.g., 2:30 PM */}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-border bg-background flex items-center gap-3"
          >
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow"
              autoComplete="off"
            />
            <Button type="submit" size="icon" aria-label="Send message">
              <Send size={20} />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
