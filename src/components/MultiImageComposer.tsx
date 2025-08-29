'use client'

import { useState } from 'react'

export default function MultiImageComposer() {
  const [prompt, setPrompt] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 3) {
      alert('최대 3개의 이미지만 업로드할 수 있습니다.')
      return
    }
    
    setImages(files)
    const previews = files.map(file => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  const handleCompose = async () => {
    if (!prompt.trim() || images.length === 0) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('prompt', prompt)
      images.forEach(image => {
        formData.append('images', image)
      })

      const response = await fetch('/api/compose', {
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
    '이 이미지들을 하나의 콜라주로 만들어주세요',
    '이 이미지들을 모두 포함한 판타지 풍경을 만들어주세요',
    '이 이미지들의 요소들을 결합해서 새로운 캐릭터를 만들어주세요',
    '이 이미지들을 사용해서 미래적인 도시를 만들어주세요',
    '이 이미지들을 조화롭게 배치한 포스터를 만들어주세요'
  ]

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          이미지 업로드 (최대 3개)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
        />
        <p className="text-xs text-gray-500 mt-1">최대 3개의 이미지를 선택할 수 있습니다.</p>
        
        {imagePreviews.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              선택된 이미지 ({images.length}/3)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          합성 지시사항
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={4}
          placeholder="이미지들을 어떻게 합성하고 싶은지 설명해주세요..."
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">예시 합성 지시사항:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="text-left p-2 text-sm bg-purple-50 hover:bg-purple-100 rounded border transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleCompose}
        disabled={loading || !prompt.trim() || images.length === 0}
        className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        {loading ? '합성 중...' : '이미지 합성'}
      </button>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">결과:</h3>
          
          {result.type === 'image' ? (
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <img 
                  src={result.content} 
                  alt="Composed image"
                  className="w-full max-w-2xl mx-auto"
                />
              </div>
              <div className="text-sm text-gray-500 text-center">
                합성된 이미지 (SynthID 워터마크 포함)
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