const { test, expect } = require('@jest/globals');

const seed = require('./seed');

test('returns an array', () => {
  expect(Array.isArray(seed)).toBeTruthy();
  expect(seed.length).toBeGreaterThan(0);
});

test('returns 2 lists', () => {
  const lists = seed.filter(r => r?.type === 'list');
  expect(lists.length).toEqual(2);
});

test('returns 8 tasks', () => {
  const tasks = seed.filter(r => r?.type === 'task');
  expect(tasks.length).toEqual(8);
})
