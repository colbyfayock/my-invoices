import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtected = createRouteMatcher([
  '/dashboard',
  '/invoices/:invoiceId',
  '/invoices/:invoiceId/payment',
  '/invoices/new',
]);

export default clerkMiddleware((auth, request) => {
  if ( isProtected(request) ) {
    auth().protect();
  }
});

export const config = {
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};