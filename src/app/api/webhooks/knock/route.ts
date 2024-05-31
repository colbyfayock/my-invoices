import { UserJSON, SessionJSON, clerkClient } from "@clerk/nextjs/server";
import { createWebhooksHandler } from "@brianmmdev/clerk-webhooks-handler";
import { Knock } from '@knocklabs/node';

const knock = new Knock(process.env.KNOCK_API_SECRET);

const handler = createWebhooksHandler({
  onUserCreated: async (payload: UserJSON) => {
    await knock.users.identify(payload.id, {
      name: payload.first_name || '',
      email: payload.email_addresses.find(email => email.id === payload.primary_email_address_id)?.email_address,
    });
  },
  onUserUpdated: async (payload: UserJSON) => {
    await knock.users.identify(payload.id, {
      name: payload.first_name || '',
      email: payload.email_addresses.find(email => email.id === payload.primary_email_address_id)?.email_address,
    });
  },
  onSessionCreated: async (payload: SessionJSON) => {
    const user = await clerkClient.users.getUser(payload.user_id);
    await knock.users.identify(payload.user_id, {
      name: user.firstName || '',
      email: user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress,
    });
  }
});

export const POST = handler.POST