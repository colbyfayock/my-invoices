import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

import Container from '@/components/Container';
import NotificationFeed from './NotificationFeed';

const AuthHeader = async () => {
  const user = await currentUser();
  return (
    <header className="mt-8 mb-12">
      <Container className="flex justify-between items-center gap-4">
        <p className="font-bold">
          <Link href="/dashboard">
            Invoicipedia
          </Link>
        </p>
        <div className="h-8 flex items-center gap-4">
          <NotificationFeed />
          {user && <UserButton />}
        </div>
      </Container>
    </header>
  )
}

export default AuthHeader;