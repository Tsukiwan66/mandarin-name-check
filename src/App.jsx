import React, { useState } from 'react';

// ============ NAME GENERATION LOGIC ============
const surnameMap = {
  a: ['安', '艾'], b: ['柏', '白'], c: ['陳', '秦'], d: ['戴', '德'],
  e: ['伊', '恩'], f: ['方', '馮'], g: ['高', '顧'], h: ['何', '韓'],
  i: ['伊', '依'], j: ['江', '簡'], k: ['柯', '凱'], l: ['林', '李'],
  m: ['麥', '莫'], n: ['寧', '南'], o: ['歐', '奧'], p: ['潘', '彭'],
  q: ['秦', '錢'], r: ['任', '瑞'], s: ['蘇', '沈'], t: ['唐', '陶'],
  u: ['于', '宇'], v: ['萬', '維'], w: ['王', '汪'], x: ['夏', '謝'],
  y: ['葉', '楊'], z: ['趙', '鄭']
};

const pinyinMap = {
  '安': 'ān', '艾': 'ài', '柏': 'bǎi', '白': 'bái', '陳': 'chén', '秦': 'qín',
  '戴': 'dài', '德': 'dé', '伊': 'yī', '恩': 'ēn', '方': 'fāng', '馮': 'féng',
  '高': 'gāo', '顧': 'gù', '何': 'hé', '韓': 'hán', '依': 'yī', '江': 'jiāng',
  '簡': 'jiǎn', '柯': 'kē', '凱': 'kǎi', '林': 'lín', '李': 'lǐ', '麥': 'mài',
  '莫': 'mò', '寧': 'níng', '南': 'nán', '歐': 'ōu', '奧': 'ào', '潘': 'pān',
  '彭': 'péng', '錢': 'qián', '任': 'rèn', '瑞': 'ruì', '蘇': 'sū', '沈': 'shěn',
  '唐': 'táng', '陶': 'táo', '于': 'yú', '宇': 'yǔ', '萬': 'wàn', '維': 'wéi',
  '王': 'wáng', '汪': 'wāng', '夏': 'xià', '謝': 'xiè', '葉': 'yè', '楊': 'yáng',
  '趙': 'zhào', '鄭': 'zhèng',
  '夜': 'yè', '星': 'xīng', '雲': 'yún', '玄': 'xuán', '墨': 'mò', '思': 'sī',
  '舒': 'shū', '閒': 'xián', '野': 'yě', '予': 'yǔ', '知': 'zhī', '秋': 'qiū',
  '青': 'qīng', '川': 'chuān', '遠': 'yuǎn', '問': 'wèn', '然': 'rán', '和': 'hé',
  '深': 'shēn', '渡': 'dù', '書': 'shū', '靜': 'jìng', '禪': 'chán',
  '慢': 'màn', '淡': 'dàn', '謙': 'qiān', '悠': 'yōu', '傲': 'ào',
  '逆': 'nì', '狂': 'kuáng', '覺': 'jué', '觀': 'guān', '憶': 'yì', '夢': 'mèng',
  '悟': 'wù', '朗': 'lǎng'
};

const charMeaning = {
  '夜': 'night', '星': 'star', '雲': 'cloud', '玄': 'mystery',
  '墨': 'ink', '思': 'thought', '舒': 'ease', '閒': 'leisure',
  '野': 'wild', '予': 'to give', '知': 'knowing', '秋': 'autumn',
  '青': 'azure', '川': 'river', '遠': 'distant', '問': 'to ask',
  '然': 'so it is', '和': 'harmony', '深': 'depth', '渡': 'to cross',
  '書': 'book', '白': 'white', '靜': 'stillness', '禪': 'zen',
  '慢': 'slow', '淡': 'plain', '安': 'peace', '謙': 'humble',
  '悠': 'leisurely', '傲': 'proud', '逆': 'against', '狂': 'untamed',
  '覺': 'awake', '觀': 'to observe', '憶': 'memory', '夢': 'dream',
  '悟': 'insight', '朗': 'clear light'
};

const archetypes = {
  cyber_taoist: {
    id: 'cyber_taoist', en: 'Cyber Taoist', zh: '賽博道士',
    middle: ['夜', '星', '雲', '玄'], last: ['然', '和', '深', '渡'],
    elements: ['water', 'wood'],
    tagline: 'Code by day, I Ching by night.',
    taglineZh: '白日寫碼 · 夜裡問卦',
    percent: 14
  },
  scholar: {
    id: 'scholar', en: 'Midnight Scholar', zh: '夜讀人',
    middle: ['墨', '書', '思', '白'], last: ['靜', '然', '深', '青'],
    elements: ['metal', 'water'],
    tagline: 'Thinks clearest when the world sleeps.',
    taglineZh: '世界安靜時 · 思緒最清',
    percent: 11
  },
  slow_sage: {
    id: 'slow_sage', en: 'Slow Sage', zh: '慢活仙人',
    middle: ['雲', '閒', '慢', '禪'], last: ['舒', '淡', '悠', '然'],
    elements: ['earth', 'water'],
    tagline: 'Sips tea, watches empires fall.',
    taglineZh: '一杯清茶 · 看盡興衰',
    percent: 9
  },
  corporate_mystic: {
    id: 'corporate_mystic', en: 'Corporate Mystic', zh: '玄學打工人',
    middle: ['予', '謙', '知'], last: ['安', '遠', '和'],
    elements: ['metal', 'fire'],
    tagline: 'Tarot cards between Zoom calls.',
    taglineZh: '會議間隙 · 順便占卜',
    percent: 18
  },
  zen_rebel: {
    id: 'zen_rebel', en: 'Zen Rebel', zh: '禪反骨',
    middle: ['野', '傲', '逆'], last: ['川', '狂', '然'],
    elements: ['fire', 'earth'],
    tagline: 'Quiet outside, riot inside.',
    taglineZh: '外表平靜 · 內心起義',
    percent: 8
  },
  oracle: {
    id: 'oracle', en: 'Ironic Oracle', zh: '反諷先知',
    middle: ['知', '觀', '覺'], last: ['秋', '遠', '然'],
    elements: ['wood', 'metal'],
    tagline: 'Believes in fate. Ironically.',
    taglineZh: '相信命運 · 但很反諷',
    percent: 12
  },
  dreamer: {
    id: 'dreamer', en: 'Analog Dreamer', zh: '類比夢遊者',
    middle: ['青', '憶', '夢'], last: ['川', '然', '遠'],
    elements: ['water', 'wood'],
    tagline: 'Nostalgic for futures that never came.',
    taglineZh: '懷念從未到來的未來',
    percent: 15
  },
  cafe_philosopher: {
    id: 'cafe_philosopher', en: 'Café Philosopher', zh: '咖啡哲人',
    middle: ['思', '問', '悟'], last: ['遠', '朗', '然'],
    elements: ['earth', 'fire'],
    tagline: 'Two espressos and a theory of everything.',
    taglineZh: '兩杯濃縮 · 一套宇宙觀',
    percent: 13
  }
};

const generateName = (englishName, archetypeId) => {
  const firstLetter = (englishName || 'a').trim().toLowerCase()[0];
  const surnameOptions = surnameMap[firstLetter] || ['林'];
  const arch = archetypes[archetypeId];
  const seed = (englishName || '').length;
  const surname = surnameOptions[seed % surnameOptions.length];
  const middle = arch.middle[(seed + 1) % arch.middle.length];
  const last = arch.last[(seed + 2) % arch.last.length];
  const pinyin = `${pinyinMap[surname]} ${pinyinMap[middle]} ${pinyinMap[last]}`;
  return { chinese: `${surname}${middle}${last}`, pinyin, surname, middle, last };
};

// ============ ZODIAC (symbol-based) ============
const zodiacs = [
  { animal: 'Rat', zh: '鼠', trait: 'clever · resourceful', rarity: 8.1 },
  { animal: 'Ox', zh: '牛', trait: 'steady · enduring', rarity: 9.2 },
  { animal: 'Tiger', zh: '虎', trait: 'bold · untamed', rarity: 7.4 },
  { animal: 'Rabbit', zh: '兔', trait: 'gentle · intuitive', rarity: 9.8 },
  { animal: 'Dragon', zh: '龍', trait: 'magnetic · fated', rarity: 11.3 },
  { animal: 'Snake', zh: '蛇', trait: 'wise · enigmatic', rarity: 6.9 },
  { animal: 'Horse', zh: '馬', trait: 'free · driven', rarity: 8.7 },
  { animal: 'Goat', zh: '羊', trait: 'tender · creative', rarity: 7.2 },
  { animal: 'Monkey', zh: '猴', trait: 'sharp · playful', rarity: 8.4 },
  { animal: 'Rooster', zh: '雞', trait: 'honest · precise', rarity: 7.6 },
  { animal: 'Dog', zh: '狗', trait: 'loyal · just', rarity: 8.9 },
  { animal: 'Pig', zh: '豬', trait: 'generous · warm', rarity: 6.5 }
];
const getZodiac = (year) => {
  const idx = ((year - 2020) % 12 + 12) % 12;
  return { ...zodiacs[idx], index: idx };
};

// Minimalist zodiac SVG symbols — line art, 60x60
const ZodiacSymbol = ({ index, size = 60, stroke = "#1a1a1a", strokeWidth = 1.8 }) => {
  const common = { width: size, height: size, viewBox: "0 0 60 60", fill: "none", stroke, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  const symbols = [
    // Rat 🐀
    <svg key="rat" {...common}>
      <ellipse cx="30" cy="35" rx="14" ry="10"/>
      <circle cx="42" cy="30" r="7"/>
      <circle cx="38" cy="24" r="2.5"/>
      <circle cx="46" cy="24" r="2.5"/>
      <circle cx="47" cy="30" r="0.8" fill={stroke}/>
      <path d="M 16 37 Q 8 42 5 52" />
    </svg>,
    // Ox 🐂
    <svg key="ox" {...common}>
      <circle cx="30" cy="34" r="12"/>
      <path d="M 18 28 Q 12 18 16 14"/>
      <path d="M 42 28 Q 48 18 44 14"/>
      <circle cx="26" cy="33" r="1" fill={stroke}/>
      <circle cx="34" cy="33" r="1" fill={stroke}/>
      <path d="M 28 40 Q 30 42 32 40"/>
    </svg>,
    // Tiger 🐅
    <svg key="tiger" {...common}>
      <circle cx="30" cy="32" r="14"/>
      <path d="M 18 24 L 21 19"/>
      <path d="M 25 20 L 26 15"/>
      <path d="M 34 20 L 35 15"/>
      <path d="M 42 24 L 39 19"/>
      <circle cx="25" cy="31" r="1.2" fill={stroke}/>
      <circle cx="35" cy="31" r="1.2" fill={stroke}/>
      <path d="M 28 38 Q 30 40 32 38"/>
      <path d="M 30 34 L 30 37"/>
    </svg>,
    // Rabbit 🐇
    <svg key="rabbit" {...common}>
      <circle cx="30" cy="38" r="11"/>
      <ellipse cx="24" cy="20" rx="3" ry="10"/>
      <ellipse cx="36" cy="20" rx="3" ry="10"/>
      <circle cx="26" cy="37" r="1" fill={stroke}/>
      <circle cx="34" cy="37" r="1" fill={stroke}/>
      <path d="M 30 40 L 30 42"/>
      <path d="M 28 44 Q 30 46 32 44"/>
    </svg>,
    // Dragon 🐉
    <svg key="dragon" {...common}>
      <path d="M 10 45 Q 15 35 22 38 Q 28 40 30 32 Q 32 22 40 22 Q 48 22 50 14"/>
      <path d="M 48 16 L 52 12"/>
      <path d="M 46 14 L 48 10"/>
      <circle cx="47" cy="19" r="0.8" fill={stroke}/>
      <path d="M 22 38 L 18 42 M 26 35 L 23 40 M 30 32 L 27 36 M 34 28 L 32 32 M 38 25 L 36 28"/>
    </svg>,
    // Snake 🐍
    <svg key="snake" {...common}>
      <path d="M 12 48 Q 20 40 18 32 Q 16 24 24 20 Q 32 16 36 22 Q 40 28 46 26"/>
      <path d="M 44 24 L 48 22 M 44 28 L 48 28"/>
      <circle cx="42" cy="25" r="0.8" fill={stroke}/>
    </svg>,
    // Horse 🐎
    <svg key="horse" {...common}>
      <path d="M 20 45 L 20 28 Q 20 18 30 14 L 42 10"/>
      <path d="M 42 10 Q 46 12 46 18 L 44 22"/>
      <path d="M 30 14 Q 24 10 22 14 Q 20 18 22 20"/>
      <circle cx="42" cy="17" r="0.8" fill={stroke}/>
      <path d="M 20 45 L 16 52 M 28 45 L 28 52"/>
    </svg>,
    // Goat 🐐
    <svg key="goat" {...common}>
      <ellipse cx="30" cy="35" rx="10" ry="12"/>
      <path d="M 22 26 Q 16 20 18 14"/>
      <path d="M 38 26 Q 44 20 42 14"/>
      <circle cx="26" cy="34" r="1" fill={stroke}/>
      <circle cx="34" cy="34" r="1" fill={stroke}/>
      <path d="M 28 42 Q 30 44 32 42"/>
      <path d="M 30 45 L 30 50"/>
    </svg>,
    // Monkey 🐒
    <svg key="monkey" {...common}>
      <circle cx="30" cy="32" r="13"/>
      <ellipse cx="30" cy="36" rx="7" ry="6"/>
      <circle cx="18" cy="28" r="4"/>
      <circle cx="42" cy="28" r="4"/>
      <circle cx="26" cy="30" r="1" fill={stroke}/>
      <circle cx="34" cy="30" r="1" fill={stroke}/>
      <path d="M 28 38 Q 30 40 32 38"/>
    </svg>,
    // Rooster 🐓
    <svg key="rooster" {...common}>
      <circle cx="32" cy="32" r="11"/>
      <path d="M 26 22 Q 24 16 28 16 Q 30 12 32 16 Q 36 14 34 20"/>
      <path d="M 41 32 L 48 32 L 45 36"/>
      <circle cx="37" cy="30" r="0.8" fill={stroke}/>
      <path d="M 32 43 L 30 50 M 34 43 L 36 50"/>
    </svg>,
    // Dog 🐕
    <svg key="dog" {...common}>
      <circle cx="30" cy="34" r="12"/>
      <path d="M 18 24 Q 14 20 18 16 L 24 24"/>
      <path d="M 42 24 Q 46 20 42 16 L 36 24"/>
      <circle cx="26" cy="33" r="1" fill={stroke}/>
      <circle cx="34" cy="33" r="1" fill={stroke}/>
      <ellipse cx="30" cy="38" rx="2" ry="1.5" fill={stroke}/>
      <path d="M 28 42 Q 30 44 32 42"/>
    </svg>,
    // Pig 🐖
    <svg key="pig" {...common}>
      <circle cx="30" cy="34" r="13"/>
      <ellipse cx="30" cy="38" rx="5" ry="4"/>
      <circle cx="28" cy="38" r="0.8" fill={stroke}/>
      <circle cx="32" cy="38" r="0.8" fill={stroke}/>
      <path d="M 22 24 L 20 18 L 26 22"/>
      <path d="M 38 24 L 40 18 L 34 22"/>
      <circle cx="25" cy="30" r="0.8" fill={stroke}/>
      <circle cx="35" cy="30" r="0.8" fill={stroke}/>
    </svg>
  ];
  return symbols[index];
};

// ============ CHARACTER ILLUSTRATIONS ============
const Character = ({ type }) => {
  const common = { width: "90", height: "115", viewBox: "0 0 90 115", className: "wobble" };
  if (type === 'cyber_taoist') return (
    <svg {...common}>
      <line x1="45" y1="8" x2="45" y2="2" stroke="#1a1a1a" strokeWidth="1.5"/>
      <circle cx="45" cy="2" r="2" fill="#1a1a1a"/>
      <circle cx="45" cy="25" r="14" fill="none" stroke="#1a1a1a" strokeWidth="2"/>
      <circle cx="40" cy="24" r="1.3" fill="#1a1a1a"/>
      <circle cx="50" cy="24" r="1.3" fill="#1a1a1a"/>
      <path d="M 42 30 Q 45 32 48 30" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
      <path d="M 45 39 Q 38 55 42 75 Q 45 90 42 100" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 50 Q 30 52 25 62" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 50 Q 60 52 65 62" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <circle cx="22" cy="62" r="2" fill="#1a1a1a"/>
      <circle cx="68" cy="62" r="2" fill="#1a1a1a"/>
      <line x1="42" y1="100" x2="35" y2="112" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="42" y1="100" x2="48" y2="112" stroke="#1a1a1a" strokeWidth="2"/>
    </svg>
  );
  if (type === 'scholar') return (
    <svg {...common}>
      <circle cx="45" cy="25" r="14" fill="none" stroke="#1a1a1a" strokeWidth="2"/>
      <path d="M 32 18 Q 45 8 58 18 Q 58 12 45 10 Q 32 12 32 18 Z" fill="#1a1a1a"/>
      <line x1="38" y1="25" x2="43" y2="25" stroke="#1a1a1a" strokeWidth="1.5"/>
      <line x1="47" y1="25" x2="52" y2="25" stroke="#1a1a1a" strokeWidth="1.5"/>
      <path d="M 45 39 Q 40 58 45 78 Q 48 92 45 100" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 55 Q 32 60 30 70" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 55 Q 58 60 60 70" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <rect x="28" y="68" width="34" height="14" fill="#1a1a1a" rx="1"/>
      <line x1="42" y1="100" x2="35" y2="112" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="48" y1="100" x2="55" y2="112" stroke="#1a1a1a" strokeWidth="2"/>
    </svg>
  );
  if (type === 'slow_sage') return (
    <svg {...common}>
      <circle cx="45" cy="28" r="14" fill="none" stroke="#1a1a1a" strokeWidth="2"/>
      <path d="M 38 23 Q 41 21 43 23" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
      <path d="M 47 23 Q 50 21 52 23" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
      <path d="M 42 33 Q 45 34 48 33" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
      <path d="M 45 42 Q 35 60 40 80 Q 45 95 42 102" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 60 Q 58 58 68 62" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 60 Q 35 62 28 66" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <rect x="62" y="56" width="12" height="10" fill="none" stroke="#1a1a1a" strokeWidth="1.5" rx="1"/>
      <path d="M 64 52 Q 65 48 64 44" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
      <path d="M 68 52 Q 69 48 68 44" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
      <path d="M 72 52 Q 73 48 72 44" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
      <line x1="42" y1="102" x2="35" y2="112" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="42" y1="102" x2="48" y2="112" stroke="#1a1a1a" strokeWidth="2"/>
    </svg>
  );
  if (type === 'corporate_mystic') return (
    <svg {...common}>
      <circle cx="45" cy="25" r="14" fill="none" stroke="#1a1a1a" strokeWidth="2"/>
      <circle cx="40" cy="24" r="1.3" fill="#1a1a1a"/>
      <circle cx="50" cy="24" r="1.3" fill="#1a1a1a"/>
      <path d="M 45 39 L 45 45 L 42 50 L 48 50 L 45 55 L 45 75" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 45 L 35 55 L 38 85" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 45 L 55 55 L 52 85" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 55 Q 55 60 62 58" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <circle cx="67" cy="56" r="5" fill="none" stroke="#1a1a1a" strokeWidth="1.5"/>
      <circle cx="67" cy="56" r="1.5" fill="#1a1a1a"/>
      <line x1="38" y1="85" x2="35" y2="100" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="52" y1="85" x2="55" y2="100" stroke="#1a1a1a" strokeWidth="2"/>
    </svg>
  );
  if (type === 'zen_rebel') return (
    <svg {...common}>
      <circle cx="45" cy="25" r="14" fill="none" stroke="#1a1a1a" strokeWidth="2"/>
      <path d="M 30 18 L 35 10 M 45 10 L 45 6 M 55 12 L 60 18" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="40" y1="24" x2="43" y2="24" stroke="#1a1a1a" strokeWidth="1.5"/>
      <line x1="47" y1="24" x2="50" y2="24" stroke="#1a1a1a" strokeWidth="1.5"/>
      <path d="M 45 39 L 45 70" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 50 L 25 55 L 30 58" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 50 L 65 55 L 60 58" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 70 Q 30 75 28 95" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 70 Q 60 75 62 95" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
    </svg>
  );
  if (type === 'oracle') return (
    <svg {...common}>
      <circle cx="45" cy="25" r="14" fill="none" stroke="#1a1a1a" strokeWidth="2"/>
      <path d="M 38 23 Q 41 25 44 23" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
      <path d="M 46 23 Q 49 25 52 23" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
      <path d="M 42 32 Q 45 30 48 32" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
      <path d="M 45 39 Q 42 60 45 80 Q 48 95 45 100" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 50 Q 32 55 28 68" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 50 Q 60 52 68 48" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <circle cx="72" cy="45" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5"/>
      <circle cx="72" cy="45" r="3" fill="#1a1a1a"/>
      <line x1="42" y1="100" x2="35" y2="112" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="48" y1="100" x2="55" y2="112" stroke="#1a1a1a" strokeWidth="2"/>
    </svg>
  );
  if (type === 'dreamer') return (
    <svg {...common}>
      <circle cx="45" cy="25" r="14" fill="none" stroke="#1a1a1a" strokeWidth="2"/>
      <path d="M 28 25 Q 28 10 45 10 Q 62 10 62 25" fill="none" stroke="#1a1a1a" strokeWidth="2"/>
      <rect x="25" y="23" width="7" height="10" fill="#1a1a1a" rx="2"/>
      <rect x="58" y="23" width="7" height="10" fill="#1a1a1a" rx="2"/>
      <circle cx="40" cy="26" r="1.3" fill="#1a1a1a"/>
      <circle cx="50" cy="26" r="1.3" fill="#1a1a1a"/>
      <path d="M 45 39 Q 40 55 45 75 Q 50 90 45 102" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 52 Q 30 58 22 55" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 52 Q 60 58 68 55" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <line x1="42" y1="102" x2="35" y2="112" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="48" y1="102" x2="55" y2="112" stroke="#1a1a1a" strokeWidth="2"/>
    </svg>
  );
  if (type === 'cafe_philosopher') return (
    <svg {...common}>
      <circle cx="45" cy="25" r="14" fill="none" stroke="#1a1a1a" strokeWidth="2"/>
      <circle cx="40" cy="24" r="1.3" fill="#1a1a1a"/>
      <circle cx="50" cy="24" r="1.3" fill="#1a1a1a"/>
      <path d="M 40 30 Q 43 32 45 30 Q 47 32 50 30" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
      <path d="M 45 39 Q 40 58 45 78 Q 48 92 45 100" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 52 Q 32 55 25 50" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M 45 52 Q 58 58 65 65" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <rect x="62" y="62" width="10" height="9" fill="none" stroke="#1a1a1a" strokeWidth="1.5" rx="1"/>
      <path d="M 72 64 Q 76 64 76 67 Q 76 70 72 70" fill="none" stroke="#1a1a1a" strokeWidth="1.2"/>
      <path d="M 64 58 Q 65 54 64 51" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
      <path d="M 68 58 Q 69 54 68 51" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
      <line x1="42" y1="100" x2="35" y2="112" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="48" y1="100" x2="55" y2="112" stroke="#1a1a1a" strokeWidth="2"/>
    </svg>
  );
  return null;
};

// ============ QUIZ ============
const questions = [
  {
    q: "It's 2:47am. You're awake. What's actually happening in your head?",
    qZh: "凌晨 2:47，你醒著。腦子裡在幹嘛？",
    options: [
      { text: "Debugging something from three weeks ago", archs: ['cyber_taoist', 'scholar'] },
      { text: "Replaying a 2019 conversation, word by word", archs: ['dreamer', 'oracle'] },
      { text: "Just… noticing the ceiling", archs: ['slow_sage', 'cafe_philosopher'] },
      { text: "Drafting a manifesto. It's going well.", archs: ['zen_rebel', 'corporate_mystic'] }
    ]
  },
  {
    q: "Your group chat is arguing about pineapple on pizza. You:",
    qZh: "群組在吵鳳梨該不該上披薩。你：",
    options: [
      { text: "Drop one sentence that quietly ends the debate", archs: ['oracle', 'zen_rebel'] },
      { text: "Write a four-paragraph historical analysis", archs: ['scholar', 'cafe_philosopher'] },
      { text: "Send the one perfect meme. Log off.", archs: ['corporate_mystic', 'dreamer'] },
      { text: "Exit quietly. Boil water for tea.", archs: ['slow_sage', 'cyber_taoist'] }
    ]
  },
  {
    q: "A stranger at a café asks, \"so what do you actually do?\" Your honest answer:",
    qZh: "咖啡店陌生人問：「你到底是做什麼的？」你的誠實回答：",
    options: [
      { text: "\"Spiritually? Monk. Legally? Consultant.\"", archs: ['corporate_mystic', 'cyber_taoist'] },
      { text: "\"I mostly just… observe things.\"", archs: ['oracle', 'dreamer'] },
      { text: "\"I'm working on something. Hard to explain.\"", archs: ['scholar', 'cafe_philosopher'] },
      { text: "\"You first.\"", archs: ['zen_rebel', 'slow_sage'] }
    ]
  },
  {
    q: "Pick a small recent obsession:",
    qZh: "挑一個你最近莫名著迷的事：",
    options: [
      { text: "A celebrity's birth chart", archs: ['corporate_mystic', 'oracle'] },
      { text: "Sourdough from scratch", archs: ['slow_sage', 'dreamer'] },
      { text: "A half-finished philosopher's name", archs: ['scholar', 'cyber_taoist'] },
      { text: "Whether or not you're the villain", archs: ['zen_rebel', 'cafe_philosopher'] }
    ]
  },
  {
    q: "You get one superpower: overnight fluency in any language. You choose:",
    qZh: "你獲得一個超能力：一夜精通任何語言。你選：",
    options: [
      { text: "Classical Chinese", archs: ['cyber_taoist', 'scholar'] },
      { text: "Whale song", archs: ['dreamer', 'slow_sage'] },
      { text: "Legalese", archs: ['corporate_mystic', 'oracle'] },
      { text: "Sign language — but sarcastic", archs: ['zen_rebel', 'cafe_philosopher'] }
    ]
  },
  {
    q: "Pick the opening line of a novel you haven't written:",
    qZh: "挑一句你還沒寫的小說開頭：",
    options: [
      { text: "\"The rain started at 3pm, and neither of us moved.\"", archs: ['dreamer', 'slow_sage'] },
      { text: "\"He was lying, but that wasn't the interesting part.\"", archs: ['oracle', 'zen_rebel'] },
      { text: "\"Everything began with a spreadsheet and a small betrayal.\"", archs: ['corporate_mystic', 'cafe_philosopher'] },
      { text: "\"In the version of the world where you stayed—\"", archs: ['scholar', 'cyber_taoist'] }
    ]
  }
];

// ============ MAIN APP ============
export default function App() {
  const [page, setPage] = useState('landing');
  const [name, setName] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [birthYear, setBirthYear] = useState('');
  const [zodiac, setZodiac] = useState(null);

  const startQuiz = () => {
    setScores({});
    setCurrentQ(0);
    setPage('name');
  };

  const submitName = () => {
    if (name.trim().length < 1) return;
    setPage('quiz');
  };

  const answerQuestion = (option) => {
    const newScores = { ...scores };
    option.archs.forEach(a => { newScores[a] = (newScores[a] || 0) + 1; });
    setScores(newScores);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const topArch = Object.entries(newScores).sort((a,b) => b[1]-a[1])[0][0];
      const generated = generateName(name, topArch);
      setResult({ archetype: archetypes[topArch], ...generated });
      setPage('zodiac');
    }
  };

  const finishWithZodiac = (addZodiac) => {
    if (addZodiac && birthYear.length === 4) {
      const y = parseInt(birthYear);
      if (y >= 1900 && y <= 2026) setZodiac(getZodiac(y));
    }
    setTimeout(() => setRevealed(true), 300);
    setPage('result');
  };

  const restart = () => {
    setPage('landing');
    setName(''); setCurrentQ(0); setScores({});
    setResult(null); setRevealed(false);
    setBirthYear(''); setZodiac(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ddd6c9', fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <style>{`
        @keyframes wobble {
          0%, 100% { transform: rotate(-3deg) translateY(0); }
          25% { transform: rotate(2.5deg) translateY(-2px); }
          50% { transform: rotate(-2deg) translateY(1px); }
          75% { transform: rotate(3deg) translateY(-1px); }
        }
        .wobble { animation: wobble 2.8s ease-in-out infinite; transform-origin: 50% 90%; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease-out; }
        @keyframes revealName {
          0% { opacity: 0; transform: scale(0.5); letter-spacing: 40px; }
          60% { opacity: 1; }
          100% { opacity: 1; transform: scale(1); letter-spacing: 6px; }
        }
        .reveal-name { animation: revealName 1.2s ease-out; }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .count-up { animation: countUp 1.5s ease-out 0.8s both; }
        .cn-font { font-family: 'Songti SC', 'STSong', 'SimSun', serif; }
        .flip-card-inner {
          position: relative;
          width: 100%;
          transition: transform 0.9s cubic-bezier(0.4, 0.2, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card-inner.flipped { transform: rotateY(180deg); }
        .flip-face {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-back { transform: rotateY(180deg); }
        @keyframes hintPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .hint-pulse { animation: hintPulse 2s ease-in-out infinite; }
        @keyframes zodiacIn {
          from { opacity: 0; transform: scale(0.6) rotate(-20deg); }
          to { opacity: 1; transform: scale(1) rotate(0); }
        }
        .zodiac-in { animation: zodiacIn 0.8s ease-out; }
      `}</style>

      {page === 'landing' && <Landing onStart={startQuiz} />}
      {page === 'name' && <NameInput name={name} setName={setName} onSubmit={submitName} onBack={() => setPage('landing')} />}
      {page === 'quiz' && <Quiz question={questions[currentQ]} current={currentQ} total={questions.length} onAnswer={answerQuestion} />}
      {page === 'zodiac' && <ZodiacStep birthYear={birthYear} setBirthYear={setBirthYear} onDone={finishWithZodiac} />}
      {page === 'result' && result && <Result name={name} result={result} zodiac={zodiac} revealed={revealed} onRestart={restart} />}
    </div>
  );
}

// ============ LANDING ============
const Landing = ({ onStart }) => (
  <div className="max-w-5xl mx-auto px-6 py-12">
    <div className="flex justify-between items-center mb-20">
      <div className="cn-font text-lg font-semibold">漢 · name</div>
      <div className="text-xs tracking-widest uppercase text-stone-600">EST. 2026</div>
    </div>

    <div className="fade-up text-center mb-24">
      <div className="text-xs tracking-widest uppercase text-stone-600 mb-6">· a personal identity ritual ·</div>
      <h1 className="text-6xl md:text-7xl font-light tracking-tight text-stone-900 mb-6 leading-none">
        Your Chinese Name,<br/>
        <span className="italic">earned</span> — not generated.
      </h1>
      <p className="text-lg text-stone-700 max-w-xl mx-auto mb-3 leading-relaxed">
        Answer six oddly specific questions. Discover one of eight archetypes. 
        Receive a name written just for you — phonetic, poetic, and yours alone.
      </p>
      <p className="cn-font text-sm text-stone-500 mb-12 tracking-widest">· 六 題 · 八 格 · 一 名 ·</p>
      <button onClick={onStart} className="bg-stone-900 text-stone-100 px-10 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors">
        Begin the Ritual →
      </button>
    </div>

    <div className="mb-24 fade-up">
      <div className="text-center mb-12">
        <div className="text-xs tracking-widest uppercase text-stone-600 mb-2">How it works</div>
        <h2 className="text-3xl font-light text-stone-900">Three simple steps</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { n: '01', en: 'Tell us your name', zh: '留下英文名', desc: 'Your English name shapes the sound of your Chinese surname.' },
          { n: '02', en: 'Answer six questions', zh: '回答六題', desc: 'Each reveals a facet of your inner archetype — no right answers.' },
          { n: '03', en: 'Receive your name', zh: '收獲新名', desc: 'A unique three-character name with its own little story on the back.' },
        ].map(step => (
          <div key={step.n} className="rounded-2xl p-8" style={{ backgroundColor: '#f5f1e8' }}>
            <div className="text-xs tracking-widest text-stone-500 mb-4">{step.n}</div>
            <div className="text-xl font-medium mb-1">{step.en}</div>
            <div className="cn-font text-xs text-stone-500 tracking-widest mb-4">{step.zh}</div>
            <p className="text-sm text-stone-700 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-24">
      <div className="text-center mb-12">
        <div className="text-xs tracking-widest uppercase text-stone-600 mb-2">The Eight</div>
        <h2 className="text-3xl font-light text-stone-900">Which soul is yours?</h2>
        <p className="cn-font text-xs text-stone-500 tracking-widest mt-2">· 八 種 靈 魂 ·</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.values(archetypes).map(arch => (
          <div key={arch.id} className="rounded-xl p-4 text-center" style={{ backgroundColor: '#f5f1e8' }}>
            <div className="flex justify-center h-28 items-end mb-2">
              <Character type={arch.id} />
            </div>
            <div className="text-sm font-medium text-stone-900">{arch.en}</div>
            <div className="cn-font text-xs text-stone-500 tracking-widest mt-1">{arch.zh}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-stone-900 text-stone-100 rounded-3xl p-12 text-center mb-16">
      <div className="text-xs tracking-widest uppercase text-stone-400 mb-4">The Promise</div>
      <h3 className="text-3xl font-light mb-4 leading-tight">
        17,280 possible names.<br/>
        <span className="italic text-stone-300">One matches you.</span>
      </h3>
      <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
        Your name is shaped by the sound of your English name, your archetype, and the cadence you carry. No two strangers share the same result.
      </p>
    </div>

    <div className="flex justify-between items-center text-xs tracking-widest uppercase text-stone-500 pt-6 border-t border-stone-400">
      <div>© 2026 漢 · name</div>
      <div>crafted with 禮 · respect</div>
    </div>
  </div>
);

// ============ NAME INPUT ============
const NameInput = ({ name, setName, onSubmit, onBack }) => (
  <div className="min-h-screen flex items-center justify-center px-6">
    <div className="max-w-md w-full fade-up">
      <button onClick={onBack} className="text-xs tracking-widest uppercase text-stone-600 mb-12 hover:text-stone-900">
        ← back
      </button>
      <div className="text-xs tracking-widest uppercase text-stone-600 mb-4">Step 01 / 03</div>
      <h2 className="text-4xl font-light text-stone-900 mb-3 leading-tight">
        What is your<br/>English name?
      </h2>
      <p className="cn-font text-sm text-stone-500 tracking-widest mb-10">· 你 的 英 文 名 ·</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        placeholder="e.g. Sarah"
        autoFocus
        className="w-full text-3xl font-light bg-transparent border-b-2 border-stone-400 pb-3 mb-8 focus:outline-none focus:border-stone-900 text-stone-900"
      />
      <p className="text-xs text-stone-600 mb-10 leading-relaxed">
        We'll use the first sound of your name to find a Chinese surname that feels phonetically close. For example, <span className="cn-font">Sarah → 夏 (Xià)</span>.
      </p>
      <button onClick={onSubmit} disabled={!name.trim()} className="bg-stone-900 text-stone-100 px-10 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
        Continue →
      </button>
    </div>
  </div>
);

// ============ QUIZ ============
const Quiz = ({ question, current, total, onAnswer }) => (
  <div className="min-h-screen flex items-center justify-center px-6 py-12">
    <div className="max-w-2xl w-full fade-up" key={current}>
      <div className="mb-12">
        <div className="flex justify-between text-xs tracking-widest uppercase text-stone-600 mb-3">
          <span>Step 02 / 03</span>
          <span>{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        </div>
        <div className="h-px bg-stone-400 relative">
          <div className="absolute left-0 top-0 h-px bg-stone-900 transition-all duration-500" style={{ width: `${((current + 1) / total) * 100}%` }}/>
        </div>
      </div>
      <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-3 leading-tight">{question.q}</h2>
      <p className="cn-font text-sm text-stone-500 tracking-widest mb-12">· {question.qZh} ·</p>
      <div className="space-y-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(opt)}
            className="w-full text-left p-5 rounded-2xl border border-stone-400 hover:border-stone-900 hover:bg-stone-100 transition-all group flex items-center"
          >
            <span className="text-xs tracking-widest text-stone-500 mr-6 group-hover:text-stone-900">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="text-base md:text-lg text-stone-900 flex-grow">{opt.text}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-900 ml-2">→</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

// ============ ZODIAC STEP ============
const ZodiacStep = ({ birthYear, setBirthYear, onDone }) => {
  const [preview, setPreview] = useState(null);

  const handleYearChange = (val) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    setBirthYear(cleaned);
    if (cleaned.length === 4) {
      const y = parseInt(cleaned);
      if (y >= 1900 && y <= 2026) setPreview(getZodiac(y));
      else setPreview(null);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full fade-up">
        <div className="text-xs tracking-widest uppercase text-stone-600 mb-4">· one last thing · optional ·</div>
        <h2 className="text-4xl font-light text-stone-900 mb-3 leading-tight">
          Add your<br/>zodiac symbol?
        </h2>
        <p className="cn-font text-sm text-stone-500 tracking-widest mb-10">· 加 上 你 的 生 肖 ·</p>
        
        <p className="text-sm text-stone-700 leading-relaxed mb-8">
          The Chinese zodiac adds a small animal glyph to your name card — your 生肖. 
          We only need the <span className="font-semibold">year</span>. No month, no day. Nothing stored.
        </p>

        <div className="mb-2">
          <input
            type="text"
            inputMode="numeric"
            value={birthYear}
            onChange={(e) => handleYearChange(e.target.value)}
            placeholder="1995"
            className="w-full text-4xl font-light bg-transparent border-b-2 border-stone-400 pb-3 focus:outline-none focus:border-stone-900 text-stone-900 tracking-widest"
          />
        </div>
        <p className="text-xs text-stone-500 mb-8">year of birth · 4 digits · 1900–2026</p>

        {preview && (
          <div className="mb-8 rounded-2xl p-6 zodiac-in flex items-center gap-5" style={{ backgroundColor: '#f5f1e8' }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-stone-900 flex-shrink-0">
              <ZodiacSymbol index={preview.index} size={54} />
            </div>
            <div>
              <div className="text-lg font-medium text-stone-900">Year of the {preview.animal}</div>
              <div className="text-xs tracking-widest uppercase text-stone-500 mt-1">{preview.trait}</div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={() => onDone(true)}
            disabled={!preview}
            className="flex-1 bg-stone-900 text-stone-100 px-6 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Add symbol →
          </button>
          <button
            onClick={() => onDone(false)}
            className="flex-1 border border-stone-900 text-stone-900 px-6 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-stone-100 transition-colors"
          >
            Skip this step
          </button>
        </div>

        <div className="pt-4 border-t border-stone-400 text-xs text-stone-500 leading-relaxed">
          🔒 <span className="font-semibold">Privacy promise:</span> your year is used once to look up your zodiac animal, then discarded. It's not sent to any server, not logged, not remembered after you close this tab.
        </div>
      </div>
    </div>
  );
};

// ============ RESULT ============
const Result = ({ name, result, zodiac, revealed, onRestart }) => {
  const [flipped, setFlipped] = useState(false);
  const [cardNumber] = useState(String(Math.floor(Math.random() * 9999)).padStart(4, '0'));
  const pinyinParts = result.pinyin.split(' ');

  // Rarity computation
  const archetypePercent = result.archetype.percent;
  const rarityScore = zodiac 
    ? (archetypePercent * zodiac.rarity / 100).toFixed(2)
    : (archetypePercent * 0.6).toFixed(2);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 fade-up">
          <div className="text-xs tracking-widest uppercase text-stone-600 mb-2">· Revealed ·</div>
          <h2 className="text-3xl font-light text-stone-900">
            {name}, meet your Chinese self.
          </h2>
          <p className="cn-font text-sm text-stone-500 tracking-widest mt-2">· 你 的 中 文 靈 魂 ·</p>
        </div>

        {/* FLIP CARD CONTAINER */}
        <div style={{ perspective: '2000px', minHeight: '760px' }} className="mb-4 fade-up">
          <div 
            className={`flip-card-inner cursor-pointer ${flipped ? 'flipped' : ''}`}
            style={{ minHeight: '760px' }}
            onClick={() => setFlipped(!flipped)}
          >
            {/* ===== FRONT ===== */}
            <div className="flip-face">
              <div className="rounded-3xl p-8 md:p-12 shadow-lg relative" style={{ backgroundColor: '#f5f1e8', border: '1px solid rgba(0,0,0,0.04)' }}>
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8 text-xs tracking-widest uppercase text-stone-500">
                  <span>漢 · name</span>
                  <span>No. {cardNumber}</span>
                </div>

                {/* Zodiac symbol — minimalist circle badge, top right */}
                {zodiac && (
                  <div className="absolute top-6 right-6 flex flex-col items-center zodiac-in">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center border border-stone-900 bg-white bg-opacity-30">
                      <ZodiacSymbol index={zodiac.index} size={40} />
                    </div>
                    <div className="text-xs tracking-widest uppercase text-stone-500 mt-2">{zodiac.animal}</div>
                  </div>
                )}

                {/* Character */}
                <div className="flex justify-center items-end h-36 mb-4">
                  <Character type={result.archetype.id} />
                </div>

                {/* Chinese Name */}
                <div className="text-center mb-3">
                  <div 
                    className={`cn-font text-7xl md:text-8xl font-light text-stone-900 ${revealed ? 'reveal-name' : 'opacity-0'}`}
                    style={{ letterSpacing: '6px', paddingLeft: '6px' }}
                  >
                    {result.chinese}
                  </div>
                </div>

                <div className="text-center text-sm italic text-stone-600 tracking-widest mb-6">
                  {result.pinyin}
                </div>

                <div className="flex justify-center mb-6">
                  <div className="h-px bg-stone-400 w-16 opacity-40"></div>
                </div>

                {/* Archetype */}
                <div className="text-center mb-6">
                  <div className="text-2xl font-medium text-stone-900 mb-1">{result.archetype.en}</div>
                  <div className="cn-font text-xs text-stone-500 tracking-widest">{result.archetype.zh.split('').join(' ')}</div>
                </div>

                {/* Elements */}
                <div className="flex justify-center gap-2 mb-6">
                  {result.archetype.elements.map(el => (
                    <span key={el} className="text-xs tracking-widest uppercase px-3 py-1 border border-stone-900 rounded-full text-stone-900">
                      {el}
                    </span>
                  ))}
                </div>

                {/* Tagline */}
                <div className="text-center mb-8">
                  <p className="text-lg italic text-stone-800 mb-2">"{result.archetype.tagline}"</p>
                  <p className="cn-font text-xs text-stone-500 tracking-widest">{result.archetype.taglineZh}</p>
                </div>

                {/* RARITY STATS — the social proof moment */}
                <div className="count-up border-t border-b border-stone-300 py-5 mb-8 grid grid-cols-2 gap-4">
                  <div className="text-center border-r border-stone-300">
                    <div className="text-3xl font-light text-stone-900">{archetypePercent}<span className="text-lg">%</span></div>
                    <div className="text-xs tracking-widest uppercase text-stone-500 mt-1">share your archetype</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-stone-900">{rarityScore}<span className="text-lg">%</span></div>
                    <div className="text-xs tracking-widest uppercase text-stone-500 mt-1">share your exact name</div>
                  </div>
                </div>

                {/* Flip hint */}
                <div className="text-center hint-pulse">
                  <div className="text-xs tracking-widest uppercase text-stone-600 mb-1">↻ tap card to read the story</div>
                  <div className="cn-font text-xs text-stone-400 tracking-widest">點擊查看姓名故事</div>
                </div>
              </div>
            </div>

            {/* ===== BACK ===== */}
            <div className="flip-face flip-back">
              <div className="rounded-3xl p-8 md:p-12 shadow-lg bg-stone-900 text-stone-100" style={{ minHeight: '760px' }}>
                
                <div className="flex justify-between items-center mb-8 text-xs tracking-widest uppercase text-stone-400">
                  <span>The Story of {result.chinese}</span>
                  <span>No. {cardNumber}</span>
                </div>

                <div className="text-center mb-10">
                  <div className="cn-font text-5xl text-stone-100 mb-2" style={{ letterSpacing: '4px' }}>{result.chinese}</div>
                  <div className="text-sm italic text-stone-400 tracking-widest">{result.pinyin}</div>
                </div>

                <div className="space-y-7 mb-10">
                  <div className="flex gap-5 items-start">
                    <div className="cn-font text-5xl text-stone-100 leading-none flex-shrink-0 w-16">{result.surname}</div>
                    <div className="flex-1 pt-1">
                      <div className="text-xs tracking-widest uppercase text-stone-400 mb-1">Surname · {pinyinParts[0]}</div>
                      <p className="text-sm text-stone-200 leading-relaxed italic">
                        Chosen to echo the first sound of "{name}" — a phonetic bridge between your two names.
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-stone-700"></div>

                  <div className="flex gap-5 items-start">
                    <div className="cn-font text-5xl text-stone-100 leading-none flex-shrink-0 w-16">{result.middle}</div>
                    <div className="flex-1 pt-1">
                      <div className="text-xs tracking-widest uppercase text-stone-400 mb-1">{pinyinParts[1]} · "{charMeaning[result.middle] || 'essence'}"</div>
                      <p className="text-sm text-stone-200 leading-relaxed italic">
                        The heart of your name. Carries the spirit of the {result.archetype.en} — a classical image for who you are at 2am.
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-stone-700"></div>

                  <div className="flex gap-5 items-start">
                    <div className="cn-font text-5xl text-stone-100 leading-none flex-shrink-0 w-16">{result.last}</div>
                    <div className="flex-1 pt-1">
                      <div className="text-xs tracking-widest uppercase text-stone-400 mb-1">{pinyinParts[2]} · "{charMeaning[result.last] || 'rhythm'}"</div>
                      <p className="text-sm text-stone-200 leading-relaxed italic">
                        The final note. Completes the name's music and quietly shapes its destiny.
                      </p>
                    </div>
                  </div>
                </div>

                {zodiac && (
                  <div className="mb-8 border border-stone-700 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center border border-stone-300 flex-shrink-0">
                      <ZodiacSymbol index={zodiac.index} size={38} stroke="#e7e5e4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-stone-100">Born in the Year of the {zodiac.animal}</div>
                      <div className="text-xs text-stone-400 tracking-widest mt-1">{zodiac.trait}</div>
                    </div>
                  </div>
                )}

                <div className="text-center pt-6 border-t border-stone-700">
                  <p className="cn-font text-sm text-stone-300 italic mb-2" style={{ letterSpacing: '2px' }}>
                    {result.surname}{result.middle}{result.last} · {result.archetype.zh}
                  </p>
                  <p className="text-xs tracking-widest uppercase text-stone-500 hint-pulse">↻ tap to flip back</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center fade-up mt-8">
          <button className="bg-stone-900 text-stone-100 px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors">
            ↓ Download Card
          </button>
          <button className="border border-stone-900 text-stone-900 px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-stone-900 hover:text-stone-100 transition-colors">
            ↗ Share
          </button>
          <button onClick={onRestart} className="text-stone-700 px-8 py-4 text-sm tracking-widest uppercase hover:text-stone-900 transition-colors">
            ↻ Try again
          </button>
        </div>

        <div className="text-center mt-12 text-xs tracking-widest uppercase text-stone-500">
          © 2026 漢 · name · crafted with 禮
        </div>
      </div>
    </div>
  );
};
