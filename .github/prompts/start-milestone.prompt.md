# /start-milestone Command

When the user invokes `/start-milestone`, follow this workflow exactly.

---

## Step 1: Sync with remote

Run these commands:

```bash
git fetch origin
git checkout main
git pull origin main
```

Report the result. If there are uncommitted changes, ask the user how to handle them before proceeding.

---

## Step 2: Determine current milestone

Check the checklists directory to understand progress:

1. Read `checklists/` to see all milestone files
2. For each checklist, scan for completion status (look for `- [x]` vs `- [ ]`)
3. Identify the **next incomplete milestone** (the one to start)

Reference the milestone order from `.github/prompts/PLANNING_PROMPT.md`:

**Phase 1: Core Functionality**

1. Scaffold (milestone-1-scaffold.md)
2. MDX (milestone-2-mdx.md)
3. DB/Prisma (milestone-3-db-prisma.md)
4. Auth (milestone-4-auth.md)
5. Engagement (milestone-5-engagement.md)
6. Newsletter (milestone-6-newsletter.md)
7. E2E Tests (milestone-7-e2e.md)

**Phase 2: Design System** 8. Design M1: Foundation (design-milestone-1-foundation.md) 9. Design M2: Typography (design-milestone-2-typography.md) 10. Design M3: Components (design-milestone-3-components.md) 11. Design M4: Code (design-milestone-4-code.md) 12. Design M5: Polish (design-milestone-5-polish.md)

Report which milestones are complete and which is next.

---

## Step 3: Propose branch name

Based on the next milestone, propose a branch name following this pattern:

- Phase 1: `milestone-N-<short-description>`
- Phase 2: `design-milestone-N-<short-description>`

Examples:

- `milestone-4-auth`
- `design-milestone-1-foundation`
- `design-milestone-2-typography`

**Ask the user to confirm or modify the branch name before creating it.**

Do NOT create the branch until the user approves.

---

## Step 4: Create branch (after approval)

Once the user confirms the branch name:

```bash
git checkout -b <approved-branch-name>
```

Report success.

---

## Step 5: Present milestone goal and TDD plan

Read the relevant checklist file and present:

### Goal

A 2-3 sentence summary of what this milestone accomplishes.

### Scope

What IS included in this milestone.

### Out of Scope

What is NOT included (to be done in later milestones).

### TDD Plan

Present the test-first approach:

1. **Tests to write first** (RED phase)
   - List the specific test files to create
   - Describe what each test should verify
   - These tests should FAIL initially

2. **Implementation order** (GREEN phase)
   - List the files to create/modify
   - Suggest the order of implementation
   - Each step should make more tests pass

3. **Refactor opportunities** (REFACTOR phase)
   - Note any cleanup or consolidation to do after tests pass

### First Action

Suggest the very first concrete action (usually: "Create test file X with these failing tests").

---

## Output Format

Use this structure for the final output:

```
## Milestone Status

✅ Completed: [list completed milestones]
🎯 Next: [milestone name]

## Proposed Branch

`<branch-name>`

Confirm this branch name? (yes / suggest alternative)
```

After user confirms:

```
## [Milestone Name]

### Goal
[2-3 sentences]

### Scope
- [item 1]
- [item 2]
...

### Out of Scope
- [item 1]
- [item 2]
...

### TDD Plan

#### 1. Tests First (RED)
- [ ] Create `tests/...` — [description]
- [ ] Create `tests/...` — [description]

#### 2. Implementation (GREEN)
- [ ] [file/change 1]
- [ ] [file/change 2]
...

#### 3. Refactor
- [ ] [cleanup task]

### First Action
[Specific instruction for what to do next]
```

---

## Notes

- Always enforce TDD: tests before implementation
- Keep the user informed at each step
- Wait for user confirmation before creating branches
- Reference the design system (`docs/design-system.md`) for Phase 2 milestones
