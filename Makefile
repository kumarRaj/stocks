LOG_DIR := .logs
SCRAPER_URL := http://localhost:9000
BACKEND_URL := http://localhost:8081
FRONTEND_URL := http://localhost:3000

define wait_for
bash -c 'for i in $$(seq 1 90); do curl -sf $(1) >/dev/null 2>&1 && exit 0; sleep 2; done; exit 1'
endef

define start_if_free
if lsof -ti tcp:$(1) >/dev/null 2>&1; then \
  echo "$(2)   already running on port $(1) (use make restart to reload)"; \
else \
  nohup sh -c 'cd $(3) && $(4)' > $(LOG_DIR)/$(2).log 2>&1 & \
  if $(call wait_for,$(5)); then \
    echo "$(2)   started -> $(5)"; \
  else \
    echo "$(2)   FAILED to start, see $(LOG_DIR)/$(2).log"; \
  fi; \
fi
endef

.PHONY: run restart stop status logs install

run: install
	@mkdir -p $(LOG_DIR)
	@$(call start_if_free,9000,scraper,scraper,npm start,$(SCRAPER_URL)/ping)
	@$(call start_if_free,8081,backend,backend,./gradlew bootRun,$(BACKEND_URL)/health)
	@$(call start_if_free,3000,frontend,frontend,npm start,$(FRONTEND_URL))

restart: stop run

stop:
	@lsof -ti tcp:9000 | xargs kill 2>/dev/null || true
	@lsof -ti tcp:8081 | xargs kill 2>/dev/null || true
	@lsof -ti tcp:3000 | xargs kill 2>/dev/null || true
	@echo "Stopped all services"

status:
	@curl -sf $(SCRAPER_URL)/ping >/dev/null && echo "scraper  running" || echo "scraper  down"
	@curl -sf $(BACKEND_URL)/health >/dev/null && echo "backend  running" || echo "backend  down"
	@curl -sf $(FRONTEND_URL) >/dev/null && echo "frontend running" || echo "frontend down"

logs:
	@tail -n 20 -f $(LOG_DIR)/scraper.log $(LOG_DIR)/backend.log $(LOG_DIR)/frontend.log

install:
	@test -d scraper/node_modules || (cd scraper && npm install --no-audit --no-fund)
	@test -d frontend/node_modules || (cd frontend && npm install --no-audit --no-fund)
