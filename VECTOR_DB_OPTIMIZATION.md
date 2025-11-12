# Vector Database Optimization Guide

## Current Situation

**Problem:** The embeddings file (`work_experiences_embeddings.jsonl`) is **2.6 MB**, which impacts initial load time and bandwidth usage, especially on mobile/3G connections.

**Current Architecture:**
- Client-side vector search
- Embeddings loaded via fetch on-demand
- 2.6 MB downloaded when AI Assistant is first used

---

## Recommended Solutions

### Option 1: Supabase pgvector (Recommended for MVP)

**Best for:** Quick setup, PostgreSQL users, cost-effective

```bash
# 1. Install Supabase client
npm install @supabase/supabase-js

# 2. Enable pgvector extension in Supabase dashboard
# 3. Create table
```

```sql
CREATE TABLE work_experience_embeddings (
  id TEXT PRIMARY KEY,
  chunk_id TEXT NOT NULL,
  text TEXT NOT NULL,
  embedding VECTOR(3072), -- text-embedding-3-large dimension
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON work_experience_embeddings
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

```typescript
// utils/vectorDB.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function searchSimilarChunks(
  queryEmbedding: number[],
  limit: number = 5,
  threshold: number = 0.7
) {
  const { data, error } = await supabase.rpc('search_embeddings', {
    query_embedding: queryEmbedding,
    match_threshold: threshold,
    match_count: limit
  });

  return data;
}
```

**Pros:**
- Free tier: 500 MB database
- Built-in pgvector support
- Fast semantic search
- Integrated auth & storage

**Cons:**
- Requires PostgreSQL knowledge
- Cold start latency on free tier

**Cost:** Free for MVP, $25/month for production

---

### Option 2: Pinecone (Best for Scale)

**Best for:** Production apps, high-volume queries, managed solution

```bash
npm install @pinecone-database/pinecone
```

```typescript
// utils/pinecone.ts
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pinecone.index('massimo-portfolio');

export async function searchSimilarChunks(
  queryEmbedding: number[],
  topK: number = 5
) {
  const results = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  });

  return results.matches;
}
```

**Pros:**
- Purpose-built for vectors
- Sub-50ms queries
- Automatic scaling
- Superior relevance

**Cons:**
- $70/month minimum (no free tier for production)
- Requires separate service

**Cost:** Free starter (1M vectors), $70/month production

---

### Option 3: Qdrant (Open Source Alternative)

**Best for:** Self-hosting, Docker deployments, cost control

```bash
npm install @qdrant/js-client-rest
```

```typescript
// utils/qdrant.ts
import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

export async function searchSimilarChunks(
  queryEmbedding: number[],
  limit: number = 5
) {
  const results = await client.search('work_experiences', {
    vector: queryEmbedding,
    limit,
    with_payload: true,
  });

  return results;
}
```

**Pros:**
- Fully open source
- Self-hostable (Docker/Kubernetes)
- Free cloud tier (1 GB)
- Fast and efficient

**Cons:**
- Self-hosting complexity
- DevOps overhead

**Cost:** Free (self-hosted), $25/month (cloud starter)

---

### Option 4: ChromaDB (Lightweight Alternative)

**Best for:** Small datasets, local development, Python integrations

```bash
npm install chromadb
```

```typescript
// utils/chroma.ts
import { ChromaClient } from 'chromadb';

const client = new ChromaClient();
const collection = await client.getOrCreateCollection({ name: 'work_experiences' });

export async function searchSimilarChunks(
  queryEmbedding: number[],
  nResults: number = 5
) {
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults,
  });

  return results;
}
```

**Pros:**
- Easiest setup
- Great for prototyping
- Python-friendly
- Free and open source

**Cons:**
- Not production-ready for large scale
- Limited cloud options

**Cost:** Free (self-hosted)

---

## Migration Steps

### 1. Choose Your Vector DB

**For this portfolio, I recommend:** **Supabase pgvector**
- Free tier sufficient
- Easy PostgreSQL integration
- Managed service (no DevOps)
- Fast enough for portfolio use case

### 2. Upload Embeddings

```typescript
// scripts/upload-embeddings.ts
import { createClient } from '@supabase/supabase-js';
import { getEmbeddings } from './utils/vectorLoader';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Service key for admin operations
);

async function uploadEmbeddings() {
  const embeddings = await getEmbeddings();

  const records = embeddings.map(emb => ({
    id: emb.id,
    chunk_id: emb.chunk_id,
    text: emb.text || '',
    embedding: emb.embedding,
    metadata: emb.metadata,
  }));

  // Upload in batches of 100
  for (let i = 0; i < records.length; i += 100) {
    const batch = records.slice(i, i + 100);
    const { error } = await supabase
      .from('work_experience_embeddings')
      .insert(batch);

    if (error) console.error('Upload error:', error);
    else console.log(`Uploaded batch ${i / 100 + 1}`);
  }
}

uploadEmbeddings();
```

### 3. Update useGemini Hook

```typescript
// hooks/useGemini.ts
import { searchSimilarChunks } from '../utils/vectorDB';

// Instead of loading all embeddings:
// const embeddings = await getEmbeddings(); // ❌ 2.6 MB download

// Use vector DB:
const results = await searchSimilarChunks(queryEmbedding, 5, 0.7); // ✅ <1 KB response
```

### 4. Update AI Assistant

```typescript
// components/ui/AiAssistant.tsx

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (input.trim() && !isLoading) {
    // Get query embedding from Gemini or OpenAI
    const queryEmbedding = await getQueryEmbedding(input);

    // Search vector DB (instead of client-side search)
    const relevantChunks = await searchSimilarChunks(queryEmbedding);

    // Build context from results
    const context = relevantChunks.map(c => c.text).join('\n\n');

    // Generate response with context
    generateResponse(input, context);
    setInput('');
  }
};
```

---

## Performance Comparison

| Method | Initial Load | Query Time | Bandwidth | Maintenance |
|--------|--------------|------------|-----------|-------------|
| **Current (Client-side)** | 2.6 MB | ~50ms | High | Low |
| **Supabase pgvector** | 0 KB | ~100ms | Low | Low |
| **Pinecone** | 0 KB | ~30ms | Low | None |
| **Qdrant Cloud** | 0 KB | ~50ms | Low | Low |
| **ChromaDB** | 0 KB | ~80ms | Low | Medium |

---

## Implementation Priority

**Phase 1 (Immediate):** Keep current setup, add lazy loading
```typescript
// Only load embeddings when user clicks AI Assistant
const [embeddings, setEmbeddings] = useState(null);

const handleOpenAssistant = async () => {
  if (!embeddings) {
    const embs = await getEmbeddings();
    setEmbeddings(embs);
  }
  setIsOpen(true);
};
```

**Phase 2 (Next Sprint):** Migrate to Supabase pgvector
- Set up Supabase project
- Create embeddings table
- Upload embeddings via script
- Update search logic
- Remove JSONL files

**Phase 3 (Production):** Consider Pinecone for scale
- If traffic grows > 1000 queries/day
- If sub-50ms search is required
- If advanced filtering is needed

---

## Cost Estimate

**Current (Client-side):**
- Hosting: $0 (Vercel/Netlify free tier)
- Bandwidth: ~$0.30/1000 visitors (2.6 MB × $0.12/GB)
- Total: **~$30/month for 100k visitors**

**With Supabase pgvector:**
- Hosting: $0 (Vercel/Netlify free tier)
- Database: $0 (free tier sufficient)
- Bandwidth: ~$0.01/1000 visitors (<10 KB per query)
- Total: **~$1/month for 100k visitors**

**Savings:** **97% reduction in bandwidth costs**

---

## Next Steps

1. ✅ **Document this guide** (you're reading it!)
2. ⏳ **Add lazy loading** (quick win, no infrastructure change)
3. ⏳ **Set up Supabase** (weekend project)
4. ⏳ **Migrate embeddings** (1-2 hours)
5. ⏳ **Update AI Assistant** (2-3 hours)
6. ⏳ **Test and deploy** (1 hour)

**Total migration time:** ~1 day

---

## Resources

- [Supabase pgvector Docs](https://supabase.com/docs/guides/ai/vector-columns)
- [Pinecone Quickstart](https://docs.pinecone.io/docs/quickstart)
- [Qdrant Documentation](https://qdrant.tech/documentation/)
- [ChromaDB Getting Started](https://docs.trychroma.com/getting-started)

---

**Recommendation:** Start with **lazy loading** (Phase 1) this week, then migrate to **Supabase pgvector** (Phase 2) when you have bandwidth. This will immediately reduce initial load time and set you up for scalable semantic search.
