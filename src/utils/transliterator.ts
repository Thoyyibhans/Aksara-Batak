// Batak to Latin transliteration mapping
const batakToLatinMap: Record<string, string> = {
  'ᯄ': 'ha',
  'ᯅ': 'ba',
  'ᯇ': 'pa',
  'ᯊ': 'na',
  'ᯋ': 'wa',
  'ᯌ': 'ga',
  'ᯏ': 'ja',
  'ᯑ': 'da',
  'ᯒ': 'ra',
  'ᯔ': 'ma',
  'ᯖ': 'ta',
  'ᯘ': 'sa',
  'ᯚ': 'ya',
  'ᯀ': 'nga',
  'ᯃ': 'la',
  'ᯰ': 'nya',
  'ᯞ': 'ca',
  'ᯣ': 'kha',
  'ᯤ': 'fa',
  // Vowels and diacritics
  'ᯤ': 'i',
  'ᯪ': 'u',
  'ᯬ': 'e',
  'ᯭ': 'o',
  'ᯩ': 'ai',
  'ᯞᯤ': 'ci',
  'ᯞᯪ': 'cu',
  'ᯞᯬ': 'ce',
  'ᯞᯭ': 'co',
};

// Latin to Batak mapping (reverse)
const latinToBatakMap: Record<string, string> = {
  'ha': 'ᯄ',
  'ba': 'ᯅ',
  'pa': 'ᯇ',
  'na': 'ᯊ',
  'wa': 'ᯋ',
  'ga': 'ᯌ',
  'ja': 'ᯏ',
  'da': 'ᯑ',
  'ra': 'ᯒ',
  'ma': 'ᯔ',
  'ta': 'ᯖ',
  'sa': 'ᯘ',
  'ya': 'ᯚ',
  'nga': 'ᯀ',
  'la': 'ᯃ',
  'nya': 'ᯰ',
  'ca': 'ᯞ',
  'kha': 'ᯣ',
  'fa': 'ᯤ',
  // Simple vowels
  'a': '',
  'i': 'ᯤ',
  'u': 'ᯪ',
  'e': 'ᯬ',
  'o': 'ᯭ',
  // Compound sounds
  'ci': 'ᯞᯤ',
  'cu': 'ᯞᯪ',
  'ce': 'ᯞᯬ',
  'co': 'ᯞᯭ',
};

export function transliterateBatakToLatin(text: string): string {
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    let found = false;
    
    // Try to match longer sequences first (2-3 characters)
    for (let len = 3; len >= 1; len--) {
      if (i + len <= text.length) {
        const substr = text.substr(i, len);
        if (batakToLatinMap[substr]) {
          result += batakToLatinMap[substr];
          i += len;
          found = true;
          break;
        }
      }
    }
    
    if (!found) {
      result += text[i];
      i++;
    }
  }
  
  return result;
}

export function transliterateLatinToBatak(text: string): string {
  let result = text.toLowerCase();
  
  // Sort by length descending to match longer sequences first
  const sortedEntries = Object.entries(latinToBatakMap)
    .sort(([a], [b]) => b.length - a.length);
  
  for (const [latin, batak] of sortedEntries) {
    result = result.replace(new RegExp(latin, 'g'), batak);
  }
  
  return result;
}

export function isValidBatakChar(char: string): boolean {
  return /[\u1BC0-\u1BFF]/.test(char);
}

export function normalizeBatakText(text: string): string {
  // Remove extra spaces and normalize Batak text
  return text.replace(/\s+/g, ' ').trim();
}

export function validateTransliteration(batak: string, latin: string): boolean {
  const transliterated = transliterateBatakToLatin(batak);
  return transliterated.toLowerCase() === latin.toLowerCase();
}