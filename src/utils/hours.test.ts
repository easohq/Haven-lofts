import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseRange, lakevilleNow, statusToday } from './hours.ts';
import { INITIAL_STYLISTS } from '../data/salonData.ts';

test('parseRange', () => {
  assert.deepEqual(parseRange('9:00 AM – 6:00 PM'), [540, 1080]);
  assert.deepEqual(parseRange('12:30 PM - 8:00 PM'), [750, 1200]);
  assert.equal(parseRange('Closed'), null);
});

test('lakevilleNow uses Central time', () => {
  // 2026-11-17 15:30 UTC is Tuesday 9:30 AM CST
  assert.deepEqual(lakevilleNow(new Date('2026-11-17T15:30:00Z')), { day: 'Tuesday', minutes: 570 });
});

test('statusToday', () => {
  const sara = INITIAL_STYLISTS[0];
  assert.equal(statusToday(sara, { day: 'Tuesday', minutes: 600 }).inNow, true);
  assert.equal(statusToday(sara, { day: 'Tuesday', minutes: 1080 }).inNow, false);
  assert.equal(statusToday(sara, { day: 'Sunday', minutes: 600 }).inNow, false);
});

test('shortHours and smsHref', async () => {
  const { shortHours, smsHref } = await import('./hours.ts');
  assert.equal(shortHours('10:00 AM – 8:00 PM'), '10am–8pm');
  assert.equal(shortHours('8:30 AM – 3:00 PM'), '8:30am–3pm');
  assert.match(smsHref(INITIAL_STYLISTS[1], 'Friday'), /^sms:9523568215\?&body=Hi%20Leah!.*Friday/);
});
