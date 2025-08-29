'use client'

import { useState } from 'react'
import ApiQuotaInfo from './ApiQuotaInfo'

export default function TextToImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
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
    '햇살이 비치는 평화로운 산속 호수',
    '미래의 도시 풍경, 네온사인과 플라잉카',
    '귀여운 강아지가 공원에서 뛰어노는 모습',
    '빈티지 스타일의 커피숍 인테리어',
    '우주에서 본 지구의 모습, 별들과 함께'
  ]

  return (
    <div className="space-y-6">
      <ApiQuotaInfo />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          이미지 생성 프롬프트
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="생성하고 싶은 이미지를 자세히 설명해주세요..."
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">예시 프롬프트:</p>
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
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        {loading ? '생성 중...' : '이미지 생성'}
      </button>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">결과:</h3>
          
          {result.type === 'image' ? (
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <img 
                  src={result.content} 
                  alt="Generated image"
                  className="w-full max-w-2xl mx-auto"
                />
              </div>
              <div className="text-sm text-gray-500 text-center">
                생성된 이미지 (SynthID 워터마크 포함)
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