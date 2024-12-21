import { Button } from '@/components/ui/button';
import { Mic, FileAudio, Brain } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center space-y-12 text-center gradient-background">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold sm:text-6xl">
          Transform Your Voice Notes with AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Record, transcribe, and analyze your voice notes with the power of AI. Get insights, summaries, and organize your thoughts effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <div className="flex flex-col items-center space-y-4 p-6 rounded-lg border-inherit shadow-2xl backdrop-blur">
          <Mic className="h-12 w-12" />
          <h2 className="text-xl font-semibold">Record</h2>
          <p className="text-muted-foreground">Capture your thoughts with high-quality voice recording</p>
        </div>

        <div className="flex flex-col items-center space-y-4 p-6 rounded-lg border-inherit shadow-2xl backdrop-blur">
          <FileAudio className="h-12 w-12" />
          <h2 className="text-xl font-semibold">Transcribe</h2>
          <p className="text-muted-foreground">Get accurate transcriptions powered by AI technology</p>
        </div>

        <div className="flex flex-col items-center space-y-4 p-6 rounded-lg border-inherit shadow-2xl backdrop-blur">
          <Brain className="h-12 w-12" />
          <h2 className="text-xl font-semibold">Analyze</h2>
          <p className="text-muted-foreground">Generate insights and summaries from your voice notes</p>
        </div>
      </div>

      <Link href="/record">
        <Button size="lg" className="text-lg">
          Get Started
        </Button>
      </Link>
    </div>
  );
}