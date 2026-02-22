# AGENTS.md - @dcyfr/ai-sandbox

**AI Framework Experimentation Sandbox**

Version: 1.0.0  
Type: Sandbox/Testing environment  
License: MIT

---

## 🎯 Project Overview

This is a **safe experimentation environment** for:
- Testing @dcyfr/ai framework features
- Prototyping new agents
- Evaluating LLM providers
- Benchmarking performance
- Learning AI agent patterns

**Purpose:**
- Rapid iteration without production constraints
- Breaking changes allowed
- Experimental features encouraged
- Learning and documentation

---

## 🏗️ Sandbox Structure

```
src/
├── experiments/        # Experimental features
│   ├── multi-agent/   # Multi-agent workflows
│   ├── streaming/     # Streaming responses
│   ├── rag/           # RAG implementations
│   └── fine-tuning/   # Model fine-tuning
├── benchmarks/         # Performance benchmarks
│   ├── provider-comparison.ts
│   ├── latency-tests.ts
│   └── token-usage.ts
├── prototypes/         # Prototype agents
│   ├── code-reviewer/
│   ├── bug-finder/
│   └── optimizer/
└── examples/           # Usage examples
    ├── basic-usage.ts
    ├── plugin-system.ts
    └── advanced-patterns.ts
```

---

## 🧪 Experimentation Guidelines

### 1. No Production Code

**This is NOT for production use:**
- Break things freely
- Test unstable features
- Try experimental APIs
- No quality gates enforced

### 2. Document Everything

```typescript
/**
 * EXPERIMENT: Multi-Agent Collaboration
 * 
 * Goal: Test agents working together to solve complex tasks
 * Status: In Progress
 * Started: 2026-01-15
 * 
 * Findings:
 * - Agents can successfully hand off tasks
 * - Context sharing needs improvement
 * - Performance overhead: ~200ms per handoff
 * 
 * Next Steps:
 * - Optimize context serialization
 * - Add agent-to-agent streaming
 */
export async function multiAgentExperiment() {
  // Experiment code here
}
```

### 3. Benchmark Everything

```typescript
import { performance } from 'perf_hooks';

async function benchmarkAgent(agent: BaseAgent, iterations: number) {
  const timings: number[] = [];
  
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await agent.execute('test input');
    const end = performance.now();
    timings.push(end - start);
  }
  
  return {
    mean: timings.reduce((a, b) => a + b) / timings.length,
    min: Math.min(...timings),
    max: Math.max(...timings),
    p95: percentile(timings, 0.95),
  };
}
```

---

## 🔬 Experiment Categories

### 1. Provider Comparisons

```typescript
// src/experiments/provider-comparison.ts
import { OpenAIProvider, AnthropicProvider, OllamaProvider } from '@dcyfr/ai';

const providers = [
  new OpenAIProvider({ model: 'gpt-4' }),
  new AnthropicProvider({ model: 'claude-3-opus' }),
  new OllamaProvider({ model: 'llama2' }),
];

const prompt = 'Write a TypeScript function to validate emails';

for (const provider of providers) {
  const start = Date.now();
  const response = await provider.complete(prompt);
  const latency = Date.now() - start;
  
  console.log({
    provider: provider.name,
    latency,
    tokens: response.usage.totalTokens,
    cost: calculateCost(response.usage, provider.name),
  });
}
```

### 2. Multi-Agent Workflows

```typescript
// src/experiments/multi-agent/workflow.ts
import { AgentFramework } from '@dcyfr/ai';

const framework = new AgentFramework();

// Register agents
framework.registerAgent(new PlannerAgent());
framework.registerAgent(new CoderAgent());
framework.registerAgent(new ReviewerAgent());

// Execute workflow
const plan = await framework.execute('planner', {
  task: 'Build a REST API',
});

const code = await framework.execute('coder', {
  plan: plan.result,
});

const review = await framework.execute('reviewer', {
  code: code.result,
});
```

### 3. RAG (Retrieval-Augmented Generation)

```typescript
// src/experiments/rag/simple-rag.ts
import { RAGAgent } from '@dcyfr/ai';
import { VectorStore } from 'some-vector-db';

const vectorStore = new VectorStore();

// Index documents
await vectorStore.index([
  { id: '1', text: 'Next.js documentation...' },
  { id: '2', text: 'TypeScript best practices...' },
]);

// RAG query
const ragAgent = new RAGAgent({
  vectorStore,
  llm: 'gpt-4',
});

const answer = await ragAgent.query(
  'How do I use Server Components in Next.js?'
);
```

### 4. Streaming Responses

```typescript
// src/experiments/streaming/stream-example.ts
import { StreamingAgent } from '@dcyfr/ai';

const agent = new StreamingAgent();

const stream = await agent.executeStream('Write a long story');

for await (const chunk of stream) {
  process.stdout.write(chunk);
}
```

---

## 📊 Benchmarking

### Performance Benchmarks

```bash
# Run all benchmarks
npm run benchmark

# Specific benchmark
npm run benchmark:providers
npm run benchmark:latency
npm run benchmark:tokens
```

### Example Benchmark Output

```
┌─────────────┬──────────┬────────┬────────┬─────────┐
│ Provider    │ Mean (ms)│ P95 (ms)│ Tokens │ Cost ($)│
├─────────────┼──────────┼────────┼────────┼─────────┤
│ OpenAI GPT-4│    1,234 │  1,456 │    512 │  0.0154 │
│ Claude Opus │      987 │  1,123 │    498 │  0.0149 │
│ Llama2      │      234 │    298 │    524 │  0.0000 │
└─────────────┴──────────┴────────┴────────┴─────────┘
```

---

## 🎓 Learning Examples

### Basic Usage

```typescript
// examples/basic-usage.ts - Start here!
import { AgentFramework, CodeGeneratorAgent } from '@dcyfr/ai';

const framework = new AgentFramework();
const agent = new CodeGeneratorAgent();

const code = await agent.generate({
  prompt: 'Create a TypeScript function to validate emails',
  language: 'typescript',
});

console.log(code);
```

### Plugin System

```typescript
// examples/plugin-system.ts
import { AgentFramework, Plugin } from '@dcyfr/ai';

const loggingPlugin: Plugin = {
  name: 'logging',
  async initialize() {
    console.log('Plugin loaded');
  },
  async beforeExecute(context) {
    console.log('Executing:', context.agent.name);
  },
  async afterExecute(context, result) {
    console.log('Completed:', result);
  },
};

const framework = new AgentFramework();
framework.use(loggingPlugin);
```

---

## 🧩 Prototype Agents

### Code Reviewer Agent

```typescript
// src/prototypes/code-reviewer/index.ts
import { BaseAgent } from '@dcyfr/ai';

export class CodeReviewerAgent extends BaseAgent {
  async execute(code: string): Promise<ReviewResult> {
    const prompt = `
Review this code and provide feedback:

${code}

Provide:
1. Security issues
2. Performance concerns
3. Best practice violations
4. Suggestions for improvement
    `;
    
    const response = await this.llm.complete(prompt);
    return this.parseReview(response.text);
  }
}
```

---

## 🔧 Testing

```bash
# Run all tests
npm run test

# Run specific experiment tests
npm run test -- src/experiments/multi-agent

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

**Testing Philosophy:**
- Tests are optional in sandbox
- Focus on learning, not coverage
- Document findings instead

---

## 📝 Documentation Standards

### Experiment Template

```typescript
/**
 * EXPERIMENT: [Name]
 * 
 * Goal: [What you're trying to achieve]
 * Status: [In Progress | Completed | Failed]
 * Started: [Date]
 * Completed: [Date or N/A]
 * 
 * Hypothesis:
 * [What you expect to find]
 * 
 * Method:
 * [How you're testing it]
 * 
 * Findings:
 * [What you discovered]
 * 
 * Next Steps:
 * [What to try next]
 * 
 * References:
 * - [Link to relevant docs]
 * - [Link to related issues]
 */
```

---

## 🚀 Contribution

This sandbox is open for experimentation:

1. **Create a new experiment:**
   ```bash
   mkdir -p src/experiments/my-experiment
   ```

2. **Document your hypothesis**

3. **Run your experiments**

4. **Share your findings** in experiment comments

5. **Prototype successful ideas** for production consideration

---

## 🔗 Related Resources

- [@dcyfr/ai Framework](../dcyfr-ai/README.md)
- [@dcyfr/agents](../dcyfr-ai-agents/README.md)
- [Getting Started](GETTING_STARTED.md)
- [Contributing](CONTRIBUTING.md)

---

**Last Updated:** February 1, 2026  
**Purpose:** Safe experimentation and learning  
**No Production Code:** This is a sandbox!

## Quality Gates
- TypeScript: 0 errors (`npm run typecheck`)
- Tests: ≥99% pass rate (`npm run test`)
- Lint: 0 errors (`npm run lint`)
