
jest.mock('../lib/utils', () => ({
  ...jest.requireActual('../lib/utils'),
  transformFileData: jest.fn()
}))

const { transformFileData } = require('../lib/utils')
const { build } = require('../lib/generator')

const settings = {
  name: 'markdown-json',
  cwd: './',
  src: './example/',
  filePattern: '**/*.md',
  ignore: '*(icon|input)*',
  dist: 'build/example/output.json',
  metadata: false,
  deterministicOrder: true
}

describe('Generator tests', () => {
  describe('[build]', () => {
    it('should build correctly', async () => {
      await build(settings)
      expect(transformFileData).toHaveBeenCalledWith(1)
    })
  })
})
