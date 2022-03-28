const SETTINGS = {
  name: 'markdown-json',
  cwd: './',
  src: './example/',
  filePattern: '**/*.md',
  ignore: '*(icon|input)*',
  dist: 'build/example/output.json',
  metadata: false,
  deterministicOrder: true
}

const SETTINGS_WITH_METADATA = {
  ...SETTINGS,
  filePattern: '**/buttons.md',
  metadata: true
}

module.exports = {
  SETTINGS,
  SETTINGS_WITH_METADATA
}
