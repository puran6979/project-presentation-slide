export function SystemVideo() {
  return (
    <video
      src="/src/assets/vid/AINGO-DEMO.mp4"
      autoPlay
      controls
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}
