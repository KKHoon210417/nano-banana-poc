'use client'

import { useState, useEffect } from 'react'
import { apiKeyManager } from '@/lib/apiKeyManager'

interface ApiKeySetupProps {
  onApiKeySet?: () => void;
}

export default function ApiKeySetup({ onApiKeySet }: ApiKeySetupProps) {
  const [apiKey, setApiKey] = useState('')
  const [hasApiKey, setHasApiKey] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const currentKey = apiKeyManager.getApiKey()
    if (currentKey) {
      setApiKey(currentKey)
      setHasApiKey(true)
    }
  }, [])

  const handleSaveApiKey = () => {
    const validation = apiKeyManager.validateApiKey(apiKey)
    
    if (!validation.valid) {
      setError(validation.message)
      setSuccess('')
      return
    }

    apiKeyManager.setApiKey(apiKey)
    setHasApiKey(true)
    setError('')
    setSuccess('API 키가 저장되었습니다!')
    
    if (onApiKeySet) {
      onApiKeySet()
    }

    setTimeout(() => setSuccess(''), 3000)
  }

  const handleRemoveApiKey = () => {
    if (confirm('API 키를 삭제하시겠습니까?')) {
      apiKeyManager.removeApiKey()
      setApiKey('')
      setHasApiKey(false)
      setError('')
      setSuccess('API 키가 삭제되었습니다.')
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key
    return key.substring(0, 8) + '••••••••••••••••••••••••••••••••'
  }

  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-blue-800">
            Google API 키 설정
          </h3>
          
          {!hasApiKey ? (
            <div className="mt-2">
              <p className="text-sm text-blue-700 mb-3">
                이미지 생성을 위해 Google API 키가 필요합니다. API 키는 브라우저에만 저장되며 서버로 전송되지 않습니다.
              </p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-blue-800 mb-1">
                    Google API Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => {
                        setApiKey(e.target.value)
                        setError('')
                      }}
                      placeholder="AIza..."
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      {showKey ? '숨김' : '표시'}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSaveApiKey}
                  disabled={!apiKey.trim()}
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-sm font-medium rounded-md transition-colors"
                >
                  API 키 저장
                </button>
              </div>

              <div className="mt-3 text-xs text-blue-600">
                <p><strong>API 키 발급 방법:</strong></p>
                <ol className="mt-1 list-decimal list-inside space-y-1">
                  <li><a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Google AI Studio</a>에 접속</li>
                  <li>"Get API Key" 클릭</li>
                  <li>"Create API Key" 선택</li>
                  <li>생성된 키를 복사하여 위에 입력</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">
                    ✅ API 키가 설정되었습니다
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {showKey ? apiKey : maskApiKey(apiKey)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
                  >
                    {showKey ? '숨김' : '표시'}
                  </button>
                  <button
                    onClick={handleRemoveApiKey}
                    className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-2 text-sm text-red-700 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-2 text-sm text-green-700 bg-green-50 p-2 rounded">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}