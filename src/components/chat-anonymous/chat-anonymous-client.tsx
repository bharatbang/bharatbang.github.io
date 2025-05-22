
'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bell, BellRing, BellOff, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';

interface Message {
  id: string;
  text: string;
  timestamp: Date | null; // Firestore timestamp will be Date, null initially
}

type NotificationPermission = 'default' | 'granted' | 'denied';

const MESSAGES_COLLECTION = 'anonymousMessages';

export default function ChatAnonymousClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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

  // Subscribe to Firestore messages
  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, MESSAGES_COLLECTION), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const newMessages: Message[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          newMessages.push({
            id: doc.id,
            text: data.text,
            timestamp: data.timestamp ? (data.timestamp as Timestamp).toDate() : null,
          });
        });
        setMessages(newMessages);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching messages: ', error);
        setIsLoading(false);
        // Optionally, show an error toast to the user
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
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
  };

  const showBrowserNotification = (title: string, body: string) => {
    if (notificationPermission === 'granted' && userWantsNotifications && document.hidden) {
      new Notification(title, { body });
    }
  };

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const messageText = inputValue.trim();
    setInputValue(''); // Clear input immediately

    try {
      await addDoc(collection(db, MESSAGES_COLLECTION), {
        text: messageText,
        timestamp: serverTimestamp(),
      });
      // Notification for sent message is handled by onSnapshot,
      // but if you want to notify for your own messages differently, you could add logic here.
      // For now, all new messages (including own) will trigger a notification if conditions are met.
    } catch (error) {
      console.error('Error sending message: ', error);
      // Optionally, inform the user that the message failed to send
    }
  };

  // Effect to show notification for new incoming messages
  useEffect(() => {
    if (messages.length > 0 && !isLoading) {
      const latestMessage = messages[messages.length - 1];
      // A simple way to avoid notifying for historical messages on load or for own messages immediately after sending
      // This assumes `latestMessage.timestamp` is fresh. More robust would be to check if the message is "new" since last check.
      if (latestMessage.text && latestMessage.timestamp && (new Date().getTime() - latestMessage.timestamp.getTime() < 5000) /* 5 secs */ ) {
         showBrowserNotification('New Anonymous Message', latestMessage.text);
      }
    }
  }, [messages, isLoading, notificationPermission, userWantsNotifications]); // Added notificationPermission and userWantsNotifications


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
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2 text-muted-foreground">Loading messages...</p>
              </div>
            )}
            {!isLoading && messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No messages yet. Start chatting!</p>
              </div>
            )}
            {!isLoading && messages.map((msg) => (
              <div key={msg.id} className="w-full"> {/* Changed: More neutral container */}
                <div className="bg-card text-card-foreground p-3 rounded-lg shadow max-w-md break-words inline-block"> {/* Changed: Neutral bubble style */}
                  <p className="text-sm">{msg.text}</p>
                  {msg.timestamp && (
                    <p className="text-xs text-muted-foreground mt-1 text-right"> {/* Changed: Use muted-foreground for timestamp */}
                      {format(msg.timestamp, 'p')}
                    </p>
                  )}
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
            <Button type="submit" size="icon" aria-label="Send message" disabled={isLoading || inputValue.trim() === ''}>
              <Send size={20} />
            </Button>
          </form>
        </CardContent>
      </Card>
       <p className="text-xs text-muted-foreground text-center mt-2">
        Messages are temporary and will be automatically deleted after a short period (e.g., 1 hour). This needs to be configured in Firebase (TTL on 'anonymousMessages' collection's 'timestamp' field).
      </p>
    </div>
  );
}

