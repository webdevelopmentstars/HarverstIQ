"""Main entry point for HarverstIQ scraper worker"""

import asyncio
import logging
import signal
import sys
from config import settings

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if settings.debug else logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


class ScraperWorker:
    """Main scraper worker class"""

    def __init__(self):
        self.running = True
        logger.info("Initializing HarverstIQ Scraper Worker")

    async def start(self):
        """Start the scraper worker"""
        logger.info(f"Starting HarverstIQ Scraper (environment: {settings.environment})")
        logger.info(f"Redis URL: {settings.redis_url}")
        logger.info(f"MongoDB URI: {settings.mongodb_uri}")
        logger.info(f"API Base URL: {settings.api_base_url}")
        logger.info(f"Max Browsers: {settings.max_browsers}")

        try:
            # TODO: Initialize browser pool
            logger.info("Browser pool initialized")

            # TODO: Initialize MongoDB client
            logger.info("MongoDB client initialized")

            # TODO: Initialize Redis client
            logger.info("Redis client initialized")

            # TODO: Start queue worker
            logger.info("Queue worker started")

            # TODO: Start scheduler
            logger.info("Scheduler started")

            logger.info("✅ HarverstIQ Scraper started successfully")

            # Keep running until signal
            while self.running:
                await asyncio.sleep(1)

        except Exception as e:
            logger.error(f"Fatal error: {e}", exc_info=True)
            raise

    async def stop(self):
        """Stop the scraper worker gracefully"""
        logger.info("Stopping HarverstIQ Scraper...")
        self.running = False

        # TODO: Drain browser pool
        # TODO: Close database connections
        # TODO: Shutdown scheduler
        logger.info("✅ HarverstIQ Scraper stopped")

    def handle_signal(self, signum, frame):
        """Handle system signals"""
        logger.info(f"Received signal {signum}")
        asyncio.create_task(self.stop())


async def main():
    """Main async entrypoint"""
    worker = ScraperWorker()

    # Setup signal handlers
    loop = asyncio.get_event_loop()
    for sig in (signal.SIGTERM, signal.SIGINT):
        loop.add_signal_handler(sig, worker.handle_signal, sig, None)

    try:
        await worker.start()
    except KeyboardInterrupt:
        logger.info("KeyboardInterrupt received")
        await worker.stop()
    except Exception as e:
        logger.error(f"Unexpected error: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
