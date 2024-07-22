const PresetColor = {
  red: '#ff0000',
  classic: '#db523f',
  blue: '#3478ba',
  magenta: '#f500ff',
  purple: '#6e09c4',
  green: '#61f460',
  yellow: '#ffff63',
  yellowGreen: '#abe756',
  orange: '#fb8b06',
  aqua: '#05ffff',
}

export type TPreset = keyof typeof PresetColor;

export const getColorByPreset = (pKey: string) => {
  const presetList = Object.keys(PresetColor);
  return presetList.includes(pKey) ? PresetColor[pKey as TPreset] : pKey;
}

export const randomPreset = () => {
  const presetList = Object.keys(PresetColor);
  return presetList[Math.floor(Math.random() * presetList.length)];
}

export default PresetColor;
