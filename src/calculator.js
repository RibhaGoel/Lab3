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

function showHelp() {
  console.log(`Usage: node src/calculator.js <operation> <a> <b>\n\nOperations:\n  add    Add a and b\n  sub    Subtract b from a\n  mul    Multiply a by b\n  div    Divide a by b\n\nExamples:\n  node src/calculator.js add 2 3\n  node src/calculator.js div 8 2\n`);
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
if (aStr === undefined || bStr === undefined) {
  exitWithError('Operation requires two numeric operands. See --help for usage.');
}

const a = Number(aStr);
const b = Number(bStr);
if (Number.isNaN(a) || Number.isNaN(b)) {
  exitWithError('Operands must be valid numbers.');
}

let result;
switch (op.toLowerCase()) {
  case 'add':
  case '+':
    result = a + b;
    break;
  case 'sub':
  case '-':
    result = a - b;
    break;
  case 'mul':
  case '*':
  case 'x':
    result = a * b;
    break;
  case 'div':
  case '/':
    if (b === 0) {
      exitWithError('Division by zero is not allowed.', 2);
    }
    result = a / b;
    break;
  default:
    exitWithError(`Unknown operation: ${op}. Supported operations: add, sub, mul, div`);
}

// Print result to stdout
console.log(result);
