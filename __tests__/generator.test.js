jest.mock('../lib/plugins/transform-data')
const transformDataPlugin = require('../lib/plugins/transform-data')
const { build } = require('../lib/generator')

const {
  SETTINGS,
  SETTINGS_WITH_METADATA
} = require('../stubs/settings')
const { formatBytes } = require('../lib/utils')

describe('Generator tests', () => {
  describe('[plugins]', () => {

    afterEach(() => {
      jest.deepUnmock('../lib/plugins/transform-data')
    })

    it('should call transformData plugin', async () => {
      transformDataPlugin.mockImplementation(() => {
        return jest.fn().mockName('transformData').mockImplementation(files => files)
      })

      await build(SETTINGS)

      // Plugin initializer
      expect(transformDataPlugin).toHaveBeenCalledWith(SETTINGS)

      // Plugin instance
      const pluginInstance = transformDataPlugin.mock.results[0].value
      expect(pluginInstance.getMockName()).toBe('transformData')
      expect(pluginInstance.mock.calls.length).toBe(1)
    })

    it('should transform data to match snapshot', async () => {
      const transformDataPlugin = require('../lib/plugins/transform-data')
      const parsedFiles = await build(SETTINGS)
      const result = transformDataPlugin(SETTINGS)(parsedFiles)

      expect(result).toMatchSnapshot()
    })

    it('should transform data with the metadata property', async () => {
      const transformDataPlugin = require('../lib/plugins/transform-data')
      const parsedFiles = await build(SETTINGS)
      const result = transformDataPlugin(SETTINGS_WITH_METADATA)(parsedFiles)

      expect(result).toHaveProperty('[0].meta')
      expect(new Date(result[0].meta.createdAt)).not.toBeNaN()
      expect(new Date(result[0].meta.lastModified)).not.toBeNaN()
      expect(typeof result[0].meta.size).toBe('number')
      expect(result[0].meta.formattedSize).toBe(formatBytes(result[0].meta.size))
    })
  })
})
