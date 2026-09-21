# Multi-stage production Dockerfile for NUMM FastAPI backend
# Targeted for NIC MeghRaj Gov Cloud & air-gapped PSU environments

FROM python:3.11-slim as builder

WORKDIR /build

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY config/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --user -r requirements.txt

# Final minimal runtime container
FROM python:3.11-slim as runner

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/home/numm/.local/bin:$PATH" \
    PYTHONPATH="/app:$PYTHONPATH"

# Create non-root system user for CVC security compliance
RUN groupadd -r numm && useradd -r -g numm -d /home/numm -s /bin/bash numm && \
    mkdir -p /home/numm/.local && chown -R numm:numm /home/numm

COPY --from=builder --chown=numm:numm /root/.local /home/numm/.local

# Copy application source code
COPY --chown=numm:numm backend/ ./backend/
COPY --chown=numm:numm config/ ./config/

USER numm

EXPOSE 8000

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/api/v1/health || exit 1

CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
