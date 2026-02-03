# DCYFR AI Sandbox

**Experimentation sandbox and examples for the DCYFR AI framework**

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
cd dcyfr-ai-tests
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

### Basic Usage

```typescript
import { PluginLoader } from '@dcyfr/ai';

const loader = new PluginLoader();
await loader.loadPlugin('design-token-validator');
const result = await loader.validate();
```

### Custom Plugin

```typescript
import { createPlugin } from '@dcyfr/ai';

const myPlugin = createPlugin({
  name: 'my-validator',
  validate: async (context) => {
    // Validation logic
    return { valid: true, issues: [] };
  }
});
```

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
