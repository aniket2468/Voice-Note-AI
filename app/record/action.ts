'use server'

export async function transcribeAudio(audioBlob: Blob) {
  try {
    const formData = new FormData()
    formData.append('file', audioBlob, 'audio.webm')
    formData.append('model', 'whisper-1')

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Transcription failed')
    }

    const data = await response.json()
    return { text: data.text }
  } catch (error) {
    console.error('Transcription error:', error)
    return { error: 'Failed to transcribe audio' }
  }
}
