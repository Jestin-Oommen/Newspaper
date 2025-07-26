'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NewsForm from "../../components/NewsForm"

export default function ProtectedNewsFormPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || (session.user.role !== 'admin' && session.user.role !== 'editor')) {
      router.replace('/login'); // Or redirect to homepage or error page
    } else {
      setAuthorized(true);
    }
  }, [session, status, router]);

  if (!authorized) {
    return <p className="text-center mt-10">Checking permissions...</p>;
  }

  return <NewsForm/>;
}
