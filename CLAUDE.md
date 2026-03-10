# CLAUDE.md - Shopify Esteroides

## Decision Matrix: 5 Features, 5 Questions

| Pregunta | Feature | Carga en contexto |
|---|---|---|
| Should Claude ALWAYS know this? | **CLAUDE.md** | Alta (cada sesion) |
| Should Claude know this SOMETIMES? | **Skills** | Baja (solo descripcion hasta invocar) |
| Should this run in ISOLATION? | **Sub-agents** | Zero (contexto propio) |
| Should this happen AUTOMATICALLY on events? | **Hooks** | Zero (fuera del contexto) |
| Does Claude need EXTERNAL tools? | **MCP Servers** | Moderada (carga dinamica) |

---

## 1. CLAUDE.md (Always-On Instructions)

Put here ONLY non-negotiable, project-wide standards that apply to every task:

- Use pnpm, never npm
- TypeScript strict mode always
- Never modify database schema directly
- Follow the cascade: Enterprise > Personal (~/) > Project (./) > Local (.local)
- More specific always wins

**Rule:** If it applies to EVERY conversation, it goes here. But remember: everything here costs tokens every session.

---

## 2. Skills (On-Demand Expertise)

Location: `.claude/skills/` (project-shared) or `~/.claude/skills/` (personal)

Each skill = a `skill.md` with:
- `description`: tells Claude WHEN to activate (only this sits in context)
- Instructions: the full expertise (loads only when triggered)
- Supporting files: templates, references, scripts

### When to create a skill:
- PR review checklist → `/review`
- Deployment procedure → `/deploy`
- Commit message format → `/commit`
- Any task-specific expertise you repeat

**Rule:** If you explain the same thing repeatedly, write a Skill.

---

## 3. Sub-agents (Isolated Workers)

Location: `.claude/agents/`

Each agent = a markdown file with name, description, tool restrictions, model selection.

### Built-in agents:
- **Explore** (Haiku) - read-only, fast search/analysis
- **Plan** - research during plan mode
- **General-purpose** - all tools, complex multi-step tasks

### Custom agent examples:
- Code reviewer: tools limited to Read, Grep, Glob (read-only)
- Researcher: routes to Haiku for cost optimization
- Agents can have persistent memory across sessions

**Rule:** If it needs its own context window and shouldn't clutter the main conversation, use a Sub-agent.

---

## 4. Hooks (Event-Driven Automation)

Location: `.claude/settings.json` or project settings

Hooks fire on lifecycle events - deterministic, not probabilistic:

### Event types:
- `PreToolUse` - before Claude runs a tool (block destructive commands)
- `PostToolUse` - after a tool runs (auto-format files)
- `SessionStart` - when session begins
- `Stop` - when Claude finishes responding
- 15 event types total

### Examples:
- Block `rm -rf` → PreToolUse hook on bash, exit code 2
- Auto-format with Prettier → PostToolUse hook on Write/Edit
- Run tests after every edit → PostToolUse hook

### Advanced:
- Prompt-based hooks: send context to a fast model for yes/no decisions
- Agent-based hooks: spawn a sub-agent to check conditions

**Rule:** If it should happen on EVERY matching event without relying on the LLM remembering, use a Hook.

---

## 5. MCP Servers (External Integrations)

Connect external services via Model Context Protocol:

```bash
claude mcp add <server-name> <transport-type>
```

### Available integrations:
- GitHub (PRs, issues)
- Sentry (error monitoring)
- Postgres (database queries)
- Jira, Figma, Slack, and 100+ more

MCP tools compose with everything else: usable in hooks, skills, and sub-agents.

**Rule:** If Claude needs external tools or data sources, connect an MCP Server.

---

## Project Setup Checklist

1. Run `/init` to bootstrap this CLAUDE.md (foundation)
2. Next time you repeat yourself → write a **Skill**
3. Next time you want guardrails → add a **Hook**
4. Next time you need isolation → create a **Sub-agent**
5. Next time you need external data → connect an **MCP Server**

---

## Agent Team — Equipo del Proyecto

Este proyecto tiene 6 agentes especializados en `.claude/agents/`:

| Agente | Rol | Tools | Enfoque |
|---|---|---|---|
| `ux-lead` | UX/Frontend Lead | Read/Write/Edit | Mobile-first, conversión, checkout UX |
| `architect` | Technical Architect | Read/Write/Edit | Stack, DB schema, deployment, patterns |
| `backend-integrations` | Backend Engineer | Read/Write/Edit | Dropi, pixels CAPI, fraud, webhooks |
| `devils-advocate` | Abogado del Diablo | Read-only | Seguridad, edge cases, cuestionar todo |
| `product-analyst` | Product Analyst | Read-only | Métricas COD, negocio LATAM, conversión |
| `qa-tester` | QA Engineer | Read/Write/Edit | Tests, flujos E2E, romper todo |

### Comandos de equipo disponibles:
- `/team-review` — Revisión multi-perspectiva de propuestas/código
- `/team-build` — Construcción paralela por módulos
- `/team-debug` — Investigación de bugs desde múltiples hipótesis

### Cómo lanzar el equipo:
```
Crea un Agent Team con los agentes ux-lead, architect, backend-integrations,
devils-advocate, y product-analyst para [tarea específica].
```

---

## Project Standards (Always-On)

- TypeScript strict mode siempre
- UI en español (Colombia)
- Mobile-first (80%+ tráfico es mobile)
- Precios COP como INTEGER sin decimales
- Validación con Zod en client y server
- Nunca exponer tokens/secrets al client
- Todo input sanitizado contra XSS/SQL injection
- Formato WooCommerce para Dropi: `WC-{orderNumber}`
- SHA256 para PII en Facebook CAPI y TikTok Events API
- Teléfonos normalizados a E.164 antes de procesar
