# ponytail: 1024-dim dense embedding generator using BAAI/bge-large-en-v1.5 with deterministic fallback.
# Upgrade path: add multi-GPU PyTorch batched worker queue via Redis ARQ.

import hashlib
import math
import warnings
from typing import List


class EmbeddingGenerator:
    """
    Generates 1024-dimensional dense vector embeddings for material descriptions.
    Integrates BAAI/bge-large-en-v1.5 via sentence-transformers when available,
    with an air-gapped deterministic semantic hash projection fallback.
    """

    DIMENSION = 1024
    DEFAULT_MODEL_NAME = "BAAI/bge-large-en-v1.5"

    def __init__(self, model_name: str = DEFAULT_MODEL_NAME, auto_load: bool = False):
        self.model_name = model_name
        self._model = None
        self._load_attempted = False
        if auto_load:
            self._load_model()

    def _load_model(self):
        """Attempts to load sentence-transformers model; falls back gracefully."""
        if self._load_attempted:
            return
        self._load_attempted = True
        try:
            import os

            # On Render cloud or unless explicitly enabled, use instant deterministic semantic projection
            if os.environ.get("RENDER") or os.environ.get("NUMM_DOWNLOAD_BGE", "").lower() not in ("1", "true"):
                self._model = None
                return

            from sentence_transformers import SentenceTransformer

            # 1. Attempt to load from local cache without triggering network download
            try:
                self._model = SentenceTransformer(self.model_name, local_files_only=True)
                return
            except Exception:
                pass

            # 2. Online download if permitted
            self._model = SentenceTransformer(self.model_name)
        except Exception as exc:
            warnings.warn(
                f"Dense vector model '{self.model_name}' could not be loaded ({exc}). "
                "Engaging deterministic semantic projection fallback per ARCHITECTURE.md Invariant 2.",
                RuntimeWarning,
            )
            self._model = None

    def _deterministic_projection(self, text: str) -> List[float]:
        """
        Deterministic 1024-dimensional unit vector projection for air-gapped/offline execution.
        Preserves token semantic overlap through high-dimensional feature hashing.
        """
        words = text.upper().split()
        if not words:
            return [0.0] * self.DIMENSION

        vec = [0.0] * self.DIMENSION
        for word in words:
            # Generate stable hash buckets for token
            h = hashlib.sha256(word.encode("utf-8")).digest()
            for i in range(0, len(h) - 3, 4):
                val = int.from_bytes(h[i : i + 4], byteorder="big", signed=True)
                idx = abs(val) % self.DIMENSION
                weight = 1.0 if val > 0 else -1.0
                vec[idx] += weight

        # L2 normalize
        norm = math.sqrt(sum(x * x for x in vec))
        if norm > 0:
            vec = [x / norm for x in vec]
        return vec

    def generate_embedding(self, text: str) -> List[float]:
        """Generates a 1024-dimensional dense embedding for single input text."""
        if not self._load_attempted:
            self._load_model()

        if self._model is not None:
            try:
                emb = self._model.encode(text, normalize_embeddings=True)
                return emb.tolist()
            except Exception:
                pass

        return self._deterministic_projection(text)

    def generate_batch(self, texts: List[str]) -> List[List[float]]:
        """Generates 1024-dimensional embeddings for a batch of strings."""
        return [self.generate_embedding(t) for t in texts]

    @staticmethod
    def cosine_similarity(vec_a: List[float], vec_b: List[float]) -> float:
        """Computes cosine similarity between two float vectors."""
        if len(vec_a) != len(vec_b) or not vec_a:
            return 0.0

        dot = sum(a * b for a, b in zip(vec_a, vec_b))
        norm_a = math.sqrt(sum(a * a for a in vec_a))
        norm_b = math.sqrt(sum(b * b for b in vec_b))

        if norm_a == 0.0 or norm_b == 0.0:
            return 0.0

        sim = dot / (norm_a * norm_b)
        return max(0.0, min(1.0, float(sim)))


# Singleton default generator instance (lazy loading by default)
default_embedding_generator = EmbeddingGenerator()
