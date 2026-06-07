FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential \
  curl \
  libpq-dev \
  && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir playwright==1.40.0 && \
  playwright install chromium && \
  playwright install-deps chromium

RUN useradd -m -u 1000 scraper

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN chown -R scraper:scraper /app

USER scraper

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD python -c "import redis; r = redis.from_url('$REDIS_URL'); r.ping()" || exit 1

CMD ["python", "main.py"]
