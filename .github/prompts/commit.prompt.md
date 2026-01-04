# Git Commit Helper

Create a git commit for the current staged or unstaged changes.

## Instructions

1. First, check `git status` and `git diff` to understand what changed.
2. Write a clear, conventional commit message following this format:
   - **Type**: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`, `style`, `ci`
   - **Scope** (optional): area of codebase affected
   - **Subject**: imperative mood, lowercase, no period
   - **Body** (if needed): explain _what_ and _why_, not _how_
3. Stage all changes if nothing is staged yet.
4. Run the commit command.

## Commit Message Format

```
<type>(<scope>): <subject>

[optional body]
```

## Examples

- `feat(auth): add JWT strategy for credentials provider`
- `fix(likes): return 401 when user no longer exists in DB`
- `test(newsletter): add UI tests for form error states`
- `chore: add playwright e2e testing setup`

## Execution

Run the git commands to stage and commit. Ask the user to confirm the message before committing if the changes are large or ambiguous.
