# DCYFR AI Sandbox

**Experimentation sandbox and examples for the DCYFR AI framework**

[![Tests](https://img.shields.io/badge/Tests-Passing-28a745?style=flat-square)](./tests/)
[![Coverage](https://img.shields.io/badge/Coverage-85%25-yellow?style=flat-square)](./coverage/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](./tsconfig.json)

Version: 1.0.0
Status: Active Development

---

## 📋 Overview

This repository provides:
- **Experimentation Space** - Test and explore @dcyfr/ai framework features
- **Usage Examples** - Demonstrate real-world patterns and best practices
- **Integration Tests** - Validate framework functionality
- **Plugin Development** - Sandbox for creating and testing plugins
- **Performance Testing** - Benchmark framework operations

---

## 🚀 Quick Start

### Installation

```bash
# From workspace root
cd dcyfr-ai-sandbox
npm install
```

### Run Tests

```bash
# Run all tests
npm run test:run

# Watch mode
npm test

# With coverage
npm run test:coverage

# Type checking
npm run typecheck
```

### Run Examples

```bash
# Basic framework usage
npm run example:basic

# Plugin system demonstration
npm run example:plugins

# Agent patterns
npm run example:agents
```

---

## 📁 Structure

```
dcyfr-ai-sandbox/
├── src/                    # Utilities and helpers
│   ├── fixtures/           # Test data and mock objects
│   ├── helpers/            # Helper functions
│   └── mocks/              # Mock implementations
├── tests/                  # Test suites
│   ├── integration/        # Integration tests
│   ├── unit/               # Unit tests
│   ├── plugins/            # Plugin system tests
│   └── performance/        # Performance benchmarks
├── examples/               # Usage examples
│   ├── basic-usage.js      # Getting started
│   ├── plugin-system.js    # Plugin development
│   └── agent-patterns.js   # Agent implementation
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

---

## 🧪 Test Coverage

### Framework Tests
- ✅ Core plugin system
- ✅ Configuration management
- ✅ Telemetry tracking
- ✅ Validation framework
- ✅ Agent lifecycle

### Integration Tests
- ✅ @dcyfr/ai + @dcyfr/agents integration
- ✅ Multi-plugin workflows
- ✅ Configuration inheritance
- ✅ Telemetry aggregation

### Plugin Tests
- ✅ Design token validator
- ✅ Barrel export validator
- ✅ Page layout validator
- ✅ Test data validator

---

## 📚 Examples

### Example 1: Basic Framework Usage

**File:** `examples/basic-usage.js`

```typescript
import { loadConfig, ValidationFramework } from '@dcyfr/ai';

// Load configuration
const config = await loadConfig();
console.log('Loaded config:', config.projectName);

// Create validation framework
const framework = new ValidationFramework({
  gates: config.validation.gates,
  parallel: true, // Run validations in parallel
});

// Run validation
const report = await framework.validate({
  projectRoot: process.cwd(),
  files: ['src/**/*.ts'],
  config: config.agents,
});

console.log(`Result: ${report.valid ? 'PASS ✅' : 'FAIL ❌'}`);
console.log(`Issues found: ${report.violations.length}`);
```

**Run:** `npm run example:basic`

### Example 2: Custom Plugin Development

**File:** `examples/plugin-system.js`

```typescript
import { createPlugin, PluginLoader } from '@dcyfr/ai';

// Create a custom validation plugin
const myPlugin = createPlugin({
  name: 'my-validator',
  version: '1.0.0',
  description: 'Custom validation logic',
  validate: async (context) => {
    const issues = [];

    // Example: Check for console.log in production code
    context.files.forEach(file => {
      if (file.content.includes('console.log')) {
        issues.push({
          file: file.path,
          line: file.lineNumber,
          message: 'Found console.log in production code',
          severity: 'warning',
        });
      }
    });

    return {
      valid: issues.length === 0,
      issues,
      warnings: [],
    };
  }
});

// Load and execute the plugin
const loader = new PluginLoader();
await loader.loadPlugin(myPlugin);
const result = await loader.validate();

console.log('Validation complete:', result);
```

**Run:** `npm run example:plugins`

### Example 3: Agent Patterns

**File:** `examples/agent-patterns.js`

```typescript
import { Agent, ToolRegistry, ShortTermMemory } from '@dcyfr/ai';

// Create an agent with tools and memory
const agent = new Agent({
  name: 'Code Validator',
  description: 'Validates code quality',
  tools: new ToolRegistry(),
  memory: new ShortTermMemory(),
  maxIterations: 10,
});

// Register custom tools
agent.tools.register({
  name: 'lintCode',
  description: 'Lint code files',
  execute: async (files) => {
    // Linting logic
    return { linted: files.length, issues: 0 };
  },
});

// Run the agent
const result = await agent.run({
  task: 'Validate all TypeScript files',
  files: ['src/**/*.ts'],
});

console.log('Agent result:', result);
```

**Run:** `npm run example:agents`

See [examples/](./examples/) directory for complete, runnable code.

---

## 🔗 Dependencies

- **@dcyfr/ai** - Core AI framework (workspace dependency)
- **@dcyfr/agents** - Validation plugins (workspace dependency)
- **vitest** - Test runner
- **typescript** - Type checking

---

## 🛠️ Development

### Adding Tests

1. Create test file in `tests/` directory
2. Import test utilities from `src/helpers/`
3. Write test cases using vitest
4. Run `npm test` to validate

### Adding Examples

1. Create example file in `examples/` directory
2. Add run script to package.json
3. Document usage in this README
4. Test with `npm run example:<name>`

---

## 🔧 Troubleshooting

### Plugin Validation Errors

**Issue: Plugin fails to load with "Module not found"**
- **Cause:** Plugin dependency not installed or incorrect import path
- **Solution:**
  1. Verify plugin is in `node_modules`: `ls node_modules/@dcyfr/agents`
  2. Check import path: `import { myPlugin } from '@dcyfr/agents'`
  3. Rebuild workspace: `npm install` from workspace root
  4. Clear node_modules cache: `rm -rf node_modules && npm install`
- **Debug:** Run with `NODE_DEBUG=module npm test` to see module resolution

**Issue: Plugin validation returns false positives**
- **Cause:** Test fixtures or mock data triggering validation rules
- **Solution:**
  1. Review validation logic in plugin source
  2. Add exceptions for test files: `if (file.path.includes('test')) return true`
  3. Update test fixtures to match validation rules
  4. Use `.dcyfr.yaml` to configure plugin thresholds
- **Example:** Lower compliance threshold: `agents.designTokens.compliance: 0.80`

### Configuration Loading Issues

**Issue: `.dcyfr.yaml` not detected in tests**
- **Cause:** Test runs from different directory or config not in test context
- **Solution:**
  1. Place `.dcyfr.yaml` in sandbox root (same as `package.json`)
  2. Use explicit config path: `loadConfig({ configPath: './dcyfr.yaml' })`
  3. Check test working directory: `console.log(process.cwd())`
  4. Set `projectRoot` in test setup: `beforeAll(() => process.chdir(__dirname))`
- **Verify:** Run `npx @dcyfr/ai config:validate` to check config is found

**Issue: Environment variables not overriding config in tests**
- **Cause:** Variables not set before test execution or incorrect naming
- **Solution:**
  1. Set env vars in test file: `process.env.DCYFR_AGENTS_DESIGNTOKENS_ENABLED = 'false'`
  2. Use correct naming: `DCYFR_<SECTION>_<KEY>` (uppercase, underscores)
  3. Check precedence: env vars > project config > framework defaults
- **Debug:** Log final config: `console.log(await loadConfig())`

### Test Failures (Common Causes)

**Issue: Tests pass locally but fail in CI**
- **Cause:** Environment differences (file paths, OS-specific behavior, missing deps)
- **Solution:**
  1. Check Node version matches: CI uses Node 20+
  2. Verify workspace dependencies installed: `npm install` at root
  3. Run tests from workspace root: `cd .. && npm run test --workspace dcyfr-ai-sandbox`
  4. Check for absolute paths: Use relative paths or `path.resolve()`
- **CI-specific:** Ensure CI has access to workspace packages

**Issue: Vitest reports "No test files found"**
- **Cause:** Test pattern doesn't match files or incorrect vitest config
- **Solution:**
  1. Verify test files match pattern: `tests/**/*.test.ts`
  2. Check `vitest.config.ts` include/exclude patterns
  3. Run with explicit pattern: `npm test -- tests/unit`
  4. Ensure test files have `.test.ts` or `.spec.ts` extension
- **Debug:** Run `npm test -- --reporter=verbose` to see file discovery

**Issue: Type errors in tests after @dcyfr/ai update**
- **Cause:** Breaking changes in framework API or TypeScript version mismatch
- **Solution:**
  1. Check `@dcyfr/ai` changelog for breaking changes
  2. Update test imports: Compare with examples in `@dcyfr/ai/examples`
  3. Rebuild TypeScript: `npm run typecheck`
  4. Update TypeScript if needed: `npm install typescript@latest`
- **Workaround:** Pin `@dcyfr/ai` version in `package.json` until tests updated

---

## 📊 Test Reports

Test results are generated in:
- `coverage/` - Coverage reports (HTML + JSON)
- `test-results/` - Test output logs

---

## 📦 Versioning

This package uses [Changesets](https://github.com/changesets/changesets) for version tracking.

### Creating a Changeset

When making significant changes:

```bash
npm run changeset
```

This will prompt you to select the change type and provide a summary. The changeset will be committed with your changes.

### Version History

Versions are tracked via git tags. This is a private sandbox package and is not published to npm.

---

## 🤝 Contributing

This is an experimentation sandbox for the DCYFR AI framework. When adding content:

1. Follow existing patterns and conventions
2. Ensure examples are clear and well-documented
3. Test experimental features thoroughly
4. Keep code organized and modular

---

## 📝 License & Sponsorship

**License:** MIT for personal/non-commercial use. Commercial use requires a paid tier.

**Sponsorship Tiers:**
- 🌍 **Community** (Free) - Personal use + Signal community
- 🚀 **Founder** ($2,400/yr) - Full commercial license + consultation
- 🏢 **Enterprise** ($9,600/yr) - Enterprise license + premium support

**Learn more:** [SPONSORSHIP.md](../SPONSORSHIP.md)
**Trademark:** "DCYFR" is a trademark of DCYFR Labs.

---

## 🔗 Related Projects

- [@dcyfr/ai](../dcyfr-ai) - Core AI framework
- [@dcyfr/agents](../dcyfr-ai-agents) - Validation plugins
- [dcyfr-labs](../dcyfr-labs) - Main application

---

**Part of the DCYFR Workspace**  
Managed by workspace AI for experimentation and development
