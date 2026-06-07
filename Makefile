.PHONY: dev build up down logs logs-api logs-web logs-scraper shell-api shell-scraper seed help

help:
	@echo "HarverstIQ Development Commands"
	@echo ""
	@echo "Development:"
	@echo "  make dev              - Start all services with docker-compose up"
	@echo "  make build            - Build all Docker images"
	@echo ""
	@echo "Running:"
	@echo "  make up               - Start services in background (-d)"
	@echo "  make down             - Stop and remove containers"
	@echo ""
	@echo "Debugging:"
	@echo "  make logs             - Follow all service logs"
	@echo "  make logs-api         - Follow API service logs"
	@echo "  make logs-web         - Follow Web service logs"
	@echo "  make logs-scraper     - Follow Scraper service logs"
	@echo ""
	@echo "Access:"
	@echo "  make shell-api        - Shell into API container"
	@echo "  make shell-scraper    - Shell into Scraper container"
	@echo ""

dev:
	docker-compose up

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

logs-api:
	docker-compose logs -f api

logs-web:
	docker-compose logs -f web

logs-scraper:
	docker-compose logs -f scraper

shell-api:
	docker-compose exec api sh

shell-scraper:
	docker-compose exec scraper bash
