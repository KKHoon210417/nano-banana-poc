export default function ApiQuotaInfo() {
  return (
    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">
            API 할당량 안내
          </h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>무료 티어 제한사항:</p>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>분당 요청 수 제한</li>
              <li>일일 요청 수 제한</li>
              <li>토큰 사용량 제한</li>
            </ul>
            <p className="mt-2">
              <strong>429 에러 발생 시:</strong> 약 1분 대기 후 재시도하세요.
            </p>
            <p className="mt-1">
              <a 
                href="https://ai.google.dev/gemini-api/docs/rate-limits" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-800 underline hover:text-amber-900"
              >
                자세한 할당량 정보 확인 →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}