#!/usr/bin/env node

/*
  CLI Calculator
  Supported operations:
    - add  (addition)
    - sub  (subtraction)
    - mul  (multiplication)
    - div  (division)

  Usage examples:
    node src/calculator.js add 2 3    # -> 5
    node src/calculator.js sub 5 2    # -> 3
    node src/calculator.js mul 4 6    # -> 24
    node src/calculator.js div 8 2    # -> 4
*/

function toNumber(x) {
  const n = Number(x);
  if (Number.isNaN(n)) throw new Error('Operands must be valid numbers');
  return n;
}

function add(a, b) {
  return toNumber(a) + toNumber(b);
}

function sub(a, b) {
  return toNumber(a) - toNumber(b);
}

function mul(a, b) {
  return toNumber(a) * toNumber(b);
}

function div(a, b) {
  const nb = toNumber(b);
  if (nb === 0) throw new Error('Division by zero');
  return toNumber(a) / nb;
}

function modulo(a, b) {
  const nb = toNumber(b);
  if (nb === 0) throw new Error('Modulo by zero');
  return toNumber(a) % nb;
}

function power(base, exponent) {
  return Math.pow(toNumber(base), toNumber(exponent));
}

function squareRoot(n) {
  const num = toNumber(n);
  if (num < 0) throw new Error('Cannot take square root of negative number');
  return Math.sqrt(num);
}

module.exports = { add, sub, mul, div, modulo, power, squareRoot };

// CLI entrypoint
if (require.main === module) {
  function showHelp() {
    console.log(`Usage: node src/calculator.js <operation> <a> <b>\n\nOperations:\n  add    Add a and b\n  sub    Subtract b from a\n  mul    Multiply a by b\n  div    Divide a by b\n  mod    Remainder of a divided by b\n  pow    Raise base to exponent\n  sqrt   Square root of a (only one operand)\n\nExamples:\n  node src/calculator.js add 2 3\n  node src/calculator.js div 8 2\n  node src/calculator.js mod 10 3\n  node src/calculator.js pow 2 8\n  node src/calculator.js sqrt 9\n`);
  }

  function exitWithError(msg, code = 1) {
    console.error(`Error: ${msg}`);
    process.exit(code);
  }

  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    process.exit(0);
  }

  const [op, aStr, bStr] = args;
  const lop = op.toLowerCase();
  if (lop === 'sqrt') {
    if (aStr === undefined) {
      exitWithError('sqrt operation requires one numeric operand. See --help for usage.');
    }
  } else {
    if (aStr === undefined || bStr === undefined) {
      exitWithError('Operation requires two numeric operands. See --help for usage.');
    }
  }

  try {
    let result;
    switch (lop) {
      case 'add':
      case '+':
        result = add(aStr, bStr);
        break;
      case 'sub':
      case '-':
        result = sub(aStr, bStr);
        break;
      case 'mul':
      case '*':
      case 'x':
        result = mul(aStr, bStr);
        break;
      case 'div':
      case '/':
        result = div(aStr, bStr);
        break;
      case 'mod':
      case '%':
        result = modulo(aStr, bStr);
        break;
      case 'pow':
      case '**':
      case 'power':
        result = power(aStr, bStr);
        break;
      case 'sqrt':
      case 'root':
        result = squareRoot(aStr);
        break;
      default:
        exitWithError(`Unknown operation: ${op}. Supported operations: add, sub, mul, div, mod, pow, sqrt`);
    }

    console.log(result);
  } catch (err) {
    if (/(division|modulo) by zero/i.test(err.message)) {
      exitWithError(err.message, 2);
    }
    exitWithError(err.message);
  }
}
