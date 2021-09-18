// 键盘key对应声音
const keyboardToCode = {
  space: 32, // 空格键
  '`': 192,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  '0': 48,
  '-': 189,
  '=': 187,
  Backspace: 8,
  Q: 81,
  W: 87,
  E: 69,
  R: 82,
  T: 84,
  Y: 89,
  U: 85,
  I: 73,
  O: 79,
  P: 80,
  '[': 219,
  ']': 221,
  '|': 220,
  A: 65,
  S: 83,
  D: 68,
  F: 70,
  G: 71,
  H: 72,
  J: 74,
  K: 75,
  L: 76,
  ';': 186,
  "'": 222,
  Z: 90,
  X: 88,
  C: 67,
  V: 86,
  B: 66,
  N: 78,
  M: 77,
  ',': 188,
  '.': 190,
  '/': 191,
  // 小键盘
  'm/': 111,
  'm*': 106,
  'm-': 109,
  m7: 103,
  m8: 104,
  m9: 105,
  m4: 100,
  m5: 101,
  m6: 102,
  'm+': 107,
  m1: 97,
  m2: 98,
  m3: 99,
  m0: 96,
  'm.': 110
}

const codeToAudioConfig1 = {
  // 数字键第一排
  '192': 'B3',
  '49': 'C4',
  '50': 'D4',
  '51': 'E4',
  '52': 'F4',
  '53': 'G4',
  '54': 'A4',
  '55': 'B4',
  '56': 'C5',
  '57': 'D5',
  '48': 'E5',
  '189': 'F5',
  '187': 'G5',
  '8': 'A5',
  // QWE 这一排
  '81': 'C3',
  '87': 'D3',
  '69': 'E3',
  '82': 'F3',
  '84': 'G3',
  '89': 'A3',
  '85': 'B3',
  '73': 'C4',
  '79': 'D4',
  '80': 'E4',
  '219': 'F4',
  '221': 'G4',
  '220': 'A4',
  // ASD这一排
  '65': 'C2',
  '83': 'D2',
  '68': 'E2',
  '70': 'F2',
  '71': 'G2',
  '72': 'A2',
  '74': 'B2',
  '75': 'C3',
  '76': 'D3',
  '186': 'E3',
  '222': 'F3',
  // ZXC这一排
  '90': 'C1',
  '88': 'D1',
  '67': 'E1',
  '86': 'F1',
  '66': 'G1',
  '78': 'A1',
  '77': 'B1',
  '188': 'C2',
  '190': 'D2',
  '191': 'E2',
  // 小键盘
  '111': 'B5',
  '106': 'C6',
  '109': 'D6',
  '103': 'E6',
  '104': 'F6',
  '105': 'G6',
  '100': 'A6',
  '101': 'B6',
  '102': 'C7',
  '107': 'D7',
  '97': 'E7',
  '98': 'F7',
  '99': 'G7',
  '96': 'A7',
  '110': 'B7'
}

// 键盘顺序,以音作为标识
const keysOrder = [
  'C1',
  'D1',
  'E1',
  'F1',
  'G1',
  'A1',
  'B1',
  'C2',
  'D2',
  'E2',
  'F2',
  'G2',
  'A2',
  'B2',
  'C3',
  'D3',
  'E3',
  'F3',
  'G3',
  'A3',
  'B3',
  'C4',
  'D4',
  'E4',
  'F4',
  'G4',
  'A4',
  'B4',
  'C5',
  'D5',
  'E5',
  'F5',
  'G5',
  'A5',
  'B5',
  'C6',
  'D6',
  'E6',
  'F6',
  'G6',
  'A6',
  'B6',
  'C7',
  'D7',
  'E7',
  'F7',
  'G7',
  'A7',
  'B7'
]

const blackKeys = [
  'Db1',
  'Eb1',
  'Gb1',
  'Ab1',
  'Bb1',
  'Db2',
  'Eb2',
  'Gb2',
  'Ab2',
  'Bb2',
  'Db3',
  'Eb3',
  'Gb3',
  'Ab3',
  'Bb3',
  'Db4',
  'Eb4',
  'Gb4',
  'Ab4',
  'Bb4',
  'Db5',
  'Eb5',
  'Gb5',
  'Ab5',
  'Bb5',
  'Db6',
  'Eb6',
  'Gb6',
  'Ab6',
  'Bb6',
  'Db7',
  'Eb7',
  'Gb7',
  'Ab7',
  'Bb7'
]
// console.log(keysOrder.length)
export { keyboardToCode, codeToAudioConfig1, keysOrder, blackKeys }