'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Mic, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="border-b">
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
            <Button onClick={() => signOut()}>Sign Out</Button>
          ) : (
            <Button onClick={() => signIn('google')}>Sign In</Button>
          )}
        </div>
      </div>
    </nav>
  );
}