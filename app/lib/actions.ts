// app/lib/actions.ts
'use server';

import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function createInvoice(formData: FormData) {
  const customerId = formData.get('customerId') as string;
  const amount = Number(formData.get('amount')) * 100; // simpan dalam cents
  const status = formData.get('status') as 'pending' | 'paid';

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amount}, ${status}, NOW())
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create invoice.');
  }

  // setelah berhasil simpan, kembali ke dashboard invoices
  redirect('/dashboard/invoices');
}
