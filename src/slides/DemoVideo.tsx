import videoSrc from "../assets/vid/AINGO-DEMO.mp4";

export function DemoVideo() {
  return (
    <video
      src={videoSrc}
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
