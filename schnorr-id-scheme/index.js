const bigInt = require("big-integer");
// const crypto = require("crypto");

/**
 * 
 * @param {bigInt.BigInteger} n 
 */
function _isPrime(n) {
  if (n.equals(bigInt.zero) || n.equals(bigInt.one)) return false;

  for (let i = 2; i < n.toJSNumber(); i++) {
    if (n.mod(bigInt(i)).equals(bigInt.zero))
      return false;
  }

  return true;
}

function _p() {
  let p = bigInt.zero;

  while (!_isPrime(p)) {
    p = bigInt.randBetween(bigInt(2).pow(bigInt[4]), bigInt(2).pow(bigInt[10]));
  }
  return p;
}

/**
 * 
 * @param {bigInt.BigInteger} num 
 */
function _q(num) {
  let q = bigInt.one;

  while (q.lesserOrEquals(bigInt[2]) || num.minus(bigInt.one).mod(q).greater(bigInt.zero) || !_isPrime(q)) {
    q = bigInt.randBetween(bigInt.zero, num);
  }
  return q;
}

/**
 * 
 * @param {bigInt.BigInteger} modulo 
 */
function _g(modulo) {
  return bigInt.randBetween(bigInt.zero, modulo.minus(bigInt.one));
}

/**
 * 
 * @param {bigInt.BigInteger} q 
 */
function _t(q) {
  let t = bigInt.zero;

  while (t.eq(bigInt.zero) || q.lesserOrEquals(bigInt[2].pow(t))) {
    t = bigInt.randBetween(bigInt.zero, bigInt[12]);
  }

  return t;
}

/**
 * 
 * @param {bigInt.BigInteger} t 
 */
function _e(t) {
  return bigInt.randBetween(bigInt.zero, bigInt[2].pow(t.minus(bigInt.one)));
}


// Global variables
const p = _p();
console.log("p => ", p.toString(16));

const q = _q(p);
console.log("q => ", q.toString(16));

const g = _g(q);
console.log("g => ", g.toString(16));

const t = _t(q);
console.log("t => ", t.toString(16));

const x = bigInt.randBetween(bigInt.zero, q.minus(bigInt.one));
console.log("x => ", x.toString(16));

const y = g.pow(q.minus(x)).mod(p);
console.log("y => ", y.toString(16));

const c = bigInt.randBetween(bigInt.zero, q.minus(bigInt.one));
console.log("c => ", c.toString(16));

const w = g.pow(c).mod(p);
console.log("w => ", w.toString(16));

const e = _e(t);
console.log("e => ", e.toString(16));

const s = c.plus(x.times(e)).mod(q);
console.log("s => ", s.toString(16));

const W = g.pow(s).times(y.pow(e)).mod(p);
console.log("W => ", W.toString(16));

console.log("Verified => ", w.equals(W));
