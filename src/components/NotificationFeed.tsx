"use client";

import { useState, useRef } from "react";
import { useUser } from "@clerk/nextjs"; // Use Clerk for user session
import { KnockProvider, KnockFeedProvider, NotificationIconButton, NotificationFeedPopover } from "@knocklabs/react";

import "@knocklabs/react/dist/index.css";

const NotificationFeed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  const { user } = useUser();

  if ( !user ) return null;

  return (
    <KnockProvider apiKey={String(process.env.NEXT_PUBLIC_KNOCK_API_KEY)} userId={user.id}>
      <KnockFeedProvider feedId={String(process.env.NEXT_PUBLIC_KNOCK_FEED_ID)}>
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
}

export default NotificationFeed;