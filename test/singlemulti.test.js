var trials = require('../');

exports.noopAry = function (t) {
  var res = trials.single([]);
  t.equal(res, undefined, "no input no output");

  var resM = trials.multiple([], 1);
  t.deepEqual(resM, [], "no input no output");
  t.done();
};

exports.probObjects = function (t) {
  var pmf = {
    no1: 0,
    no2: 0,
    yes1: 1
  };
  var res = trials.singlePmf(pmf);
  t.equal(res, 'yes1', "pmf is calculated sensibly");

  pmf.yes2 = 1; // pmf no longer a pmf
  var resM = trials.multipleProbs(pmf);
  t.deepEqual(resM, ['yes1', 'yes2'], "multiple is calculated sensibly");
  t.done();
};

exports.probAarys = function (t) {
  var ary = [1,2,3,4];
  var res = trials.single(ary);
  t.ok(ary.indexOf(res) >= 0, "result from ary in single");

  var resM = trials.multiple(ary, 1);
  t.deepEqual(ary, resM, "choose all from multiple when prob === 1");

  var resZero = trials.multiple(ary, 0);
  t.deepEqual([], resZero, "choose none from multiple when prob === 0");
  t.done();
};

exports.range = function (t) {
  for (var i = 0; i < 30; i += 1) {
    t.ok([1,2,3,4,5,6].indexOf(trials.range(1, 6)) >= 0, "range1-6 produces one of");
    t.ok([1,2,3,4,5,6].indexOf(trials.single([1,2,3,4,5,6])) >= 0, "ditto single");
  }
  t.done();
};

exports.cluster = function (t) {
  for (var i = 0; i < 30; i += 1) {
    t.deepEqual(trials.cluster([1,2,3,4], 4, 0), [], 'cluster with zero p');
    t.ok(trials.cluster([1,2,3,4], 4, 1).length > 0, 'cluster with one p');

    var normal = trials.cluster([1,2,3,4], 3, 0.5);
    t.ok(normal.length >= 0, "normal cluster can be zero");
    t.ok(normal.length <= 3, "but is always less than the specified max");
    t.ok(!trials.cluster([1,2,3], 0, 0.5).length, "!max => [] res cluster");
  }
  t.done();
};
