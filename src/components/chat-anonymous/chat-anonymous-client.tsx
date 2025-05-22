
'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bell, BellRing, BellOff } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
}

type NotificationPermission = 'default' | 'granted' | 'denied';

export default function ChatAnonymousClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [userWantsNotifications, setUserWantsNotifications] = useState<boolean>(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check initial notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission as NotificationPermission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission as NotificationPermission);
    if (permission === 'granted') {
      setUserWantsNotifications(true);
      showBrowserNotification('Notifications Enabled!', 'You will now receive notifications for new messages when the tab is inactive.');
    } else if (permission === 'denied') {
      setUserWantsNotifications(false);
    }
  };

  const toggleUserWantsNotifications = () => {
    if (notificationPermission === 'granted') {
      setUserWantsNotifications(prev => !prev);
    } else if (notificationPermission === 'default') {
      requestNotificationPermission();
    }
    // If 'denied', do nothing as the button should ideally be disabled or indicate blocked.
  };

  const showBrowserNotification = (title: string, body: string) => {
    if (notificationPermission === 'granted' && userWantsNotifications && document.hidden) {
      new Notification(title, { body });
    }
  };

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

    showBrowserNotification('New Anonymous Message', newMessage.text);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getNotificationButton = () => {
    if (notificationPermission === 'denied') {
      return (
        <Button variant="outline" size="icon" disabled aria-label="Notifications blocked">
          <BellOff size={20} />
        </Button>
      );
    }
    if (notificationPermission === 'granted') {
      return (
        <Button variant="outline" size="icon" onClick={toggleUserWantsNotifications} aria-label={userWantsNotifications ? "Disable notifications" : "Enable notifications"}>
          {userWantsNotifications ? <BellRing size={20} className="text-accent" /> : <Bell size={20} />}
        </Button>
      );
    }
    // 'default' permission
    return (
      <Button variant="outline" size="icon" onClick={requestNotificationPermission} aria-label="Enable notifications">
        <Bell size={20} />
      </Button>
    );
  };

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
                    {format(msg.timestamp, 'p')}
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
            {getNotificationButton()}
            <Button type="submit" size="icon" aria-label="Send message">
              <Send size={20} />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
