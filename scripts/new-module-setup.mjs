#!/usr/bin/env node

import { mkdir, writeFile, access } from 'fs/promises';
import { constants } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Script to create a new module structure in src/modules
 * Usage: node scripts/new-module-setup.mjs <module-name>
 * Example: node scripts/new-module-setup.mjs hospitals
 */

// Get module name from command line arguments
const inputName = process.argv[2];

if (!inputName) {
  console.error('❌ Error: Module name is required');
  console.log('Usage: npm run module <module-name>');
  console.log('Example: npm run module hospitals');
  process.exit(1);
}

/**
 * Convert any string to kebab-case
 * Examples:
 *   "hospitals" -> "hospitals"
 *   "Hospitals" -> "hospitals"
 *   "HospitalsPage" -> "hospitals-page"
 *   "landing_page" -> "landing-page"
 *   "myModule" -> "my-module"
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Add hyphen before capital letters
    .replace(/[_\s]+/g, '-') // Replace underscores and spaces with hyphens
    .toLowerCase()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Normalize module name to kebab-case
const moduleName = toKebabCase(inputName);

// Validate module name (should be kebab-case: lowercase, alphanumeric with hyphens)
if (!/^[a-z][a-z0-9-]*$/.test(moduleName)) {
  console.error(
    '❌ Error: Module name must be a valid kebab-case string (lowercase letters, numbers, and hyphens only)'
  );
  process.exit(1);
}

// Warn if input was modified
if (inputName !== moduleName) {
  console.log(`ℹ️  Module name normalized to kebab-case: "${inputName}" → "${moduleName}"`);
}

const modulesDir = join(__dirname, '..', 'src', 'modules');
const modulePath = join(modulesDir, moduleName);
const hooksPath = join(modulePath, 'hooks');
const layoutsPath = join(modulePath, 'layouts');
const sectionsPath = join(modulePath, 'sections');

// Template for index.tsx
const indexTemplate = `'use client';

import MainLayout from '@/layouts/MainLayout';

export default function ${toPascalCase(moduleName)}() {
  return (
    <MainLayout>
      <h1>Hello World! This is the ${moduleName} module.</h1>
    </MainLayout>
  );
}
`;

/**
 * Convert kebab-case or snake_case to PascalCase
 * Example: hospitals -> Hospitals, landing-page -> LandingPage
 */
function toPascalCase(str) {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

async function checkModuleExists() {
  try {
    await access(modulePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function createModule() {
  try {
    // Check if module already exists
    const exists = await checkModuleExists();
    if (exists) {
      console.error(`❌ Error: Module "${moduleName}" already exists at ${modulePath}`);
      console.error(`   Please choose a different name or remove the existing module first.`);
      process.exit(1);
    }

    // Create main module directory
    await mkdir(modulePath, { recursive: true });
    console.log(`✓ Created directory: ${modulePath}`);

    // Create hooks directory with .gitkeep
    await mkdir(hooksPath, { recursive: true });
    await writeFile(join(hooksPath, '.gitkeep'), '');
    console.log(`✓ Created directory: ${hooksPath}`);

    // Create layouts directory with .gitkeep
    await mkdir(layoutsPath, { recursive: true });
    await writeFile(join(layoutsPath, '.gitkeep'), '');
    console.log(`✓ Created directory: ${layoutsPath}`);

    // Create sections directory with .gitkeep
    await mkdir(sectionsPath, { recursive: true });
    await writeFile(join(sectionsPath, '.gitkeep'), '');
    console.log(`✓ Created directory: ${sectionsPath}`);

    // Create index.tsx file
    await writeFile(join(modulePath, 'index.tsx'), indexTemplate);
    console.log(`✓ Created file: ${join(modulePath, 'index.tsx')}`);

    console.log(`\n✅ Module "${moduleName}" created successfully!`);
    console.log(`\n📁 Structure:`);
    console.log(`   src/modules/${moduleName}/`);
    console.log(`   ├── hooks/`);
    console.log(`   │   └── .gitkeep`);
    console.log(`   ├── layouts/`);
    console.log(`   │   └── .gitkeep`);
    console.log(`   ├── sections/`);
    console.log(`   │   └── .gitkeep`);
    console.log(`   └── index.tsx`);
  } catch (error) {
    console.error(`❌ Error creating module:`, error.message);
    process.exit(1);
  }
}

createModule();
