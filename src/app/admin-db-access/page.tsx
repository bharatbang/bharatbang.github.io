
'use client';

import { useState, type FormEvent } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, ShieldAlert, LogIn } from 'lucide-react';
import AdminDbAccessClient from '@/components/admin-db-access-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminDbAccessPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  };

  const pageMetadata: Metadata = {
    title: 'Admin: View Chat Messages - Bharat Bang',
    description: 'View messages from the anonymous chat stored in Firestore.',
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="py-6 animated-header-background text-primary-foreground shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold tracking-tight">Admin Login</h1>
              <Link href="/" legacyBehavior>
                <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8 flex items-center justify-center">
          <Card className="w-full max-w-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Authentication Required</CardTitle>
              <CardDescription>Enter credentials to access the admin panel.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="admin"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="py-6 animated-header-background text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">Admin: View Chat Messages</h1>
            <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" onClick={() => setIsAuthenticated(false)}>
              <ArrowLeft size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
        <Alert variant="destructive" className="mb-6 bg-destructive/10 border-destructive/50 text-destructive">
          <ShieldAlert className="h-5 w-5" />
          <AlertTitle className="font-semibold">Security Warning</AlertTitle>
          <AlertDescription>
            This page directly accesses and displays database content. For a production application,
            robust authentication and authorization mechanisms are in place to protect sensitive data.
            This is a simplified view for demonstration purposes.
          </AlertDescription>
        </Alert>
        <AdminDbAccessClient />
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bharat Bang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
