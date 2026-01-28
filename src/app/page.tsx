'use client';
import { Sandpack } from '@codesandbox/sandpack-react';

export default function Home() {
  return (
    <main className="h-screen w-screen bg-[#1e1e1e] flex items-center justify-center">
      <Sandpack
        template="react-ts"
        theme="dark"
        options={{
          showNavigator: false,
          editorHeight: '80vh',
        }}
        customSetup={{
          dependencies: {
            "remotion": "4.0.100",
            "@remotion/player": "4.0.100",
            "react": "18.2.0",
            "react-dom": "18.2.0"
          }
        }}
        files={{
          "/App.tsx": `import { Player } from "@remotion/player";
import { MyComp } from "./MyComp";

export default function App() {
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#1e1e1e", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Player
        component={MyComp}
        durationInFrames={120}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        controls
        style={{ width: "100%", maxWidth: 800 }}
      />
    </div>
  );
}`,
          "/MyComp.tsx": `import { AbsoluteFill, useCurrentFrame } from "remotion";

export const MyComp = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: 80,
          color: "black",
          fontFamily: "sans-serif",
          opacity,
        }}
      >
        Mission Control
      </h1>
      <p
        style={{
          fontSize: 30,
          color: "#666",
          fontFamily: "sans-serif",
          opacity,
        }}
      >
        Frame: {frame}
      </p>
    </AbsoluteFill>
  );
};`,
        }}
      />
    </main>
  );
}
