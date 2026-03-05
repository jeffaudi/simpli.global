.PHONY: help install build dev local run preview clean

# Default target: show help
help:
	@echo "Learn Simpli — available targets:"
	@echo "  make install   Install dependencies"
	@echo "  make build    Build static site to dist/"
	@echo "  make dev      Run dev server (hot reload)"
	@echo "  make local   Alias for dev"
	@echo "  make run     Alias for dev"
	@echo "  make preview Preview production build (after make build)"
	@echo "  make clean   Remove dist/ and .astro/"

# Install dependencies
install:
	npm install

# Build static site to dist/
build: install
	npm run build

# Run dev server (with hot reload)
dev:
	npm run dev

# Alias for dev — run site locally
local: dev

# Alias for dev
run: dev

# Preview production build (run after make build)
preview:
	npm run preview

# Remove build artifacts
clean:
	rm -rf dist .astro
