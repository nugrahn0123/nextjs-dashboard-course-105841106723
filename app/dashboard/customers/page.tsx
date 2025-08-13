import { fetchCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';

// Komponen fallback untuk Suspense
function CustomersTableFallback() {
  return <div>Loading customers...</div>;
}

export default async function Page() {
  const rawCustomers = await fetchCustomers();

  // Map rawCustomers to the expected FormattedCustomersTable[] type
  const customers = rawCustomers.map((customer: any) => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    image_url: customer.image_url,
    total_invoices: customer.total_invoices,
    total_pending: customer.total_pending,
    total_paid: customer.total_paid,
  }));

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-2xl font-semibold text-gray-800`}>
        Pelanggan
      </h1>

      <Suspense fallback={<CustomersTableFallback />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </div>
  );
}