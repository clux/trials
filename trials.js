var bernoulli = function (p) {
  return (Math.random() < p);
};

exports.single = function (ary) {
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
exports.singlePmf = function (pmf) {
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
exports.multiple = function (ary, p) {
  return ary.filter(bernoulli.bind(null, p));
};

// do one roll for every element in pmf-like object
// same as `multiple` when the values are constant and equal to above `p`
exports.multipleProbs = function (multi) {
  var res = [];
  for (var key in multi) {
    if (bernoulli(multi[key])) {
      res.push(key);
    }
  }
  return res;
};


// picks one out of {start, start+1, ... , end}
// equivalent to `single` on [start, star+1, ..., end]
exports.range = function (start, end) {
  return Math.floor(Math.random() * (end + 1 - start)) + start;
};


// randomly picks one out of {1, 2, ... , max}
var randInt = function (max) {
  return Math.floor(Math.random() * max) + 1;
};

var shuffler = function () {
  return (Math.random() < 0.5) ? -1 : 1;
};

// pick {1, ..., max-1} (with equal probability) from ary with probability p
// or none at all, with probability 1-p
//exports.cluster = function (ary, max, p) {
//  var numPicks = Math.min(Number(bernoulli(p)) * randInt(max), ary.length);
//  if (!numPicks) {
//    return [];
//  }
//  return ary.slice().sort(shuffler).slice(0, numPicks);
//};
