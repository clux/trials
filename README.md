# Trials [![Build Status](https://secure.travis-ci.org/clux/trials.png)](http://travis-ci.org/clux/trials)

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
Takes an Array and picks exactly one element from the array randomly.

```js
for (var i = 0; i < 5; i += 1) t.single(['hi', 'thar', 'miss']);
```

Typical output:

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

Typical output:

```bash
[ 'b' ]
[ 'a', 'b' ]
[ 'b' ]
[]
[ 'a', 'b' ]
```

### multiple(ary)
Takes an array and a fixed probability, does one Bernoulli trial for each element in the array, and collects all the successes.

```js
for (var i = 0; i < 5; i += 1) t.multiple(['a', 'b', 'c'], 0.4);
```

Typical output:

```bash
[ 'a' ]
[ 'a', 'b', 'c' ]
[]
[ 'b', 'c' ]
[ 'b' ]
```

### range(start, end)
Gets an integer in the range `start` to (and including) `end`.
Equivalent to `single` on the array `[start, start+1, ... , end]`, but more efficient.

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
