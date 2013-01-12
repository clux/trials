var tap = require('tap')
  , test = tap.test
  , trials = require('../');

test("noop on ary", function (t) {
  var res = trials.single([]);
  t.equal(res, undefined, "no input no output");

  var resM = trials.multiple([], 1);
  t.deepEqual(resM, [], "no input no output");
  t.end();
});

test("prob objects", function (t) {
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
  t.end();
});

test("prob arys", function (t) {
  var ary = [1,2,3,4];
  var res = trials.single(ary);
  t.ok(ary.indexOf(res) >= 0, "result from ary in single");

  var resM = trials.multiple(ary, 1);
  t.deepEqual(ary, resM, "choose all from multiple when prob === 1");

  var resZero = trials.multiple(ary, 0);
  t.deepEqual([], resZero, "choose none from multiple when prob === 0");
  t.end();
});
