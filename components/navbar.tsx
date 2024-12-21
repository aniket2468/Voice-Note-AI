'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Mic, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignIn = async () => {
    const result = await signIn('google', { redirect: false });
    if (result?.ok) {
      router.push('/');
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="border-inherit">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mic className="h-6 w-6" />
          <span className="text-xl font-bold">VoiceNotes AI</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          {session ? (
            <Button onClick={handleSignOut}>Sign Out</Button>
          ) : (
            <Button onClick={handleSignIn}>Sign In</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
