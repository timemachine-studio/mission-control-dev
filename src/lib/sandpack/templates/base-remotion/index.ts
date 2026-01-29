/**
 * Base Remotion Template for Sandpack
 *
 * Structure:
 * /App.tsx              ← Sandpack preview wrapper
 * /MyComp.tsx           ← Bridge file (re-exports from /src/Composition.tsx)
 * /src/
 *   ├── Composition.tsx ← THE source of truth - AI edits THIS file
 *   ├── Root.tsx        ← Registers compositions
 *   ├── index.ts        ← Entry point
 *   ├── index.css       ← Styles
 *   └── scenes/         ← AI creates scene files here
 *
 * WHY /MyComp.tsx exists:
 * Sandpack can't import from ./src/Composition directly (bundler limitation).
 * So /MyComp.tsx re-exports from /src/Composition.tsx as a workaround.
 * AI should ONLY edit /src/Composition.tsx - never touch /MyComp.tsx or /App.tsx.
 */

// Import source files
import {
  appFile,
  myCompBridge,
  compositionFile,
  rootFile,
  indexEntryFile,
  stylesFile,
} from "./files/src-files";

// Type for Sandpack files object
export type SandpackFiles = Record<string, string>;

/**
 * Sandpack files
 */
export const baseRemotionFiles: SandpackFiles = {
  // Sandpack preview files (don't edit these)
  "/App.tsx": appFile,
  "/MyComp.tsx": myCompBridge, // Bridge: re-exports from /src/Composition.tsx

  // Remotion source files - AI edits these!
  "/src/Composition.tsx": compositionFile,
  "/src/Root.tsx": rootFile,
  "/src/index.ts": indexEntryFile,
  "/src/index.css": stylesFile,
};

/**
 * Sandpack custom setup for Remotion projects
 * IMPORTANT: Using 4.0.100 with React 18 - these are the WORKING versions
 */
export const baseRemotionDependencies = {
  remotion: "4.0.100",
  "@remotion/player": "4.0.100",
  react: "18.2.0",
  "react-dom": "18.2.0",
};

/**
 * Default active file when opening the editor
 */
export const defaultActiveFile = "/src/Composition.tsx";
