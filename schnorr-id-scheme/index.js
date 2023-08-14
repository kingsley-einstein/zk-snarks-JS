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
    p = bigInt.randBetween(bigInt(2).pow(bigInt[4]), bigInt(2).pow(bigInt[8]));
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

// /**
//  * 
//  * @param {BigNumber} p 
//  * @param {BigNumber} q 
//  */
// function _a(p, q) {
//   let a = BigNumber(0);

//   while (a.eq(0) || (a.pow(q).modulo(p)).gt(1) || (a.pow(q).modulo(p)).lt(1)) {
//     a = BigNumber(Math.floor(Math.random() * 14300));
//   }
//   return a;
// }

// /**
//  * 
//  * @param {BigNumber} q 
//  */
// function _s(q) {
//   let s = BigNumber(0);

//   while (s.lte(0) || s.gte(q)) {
//     s = BigNumber(Math.floor(Math.random() * 25300));
//   }
//   return s;
// }

// /**
//  * 
//  * @param {BigNumber} a 
//  * @param {BigNumber} s 
//  * @param {BigNumber} q 
//  */
// function _v(a, s, q) {
//   return a.pow(s.multipliedBy(-1)).modulo(q);
// }


// Global variables
const p = _p();
console.log("p => ", p.toString());

const q = _q(p);
console.log("q => ", q.toString());

const g = _g(q);
console.log("g => ", g.toString());

const t = _t(q);
console.log("t => ", t.toString());

const x = bigInt.randBetween(bigInt.zero, q.minus(bigInt.one));
console.log("x => ", x.toString());

const y = g.pow(q.minus(x)).mod(p);
console.log("y => ", y.toString());

const c = bigInt.randBetween(bigInt.zero, q.minus(bigInt.one));
console.log("c => ", c.toString());

const w = g.pow(c).mod(p);
console.log("w => ", w.toString());

const e = _e(t);
console.log("e => ", e.toString());

const s = c.plus(x.times(e)).mod(q);
console.log("s => ", s.toString());

const W = g.pow(s).times(y.pow(e)).mod(p);
console.log("W => ", W.toString());

console.log("Verified => ", w.equals(W));
