const HYGRAPH_URL = 'https://eu-west-2.cdn.hygraph.com/content/cmttzt4ue003006wgmww1uo05/master';

const fallbackResidents = [
  { id: 'anna-larsen', name: 'Anna Larsen', cpr: '120492-1847', address: 'Søndergade 18, 2. th., 8000 Aarhus C' },
  { id: 'mikkel-nielsen', name: 'Mikkel Nielsen', cpr: '030787-5261', address: 'Parkvej 42, 1. tv., 5000 Odense C' },
  { id: 'sara-jensen', name: 'Sara Jensen', cpr: '221199-7034', address: 'Birke Allé 7, 8200 Aarhus N' },
  { id: 'jonas-holm', name: 'Jonas Holm', cpr: '150205-3918', address: 'Havnegade 9, st. th., 9000 Aalborg' },
];

const queries = [
  'query { borgerLists { slug singleLineText } }',
  'query { borgerLists { slug text } }',
  'query { borgerLists { slug value } }',
  'query { borgerLists { slug content } }',
  'query { borgerList { slug singleLineText } }',
  'query { borgerList { slug text } }',
];

function firstString(record, ignoredKeys = []) {
  return Object.entries(record).find(([key, value]) => !ignoredKeys.includes(key) && typeof value === 'string' && value.trim())?.[1] || '';
}

function parseResident(record, index) {
  const raw = firstString(record, ['id', 'slug', 'createdAt', 'updatedAt']);
  const values = raw.split(/\s*(?:\||;|\n)\s*/).map((value) => value.trim()).filter(Boolean);
  const name = values.find((value) => /[a-zæøå]{2,}\s+[a-zæøå]{2,}/i.test(value) && !/\d/.test(value)) || record.name || `Borger ${index + 1}`;
  const cpr = values.find((value) => /\d{6}[- ]?\d{4}/.test(value)) || record.cpr || '010190-0000';
  const address = values.find((value) => /\d/.test(value) && value !== cpr && value !== name) || record.address || 'Adresse ikke oplyst';
  return { id: record.id || record.slug || `${name}-${index}`, name, cpr, address };
}

async function requestResidents(query) {
  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) throw new Error('Hygraph kunne ikke kontaktes');
  const result = await response.json();
  if (result.errors?.length) throw new Error(result.errors[0].message);
  const records = result.data?.borgerLists || result.data?.borgerList || [];
  return Array.isArray(records) ? records : [records];
}

export async function fetchResidents() {
  for (const query of queries) {
    try {
      const records = await requestResidents(query);
      if (records.length) return records.map(parseResident);
    } catch {
      // Try the next likely generated Hygraph field shape.
    }
  }
  return fallbackResidents;
}

export { fallbackResidents };
