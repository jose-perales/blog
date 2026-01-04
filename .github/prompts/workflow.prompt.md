# Iterative Development Workflow

This document describes the collaborative workflow between developer and AI assistant for this project.

---

## Philosophy

**Small, verified steps.** Each change is tested before moving forward. The human maintains control over git operations and reviews. The AI handles implementation details and TDD discipline.

---

## Workflow Cycle

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   /start-milestone                                          │
│        │                                                    │
│        ▼                                                    │
│   ┌─────────┐    ┌─────────┐    ┌──────────┐               │
│   │  RED    │───▶│  GREEN  │───▶│ REFACTOR │               │
│   │ (tests) │    │ (impl)  │    │ (clean)  │               │
│   └─────────┘    └─────────┘    └──────────┘               │
│        │                              │                     │
│        └──────────────────────────────┘                     │
│                      │                                      │
│                      ▼                                      │
│              npm test && npm run lint                       │
│                      │                                      │
│                      ▼                                      │
│              /commit (AI proposes)                          │
│                      │                                      │
│                      ▼                                      │
│              Human: push & merge                            │
│                      │                                      │
│                      ▼                                      │
│              Next milestone ──────────────────────────┐     │
│                                                       │     │
└───────────────────────────────────────────────────────┘     │
                                                              │
        ◀─────────────────────────────────────────────────────┘
```

---

## Commands

### `/start-milestone`

Initiates work on the next milestone:

1. Syncs with remote (fetch, checkout main, pull)
2. Identifies the next incomplete milestone from checklists
3. Proposes a branch name (waits for human approval)
4. Creates the branch
5. Presents goal, scope, and TDD plan

### `/commit` (or reference commit.prompt.md)

Prepares a commit:

1. Reviews `git status` and `git diff`
2. Proposes conventional commit message
3. Waits for human confirmation
4. Stages and commits

**Human always handles:** `git push`, PR creation, merging.

---

## TDD Discipline

Every implementation follows Red-Green-Refactor:

### RED Phase

- Write failing tests first
- Tests describe the expected behavior
- Run tests to confirm they fail

### GREEN Phase

- Write minimal code to make tests pass
- Don't optimize yet
- Run tests to confirm they pass

### REFACTOR Phase

- Clean up code
- Remove duplication
- Ensure tests still pass

---

## Milestone Structure

Each milestone has a checklist in `checklists/` with:

- **Scope** — what's included
- **Out of scope** — what's deferred
- **Prerequisites** — what must be done first
- **TDD steps** — tests to write, implementation order
- **Verification** — final checks before commit

---

## Commit Hygiene

### Commit Types

- `feat` — new feature
- `fix` — bug fix
- `test` — adding/updating tests
- `refactor` — code change that doesn't add features or fix bugs
- `docs` — documentation only
- `chore` — maintenance tasks
- `style` — formatting, no code change
- `ci` — CI/CD changes

### Commit Size

- Prefer small, focused commits
- Separate docs/planning from implementation when sensible
- Each commit should leave the codebase in a working state

---

## Human-AI Responsibilities

| Human                   | AI                         |
| ----------------------- | -------------------------- |
| Approves branch names   | Proposes branch names      |
| Reviews commit messages | Drafts commit messages     |
| Pushes to remote        | Stages and commits locally |
| Creates PRs             | —                          |
| Merges PRs              | —                          |
| Final design decisions  | Suggests implementations   |
| Scope changes           | Follows milestone scope    |

---

## Verification Gates

Before each commit:

- [ ] `npm test` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds (when relevant)
- [ ] Visual inspection (when UI changes)

Before marking milestone complete:

- [ ] All checklist items done
- [ ] No regressions in existing functionality
- [ ] Code is clean and documented

---

## Context Preservation

The AI maintains context through:

- Reading checklist files for current progress
- Scanning codebase structure
- Following prompt files for conventions
- Building on previous conversation

When starting fresh, use `/start-milestone` to re-establish context.

---

## Interruption Handling

If work is interrupted:

1. Commit what's working (even if incomplete)
2. Note progress in checklist
3. Next session: `/start-milestone` will detect state

If changes need to be abandoned:

- `git stash` to save for later
- `git checkout .` to discard
- Human decides which approach
