export function downloadImage(imageUrl: string, filename: string = 'generated-image') {
  // base64 데이터 URL에서 실제 이미지 데이터 추출
  const link = document.createElement('a')
  link.href = imageUrl
  
  // 파일명에 타임스탬프 추가
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
  const extension = imageUrl.includes('image/png') ? 'png' : 'jpg'
  link.download = `${filename}-${timestamp}.${extension}`
  
  // 다운로드 트리거
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function copyImageToClipboard(imageUrl: string) {
  // base64 데이터를 blob으로 변환
  fetch(imageUrl)
    .then(res => res.blob())
    .then(blob => {
      const item = new ClipboardItem({ [blob.type]: blob })
      return navigator.clipboard.write([item])
    })
    .then(() => {
      alert('이미지가 클립보드에 복사되었습니다!')
    })
    .catch(err => {
      console.error('클립보드 복사 실패:', err)
      alert('클립보드 복사에 실패했습니다.')
    })
}