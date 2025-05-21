
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Define the shape of the expected errors for specific fields
interface FieldErrors {
  name?: string[];
  mobile?: string[];
  [key: string]: string[] | undefined; // Allow other keys for general errors
}

export interface FormState {
  message: string | null;
  errors?: FieldErrors; // Make errors more specific
}


const ConnectMeSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(100, {message: 'Name must be 100 characters or less.'}),
  mobile: z.string()
    .min(10, { message: 'Mobile number must be at least 10 digits.' })
    .max(15, {message: 'Mobile number must be 15 digits or less.'})
    // Basic regex for common mobile formats, allowing optional + and country code.
    // Adjust this regex based on specific needs.
    .regex(/^(\+\d{1,3}[- ]?)?\d{10,14}$/, { message: 'Invalid mobile number format. Please include country code if applicable (e.g., +91XXXXXXXXXX or XXXXXXXXXX).' }),
});

export async function submitConnectMeForm(prevState: FormState | null, formData: FormData): Promise<FormState> {
  const rawFormData = {
    name: formData.get('name'),
    mobile: formData.get('mobile'),
  };

  const validatedFields = ConnectMeSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as FieldErrors,
      message: 'Validation failed. Please check the fields.',
    };
  }

  const { name, mobile } = validatedFields.data;

  try {
    await addDoc(collection(db, 'connections'), {
      name,
      mobile,
      createdAt: serverTimestamp(),
      status: 'New', // Default status
    });
    return { message: 'Thank you for connecting! I will get back to you soon.', errors: {} };
  } catch (error) {
    console.error('Error adding document to Firestore: ', error);
    // It's good practice to not expose detailed error messages to the client.
    return { message: 'Connection failed. Server error, please try again later.', errors: {} };
  }
}
