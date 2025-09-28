Create a concise commit message for all uncommitted changes on @branch

Instructions:
- Run git diff to analyze the actual changes
- Focus on the overall purpose and impact of the changes, not implementation details
- Ignore any intermediate additions/deletions - only consider the final state
- Use conventional commit format when appropriate (feat:, fix:, refactor:, docs:, test:, chore:)
- Keep the first line under 72 characters
- If changes span multiple areas, focus on the primary change
- Include the "why" not just the "what" when the purpose isn't obvious
- Do not run git add or git commit - only provide the message text

Output: Just the commit message text, nothing else.