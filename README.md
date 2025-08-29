# 🍌 Nano Banana - Gemini Image Generator

Google Gemini API의 이미지 생성 기능을 테스트할 수 있는 웹 애플리케이션입니다.

## ✨ 주요 기능

- **🎨 텍스트 → 이미지 생성**: 텍스트 프롬프트를 통한 이미지 생성
- **✏️ 이미지 편집**: 기존 이미지에 텍스트 지시사항으로 편집
- **🎭 다중 이미지 합성**: 최대 3개의 이미지를 합성하여 새로운 이미지 생성
- **📥 이미지 다운로드**: 생성된 이미지를 다운로드/클립보드 복사
- **🔑 개인 API 키**: 각 사용자가 자신의 API 키로 안전하게 이용

## 🚀 사용 방법

### 1. 웹사이트 접속
배포된 사이트에 접속하거나 로컬에서 실행하세요.

### 2. Google API 키 설정
1. [Google AI Studio](https://aistudio.google.com/)에 접속
2. "Get API Key" → "Create API Key" 클릭
3. 생성된 키를 웹사이트의 "API 키 설정" 섹션에 입력
4. **API 키는 브라우저에만 저장**되며 서버로 전송되지 않습니다

### 3. 이미지 생성 시작
- 원하는 탭 선택 (텍스트→이미지, 이미지편집, 다중이미지합성)
- 프롬프트 입력 또는 예시 선택
- 이미지 생성 버튼 클릭

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.5 Flash Image Preview
- **Deployment**: Vercel

## 🔧 로컬 개발

```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/nano-banana.git
cd nano-banana

# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

브라우저에서 http://localhost:3000 접속

## 🚀 배포

### Vercel 배포
1. GitHub에 저장소 업로드
2. [Vercel](https://vercel.com)에서 프로젝트 Import
3. 자동 빌드 및 배포 완료

**환경변수 설정 불필요** - 사용자가 직접 API 키를 입력합니다.

## 🔒 보안 및 프라이버시

- ✅ **API 키 로컬 저장**: 브라우저 localStorage에만 저장
- ✅ **서버 전송 안전**: API 키는 요청 시에만 사용되고 저장되지 않음  
- ✅ **개인 관리**: 각 사용자가 자신의 API 키와 사용량을 직접 관리

## ⚠️ 제한사항

- 최대 3개의 입력 이미지 지원
- SynthID 워터마크가 생성된 이미지에 포함
- Google API 할당량에 따른 제한
- 일부 지역에서 사용 제한 가능

## 📝 License

MIT License