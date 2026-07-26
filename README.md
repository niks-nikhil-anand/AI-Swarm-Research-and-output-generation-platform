# AI Swarm Research and Output Generation Platform

AI Swarm is an open-source, self-hostable research automation platform for turning a research goal into a verified report, presentation, document, or social content package. It is designed around a multi-agent workflow where specialist agents search, analyze, fact-check, synthesize, and prepare final outputs with clear provenance.

## SEO

**Title:** AI Swarm Research and Output Generation Platform  
**Description:** Open-source Next.js platform for multi-agent AI research, evidence tracking, content generation, workflow orchestration, and research project management.  
**Keywords:** AI swarm, multi-agent AI, research automation, AI research platform, content generation, Next.js AI app, Temporal workflows, Prisma PostgreSQL, open-source AI tools, agent workflow platform  
**License:** MIT  

## What This Project Does

This project provides a product interface and backend foundation for managing AI-assisted research projects. A user can define a research goal, configure agents, track workflow progress, review sources and evidence, and manage generated project outputs.

The platform is built to support a complete research-to-output pipeline:

1. Define a research goal, audience, tone, source constraints, and output format.
2. Plan the work as a dependency graph of specialist agents.
3. Review and approve the agent team before execution.
4. Run research, analysis, fact-checking, synthesis, and output generation steps.
5. Track project history, usage, status, evidence, search results, and generated sections.
6. Produce structured deliverables such as reports, documents, slide outlines, and social campaign content.

## Current Capabilities

- Next.js application with dashboard, projects, skills, settings, login, and registration pages.
- Multi-stage swarm UI for defining goals, reviewing roles, monitoring runs, and viewing outputs.
- User authentication through HTTP-only sessions.
- PostgreSQL data model managed with Prisma.
- Project management APIs for project creation, state, workflow status, and project details.
- Skill management APIs for user and community skills.
- Search, evidence, reference, section, slide, timeline, and source data structures.
- Usage and analytics API routes for models, agents, and system status.
- Temporal worker dependencies included for durable workflow orchestration.

## Planned Architecture

The codebase is structured for a production-grade AI swarm system with these target integrations:

- **Temporal** for durable long-running workflows, retries, cancellation, and agent task queues.
- **SearXNG** for private metasearch and research retrieval.
- **Postiz** for approved social publishing and scheduling.
- **PostgreSQL** for users, projects, agents, evidence, references, usage, and workflow state.
- **Object storage** for generated files and large artifacts.
- **LLM providers** for research, writing, analysis, verification, and output generation agents.

```mermaid
flowchart LR
    User["User"] --> UI["Next.js UI"]
    UI --> API["Next.js API Routes"]
    API --> DB[("PostgreSQL + Prisma")]
    API --> Temporal["Temporal Workflows"]
    Temporal --> Agents["Agent Workers"]
    Agents --> Search["SearXNG"]
    Agents --> LLM["LLM Providers"]
    Agents --> Output["Reports / Slides / Social Drafts"]
    Output --> Review["Human Review"]
    Review --> Postiz["Postiz Publishing"]
```

## Tech Stack

- **Framework:** Next.js 16
- **UI:** React 19, Tailwind CSS 4
- **Database:** PostgreSQL
- **ORM:** Prisma 7
- **Workflow runtime:** Temporal TypeScript SDK
- **Language:** TypeScript
- **Runtime:** Node.js

## Project Structure

```text
app/                         Next.js app routes and API handlers
components/swarm/            Main multi-agent research UI
components/projects/         Project detail views
prisma/schema.prisma         Database schema
prisma/migrations/           Database migrations
workers/                     Temporal worker entrypoint
generated/prisma/            Generated Prisma client output
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- PostgreSQL database
- npm

### Installation

```bash
npm install
```

### Environment

Create a local environment file and configure your database connection.

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/ai_swarm?schema=public"
SESSION_SECRET="replace-with-a-long-random-secret"
```

Depending on the features you enable, you may also need API keys or service URLs for LLM providers, SearXNG, Temporal, Postiz, and object storage.

### Database

```bash
npx prisma migrate deploy
```

For local schema iteration:

```bash
npx prisma migrate dev
```

### Development

```bash
npm run dev
```

Open the local Next.js URL shown in your terminal.

### Production Build

```bash
npm run build
npm start
```

### Worker

```bash
npm run worker
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Build the app for production. |
| `npm start` | Start the production server. |
| `npm run lint` | Run ESLint. |
| `npm run worker` | Start the Temporal worker entrypoint. |

## Core Concepts

### Project

A project is the main research workspace. It stores the goal, format, status, cost, token usage, timeline, sources, evidence, references, generated sections, and output slides.

### Agent

Agents represent specialist roles such as supervisor, web researcher, domain specialist, data analyst, fact checker, writer, and output designer. Each project can keep a frozen snapshot of its approved agent team.

### Evidence

Evidence records separate source material from generated conclusions. This makes it possible to trace final claims back to URLs, citations, notes, search results, and references.

### Workflow

The intended workflow is dependency-aware. Agents can run in parallel when possible, wait for upstream tasks when needed, and hand off verified findings to writing and output generation stages.

## Roadmap

- Complete Temporal-backed execution for live multi-agent workflows.
- Add production SearXNG retrieval, safe page fetching, and citation validation.
- Add real document, slide, PDF, Markdown, and social content export.
- Add Postiz scheduling and publishing after explicit human approval.
- Add object storage for generated artifacts.
- Expand analytics for model usage, agent performance, cost, and project quality.
- Add deployment templates for PostgreSQL, Temporal, SearXNG, Postiz, workers, and the Next.js app.

## Contributing

Contributions are welcome. Good areas to improve include agent orchestration, retrieval quality, source verification, output generation, UI polish, testing, documentation, and deployment automation.

Before opening a pull request:

1. Keep changes focused and easy to review.
2. Run linting and relevant tests.
3. Update documentation when behavior, setup, or architecture changes.
4. Avoid committing secrets, local environment files, or generated credentials.

## Security

- Keep API keys and provider credentials on the server.
- Do not expose database credentials or publishing keys to browser code.
- Use private SearXNG and Temporal deployments for production.
- Require human approval before publishing social content or taking sensitive actions.
- Store generated artifacts outside the database when files become large.

## License

This project is open source and available under the MIT License.

```text
MIT License

Copyright (c) 2026 AI Swarm Research and Output Generation Platform Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
