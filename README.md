<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/17ZnzeJ-ivWInG_FDCt-kTbHN-gFq_M8C

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Resume Vector Data

This project integrates a structured resume dataset for RAG/chatbot features, enabling intelligent querying of work experience, achievements, and technical skills.

### Data Files

The vector data is located in `data/vector/`:

- **`work_experiences.json`** - Canonical role/achievement data with source provenance (PDF path, page, section)
- **`work_experiences_chunks.jsonl`** - Searchable text chunks with metadata for each highlight/summary
- **`work_experiences_embeddings.jsonl`** - Pre-computed OpenAI embeddings (`text-embedding-3-large`) for vector search

### Using Vector Data in Components

```tsx
import { useVectorData, useRoles } from './hooks/useVectorData';

// Simple: just get roles
function ExperienceSection() {
  const roles = useRoles();

  return (
    <div>
      {roles.map(role => (
        <div key={role.role_id}>
          <h3>{role.title} at {role.company}</h3>
          <p>{role.summary}</p>
        </div>
      ))}
    </div>
  );
}

// Advanced: access chunks and embeddings
function SearchableExperience() {
  const { roles, loadChunks, loadEmbeddings, loading } = useVectorData();

  // Load chunks on demand for search
  useEffect(() => {
    loadChunks();
  }, []);

  // ... implement search UI
}
```

### Client-Side Vector Search

For local semantic search without an external vector database:

```tsx
import { findSimilarChunks } from './utils/similarity';
import { useVectorData } from './hooks/useVectorData';

function SemanticSearch() {
  const { embeddings, loadEmbeddings } = useVectorData();

  useEffect(() => {
    loadEmbeddings();
  }, []);

  const searchExperience = (queryEmbedding: number[]) => {
    if (!embeddings) return [];

    // Find top 5 most similar chunks with 70% threshold
    return findSimilarChunks(queryEmbedding, embeddings, 5, 0.7);
  };

  // ... implement search UI
}
```

### Available Utilities

**vectorLoader.ts**
- `getRoles()` - Get all role records
- `getRoleById(roleId)` - Find specific role
- `getRolesByCompany()` - Group roles by company
- `getChunks()` - Load all chunks (async)
- `getEmbeddings()` - Load embeddings (async)
- `getAllTechnologies()` - Extract unique tech stack
- `getRecentRoles(limit)` - Get N most recent roles

**similarity.ts**
- `cosineSimilarity(a, b)` - Calculate similarity between vectors
- `findSimilarChunks(query, embeddings, topK, threshold)` - Search for similar content
- `groupResultsByRole(results)` - Organize search results by role
- `getTopChunkPerRole(results)` - Get highest-scoring chunk per role

### Updating the Dataset

When the resume or source documents change:

1. **Update source data** in the Resumes repository:
   ```bash
   cd /Users/massimoraso/Code/Resumes/supporting-materials/vector-data
   # Edit work_experiences.json
   ```

2. **Regenerate chunks and embeddings**:
   ```bash
   python prepare_embeddings.py \
     --input work_experiences.json \
     --output work_experiences_chunks.jsonl \
     --embed \
     --model text-embedding-3-large \
     --embed-output work_experiences_embeddings.jsonl
   ```

3. **Sync to this project**:
   ```bash
   npm run sync:resume
   ```

See `data/vector/README.md` for detailed workflow documentation.

### Future Enhancements

- **External Vector DB**: Push embeddings to Pinecone, Qdrant, or Supabase pgvector for production-scale RAG
- **Automated Sync**: GitHub Actions to auto-sync when Resumes repo updates
- **Schema Validation**: Zod schemas to validate data integrity on load
- **UI Components**: Pre-built components for experience timeline, skill tags, and citation tooltips
