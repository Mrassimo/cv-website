# Resume Vector Data

This directory contains the structured resume dataset in vector-ready format for RAG/chatbot features.

## Files

- **`work_experiences.json`** – Canonical extraction of roles and achievements from `MassimoRasoCV2025.pdf`. Each highlight includes source metadata (PDF path, page number, section) for provenance tracking.

- **`work_experiences_chunks.jsonl`** – JSONL format where each line is a searchable text chunk with embedded metadata (role_id, company, title, timeframe, core_tech, chunk_type, source info). Ready for vector database ingestion.

- **`work_experiences_embeddings.jsonl`** – JSONL containing the same chunks with pre-computed embeddings (OpenAI `text-embedding-3-large`). Each record includes the embedding vector plus all chunk metadata.

## Data Provenance

**Original Location:** `/Users/massimoraso/Code/Resumes/supporting-materials/vector-data/`

**Source Document:** `data-analyst-general/MassimoRasoCV2025.pdf` (and related cover letters/materials)

**Schema Version:** 1.1

**Last Generated:** 2025-02-15

## Regenerating the Dataset

When the CV or source documents are updated, regenerate the vector data using the `prepare_embeddings.py` script in the Resumes repository:

### 1. Update the source JSON

Edit `/Users/massimoraso/Code/Resumes/supporting-materials/vector-data/work_experiences.json` to reflect new roles, achievements, or updated content. Maintain the schema structure and source references (path, page, section).

### 2. Generate chunks

```bash
cd /Users/massimoraso/Code/Resumes/supporting-materials/vector-data
python prepare_embeddings.py \
  --input work_experiences.json \
  --output work_experiences_chunks.jsonl
```

This produces the chunk-level JSONL with metadata ready for retrieval.

### 3. Generate embeddings (optional)

```bash
export OPENAI_API_KEY="sk-..."
python prepare_embeddings.py \
  --embed \
  --model text-embedding-3-large \
  --embed-output work_experiences_embeddings.jsonl
```

**Note:** Requires `pip install openai`. This step is optional if using server-side embeddings or a different embedding model.

### 4. Sync to this project

Copy the updated files:

```bash
npm run sync:resume
```

Or manually:

```bash
cp /Users/massimoraso/Code/Resumes/supporting-materials/vector-data/work_experiences*.* data/vector/
```

### 5. Verify integration

```bash
npm run dev
```

Check that the updated data loads correctly in the application.

## Usage in Application

The vector data is loaded via `utils/vectorLoader.ts` and consumed through the `useVectorData` hook. Components can access:

- **Roles metadata** – Company, title, timeframe, core technologies
- **Searchable chunks** – Granular text snippets with full provenance
- **Embeddings** – For client-side cosine similarity search or external vector DB integration

See the main project README for integration details and UI components that consume this data.

## Future Enhancements

- **External Vector DB:** Push embeddings to Pinecone, Qdrant, or Supabase pgvector for production-scale RAG
- **Automated Sync:** GitHub Actions workflow to auto-sync when Resumes repo updates
- **Schema Validation:** Add Zod schemas to validate data integrity on load
