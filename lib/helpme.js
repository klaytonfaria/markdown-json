module.exports = {
  config: ['c', 'settings file', 'string', './settings.json'],
  cwd: ['w', 'work directory', 'string', './'],
  src: ['d', 'file(s) directory', 'string', './'],
  filePattern: ['p', 'file(s) directory', 'string', '**/*.md'],
  ignore: ['i', 'Ignore file pattern', 'string', ''],
  dist: ['d', 'output file directory', 'string', '/app/settings.json'],
  display: ['D', 'enable display mode', 'boolean', false],
  server: ['S', 'enable server', 'boolean', false],
  port: ['P', 'server port', 'number', 3001]
}
