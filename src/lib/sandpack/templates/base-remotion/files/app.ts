// App.tsx - Main entry point with Remotion Player
export const appFile = `import { Player } from "@remotion/player";
import { MyComposition } from "./src/Composition";

export default function App() {
  return (
    <div style={{
      width: "100%",
      height: "100vh",
      backgroundColor: "#1e1e1e",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Player
        component={MyComposition}
        durationInFrames={60}
        compositionWidth={1280}
        compositionHeight={720}
        fps={30}
        controls
        style={{ width: "100%", maxWidth: 800 }}
      />
    </div>
  );
}`;
