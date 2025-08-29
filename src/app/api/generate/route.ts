import { NextRequest, NextResponse } from 'next/server'
import { generateImage } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()
    
    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const result = await generateImage(prompt)

    return NextResponse.json({
      success: true,
      result: result
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}