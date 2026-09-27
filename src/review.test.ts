import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyAnswers, generateReview } from './review.ts';

test('uses selected facts without inventing a recommendation or pronouns', () => {
  const text = generateReview({ ...emptyAnswers, people: ['Ehim'], clear: true, comfortable: true, qualities: ['Friendly', 'Professional'], visit: 'Crown' }, 'Leeds City Dental Care');
  assert.equal(text, 'I had a positive experience at Leeds City Dental Care when I visited for a crown. Ehim looked after me. Everything was explained clearly. I felt comfortable and at ease. The team were friendly and professional.');
});
test('preserves no answers and does not infer what Other means', () => {
  const text = generateReview({ ...emptyAnswers, people: ['Other'], clear: false, comfortable: false, listened: false, visit: 'Other' }, 'Practice');
  assert.equal(text, 'I had a positive experience at Practice. I would have liked things to be explained more clearly. I did not feel completely comfortable and at ease. I did not feel listened to.');
});
test('joins multiple people and feelings and omits unanswered details', () => {
  assert.equal(generateReview({ ...emptyAnswers, people: ['Ehim', 'Fiona', 'Other'], comfortable: true, listened: true }, 'Practice'), 'I had a positive experience at Practice. Ehim, Fiona and another member of the team looked after me. I felt comfortable and at ease and listened to.');
});
