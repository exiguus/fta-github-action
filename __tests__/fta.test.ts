/**
 * Unit tests for src/wait.ts
 */

import * as fta from '../src/fta'
import { expect } from '@jest/globals'

describe('wait.ts', () => {
  it('throws on invalid file_path', async () => {
    const file_path = ''
    await expect(fta.run(file_path)).rejects.toThrow(
      'Param `file_path` does not exist'
    )
  })

  it('throws on non-existent file_path', async () => {
    const file_path = 'non-existent-file'
    await expect(fta.run(file_path)).rejects.toThrow(
      'Param `file_path` does not exist'
    )
  })
})
