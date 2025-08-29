export interface GeneratedImage {
  id: string
  url: string
  prompt: string
  createdAt: Date
}

export interface ImageGenerationOptions {
  model?: string
  prompt: string
  images?: File[]
}

export interface GenerationResult {
  success: boolean
  imageUrl?: string
  error?: string
}