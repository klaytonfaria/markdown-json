module.exports = {
  config: ['c', 'settings file', 'string', './settings.json'],
  cwd: ['w', 'work directory', 'string', './'],
  src: ['s', 'file(s) directory', 'string', './'],
  filePattern: ['p', 'file(s) directory', 'string', '**/*.md'],
  ignore: ['i', 'Ignore file pattern', 'string', ''],
  dist: ['d', 'output file directory', 'string', './dist/output.json'],
  display: ['D', 'enable display mode', 'boolean', true],
  server: ['S', 'enable server', 'boolean', false],
  port: ['P', 'server port', 'number', 3001]
}
