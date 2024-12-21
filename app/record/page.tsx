'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Trophy, Flame, Lock } from 'lucide-react'
import Link from 'next/link'
import { transcribeAudio } from './action'

export default function RecordPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [wordsPerMinute, setWordsPerMinute] = useState<number | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isRecording) {
        e.preventDefault()
        setIsRecording(true)
        startTimeRef.current = Date.now()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isRecording) {
        e.preventDefault()
        setIsRecording(false)
        if (startTimeRef.current) {
          const duration = (Date.now() - startTimeRef.current) / 1000 / 60 // minutes
          const words = transcript.split(' ').length
          setWordsPerMinute(Math.round(words / duration))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isRecording, transcript])

  useEffect(() => {
    if (isRecording) {
      startRecording()
    } else {
      stopRecording()
    }
  }, [isRecording])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const result = await transcribeAudio(audioBlob)
        if (result.text) {
          setTranscript(prev => prev + ' ' + result.text)
        }
      }

      mediaRecorder.start(5000) // Capture in 5-second intervals
    } catch (err) {
      console.error('Error accessing microphone:', err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
  }

  return (
    <div className="lg:h-screen lg:overflow-hidden flex">

      {/* Main content with the background box */}
      <main className="flex-1 p-8 bg-[#c0c0c057] shadow-2xl">
        <div className="max-w-2xl mx-auto min-h-full">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">👋</span>
              <h2 className="text-xl font-semibold">HI THERE!</h2>
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              Get Keyboardless with Voice Note
            </h3>
          </div>

          <div className="min-h-[200px] h-full relative">
            {transcript ? (
              <p className="whitespace-pre-wrap">{transcript}</p>
            ) : (
              <div className="absolute left-1/2 bottom-4 -translate-x-1/2">
                {isRecording ? (
                  <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Recording...
                  </div>
                ) : (
                  <div className="bg-black text-white px-4 py-2 rounded-full dark:bg-black dark:text-white">
                    Hold down the spacebar and start speaking
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Sidebar outside the background box */}
      <aside className="w-72 p-6">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-orange-500" />
              <h3 className="font-semibold">YOUR SPEED</h3>
            </div>
            <div className="text-3xl font-bold mb-2">
              {wordsPerMinute || '---'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Words per min (WPM)</div>
            {!wordsPerMinute && (
              <div className="text-xs text-gray-500 dark:text-gray-200 mt-2">
                Start speaking to see your stats
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold">FASTEST OF THE DAY</h3>
            </div>
            <div className="flex items-center justify-center h-24">
              <div className="flex flex-col items-center gap-2 relative group cursor-pointer">
                <Lock className="w-6 h-6 text-gray-400 dark:text-gray-300"/>
                <div className="text-sm text-center text-gray-600 dark:text-gray-300">
                  Sign in to get on<br />the leaderboard
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

    </div>
  )
}
