import React, { useEffect, useState } from "react";
import { fetchUserActivity } from "../api";
import type { UserActivity } from "../types/user";

// Test component

type handledError = Error|TypeError;

export const Test = () => {
  const [userActivity, setUserActivity] = useState<UserActivity>();
  const [error, setError] = useState<handledError>();
  const [loading, setLoading] = useState<boolean>(true);
  const TEST_USER_ID = 2;

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const activity = await fetchUserActivity(TEST_USER_ID, {
          signal: controller.signal,
        });

        setUserActivity(activity);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err as handledError);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <pre>{`${error.name} ${error.message}`}</pre>
  }

  return <code><pre>{JSON.stringify(userActivity, null, 2)}</pre></code>;
};
