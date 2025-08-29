export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">🍌 Nano Banana</h3>
          <p className="text-gray-300 text-sm mb-4">
            Google Gemini API 이미지 생성 기능을 테스트할 수 있는 웹 애플리케이션
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <div>
              <span className="font-medium">기능:</span>
              <span className="text-gray-300 ml-1">텍스트→이미지, 이미지편집, 다중합성</span>
            </div>
            <div>
              <span className="font-medium">모델:</span>
              <span className="text-gray-300 ml-1">Gemini 2.5 Flash Image Preview</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            ⚠️ API 키가 필요합니다. .env.local 파일에 GOOGLE_API_KEY를 설정하세요.
          </div>
        </div>
      </div>
    </footer>
  )
}