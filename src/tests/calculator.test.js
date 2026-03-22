// Simple test runner using Node's built-in assert (no external deps)
const assert = require('assert');
const { add, sub, mul, div, modulo, power, squareRoot } = require('../calculator');

try {
  // Basic operations from image
  assert.strictEqual(add(2,3), 5, '2 + 3 should equal 5');
  assert.strictEqual(sub(10,4), 6, '10 - 4 should equal 6');
  assert.strictEqual(mul(45,2), 90, '45 * 2 should equal 90');
  assert.strictEqual(div(20,5), 4, '20 / 5 should equal 4');

  // New extended operations
  assert.strictEqual(modulo(5,2), 1, '5 % 2 should equal 1');
  assert.strictEqual(power(2,3), 8, '2 ^ 3 should equal 8');
  assert.strictEqual(power('2','8'), 256, 'string numbers should work for power');
  assert.strictEqual(squareRoot(16), 4, 'sqrt(16) should equal 4');

  // Edge cases
  assert.throws(() => div(8,0), /Division by zero/, 'Division by zero should throw');
  assert.throws(() => modulo(5,0), /Modulo by zero/, 'Modulo by zero should throw');
  assert.throws(() => squareRoot(-1), /Cannot take square root of negative number/, 'Negative sqrt should throw');
  assert.throws(() => add('a', 2), /Operands must be valid numbers/, 'Invalid operands should throw');

  // Numeric strings
  assert.strictEqual(add('2','3'), 5, 'string numbers should work for add');
  assert.strictEqual(sub('10','4'), 6, 'string numbers should work for sub');
  assert.strictEqual(mul('45','2'), 90, 'string numbers should work for mul');
  assert.strictEqual(div('20','5'), 4, 'string numbers should work for div');
  assert.strictEqual(modulo('10','3'), 1, 'string numbers should work for modulo');

  console.log('All tests passed');
  process.exit(0);
} catch (err) {
  console.error('Test failed:', err && err.message ? err.message : err);
  process.exit(1);
}
