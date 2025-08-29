import { downloadImage, copyImageToClipboard } from '@/lib/download'

interface ImageActionsProps {
  imageUrl: string
  altText: string
  filename?: string
}

export default function ImageActions({ imageUrl, altText, filename = 'nano-banana-image' }: ImageActionsProps) {
  const handleDownload = () => {
    downloadImage(imageUrl, filename)
  }

  const handleCopyToClipboard = () => {
    copyImageToClipboard(imageUrl)
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(imageUrl).then(() => {
      alert('이미지 URL이 클립보드에 복사되었습니다!')
    }).catch(err => {
      console.error('URL 복사 실패:', err)
      alert('URL 복사에 실패했습니다.')
    })
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        다운로드
      </button>
      
      <button
        onClick={handleCopyToClipboard}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        클립보드 복사
      </button>
      
      <button
        onClick={handleCopyUrl}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        URL 복사
      </button>
    </div>
  )
}