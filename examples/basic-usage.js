#!/usr/bin/env node
/**
 * Basic Usage Example
 * 
 * Demonstrates simple usage of @dcyfr/ai framework
 */

import { PluginLoader } from '@dcyfr/ai';

async function main() {
  console.log('DCYFR AI Framework - Basic Usage Example\n');
  console.log('==========================================\n');

  try {
    // Create plugin loader
    const loader = new PluginLoader({
      plugins: [],
      telemetry: { enabled: true },
    });

    console.log('✅ Plugin loader created');
    console.log('📦 Framework version:', '1.0.0');
    console.log('\nExample completed successfully!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
