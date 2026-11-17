import { test } from 'node:test';
import assert from 'node:assert/strict';
import { smsHref } from './sms.ts';
import { INITIAL_STYLISTS } from '../data/salonData.ts';

test('smsHref opens a text to the stylist with the message started', () => {
  const href = smsHref({ ...INITIAL_STYLISTS[1], phoneRaw: '6125550100' });
  assert.match(href, /^sms:6125550100\?&body=/);
  assert.ok(decodeURIComponent(href).includes('Hi Leah!'));
});
