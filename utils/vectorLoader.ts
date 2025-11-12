import type { WorkExperiencesData, RoleRecord, VectorChunk, EmbeddingRecord } from '../types';

// Import JSON directly (Vite supports this)
import workExperiencesData from '../data/vector/work_experiences.json';

/**
 * Load and parse the JSONL chunks file
 */
async function loadChunks(): Promise<VectorChunk[]> {
  try {
    const response = await fetch('/data/vector/work_experiences_chunks.jsonl');
    const text = await response.text();

    const chunks: VectorChunk[] = text
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));

    return chunks;
  } catch (error) {
    console.error('Failed to load chunks:', error);
    throw new Error('Failed to load vector chunks data');
  }
}

/**
 * Load and parse the JSONL embeddings file
 */
async function loadEmbeddings(): Promise<EmbeddingRecord[]> {
  try {
    const response = await fetch('/data/vector/work_experiences_embeddings.jsonl');
    const text = await response.text();

    const embeddings: EmbeddingRecord[] = text
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));

    return embeddings;
  } catch (error) {
    console.error('Failed to load embeddings:', error);
    throw new Error('Failed to load vector embeddings data');
  }
}

/**
 * Get all roles from the work experiences dataset
 */
export function getRoles(): RoleRecord[] {
  const data = workExperiencesData as WorkExperiencesData;
  return data.roles;
}

/**
 * Get a specific role by role_id
 */
export function getRoleById(roleId: string): RoleRecord | undefined {
  const roles = getRoles();
  return roles.find(role => role.role_id === roleId);
}

/**
 * Get roles grouped by company
 */
export function getRolesByCompany(): Map<string, RoleRecord[]> {
  const roles = getRoles();
  const grouped = new Map<string, RoleRecord[]>();

  roles.forEach(role => {
    const existing = grouped.get(role.company) || [];
    grouped.set(role.company, [...existing, role]);
  });

  return grouped;
}

/**
 * Load all vector chunks
 */
export async function getChunks(): Promise<VectorChunk[]> {
  return loadChunks();
}

/**
 * Load all embeddings
 */
export async function getEmbeddings(): Promise<EmbeddingRecord[]> {
  return loadEmbeddings();
}

/**
 * Get chunks for a specific role
 */
export async function getChunksByRole(roleId: string): Promise<VectorChunk[]> {
  const chunks = await getChunks();
  return chunks.filter(chunk => chunk.metadata.role_id === roleId);
}

/**
 * Get metadata about the dataset
 */
export function getDatasetMetadata() {
  const data = workExperiencesData as WorkExperiencesData;
  return {
    schemaVersion: data.schema_version,
    generatedAt: data.generated_at,
    sourceDocument: data.source_document,
    totalRoles: data.roles.length,
  };
}

/**
 * Validate that required fields are present in a role record
 */
export function validateRole(role: unknown): role is RoleRecord {
  if (typeof role !== 'object' || role === null) return false;

  const r = role as Record<string, unknown>;

  return (
    typeof r.role_id === 'string' &&
    typeof r.title === 'string' &&
    typeof r.company === 'string' &&
    typeof r.location === 'string' &&
    typeof r.summary === 'string' &&
    Array.isArray(r.core_tech) &&
    Array.isArray(r.highlights) &&
    typeof r.timeframe === 'object' &&
    r.timeframe !== null
  );
}

/**
 * Validate that required fields are present in a chunk record
 */
export function validateChunk(chunk: unknown): chunk is VectorChunk {
  if (typeof chunk !== 'object' || chunk === null) return false;

  const c = chunk as Record<string, unknown>;

  return (
    typeof c.chunk_id === 'string' &&
    typeof c.text === 'string' &&
    typeof c.metadata === 'object' &&
    c.metadata !== null
  );
}

/**
 * Get all unique technologies across all roles
 */
export function getAllTechnologies(): string[] {
  const roles = getRoles();
  const techSet = new Set<string>();

  roles.forEach(role => {
    role.core_tech.forEach(tech => techSet.add(tech));
  });

  return Array.from(techSet).sort();
}

/**
 * Get the most recent N roles by start date
 */
export function getRecentRoles(limit: number = 5): RoleRecord[] {
  const roles = getRoles();

  return [...roles]
    .sort((a, b) => {
      const dateA = new Date(a.timeframe.start);
      const dateB = new Date(b.timeframe.start);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);
}
