import { useState, useEffect } from 'react';
import type { RoleRecord, VectorChunk, EmbeddingRecord } from '../types';
import {
  getRoles,
  getRoleById,
  getRolesByCompany,
  getChunks,
  getEmbeddings,
  getChunksByRole,
  getDatasetMetadata,
  getAllTechnologies,
  getRecentRoles,
} from '../utils/vectorLoader';

interface VectorDataState {
  roles: RoleRecord[];
  chunks: VectorChunk[] | null;
  embeddings: EmbeddingRecord[] | null;
  loading: boolean;
  error: Error | null;
}

interface VectorDataHook extends VectorDataState {
  // Synchronous helpers (work with roles which are imported directly)
  getRoleById: (roleId: string) => RoleRecord | undefined;
  getRolesByCompany: () => Map<string, RoleRecord[]>;
  getAllTechnologies: () => string[];
  getRecentRoles: (limit?: number) => RoleRecord[];
  getDatasetMetadata: () => {
    schemaVersion: string;
    generatedAt: string;
    sourceDocument: string;
    totalRoles: number;
  };

  // Async helpers (work with chunks/embeddings which are fetched)
  getChunksByRole: (roleId: string) => Promise<VectorChunk[]>;
  loadChunks: () => Promise<void>;
  loadEmbeddings: () => Promise<void>;
}

/**
 * Hook to access resume vector data throughout the application
 *
 * Provides access to:
 * - Roles metadata (loaded synchronously from JSON import)
 * - Vector chunks (loaded asynchronously from JSONL)
 * - Embeddings (loaded asynchronously from JSONL)
 *
 * Usage:
 * ```tsx
 * const { roles, chunks, loading, getRoleById } = useVectorData();
 * ```
 */
export function useVectorData(): VectorDataHook {
  const [state, setState] = useState<VectorDataState>({
    roles: [],
    chunks: null,
    embeddings: null,
    loading: false,
    error: null,
  });

  // Load roles synchronously on mount
  useEffect(() => {
    try {
      const roles = getRoles();
      setState(prev => ({ ...prev, roles }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Failed to load roles'),
      }));
    }
  }, []);

  // Function to load chunks on demand
  const loadChunks = async () => {
    if (state.chunks) return; // Already loaded

    setState(prev => ({ ...prev, loading: true }));

    try {
      const chunks = await getChunks();
      setState(prev => ({ ...prev, chunks, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error : new Error('Failed to load chunks'),
      }));
    }
  };

  // Function to load embeddings on demand
  const loadEmbeddings = async () => {
    if (state.embeddings) return; // Already loaded

    setState(prev => ({ ...prev, loading: true }));

    try {
      const embeddings = await getEmbeddings();
      setState(prev => ({ ...prev, embeddings, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error : new Error('Failed to load embeddings'),
      }));
    }
  };

  return {
    ...state,
    getRoleById,
    getRolesByCompany,
    getAllTechnologies,
    getRecentRoles,
    getDatasetMetadata,
    getChunksByRole,
    loadChunks,
    loadEmbeddings,
  };
}

/**
 * Simple hook that just returns roles (most common use case)
 */
export function useRoles(): RoleRecord[] {
  const [roles, setRoles] = useState<RoleRecord[]>([]);

  useEffect(() => {
    try {
      const data = getRoles();
      setRoles(data);
    } catch (error) {
      console.error('Failed to load roles:', error);
    }
  }, []);

  return roles;
}
