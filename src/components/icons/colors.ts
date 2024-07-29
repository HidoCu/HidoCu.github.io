import { isHexColor, random, randomHexColor } from '@/utils';

enum EPresetColor {
  red = '#ff0000',
  classic = '#db523f',
  blue = '#3478ba',
  magenta = '#f500ff',
  purple = '#6e09c4',
  green = '#61f460',
  yellow = '#ffff63',
  yellowGreen = '#abe756',
  orange = '#fb8b06',
  aqua = '#05ffff',
}

export type TPreset = keyof typeof EPresetColor;

export const getColorByPreset = (pKey: string) => {
  const isPresent = Object.keys(EPresetColor).includes(pKey);
  if (isPresent) {
    return EPresetColor[pKey as TPreset];
  }
  if (!isHexColor(pKey)) {
    throw new Error(`String ${pKey} doesn't look like a HEX color.`)
  }
  return pKey;
}

export const randomColor = (usePresent = true) => {
  if (usePresent) {
    const presentList = Object.entries(EPresetColor);
    const [, randomColor] = presentList[random(0, presentList.length)];
    return randomColor;
  } else {
    return randomHexColor();
  }
}

export default EPresetColor;
