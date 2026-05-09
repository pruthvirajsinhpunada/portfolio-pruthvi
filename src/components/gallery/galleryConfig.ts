// Per-project ambience presets for the cinematic gallery.
// Layout constants for the 3D hall.

export const SPACING = 5.2;            // X-distance between monoliths
export const MONOLITH_W = 2.6;         // slab width (units)
export const MONOLITH_H = 3.6;         // slab height (units)
export const MONOLITH_Z = 0;           // slab Z position
export const CAMERA_Y = 1.6;
export const CAMERA_Z = 4.7;
export const CAMERA_LOOK_AHEAD = 0.4;  // how far ahead camera looks (X-offset)

// Camera dolly margins so first/last monoliths sit nicely in frame.
export const DOLLY_PRE = 1.2;          // units before monolith[0]
export const DOLLY_POST = 1.2;         // units after monolith[N-1]

export const totalDollyDistance = (n: number): number =>
  (n - 1) * SPACING + DOLLY_PRE + DOLLY_POST;

export const monolithX = (index: number): number => index * SPACING;
