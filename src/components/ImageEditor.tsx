'use client'

import { useState } from 'react'
import ImageActions from './ImageActions'
import ApiKeySetup from './ApiKeySetup'
import { apiKeyManager } from '@/lib/apiKeyManager'

export default function ImageEditor() {
  const [prompt, setPrompt] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(files)

    const previews = files.map(file => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  const handleEdit = async () => {
    if (!prompt.trim() || images.length === 0) return

    // API 키 확인
    const apiKey = apiKeyManager.getApiKey()
    if (!apiKey) {
      setResult({ type: 'error', content: 'API 키를 먼저 설정해주세요.' })
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('prompt', prompt)
      formData.append('apiKey', apiKey)
      images.forEach(image => {
        formData.append('images', image)
      })

      const response = await fetch('/api/edit-image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        setResult(data.result)
      } else {
        setResult({ type: 'error', content: data.error })
      }
    } catch (error) {
      setResult({ type: 'error', content: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  const examplePrompts = [
    '이 이미지의 배경을 우주로 바꿔주세요',
    '이미지에 무지개를 추가해주세요',
    '이 사진을 만화 스타일로 변환해주세요',
    '이미지에 눈이 내리는 효과를 추가해주세요',
    '이 이미지의 색감을 빈티지 스타일로 바꿔주세요'
  ]

  return (
    <div className="space-y-6">
      <ApiKeySetup />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          이미지 업로드
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {imagePreviews.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          편집 지시사항
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="이미지를 어떻게 편집하고 싶은지 설명해주세요..."
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">예시 편집 지시사항:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleEdit}
        disabled={loading || !prompt.trim() || images.length === 0}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        {loading ? '편집 중...' : '이미지 편집'}
      </button>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">결과:</h3>
          
          {result.type === 'image' ? (
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <img 
                  src={result.content} 
                  alt="Edited image"
                  className="w-full max-w-2xl mx-auto"
                />
              </div>
              <ImageActions 
                imageUrl={result.content}
                altText="Edited image"
                filename="image-edit"
              />
              <div className="text-sm text-gray-500 text-center">
                편집된 이미지 (SynthID 워터마크 포함)
              </div>
            </div>
          ) : result.type === 'text' ? (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="text-sm text-blue-700">
                <strong>텍스트 응답:</strong>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-blue-800 mt-2">
                {result.content}
              </pre>
            </div>
          ) : result.type === 'error' ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <pre className="whitespace-pre-wrap text-sm text-red-700">
                Error: {result.content}
              </pre>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-md">
              <pre className="whitespace-pre-wrap text-sm">
                {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
          
          {(result.content && result.content.includes('할당량이 초과')) && (
            <div className="mt-2 text-sm text-amber-600">
              💡 팁: 약 1분 후에 다시 시도하시거나, Google AI Studio에서 결제 계정을 설정하여 할당량을 늘릴 수 있습니다.
            </div>
          )}
        </div>
      )}
    </div>
  )
}