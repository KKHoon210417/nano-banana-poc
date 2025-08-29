import { NextRequest, NextResponse } from 'next/server'
import { editImageWithText } from '@/lib/gemini'

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

    const result = await editImageWithText(prompt, files, apiKey)

    return NextResponse.json({
      success: true,
      result: result
    })
  } catch (error) {
    console.error('Image editing error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to edit image' },
      { status: 500 }
    )
  }
}