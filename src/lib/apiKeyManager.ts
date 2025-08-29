const API_KEY_STORAGE = 'nano-banana-api-key';

export class ApiKeyManager {
  private apiKey: string | null = null;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem(API_KEY_STORAGE);
    this.apiKey = stored;
  }

  public setApiKey(key: string): void {
    this.apiKey = key;
    if (typeof window !== 'undefined') {
      localStorage.setItem(API_KEY_STORAGE, key);
    }
  }

  public getApiKey(): string | null {
    return this.apiKey;
  }

  public hasApiKey(): boolean {
    return !!this.apiKey && this.apiKey.trim().length > 0;
  }

  public removeApiKey(): void {
    this.apiKey = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(API_KEY_STORAGE);
    }
  }

  public validateApiKey(key: string): { valid: boolean; message: string } {
    if (!key || key.trim().length === 0) {
      return { valid: false, message: 'API 키를 입력해주세요.' };
    }

    if (!key.startsWith('AIza')) {
      return { valid: false, message: 'Google API 키는 "AIza"로 시작해야 합니다.' };
    }

    if (key.length < 39) {
      return { valid: false, message: 'API 키 형식이 올바르지 않습니다.' };
    }

    return { valid: true, message: '유효한 API 키입니다.' };
  }
}

export const apiKeyManager = new ApiKeyManager();