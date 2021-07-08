module.exports = {
  config: ['c', 'settings file', 'string', './settings.json'],
  cwd: ['w', 'work directory', 'string', './'],
  deterministicOrder: ['o', 'enable deterministic output ordering', 'boolean', false],
  display: ['D', 'enable display mode', 'boolean', true],
  dist: ['d', 'output file directory', 'string', './dist/output.json'],
  filePattern: ['p', 'file(s) directory', 'string', '**/*.md'],
  ignore: ['i', 'ignore file pattern', 'string', ''],
  port: ['P', 'server port', 'number', 3001],
  server: ['S', 'enable server', 'boolean', false],
  src: ['s', 'file(s) directory', 'string', './']
}
