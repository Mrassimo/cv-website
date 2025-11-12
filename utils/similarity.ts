import type { EmbeddingRecord } from '../types';

/**
 * Calculate the dot product of two vectors
 */
function dotProduct(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }

  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

/**
 * Calculate the magnitude (L2 norm) of a vector
 */
function magnitude(vector: number[]): number {
  return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
}

/**
 * Calculate cosine similarity between two vectors
 *
 * Returns a value between -1 and 1, where:
 * - 1 means the vectors are identical
 * - 0 means the vectors are orthogonal (no similarity)
 * - -1 means the vectors are opposite
 *
 * For normalized embeddings (like OpenAI's), this is equivalent to dot product.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }

  const dot = dotProduct(a, b);
  const magA = magnitude(a);
  const magB = magnitude(b);

  if (magA === 0 || magB === 0) {
    return 0;
  }

  return dot / (magA * magB);
}

/**
 * Search for the most similar chunks to a query embedding
 *
 * @param queryEmbedding - The embedding vector to search for
 * @param embeddings - Array of embedding records to search through
 * @param topK - Number of top results to return (default: 5)
 * @param threshold - Minimum similarity score to include (default: 0.7)
 * @returns Array of results with chunk and similarity score, sorted by score descending
 */
export function findSimilarChunks(
  queryEmbedding: number[],
  embeddings: EmbeddingRecord[],
  topK: number = 5,
  threshold: number = 0.7
): Array<{ chunk: EmbeddingRecord; score: number }> {
  const results = embeddings
    .map(chunk => ({
      chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .filter(result => result.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return results;
}

/**
 * Search for similar chunks using text search (requires external embedding API)
 *
 * This is a placeholder that demonstrates the pattern.
 * In production, you would:
 * 1. Call an embedding API to convert the query text to a vector
 * 2. Use findSimilarChunks to search the embedded data
 *
 * @param queryText - The text to search for
 * @param embeddings - Array of embedding records to search through
 * @param embedFunction - Async function that converts text to embedding
 * @param topK - Number of top results to return
 * @param threshold - Minimum similarity score
 */
export async function searchByText(
  queryText: string,
  embeddings: EmbeddingRecord[],
  embedFunction: (text: string) => Promise<number[]>,
  topK: number = 5,
  threshold: number = 0.7
): Promise<Array<{ chunk: EmbeddingRecord; score: number }>> {
  const queryEmbedding = await embedFunction(queryText);
  return findSimilarChunks(queryEmbedding, embeddings, topK, threshold);
}

/**
 * Group search results by role
 */
export function groupResultsByRole(
  results: Array<{ chunk: EmbeddingRecord; score: number }>
): Map<string, Array<{ chunk: EmbeddingRecord; score: number }>> {
  const grouped = new Map<string, Array<{ chunk: EmbeddingRecord; score: number }>>();

  results.forEach(result => {
    const roleId = result.chunk.metadata.role_id;
    const existing = grouped.get(roleId) || [];
    grouped.set(roleId, [...existing, result]);
  });

  return grouped;
}

/**
 * Get the highest scoring chunk for each role
 */
export function getTopChunkPerRole(
  results: Array<{ chunk: EmbeddingRecord; score: number }>
): Array<{ chunk: EmbeddingRecord; score: number }> {
  const grouped = groupResultsByRole(results);
  const topPerRole: Array<{ chunk: EmbeddingRecord; score: number }> = [];

  grouped.forEach(chunks => {
    if (chunks.length > 0) {
      // Chunks are already sorted by score descending
      topPerRole.push(chunks[0]);
    }
  });

  return topPerRole.sort((a, b) => b.score - a.score);
}

/**
 * Calculate average similarity score across a set of results
 */
export function averageSimilarity(
  results: Array<{ chunk: EmbeddingRecord; score: number }>
): number {
  if (results.length === 0) return 0;

  const sum = results.reduce((acc, result) => acc + result.score, 0);
  return sum / results.length;
}

/**
 * Format similarity score as percentage
 */
export function formatSimilarityScore(score: number): string {
  return `${(score * 100).toFixed(1)}%`;
}
