'use server';

import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**
 * CREATE INVOICE
 */
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

  redirect('/dashboard/invoices');
}

/**
 * UPDATE INVOICE
 */
export async function updateInvoice(formData: FormData) {
  const id = formData.get('id') as string;
  const customerId = formData.get('customerId') as string;
  const amount = Number(formData.get('amount')) * 100;
  const status = formData.get('status') as 'pending' | 'paid';

  if (!id) throw new Error('ID invoice tidak ditemukan.');

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId},
          amount = ${amount},
          status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update invoice.');
  }

  redirect('/dashboard/invoices');
}

/**
 * DELETE INVOICE
 */
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete invoice.');
  }

  redirect('/dashboard/invoices');
}
