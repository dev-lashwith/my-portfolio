import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateScrollOffset,
  calculateStackScale,
  calculateMagneticOffset,
  getCharProgressRange,
} from './motion';

test('calculateScrollOffset computes standard offset using factor 0.3', () => {
  const scrollY = 500;
  const sectionTop = 300;
  const innerHeight = 800;
  // (500 - 300 + 800) * 0.3 = 1000 * 0.3 = 300
  const result = calculateScrollOffset(scrollY, sectionTop, innerHeight);
  assert.equal(result, 300);
});

test('calculateStackScale computes correct card stacking scales', () => {
  const total = 3;
  // Card 0 (bottom of stack): 1 - (3 - 1 - 0) * 0.03 = 1 - 0.06 = 0.94
  assert.equal(Math.round(calculateStackScale(total, 0) * 100) / 100, 0.94);
  // Card 1: 1 - (3 - 1 - 1) * 0.03 = 1 - 0.03 = 0.97
  assert.equal(Math.round(calculateStackScale(total, 1) * 100) / 100, 0.97);
  // Card 2 (top of stack): 1 - 0 = 1.00
  assert.equal(calculateStackScale(total, 2), 1.0);
});

test('calculateMagneticOffset detects cursor inside padded radius and divides by strength', () => {
  const rect = { left: 100, top: 100, width: 200, height: 200 };
  // Center is (200, 200)
  // Cursor at (230, 260), inside padding 150
  const offset = calculateMagneticOffset(230, 260, rect, 150, 3);
  assert.equal(offset.active, true);
  assert.equal(offset.x, (230 - 200) / 3); // 10
  assert.equal(offset.y, (260 - 200) / 3); // 20

  // Cursor outside padding
  const outside = calculateMagneticOffset(600, 600, rect, 150, 3);
  assert.equal(outside.active, false);
  assert.equal(outside.x, 0);
  assert.equal(outside.y, 0);
});

test('getCharProgressRange maps indices monotonically within [0, 1]', () => {
  const total = 10;
  const [s0, e0] = getCharProgressRange(0, total);
  assert.equal(s0, 0);
  assert.equal(e0, 0.1);

  const [sLast, eLast] = getCharProgressRange(9, total);
  assert.equal(Math.round(sLast * 10) / 10, 0.9);
  assert.equal(eLast, 1.0);
});
