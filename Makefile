.PHONY: help install build dev local run preview clean

# GNU Make runs recipes with /bin/sh, which does not load ~/.bashrc, so nvm’s
# Node/npm are not on PATH unless we add them here (~/.config/nvm or ~/.nvm).
NVM_HOME := $(firstword $(wildcard $(HOME)/.config/nvm) $(wildcard $(HOME)/.nvm))
ifneq ($(NVM_HOME),)
export NVM_DIR := $(NVM_HOME)
NVM_NODE_BIN := $(shell ls -d "$(NVM_DIR)"/versions/node/v*/bin 2>/dev/null | sort -V | tail -1)
ifneq ($(NVM_NODE_BIN),)
export PATH := $(NVM_NODE_BIN):$(PATH)
endif
endif

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
