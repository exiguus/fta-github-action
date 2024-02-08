/**
 * Unit tests for src/wait.ts
 */

import * as fta from '../src/fta'
import { expect } from '@jest/globals'

describe('wait.ts', () => {
  it('throws on non-existent project_path', async () => {
    const project_path = 'non-existent-file'
    await expect(fta.run(project_path)).rejects.toThrow(
      'Param `project_path` does not exist'
    )
  })
})
