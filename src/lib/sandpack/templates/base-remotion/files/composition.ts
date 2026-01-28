// Composition.tsx - The main video composition component
export const compositionFile = `import { AbsoluteFill, useCurrentFrame } from "remotion";

export const MyComposition = () => {
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
};`;
