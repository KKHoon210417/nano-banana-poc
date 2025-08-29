# 🍌 Nano Banana - Gemini Image Generator

Google Gemini API의 이미지 생성 기능을 테스트할 수 있는 웹 애플리케이션입니다.

## 기능

- **텍스트 → 이미지 생성**: 텍스트 프롬프트를 통한 이미지 생성
- **이미지 편집**: 기존 이미지에 텍스트 지시사항으로 편집
- **다중 이미지 합성**: 최대 3개의 이미지를 합성하여 새로운 이미지 생성

## 기술 스택

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.5 Flash Image Preview
- **Deployment**: Vercel

## 설치 및 실행

1. 의존성 설치:
```bash
yarn install
```

2. 환경 변수 설정:
`.env.local` 파일을 생성하고 Google API 키를 설정하세요:
```
GOOGLE_API_KEY=your_gemini_api_key_here
```

3. 개발 서버 실행:
```bash
yarn dev
```

4. 브라우저에서 http://localhost:3000 접속

## Google API 키 발급

1. [Google AI Studio](https://aistudio.google.com/)에 접속
2. API 키 생성
3. `.env.local` 파일에 키 설정

## Vercel 배포

1. Vercel CLI 설치:
```bash
npm i -g vercel
```

2. 프로젝트 배포:
```bash
vercel
```

3. Vercel 대시보드에서 환경 변수 `GOOGLE_API_KEY` 설정

## 주요 특징

- 반응형 디자인으로 모바일/데스크톱 지원
- 직관적인 탭 기반 인터페이스
- 예시 프롬프트 제공
- 실시간 이미지 미리보기
- 에러 핸들링 및 로딩 상태 표시

## API 제한사항

- 최대 3개의 입력 이미지 지원
- SynthID 워터마크가 생성된 이미지에 포함
- 일부 지역에서 사용 제한 가능

## License

MIT