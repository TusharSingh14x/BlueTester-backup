// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { createClient } from '@/lib/supabase-client';

// export default function Home() {
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const supabase = createClient();
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       if (session) {
//         router.push('/dashboard');
//       } else {
//         router.push('/auth/login');
//       }
//     };

//     checkAuth();
//   }, [router]);

//   return null;
// }

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        router.replace('/dashboard');
      } else {
        router.replace('/auth/login');
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
}
