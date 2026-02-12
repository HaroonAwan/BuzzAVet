#!/usr/bin/env node

import { mkdir, writeFile, access, readFile } from 'fs/promises';
import { constants } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Script to create a new route with page.tsx in app directory
 * Usage: node scripts/new-route-setup.mjs <route-path> <module-name>
 *
 * Use @ prefix for route groups instead of parentheses (no quotes needed!)
 * Examples:
 *   npm run route user-menu user-menu
 *   npm run route @authenticated/user-menu user-menu
 *   npm run route @account-settings/user-menu account-settings
 *   npm run route @un-authenticated/login auth/login
 */

let routePath = process.argv[2];
const moduleName = process.argv[3];

if (!routePath || !moduleName) {
  console.error('❌ Error: Both route path and module name are required');
  console.log('Usage: npm run route <route-path> <module-name>');
  console.log('\nUse @ prefix for route groups (no quotes needed!):');
  console.log('  npm run route user-menu user-menu');
  console.log('  npm run route @authenticated/user-menu user-menu');
  console.log('  npm run route @account-settings/user-menu account-settings');
  process.exit(1);
}

// Convert @ prefix to parentheses for route groups
// @authenticated/user-menu -> (authenticated)/user-menu
routePath = routePath.replace(/@([^/]+)\//g, '($1)/');

/**
 * Convert kebab-case to PascalCase
 * Example: user-menu -> UserMenu, auth/login -> Login
 */
function toPascalCase(str) {
  // Get the last segment if it's a path
  const lastSegment = str.split('/').pop();
  return lastSegment
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Convert to camelCase for metadata key
 * Example: user-menu -> userMenu, auth/login -> authLogin
 */
function toCamelCase(str) {
  // Replace slashes and dashes with spaces, then convert to camelCase
  const cleaned = str.replace(/[()]/g, '').replace(/[\/\-_]/g, ' ');
  const words = cleaned.split(/\s+/).filter(Boolean);
  return words
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
}

const appDir = join(__dirname, '..', 'src', 'app');
const routeDir = join(appDir, routePath);
const pagePath = join(routeDir, 'page.tsx');
const metadataPath = join(__dirname, '..', 'src', 'seo', 'metadata.ts');

// Generate metadata key and title
const metadataKey = toCamelCase(routePath) + 'Metadata';
const pageTitle = toPascalCase(routePath.split('/').pop());

// Template for page.tsx
const pageTemplate = `import ${toPascalCase(moduleName.split('/').pop())} from '@/modules/${moduleName}';
import { DEFAULT_METADATA } from '@/seo/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.${metadataKey},
};

export default ${toPascalCase(moduleName.split('/').pop())};
`;

async function checkRouteExists() {
  try {
    await access(pagePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function checkModuleExists() {
  const modulePath = join(__dirname, '..', 'src', 'modules', moduleName, 'index.tsx');
  try {
    await access(modulePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function updateMetadata() {
  try {
    const content = await readFile(metadataPath, 'utf-8');

    // Check if metadata already exists
    if (content.includes(`${metadataKey}:`)) {
      console.log(`ℹ️  ${metadataKey} already exists in metadata.ts`);
      return;
    }

    // Find the position to insert the new metadata (before the closing brace)
    const lines = content.split('\n');
    const lastBraceIndex = lines.findLastIndex((line) => line.trim() === '};');

    if (lastBraceIndex === -1) {
      console.error('❌ Error: Could not find closing brace in metadata.ts');
      return;
    }

    // Insert the new metadata before the last closing brace
    lines.splice(lastBraceIndex, 0, `  ${metadataKey}: {`);
    lines.splice(lastBraceIndex + 1, 0, `    title: '${pageTitle}',`);
    lines.splice(lastBraceIndex + 2, 0, `  },`);

    const updatedContent = lines.join('\n');
    await writeFile(metadataPath, updatedContent);

    console.log(`✅ Added ${metadataKey} to metadata.ts`);
  } catch (error) {
    console.error(`❌ Error updating metadata.ts: ${error.message}`);
  }
}

async function createRoute() {
  try {
    // Check if route already exists
    const routeExists = await checkRouteExists();
    if (routeExists) {
      console.error(`❌ Error: Route already exists at ${pagePath}`);
      console.error(`   Please choose a different path or remove the existing route first.`);
      process.exit(1);
    }

    // Check if module exists
    const moduleExists = await checkModuleExists();
    if (!moduleExists) {
      console.error(`❌ Error: Module "${moduleName}" does not exist`);
      console.error(`   Please create the module first using: npm run module ${moduleName}`);
      process.exit(1);
    }

    // Create route directory
    await mkdir(routeDir, { recursive: true });
    console.log(`✓ Created directory: ${routeDir}`);

    // Create page.tsx file
    await writeFile(pagePath, pageTemplate);
    console.log(`✓ Created file: ${pagePath}`);

    // Update metadata.ts
    await updateMetadata();

    console.log(`\n✅ Route created successfully!`);
    console.log(`\n📁 Structure:`);
    console.log(`   src/app/${routePath}/`);
    console.log(`   └── page.tsx`);
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Review the generated page.tsx at ${pagePath}`);
    console.log(`   2. Check the metadata in src/seo/metadata.ts`);
    console.log(`   3. Update the title in metadata.ts if needed`);
  } catch (error) {
    console.error(`❌ Error creating route:`, error.message);
    process.exit(1);
  }
}

createRoute();
