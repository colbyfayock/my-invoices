import Link from 'next/link';

import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import Container from '@/components/Container';
import { Label } from '@/components/Label';

import { createInvoice } from '@/app/actions';
import { Button } from '@/components/Button';

export default async function InvoiceNew() {
  return (
    <Container>

      <p className="text-sm font-semibold hover:text-blue-600 mb-2">
        <Link href="/dashboard">Invoices</Link>
      </p>

      <h2 className="flex items-center gap-4 text-3xl font-semibold mb-12">
        Create a New Invoice
      </h2>

      <form className="grid gap-4 max-w-xs" action={createInvoice}>
        <div>
          <Label htmlFor="name" className="block mb-2">Billing Name</Label>
          <Input id="name" name="name" type="text" />
        </div>
        <div>
          <Label htmlFor="email" className="block mb-2">Billing Email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div>
          <Label htmlFor="value" className="block mb-2">Value</Label>
          <Input id="value" name="value" type="text" />
        </div>
        <div>
          <Label htmlFor="description" className="block mb-2">Description</Label>
          <Textarea id="description" name="description" />
        </div>
        <Button>Submit</Button>
      </form>

    </Container>
  );
}
