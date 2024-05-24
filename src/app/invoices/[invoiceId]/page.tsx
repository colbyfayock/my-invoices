import Link from 'next/link';
import { notFound } from 'next/navigation';

import { db } from '@/db';
import { updateStatus } from '@/app/actions';

import Container from '@/components/Container';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

import { AVAILABLE_STATUSES } from '@/data/invoices';

export default async function Invoice({ params }: { params: { invoiceId: string } }) {
  const invoice = await db.query.Invoices.findFirst({
    where: (invoice, { eq }) => eq(invoice.id, parseInt(params.invoiceId)),
  })

  if ( !invoice ) {
    notFound();
  }

  const status = AVAILABLE_STATUSES.find(status => status.id === invoice.status);

  return (
    <Container>

      <p className="text-sm font-semibold text-blue-600 mb-2">
        <Link href="/dashboard">Invoices</Link>
      </p>

      <div className="flex justify-between items-center w-full mb-8">
        <div>
          <h2 className="flex items-center gap-4 text-3xl font-semibold">
            Invoice { invoice.id }
            <Badge
              className={cn(
                "text-sm",
                status?.id === 'open' && 'bg-blue-600',
                status?.id === 'paid' && 'bg-green-600',
                status?.id === 'void' && 'bg-zinc-700',
                status?.id === 'uncollectible' && 'bg-red-600',
              )}
            >
              { status?.label || 'Unknown' }
            </Badge>
          </h2>
          <p className="text-sm">
            { new Date(invoice.createTs).toLocaleDateString() }
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Change Status
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {AVAILABLE_STATUSES.map(status => {
              return (
                <DropdownMenuItem key={status.id} className="p-0">
                  <form action={updateStatus} className="w-full h-full">
                    <input type="hidden" name="id" value={invoice.id} />
                    <input type="hidden" name="status" value={status.id} />
                    <button className="block w-full text-left py-1.5 px-2" type="submit">
                      { status.label }
                    </button>
                  </form>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-3xl mb-3">
        ${ invoice.value }
      </p>

      <p className="text-lg mb-8">
        { invoice.description }
      </p>

      <h2 className="font-bold text-lg mb-4">
        Billing Details
      </h2>

      <ul className="grid gap-2">
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">Invoice ID</strong>
          <span>{ invoice.id }</span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">Invoice Date</strong>
          <span>{ new Date(invoice.createTs).toLocaleDateString() }</span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">Billing Name</strong>
          <span>{ invoice.name }</span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">Billing Email</strong>
          <span>{ invoice.email }</span>
        </li>
      </ul>
    </Container>
  );
}
