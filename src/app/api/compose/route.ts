import { NextRequest, NextResponse } from 'next/server'
import { composeMultipleImages } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const prompt = formData.get('prompt') as string
    const apiKey = formData.get('apiKey') as string
    const files = formData.getAll('images') as File[]

    if (!prompt || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt and at least one image are required' },
        { status: 400 }
      )
    }

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'API key is required' },
        { status: 400 }
      )
    }

    if (files.length > 3) {
      return NextResponse.json(
        { success: false, error: 'Maximum 3 images are allowed' },
        { status: 400 }
      )
    }

    const result = await composeMultipleImages(prompt, files, apiKey)

    return NextResponse.json({
      success: true,
      result: result
    })
  } catch (error) {
    console.error('Multi-image composition error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to compose images' },
      { status: 500 }
    )
  }
}