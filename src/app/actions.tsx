'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { Invoices } from '@/db/schema';
import { db } from '@/db';


/**
 * createInvoice
 */

export async function createInvoice(formData: FormData) {
  const user = await currentUser()
  
  if (!user) throw new Error('User not found');

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const description = formData.get('description') as string;
  const value = formData.get('value') as string;

  const results = await db.insert(Invoices)
    .values({
      user_id: user.id,
      name,
      email,
      description,
      value,
      status: "open",
    }).returning({
      id: Invoices.id
    });

  const invoicePath = `/invoices/${results[0].id}`;

  redirect(invoicePath);
}

/**
 * updateStatus
 */

export async function updateStatus(formData: FormData) {
  const user = await currentUser()
  
  if (!user) throw new Error('User not found');

  const id = formData.get('id') as string;
  const status = formData.get('status') as string;

  await db.update(Invoices)
    .set({ status })
    .where(eq(Invoices.id, parseInt(id)))
    .returning({
      id: Invoices.id,
      name: Invoices.name,
      email: Invoices.email,
      value: Invoices.value,
      status: Invoices.status,
    });

  revalidatePath(`/invoices/[invoiceId]`, 'page');
}