# BuzzAVet

A modern veterinary management system designed to streamline operations for veterinary clinics and animal care facilities. The application provides comprehensive tools for managing patient records, appointments, medical histories, and administrative tasks. Built with Next.js and TypeScript, it delivers a scalable, maintainable solution that prioritizes user experience, accessibility, and performance.

The core purpose is to digitize and optimize veterinary practice workflows, reducing administrative overhead while improving patient care quality. The system offers real-time data synchronization, secure authentication, and responsive design to support both desktop and mobile usage.

Target users include veterinary clinic staff, administrators, and practice managers who require efficient tools for daily operations, patient management, and business analytics.

## Tech Stack

The application is built on Next.js 16 using the App Router architecture, which enables server-side rendering, static generation, and optimal performance through React Server Components. TypeScript provides strict type safety throughout the codebase, eliminating runtime type errors and improving developer experience.

State management is handled by Redux Toolkit, which offers a standardized approach to managing application state with minimal boilerplate. RTK Query serves as the API communication layer, providing automatic caching, request deduplication, and optimistic updates. Redux Persist ensures state persistence across browser sessions with encrypted storage.

Styling is implemented using Tailwind CSS with a custom theme system that centralizes all color values, spacing, and typography. The shadcn/ui component library provides accessible, customizable UI primitives that follow modern design patterns.

Form management leverages react-hook-form for performant form state handling with minimal re-renders. react-select provides enhanced select components with search and multi-select capabilities.

Code quality is enforced through ESLint with Next.js recommended rules, TypeScript ESLint plugin, and Prettier for consistent code formatting. Husky manages Git hooks to run quality checks before commits.

## Prerequisites

Node.js version 18.x or higher is required to run this project. The application uses npm as the package manager for dependency management. All environment variables must be configured before running the application, including API endpoints, environment identifiers, and encryption keys.

## Project Setup

Clone the repository to your local machine using Git. Navigate to the project directory in your terminal. Install all project dependencies by running the npm install command, which will download and set up all required packages defined in package.json.

Configure environment variables by creating environment files for your target environment. Development uses .env.local, staging uses .env.staging, and production uses .env.production. Each file must contain the API endpoint URL, application environment identifier, and a 32-character encryption key for Redux Persist.

Start the development server using npm run dev, which launches the Next.js development server with hot module replacement. The application will be available at http://localhost:3000. Changes to source files will automatically trigger browser refresh.

For production deployment, build the application using npm run build:staging for staging environments or npm run build:production for production. These commands use env-cmd to load the appropriate environment variables during the build process. After building, start the production server with npm start.

## Folder Structure

The project follows a modular architecture with clear separation of concerns. All source code resides in the src directory to maintain a clean project root.

The src/app directory contains Next.js App Router route definitions. Each route is represented by a folder containing a page.tsx file that exports only Next.js metadata and imports the actual page component from the corresponding module. This separation keeps routing logic minimal and business logic contained within modules.

The src/modules directory implements feature-based modular architecture. Each module represents a complete feature or page with its own sections, layouts, and hooks. Modules contain a sections subdirectory for page sections like hero areas or feature blocks, a layouts subdirectory for module-specific layout components, a hooks subdirectory for module-specific React hooks, and an index.tsx file that serves as a barrel export combining all module parts.

The src/components directory houses reusable UI components organized by purpose. The shared subdirectory contains primary reusable components like buttons, filters, and tags that follow the design system. The form-inputs subdirectory contains form-specific components integrated with react-hook-form. The ui subdirectory contains base shadcn/ui components used as building blocks. The auth subdirectory contains authentication-related components, and the providers subdirectory contains React context providers.

The src/apis directory contains RTK Query API definitions and Redux slices organized by feature domain. The baseApi.ts file configures the base API with automatic token injection and tag-based caching. Feature-specific API files are organized in subdirectories like auth for authentication endpoints.

The src/lib directory contains utility functions, configurations, and shared logic. The theme.ts file centralizes all color values and design tokens. The store.ts file configures the Redux store with encrypted persistence. The hooks.ts file exports typed Redux hooks, and utils.ts contains helper functions.

The src/types directory contains TypeScript type definitions organized by domain. The api.ts file defines API error response types and utility functions for error handling.

The src/assets directory contains static assets including icon-components for SVG icon React components and images for image assets used throughout the application.

## Environment Configuration

Environment variables are managed through separate files for each environment to maintain configuration isolation. Development uses .env.local, which is automatically loaded by Next.js and should not be committed to version control. Staging uses .env.staging, and production uses .env.production, both loaded via env-cmd during build processes.

Naming conventions follow Next.js standards where public variables accessible in the browser are prefixed with NEXT*PUBLIC*. Server-only variables like encryption keys do not use this prefix. All environment variable names use uppercase letters with underscores as separators.

The NEXT_PUBLIC_API_URL variable defines the base URL for all API requests. NEXT_PUBLIC_APP_ENV identifies the current environment for conditional logic. ENCRYPTION_KEY provides a 32-character key for encrypting Redux state in localStorage.

Local development allows quick iteration with hot reloading and detailed error messages. Staging environments mirror production configuration for testing deployment processes and integration with staging APIs. Production environments use optimized builds with minimal error information and production API endpoints.

## API Architecture

API communication follows a centralized strategy using RTK Query, which eliminates the need for manual fetch calls or axios instances. All API endpoints are injected into a base API configuration, ensuring consistent behavior across the application.

The base API configuration in src/apis/baseApi.ts handles automatic Bearer token injection from Redux auth state, tag-based cache management for efficient data synchronization, and standardized error response handling. All endpoints are injected using the injectEndpoints method, enabling code splitting and better organization.

Error handling follows a standardized approach where all API errors conform to the ApiErrorResponse structure containing a message string and statusCode number. The extractApiError utility function from src/types/api.ts provides type-safe error extraction from RTK Query error objects. Errors are automatically typed as SerializedError with ApiErrorResponse data.

Request and response normalization occurs automatically through RTK Query's built-in serialization. All requests include authentication headers when a token is available in the Redux store. Responses are cached based on tag configuration, reducing unnecessary network requests.

Authentication handling is integrated at the base API level. The prepareHeaders function in baseApi.ts automatically retrieves the authentication token from Redux state and includes it as a Bearer token in the Authorization header for all API requests. This ensures authenticated requests work seamlessly across the application without manual token management in components.

## State Management (Redux Toolkit)

Redux Toolkit is used to provide predictable state management with minimal boilerplate. The store structure follows a slice-based architecture where each feature domain has its own slice containing reducers and actions. The auth slice manages authentication state including user data, tokens, and authentication status.

Async data handling is managed entirely through RTK Query, which eliminates the need for manual thunk creation or saga setup. RTK Query automatically generates hooks for queries and mutations, provides loading and error states, and handles request caching and deduplication.

Best practices include using typed hooks from src/lib/hooks.ts for all Redux interactions, keeping UI state local to components when possible, avoiding prop drilling by using Redux for global state, and normalizing server state properly to prevent data duplication.

The store configuration includes encrypted persistence using redux-persist-transform-encrypt, which automatically encrypts and persists the auth slice to localStorage. This ensures sensitive authentication data remains secure while providing seamless user experience across sessions.

## TypeScript Setup

Strict type safety is enforced throughout the codebase with TypeScript's strict mode enabled. This configuration prevents common type-related errors and ensures compile-time safety. The philosophy emphasizes catching errors during development rather than runtime.

Interfaces and types are used strategically with interfaces preferred for object shapes that may be extended, and types used for unions, intersections, and computed types. All component props are typed, all function parameters and return values are typed, and all API request and response structures are typed.

The avoidance of any types is strictly enforced through ESLint rules. When type information is unavailable, unknown is used instead of any, requiring proper type guards before usage. This approach maintains type safety while handling dynamic data.

Shared types strategy organizes types by domain in the src/types directory. Common types like API error responses are defined in api.ts, while feature-specific types like authentication types are defined in domain-specific files like auth.ts. This organization improves discoverability and maintains clear boundaries between features.

## Modular Architecture

The feature-based folder structure in src/modules enables scalable organization where each feature is self-contained with its own components, hooks, and logic. This approach improves maintainability by keeping related code together and makes it easier to understand feature boundaries.

Reusability strategy prioritizes shared components in src/components/shared for cross-feature UI elements, form components in src/components/form-inputs for form-specific needs, and module-specific components within module directories for feature-specific implementations.

Shared components and utilities are organized in src/components for UI components, src/lib for utility functions and configurations, and src/types for shared type definitions. This centralization prevents duplication and ensures consistency.

Scalability considerations include the modular structure supporting team collaboration by allowing different developers to work on different modules without conflicts, the clear separation of concerns making it easier to test and maintain individual features, and the consistent patterns enabling quick onboarding of new team members.

## Linting and Code Quality

ESLint configuration follows Next.js recommended rules with additional TypeScript-specific rules from the TypeScript ESLint plugin. Unused imports are automatically detected and can be removed. Import ordering ensures consistent import organization.

Prettier usage is integrated with ESLint to prevent formatting conflicts. Prettier handles code formatting while ESLint handles code quality. The format command writes formatting changes, while format:check validates formatting without making changes.

Enforced standards include strict TypeScript mode with no any types allowed, all colors must come from the theme system with no hardcoded values, components must be accessible by default with proper ARIA attributes, and minimal documentation with maximum five lines for critical information only.

Pre-commit hooks managed by Husky automatically run linting, formatting checks, and build validation before allowing commits. This ensures code quality standards are maintained before code enters the repository.

## Performance & Best Practices

Optimization techniques include Next.js automatic code splitting at the route level, React Server Components reducing client-side JavaScript, and image optimization through next/image component. Static generation is used where possible to serve pre-rendered pages.

Rendering strategies prioritize Server Components by default for better performance and SEO. Client Components are used only when interactivity, hooks, or browser APIs are required. Dynamic rendering is used sparingly and only when necessary.

Bundle and asset management leverages Next.js automatic optimization for JavaScript bundles, CSS optimization through Tailwind's purging of unused styles, and font optimization through next/font. Assets are served with appropriate caching headers.

Additional performance considerations include lazy loading heavy client components, memoization for expensive computations, and proper use of React.memo for components that receive stable props. The Redux store uses selectors to prevent unnecessary re-renders.

## Git Workflow

Branching strategy follows a hierarchy where production is the most stable branch, followed by staging, then dev, and finally wip as the integration branch. Feature branches branch off from wip, and pull requests are raised into wip for integration testing.

Pull request rules require all CI checks to pass before merging, code review approval from at least one team member, and resolution of all review comments. Pull requests must have descriptive titles and descriptions explaining changes.

Code review expectations include checking for adherence to project standards, verifying TypeScript types are properly used, ensuring accessibility requirements are met, and confirming tests pass if applicable. Reviewers should provide constructive feedback and approve when standards are met.

## Deployment

Supported deployment environments include development for local development with hot reloading, staging for pre-production testing with staging API endpoints, and production for live application with production API endpoints and optimized builds.

Build considerations include environment-specific builds using env-cmd to load correct environment variables, optimized production builds with minimal source maps, and static asset optimization through Next.js build process. Build outputs are validated before deployment.

Environment variable handling in production requires all NEXT*PUBLIC* variables to be set in the deployment platform's environment configuration. Server-only variables like ENCRYPTION_KEY must be securely stored and not exposed to the client. Environment variables are validated during build to ensure required values are present.

## Contribution Guidelines

New developers should start by reading this README and the project standards in .cursor/rules/project-standards/RULE.md. Set up the development environment following the Project Setup section. Review existing code to understand patterns and conventions before making changes.

Coding standards require following the modular architecture pattern, using TypeScript with strict mode, importing colors from the theme system, ensuring accessibility in all components, and maintaining minimal documentation. All code must pass ESLint and Prettier checks.

Commit message expectations follow conventional commit format with clear, descriptive messages. Commit messages should explain what changes were made and why. Related changes should be grouped in single commits, and commits should be atomic and focused on a single concern.

## Notes

Known limitations include the requirement for JavaScript to be enabled in browsers for full functionality, as the application is a client-side rendered React application. The encryption key for Redux Persist must be consistent across deployments to maintain state persistence.

Future improvements may include additional performance optimizations through further code splitting, enhanced error tracking and monitoring, expanded test coverage, and additional accessibility features. The modular architecture supports easy addition of new features and scaling of the application.

For any query write an email to leading developer at inaumanmajeed@gmail.com
