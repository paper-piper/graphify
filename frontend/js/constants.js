// Visual + simulation constants. Pure data, no behaviour.
window.GraphExplorer = window.GraphExplorer || {};

GraphExplorer.constants = {
  // Accent palette (selection / highlight)
  accent: 'oklch(0.55 0.15 264)',
  softAccent: 'oklch(0.95 0.03 264)',
  red: 'oklch(0.55 0.18 25)',
  softRed: 'oklch(0.95 0.05 25)',

  // Per-component colours, indexed cyclically by component number.
  palette: [25, 150, 264, 55, 200, 320].map(h => ({
    stroke: `oklch(0.6 0.15 ${h})`,
    soft: `oklch(0.95 0.045 ${h})`,
  })),

  // Force-directed layout tuning.
  physics: {
    rep: 11000,     // repulsion strength
    spring: 0.018,  // edge spring constant
    rest: 130,      // edge rest length
    center: 0.006,  // pull toward canvas centre
    damp: 0.86,     // velocity damping
    maxStep: 24,    // per-frame position clamp
    margin: 28,     // keep nodes off the canvas edge
  },

  // Default logical canvas size (overridden by the measured SVG box).
  view: { vw: 1000, vh: 720 },

  nodeRadius: 20,
};
