export function generateMockEmbedding(text: string): number[] {
    return new Array(1536).fill(0).map((_, i) => (text.charCodeAt(i % text.length) % 10) / 10);
  }
  