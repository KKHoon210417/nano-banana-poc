import { GoogleGenerativeAI } from "@google/generative-ai";

function createModel(apiKey: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash-image-preview",
  });
}

export async function generateImage(prompt: string, apiKey: string) {
  try {
    const model = createModel(apiKey);
    const result = await model.generateContent([prompt]);

    // 이미지 데이터 추출
    const response = await result.response;
    const candidates = response.candidates;

    if (!candidates || candidates.length === 0) {
      throw new Error("응답에서 이미지를 찾을 수 없습니다.");
    }

    const content = candidates[0].content;
    const parts = content.parts;

    // inline_data가 있는 파트 찾기
    const imageParts = parts.filter((part) => part.inlineData);

    if (imageParts.length === 0) {
      // 텍스트 응답만 있는 경우
      const textParts = parts.filter((part) => part.text);
      if (textParts.length > 0) {
        return {
          type: "text",
          content: textParts.map((part) => part.text).join(""),
        };
      }
      throw new Error("이미지나 텍스트 응답을 찾을 수 없습니다.");
    }

    // 첫 번째 이미지 반환
    const imageData = imageParts[0].inlineData;
    return {
      type: "image",
      content: `data:${imageData?.mimeType};base64,${imageData?.data}`,
      mimeType: imageData?.mimeType,
    };
  } catch (error: any) {
    console.error("Error generating image:", error);

    if (error.status === 429) {
      throw new Error(
        "API 할당량이 초과되었습니다. 잠시 후 다시 시도해주세요. (약 1분 대기 후 재시도)"
      );
    } else if (error.status === 400) {
      throw new Error("잘못된 요청입니다. 프롬프트를 확인해주세요.");
    } else if (error.status === 403) {
      throw new Error("API 키가 유효하지 않거나 권한이 없습니다.");
    } else if (error.status === 404) {
      throw new Error("요청한 모델을 찾을 수 없습니다.");
    }

    throw new Error(`이미지 생성 실패: ${error.message || "알 수 없는 오류"}`);
  }
}

export async function editImageWithText(prompt: string, images: File[], apiKey: string) {
  try {
    const imagePromises = images.map(async (file) => {
      const bytes = await file.arrayBuffer();
      return {
        inlineData: {
          data: Buffer.from(bytes).toString("base64"),
          mimeType: file.type,
        },
      };
    });

    const imageData = await Promise.all(imagePromises);
    const parts = [...imageData, prompt];

    const model = createModel(apiKey);
    const result = await model.generateContent(parts);

    // 이미지 데이터 추출
    const response = await result.response;
    const candidates = response.candidates;

    if (!candidates || candidates.length === 0) {
      throw new Error("응답에서 결과를 찾을 수 없습니다.");
    }

    const content = candidates[0].content;
    const parts_result = content.parts;

    // inline_data가 있는 파트 찾기
    const imageParts = parts_result.filter((part) => part.inlineData);

    if (imageParts.length === 0) {
      // 텍스트 응답만 있는 경우
      const textParts = parts_result.filter((part) => part.text);
      if (textParts.length > 0) {
        return {
          type: "text",
          content: textParts.map((part) => part.text).join(""),
        };
      }
      throw new Error("이미지나 텍스트 응답을 찾을 수 없습니다.");
    }

    // 첫 번째 이미지 반환
    const imageDataResult = imageParts[0].inlineData;
    return {
      type: "image",
      content: `data:${imageDataResult?.mimeType};base64,${imageDataResult?.data}`,
      mimeType: imageDataResult?.mimeType,
    };
  } catch (error: any) {
    console.error("Error editing image:", error);

    if (error.status === 429) {
      throw new Error(
        "API 할당량이 초과되었습니다. 잠시 후 다시 시도해주세요. (약 1분 대기 후 재시도)"
      );
    } else if (error.status === 400) {
      throw new Error("잘못된 요청입니다. 이미지나 프롬프트를 확인해주세요.");
    } else if (error.status === 403) {
      throw new Error("API 키가 유효하지 않거나 권한이 없습니다.");
    }

    throw new Error(`이미지 편집 실패: ${error.message || "알 수 없는 오류"}`);
  }
}

export async function composeMultipleImages(prompt: string, images: File[], apiKey: string) {
  if (images.length > 3) {
    throw new Error("Maximum 3 images are allowed");
  }

  return editImageWithText(prompt, images, apiKey);
}
