'use client'

import { useState } from 'react'
import TextToImageGenerator from '@/components/TextToImageGenerator'
import ImageEditor from '@/components/ImageEditor'
import MultiImageComposer from '@/components/MultiImageComposer'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeTab, setActiveTab] = useState('text-to-image')

  const tabs = [
    { id: 'text-to-image', label: '텍스트 → 이미지', component: <TextToImageGenerator /> },
    { id: 'image-edit', label: '이미지 편집', component: <ImageEditor /> },
    { id: 'multi-image', label: '다중 이미지 합성', component: <MultiImageComposer /> },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold gradient-text mb-4">🍌 Nano Banana</h1>
          <p className="text-xl text-gray-600 mb-2">Gemini API 이미지 생성 기능 테스트</p>
          <p className="text-sm text-gray-500">Google의 최신 Gemini 2.5 Flash Image Preview 모델을 활용한 이미지 생성 도구</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden card-shadow card-hover">
          <div className="border-b border-gray-100">
            <nav className="flex flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-sm font-medium border-b-3 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-700 bg-gradient-to-r from-purple-50 to-indigo-50 font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
            {tabs.find(tab => tab.id === activeTab)?.component}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}