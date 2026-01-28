'use client';

import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react';
import { Sidebar, ActivityBar, FileExplorer } from '@/components/ide';
import {
  baseRemotionFiles,
  baseRemotionDependencies,
  defaultActiveFile,
} from '@/lib/sandpack';

export default function EditorPage() {
  return (
    <SandpackProvider
      template="react-ts"
      theme="dark"
      customSetup={{
        dependencies: baseRemotionDependencies,
      }}
      files={baseRemotionFiles}
      options={{
        activeFile: defaultActiveFile,
      }}
    >
      <main className="h-screen w-screen bg-[#1e1e1e] flex flex-col overflow-hidden">
        {/* Main IDE Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Icons */}
          <Sidebar />

          {/* File Explorer Panel */}
          <FileExplorer />

          {/* Editor Panel */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              closableTabs={false}
              style={{
                height: '100%',
                flex: 1,
              }}
            />
          </div>

          {/* Preview Panel */}
          <div className="w-[45%] border-l border-[#2d2d2d] flex flex-col overflow-hidden">
            <div className="h-[35px] flex items-center px-4 text-[11px] font-semibold text-[#bbbbbb] uppercase tracking-wider border-b border-[#2d2d2d]">
              Preview
            </div>
            <SandpackPreview
              showNavigator={false}
              showRefreshButton={false}
              style={{
                height: '100%',
                flex: 1,
              }}
            />
          </div>
        </div>

        {/* Bottom Status Bar */}
        <ActivityBar />
      </main>
    </SandpackProvider>
  );
}
