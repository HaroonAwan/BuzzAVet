#!/usr/bin/env node

import { mkdir, writeFile, access, readFile } from 'fs/promises';
import { constants } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Script to create a new API module structure in src/apis
 * Usage: node scripts/new-api-module-setup.mjs <module-name>
 * Example: node scripts/new-api-module-setup.mjs onBoarding
 */

const inputName = process.argv[2];

if (!inputName) {
  console.error('❌ Error: API module name is required');
  console.log('Usage: npm run api <module-name>');
  console.log('Example: npm run api onBoarding');
  process.exit(1);
}

/**
 * Convert any string to camelCase
 * Examples:
 *   "onBoarding" -> "onBoarding"
 *   "on-boarding" -> "onBoarding"
 *   "on_boarding" -> "onBoarding"
 */
function toCamelCase(str) {
  return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, (c) => c.toLowerCase());
}

/**
 * Convert camelCase to PascalCase
 */
function toPascalCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert camelCase to UPPER_SNAKE_CASE
 */
function toUpperSnakeCase(str) {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toUpperCase()
    .replace(/^_/, '');
}

const moduleName = toCamelCase(inputName);
const pascalName = toPascalCase(moduleName);
const upperSnakeName = toUpperSnakeCase(moduleName);

const apisDir = join(__dirname, '..', 'src', 'apis');
const modulePath = join(apisDir, moduleName);
const endpointsPath = join(apisDir, 'endpoints.ts');

// Template for API file
const apiTemplate = `import { baseApi } from '@/apis/baseApi';
import { ApiEndpoints } from '../endpoints';

const {} = ApiEndpoints.${upperSnakeName};

export const ${moduleName}Api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add your endpoints here
    // Example:
    // getSomething: builder.query({
    //   query: () => '/endpoint',
    // }),
  }),
});

export const {} = ${moduleName}Api;
`;

// Template for Slice file
const sliceTemplate = `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

interface ${pascalName}State {
  // Add your state properties here
}

const initialState: ${pascalName}State = {
  // Initialize your state here
};

export const ${moduleName}Slice = createSlice({
  name: '${moduleName}',
  initialState,
  reducers: {
    // Add your reducers here
    // Example:
    // setSomething: (state, action: PayloadAction<any>) => {
    //   state.something = action.payload;
    // },
  },
});

export const {} = ${moduleName}Slice.actions;

export const select${pascalName} = (state: RootState) => state.${moduleName};

export default ${moduleName}Slice.reducer;
`;

async function checkModuleExists() {
  try {
    await access(modulePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function updateEndpoints() {
  try {
    const content = await readFile(endpointsPath, 'utf-8');

    // Check if the endpoint already exists
    if (content.includes(`${upperSnakeName}:`)) {
      console.log(`ℹ️  ${upperSnakeName} already exists in endpoints.ts`);
      return;
    }

    // Find the position to insert the new endpoint (before the closing brace)
    const lines = content.split('\n');
    const lastBraceIndex = lines.findLastIndex((line) => line.trim() === '};');

    if (lastBraceIndex === -1) {
      console.error('❌ Error: Could not find closing brace in endpoints.ts');
      return;
    }

    // Insert the new endpoint before the last closing brace
    lines.splice(lastBraceIndex, 0, `  ${upperSnakeName}: {},`);

    const updatedContent = lines.join('\n');
    await writeFile(endpointsPath, updatedContent);

    console.log(`✅ Added ${upperSnakeName} to endpoints.ts`);
  } catch (error) {
    console.error(`❌ Error updating endpoints.ts: ${error.message}`);
  }
}

async function updateReducers() {
  try {
    const reducersPath = join(__dirname, '..', 'src', 'apis', 'reducers.ts');
    const content = await readFile(reducersPath, 'utf-8');

    // Check if reducer already exists
    if (content.includes(`${moduleName}Reducer`)) {
      console.log(`ℹ️  ${moduleName}Reducer already exists in reducers.ts`);
      return;
    }

    const lines = content.split('\n');

    // Find the last import statement
    let lastImportIndex = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].includes("from '@apis/") && lines[i].includes('Slice')) {
        lastImportIndex = i;
        break;
      }
    }

    // Add import statement
    if (lastImportIndex !== -1) {
      lines.splice(
        lastImportIndex + 1,
        0,
        `import ${moduleName}Reducer from '@apis/${moduleName}/${moduleName}Slice';`
      );
    }

    // Find the reducers object and add the new reducer
    let reducersObjectStart = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('export const reducers = {')) {
        reducersObjectStart = i;
        break;
      }
    }

    if (reducersObjectStart !== -1) {
      // Find the closing brace of the reducers object
      let closingBraceIndex = -1;
      for (let i = reducersObjectStart; i < lines.length; i++) {
        if (lines[i].trim() === '};') {
          closingBraceIndex = i;
          break;
        }
      }

      if (closingBraceIndex !== -1) {
        lines.splice(closingBraceIndex, 0, `  ${moduleName}: ${moduleName}Reducer,`);
      }
    }

    const updatedContent = lines.join('\n');
    await writeFile(reducersPath, updatedContent);

    console.log(`✅ Added ${moduleName}Reducer to reducers.ts`);
  } catch (error) {
    console.error(`❌ Error updating reducers.ts: ${error.message}`);
  }
}

async function createApiModule() {
  const exists = await checkModuleExists();

  if (exists) {
    console.error(`❌ Error: API module "${moduleName}" already exists`);
    process.exit(1);
  }

  try {
    // Create module directory
    await mkdir(modulePath, { recursive: true });
    console.log(`✅ Created directory: src/apis/${moduleName}`);

    // Create API file
    const apiPath = join(modulePath, `${moduleName}Api.ts`);
    await writeFile(apiPath, apiTemplate);
    console.log(`✅ Created ${moduleName}Api.ts`);

    // Create Slice file
    const slicePath = join(modulePath, `${moduleName}Slice.ts`);
    await writeFile(slicePath, sliceTemplate);
    console.log(`✅ Created ${moduleName}Slice.ts`);

    // Update endpoints.ts
    await updateEndpoints();

    // Update reducers.ts
    await updateReducers();

    console.log(`\n🎉 API module "${moduleName}" created successfully!`);
    console.log(`\n📁 Files created:`);
    console.log(`   - src/apis/${moduleName}/${moduleName}Api.ts`);
    console.log(`   - src/apis/${moduleName}/${moduleName}Slice.ts`);
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Add endpoints to ApiEndpoints.${upperSnakeName} in src/apis/endpoints.ts`);
    console.log(`   2. Implement your API endpoints in ${moduleName}Api.ts`);
    console.log(`   3. Define your state and reducers in ${moduleName}Slice.ts`);
  } catch (error) {
    console.error(`❌ Error creating API module: ${error.message}`);
    process.exit(1);
  }
}

createApiModule();
