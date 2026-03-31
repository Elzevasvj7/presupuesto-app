'use client' // Error boundaries must be Client Components
 
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
 
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
    const supabase = createClient();
      const router = useRouter();
    
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => unstable_retry()
        }
      >
        Try again
      </button>
      <button
        onClick={
          // Attempt to recover by signing out and redirecting to the home page
          () => handleSignOut()
        }
      >
        Sign out
      </button>
    </div>
  )
}