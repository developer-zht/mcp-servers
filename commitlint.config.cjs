// commitlint.config.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档变更
        'style', // 代码格式(不影响功能)
        'refactor', // 代码重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建相关
        'ci', // CI配置
        'chore', // 其他修改
        'revert', // 回退
      ],
    ],
  },
  prompt: {
    // cz-git 配置
    alias: { fd: 'docs: fix typos' },
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      { value: 'feat', name: 'feat:     ✨ 新增功能', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      🐛 修复缺陷', emoji: ':bug:' },
      { value: 'docs', name: 'docs:     📝 文档变更', emoji: ':memo:' },
      { value: 'style', name: 'style:    💄 代码格式', emoji: ':lipstick:' },
      { value: 'refactor', name: 'refactor: ♻️  代码重构', emoji: ':recycle:' },
      { value: 'perf', name: 'perf:     ⚡️ 性能优化', emoji: ':zap:' },
      {
        value: 'test',
        name: 'test:     ✅ 测试相关',
        emoji: ':white_check_mark:',
      },
      { value: 'build', name: 'build:    📦️ 构建相关', emoji: ':package:' },
      { value: 'ci', name: 'ci:       🎡 持续集成', emoji: ':ferris_wheel:' },
      { value: 'chore', name: 'chore:    🔨 其他修改', emoji: ':hammer:' },
      { value: 'revert', name: 'revert:   ⏪️ 回退代码', emoji: ':rewind:' },
    ],
    useEmoji: true,
    emojiAlign: 'center',
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
  },
};
