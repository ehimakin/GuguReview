export type Answers = {
  people: string[];
  clear: boolean | null;
  comfortable: boolean | null;
  listened: boolean | null;
  qualities: string[];
  visit: string;
};

export const emptyAnswers: Answers = { people: [], clear: null, comfortable: null, listened: null, qualities: [], visit: '' };

function list(items: string[]): string {
  return items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

export function generateReview(answers: Answers, practice: string): string {
  const visitText: Record<string, string> = {
    'Check-up': 'a check-up', Emergency: 'an emergency appointment', Filling: 'a filling',
    Crown: 'a crown', Invisalign: 'Invisalign treatment', 'Root canal': 'root canal treatment',
    Extraction: 'an extraction', 'Cosmetic treatment': 'cosmetic treatment',
  };
  const visit = visitText[answers.visit];
  const sentences = [`I had a positive experience at ${practice}${visit ? ` when I visited for ${visit}` : ''}.`];
  const people = answers.people.filter(person => person !== 'Other');
  if (people.length) sentences.push(`${list([...people, ...(answers.people.includes('Other') ? ['another member of the team'] : [])])} looked after me.`);
  if (answers.clear === true) sentences.push('Everything was explained clearly.');
  else if (answers.clear === false) sentences.push('I would have liked things to be explained more clearly.');
  const feelings: string[] = [];
  if (answers.comfortable === true) feelings.push('comfortable and at ease');
  if (answers.listened === true) feelings.push('listened to');
  if (feelings.length) sentences.push(`I felt ${list(feelings)}.`);
  if (answers.comfortable === false) sentences.push('I did not feel completely comfortable and at ease.');
  if (answers.listened === false) sentences.push('I did not feel listened to.');
  if (answers.qualities.length) sentences.push(`The team were ${list(answers.qualities.map(quality => quality.toLowerCase()))}.`);
  return sentences.join(' ');
}
