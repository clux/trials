var t = {}; // exports

var bernoulli = t.bernoulli = function (p) {
  return (Math.random() < p);
};

t.single = function (ary) {
  var roll = Math.random();
  var p = 1/ary.length;
  for (var i = 0; i < ary.length; i += 1) {
    if (roll < p) {
      return ary[i];
    }
    roll -= p; // reduce until roll is in [0, p)
  }
};

// requires the sum of values to be 1
// equivalent to `single` when all probabilities are the same (and sum to 1)
t.singlePmf = function (pmf) {
  var roll = Math.random();
  for (var key in pmf) {
    var p = pmf[key];
    if (roll < p) {
      return key;
    }
    roll -= p; // reduce until roll is in [0, p)
  }
};

// do one roll for every element in an array - but with constant p
// same as `multiple` when values are constant
t.multiple = function (ary, p) {
  return ary.filter(bernoulli.bind(null, p));
};

// do one roll for every element in pmf-like object
// same as `multiple` when the values are constant and equal to above `p`
t.multipleProbs = function (multi) {
  var res = [];
  for (var key in multi) {
    if (bernoulli(multi[key])) {
      res.push(key);
    }
  }
  return res;
};


// picks one out of {start, start+1, ... , end}
// equivalent to `single` on [start, start+1, ..., end]
var range = t.range = function (start, end) {
  return Math.floor(Math.random() * (end + 1 - start)) + start;
};

// fisher-yates shuffle - does not modify ary
var shuffle = function (ary) {
  var shuffled = [];
  ary.reduce(function (acc, v) {
    var r = range(0, acc);
    shuffled[acc] = shuffled[r];
    shuffled[r] = v;
    return acc + 1;
  }, 0);
  return shuffled;
};

// pick {1, ..., max-1} elements uniformly from ary with probability p
// or pick none at all, with probability 1-p
t.cluster = function (ary, max, p) {
  if (max > 0 && bernoulli(p)) {
    var numPicks = range(1, Math.min(max, ary.length));
    return shuffle(ary).slice(0, numPicks);
  }
  return [];
};

module.exports = t;
