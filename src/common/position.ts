export const PositionPresetMap = Object.freeze({
  'start-top': { top: 0, left: 0 },
  'start-middle': { top: 50, left: 0 },
  'start-bottom': { bottom: 0, left: 0 },
  'center-top': { top: 0, left: 50 },
  'center-middle': { top: 50, left: 50 },
  'center-bottom': { bottom: 0, left: 50 },
  'end-top': { top: 0, right: 0 },
  'end-middle': { top: 50, right: 0 },
  'end-bottom': { bottom: 50, right: 0 }
});

export type TPosition = keyof typeof PositionPresetMap;
