# Trials
[![npm status](http://img.shields.io/npm/v/trials.svg)](https://www.npmjs.org/package/trials)
[![build status](https://secure.travis-ci.org/clux/trials.svg)](http://travis-ci.org/clux/trials)
[![dependency status](https://david-dm.org/clux/trials.svg)](https://david-dm.org/clux/trials)
[![coverage status](http://img.shields.io/coveralls/clux/trials.svg)](https://coveralls.io/r/clux/trials)
[![stable](http://img.shields.io/badge/stability-stable-74C614.svg)](http://nodejs.org/api/documentation.html#documentation_stability_index)

Trials is a small library for generating outcomes conforming to simple statistical rules by running repeated trials in these systems.

It can pick from a probability mass function (pmf), do repeated Bernoulli trials for elements in an array, unique Bernoulli trials for every element of an object of `key` : `probability` form and more.

## Usage
Require and call one of the functions within.

```js
var t = require('trials');
for (var i = 0; i < 10; i += 1) {
  // collect results of 10 trials where we pick exactly one of the object below
  t.singlePmf({
    attack: 0.6,
    runaway: 0.3,
    eatlunch: 0.1
  };
}
```
Outputs something like this:

```bash
runaway
attack
attack
eatlunch
attack
attack
runaway
eatlunch
attack
attack
```

Results vary based on rolls - this one had more lunches than an average roll.

## API
### singlePmf(obj)
Takes an object of form `key` : `probability` (which acts as the probability mass function for all the keys in the object) and picks exactly one element according the a roll mapped to the mass function. The introduction above has an example of this.

An important thing to note with this function is that the values of the object **must sum to 1** for it to represent a proper mass function (and to guarantee a return value).

### single(ary)
Takes an Array and picks exactly one element from the array with uniform probability.

```js
for (var i = 0; i < 5; i += 1) t.single(['hi', 'thar', 'miss']);
```

Example output:

```bash
hi
miss
thar
miss
thar
```

### multipleProbs(obj)
Takes an object of individual probabilities, does one Bernoulli trial for each element of the object with the respective probabilities and collects all the keys of the successes.

```js
for (var i = 0; i < 5; i += 1) {
  t.multipleProbs({
    a: 0.4,
    b: 0.4,
    c: 0.1
  });
}
```

Example output:

```bash
[ 'b' ]
[ 'a', 'b' ]
[ 'b' ]
[]
[ 'a', 'b' ]
```

### multiple(ary, p)
Takes an array and a fixed probability, does one Bernoulli trial for each element in the array with the defined uniform probability, and collects all the successes.

```js
for (var i = 0; i < 5; i += 1) t.multiple(['a', 'b', 'c'], 0.4);
```

Example output:

```bash
[ 'a' ]
[ 'a', 'b', 'c' ]
[]
[ 'b', 'c' ]
[ 'b' ]
```

By virtue of being repeated, independent Bernoulli trials with constant probability; the number of picks from the array follows a Binomial distribution `B(ary.length, p)`.

### range(start, end)
Gets an integer in the range `start` to (and including) `end` with uniform probability.
Equivalent to `single` on the array `[start, start+1, ... , end]`, but more efficient.

### cluster(ary, max, p)
Cluster picks {1, 2, ..., max} elements uniformly from the array with probability `p`, or it picks none at all with probability `1-p`.

This is essentially a uniform distribution within a uniform distribution. It's uniform in that we either pick or don't pick with probability `p`, and if we pick, then how many we pick is uniformly distributed in the defined range. This creates the clusters, rather than true randomness.

```js
for (var i = 0; i < 5; i += 1) t.cluster([1, 2, 3, 4, 5], 3, 0.6);
```

Example output:

```bash
[ 2, 1 ]
[ 4, 1, 5 ]
[ 1 ]
[]
[ 3, 1, 4 ]
[ 2 ]
```

## Installation

```bash
$ npm install trials
```

## Running tests
Install development dependencies

```bash
$ npm install
```

Run the tests

```bash
$ npm test
```

## License
MIT-Licensed. See LICENSE file for details.
