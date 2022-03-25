const { formatBytes } = require('../lib/utils')

const FORMAT_CASES = [
  { value: 64, expected: '64 Bytes' },
  { value: 640, expected: '640 Bytes' },
  { value: 6400, expected: '6.3 KB' },
  { value: 64000, expected: '62.5 KB' },
  { value: 6400000, expected: '6.1 MB' },
  { value: 6400000000, expected: '6.0 GB' },
  { value: 6400000000000, expected: '5.8 TB' },
  { value: 0, expected: 'n/a' },
  { value: undefined, expected: 'n/a' },
  { value: null, expected: 'n/a' }
]

describe('Utils tests', () => {
  describe('[formatBytes]', () => {
    FORMAT_CASES.map(item => {
      it(`should format ${item.value} as "${item.expected}"`, () => {
        expect(formatBytes(item.value)).toBe(item.expected)
      })
    })
  })
})
