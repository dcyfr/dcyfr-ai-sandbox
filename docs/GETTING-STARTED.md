# DCYFR AI Sandbox - Quick Start Guide

Welcome to the DCYFR AI Sandbox! This repository is your playground for experimenting with the DCYFR AI framework.

## 🚀 Getting Started

### 1. Install Dependencies

From the workspace root:
```bash
cd ${WORKSPACE_ROOT}
npm install
```

Or from this directory:
```bash
cd dcyfr-ai-sandbox
npm install
```

### 2. Run Examples

Try the included examples to see the framework in action:

```bash
# Basic usage example
npm run example:basic

# Plugin system demonstration
npm run example:plugins

# Agent patterns
npm run example:agents
```

### 3. Run Tests

```bash
# Run all tests
npm run test:run

# Watch mode for development
npm test

# Generate coverage report
npm run test:coverage
```

## 📚 What's Inside

- **examples/** - Ready-to-run examples demonstrating framework features
- **tests/** - Test suites for validation and experimentation
- **src/** - Utilities and helpers for building custom solutions

## 🧪 Experimentation Areas

### Plugin Development
Create custom validators and plugins:
```typescript
import { createPlugin } from '@dcyfr/ai';

const myValidator = createPlugin({
  name: 'my-custom-validator',
  validate: async (context) => {
    // Your validation logic
    return { valid: true, issues: [] };
  }
});
```

### Agent Patterns
Experiment with different agent implementations:
```typescript
import { PluginLoader } from '@dcyfr/ai';

const loader = new PluginLoader({
  plugins: ['my-validator'],
  telemetry: { enabled: true }
});
```

### Performance Testing
Benchmark framework operations and optimize workflows.

## 🔗 Resources

- [Main Documentation](../dcyfr-ai/README.md)
- [Plugin System Guide](../dcyfr-ai/docs/PLUGINS.md)
- [Workspace Guide](../WORKSPACE.md)

## 💡 Tips

1. **Start Simple** - Begin with the basic examples
2. **Experiment Freely** - This is a sandbox, break things and learn
3. **Share Discoveries** - Document useful patterns you find
4. **Test Thoroughly** - Use the test suite to validate ideas

## 🤝 Need Help?

- Check the main [@dcyfr/ai documentation](../dcyfr-ai)
- Review existing [examples](./examples)
- Explore the [test suite](./tests)

---

Happy experimenting! 🎉
