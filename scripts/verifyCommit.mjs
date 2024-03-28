import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const msgPath = path.resolve('.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE
  = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    ` invalid commit message format.\n\n
    Proper commit message format is required for automated changelog generation.\n
    Examples:\n
    feat(xxx): 静态页实现\n
    fix(xxx): 修复输入框无法输入的问题 (close #28)`,
  )
  process.exit(1)
}
