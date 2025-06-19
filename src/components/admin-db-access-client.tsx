
'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, ServerCrash } from 'lucide-react';

interface AdminMessage {
  id: string;
  text: string;
  timestamp: Date | null;
}

const MESSAGES_COLLECTION = 'anonymousMessages';

export default function AdminDbAccessClient() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    console.log('[AdminDbAccessClient] Attempting to subscribe to Firestore messages...');

    const q = query(collection(db, MESSAGES_COLLECTION), orderBy('timestamp', 'desc')); // Show newest first

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const newMessages: AdminMessage[] = [];
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
        console.log('[AdminDbAccessClient] Successfully received message snapshot. Messages count:', newMessages.length);
      },
      (err) => {
        console.error('[AdminDbAccessClient] Error fetching messages: ', err);
        setError('Failed to fetch messages. Please check console for details.');
        setIsLoading(false);
      }
    );

    return () => {
      console.log('[AdminDbAccessClient] Unsubscribing from Firestore messages.');
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading messages from database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10">
        <ServerCrash className="h-12 w-12 text-destructive mb-4" />
        <p className="text-lg text-destructive">{error}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Ensure your Firebase project is correctly configured and Firestore rules allow read access.
        </p>
      </div>
    );
  }

  return (
    <Card className="shadow-lg border border-border">
      <CardHeader>
        <CardTitle className="text-2xl">Chat Messages Log</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[60vh] w-full rounded-md border">
          <Table>
            <TableCaption>
              {messages.length === 0 ? 'No messages found.' : `A list of ${messages.length} anonymous chat messages.`}
            </TableCaption>
            <TableHeader className="sticky top-0 bg-muted z-10">
              <TableRow>
                <TableHead className="w-[200px]">Timestamp</TableHead>
                <TableHead>Message Text</TableHead>
                <TableHead className="w-[250px]">Message ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell className="font-medium">
                    {msg.timestamp ? format(msg.timestamp, 'PPpp') : 'No timestamp'}
                  </TableCell>
                  <TableCell className="break-words whitespace-pre-wrap">{msg.text}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{msg.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
