import "./styles/AmbientBackground.css";

// Quiet, glow-free backdrop: a soft monochrome grey→black gradient with a
// whisper of grain. No colored orbs, aurora, or particles.
const AmbientBackground = () => {
  return (
    <div className="ambient" aria-hidden>
      <div className="ambient-base" />
      <div className="ambient-noise" />
    </div>
  );
};

export default AmbientBackground;
