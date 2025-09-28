
Review uncommitted changes on @branch for code quality before committing. Run git diff and check:

CONSISTENCY & REUSE:
- Follow existing patterns and conventions in the codebase
- Reuse existing utilities/components instead of creating redundant code
- Use the same libraries and error handling patterns as similar files

CODE QUALITY:
- Look for obvious bugs, logic errors, or overengineering
- Flag unnecessary complexity or premature abstractions
- Suggest simpler solutions where applicable

TEST INTEGRITY:
- Tests must verify actual functionality, not implementation details
- Test fixes must preserve behavior validation, not just make tests pass
- Avoid brittle tests that break with refactoring
- Flag tests that mirror implementation or test mocks instead of code

Output: List any issues found by category with specific locations. If all good, confirm ready to commit.