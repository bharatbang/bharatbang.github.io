
'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitConnectMeForm, type FormState } from '@/app/actions/connectMeActions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Import cn utility

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(100, {message: 'Name must be 100 characters or less.'}),
  mobile: z.string()
    .min(10, { message: 'Mobile number must be at least 10 digits.' })
    .max(15, {message: 'Mobile number must be 15 digits or less.'})
    .regex(/^(\+\d{1,3}[- ]?)?\d{10,14}$/, { message: 'Invalid mobile number format. (e.g., +91XXXXXXXXXX or XXXXXXXXXX)' }),
});

type FormDataSchema = z.infer<typeof FormSchema>;

const initialState: FormState = {
  message: null,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? 'Submitting...' : 'Connect'}
    </Button>
  );
}

export default function ConnectMeForm() {
  const [state, formAction] = useFormState(submitConnectMeForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit, 
    formState: { errors: clientErrors, isValid, isDirty }, 
    reset: resetClientForm, 
  } = useForm<FormDataSchema>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur', 
  });

  useEffect(() => {
    if (state?.message) {
      if (state.errors && Object.keys(state.errors).length > 0) {
        toast({
          title: 'Submission Error',
          description: state.message || 'Please check the highlighted fields.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success!',
          description: state.message,
          variant: 'default',
        });
        formRef.current?.reset(); 
        resetClientForm(); 
      }
    }
  }, [state, toast, resetClientForm]);
  
  const getCombinedError = (fieldName: keyof FormDataSchema): string | undefined => {
    if (state?.errors && state.errors[fieldName] && state.errors[fieldName]![0]) {
      return state.errors[fieldName]![0];
    }
    if (clientErrors[fieldName]) {
      return clientErrors[fieldName]?.message;
    }
    return undefined;
  };

  return (
    <Card className="w-full max-w-md mx-auto my-10 shadow-xl border-2 border-primary/50 rounded-xl">
      <CardHeader className="bg-primary/10 rounded-t-lg py-6">
        <CardTitle className="text-3xl font-bold text-center text-primary">Connect With Me</CardTitle>
        <CardDescription className="text-center text-foreground/80 pt-1">
          Let's discuss your project or query. Drop your details!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 sm:p-8">
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-foreground/90">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., Ada Lovelace"
              {...register('name')}
              className={cn(
                getCombinedError('name') 
                  ? 'border-destructive focus-visible:ring-destructive' 
                  : 'connect-me-input-gradient-border focus-visible:ring-ring'
              )}
              aria-invalid={!!getCombinedError('name')}
            />
            {getCombinedError('name') && <p className="text-xs text-destructive pt-1">{getCombinedError('name')}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="mobile" className="text-sm font-medium text-foreground/90">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="e.g., +91 9876543210"
              {...register('mobile')}
              className={cn(
                getCombinedError('mobile') 
                  ? 'border-destructive focus-visible:ring-destructive' 
                  : 'connect-me-input-gradient-border focus-visible:ring-ring'
              )}
              aria-invalid={!!getCombinedError('mobile')}
            />
            {getCombinedError('mobile') && <p className="text-xs text-destructive pt-1">{getCombinedError('mobile')}</p>}
          </div>
          
          <SubmitButton />

          {state?.message && (!state.errors || Object.keys(state.errors).length === 0) && (
            <p className="text-sm text-green-600 text-center pt-2">{state.message}</p>
          )}
          {state?.message && state.errors && Object.keys(state.errors).length > 0 && (
             <p className="text-sm text-destructive text-center pt-2">{state.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
