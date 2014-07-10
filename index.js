module.exports = process.env.TRIALS_COV
  ? require('./lib-cov/trials.js')
  : require('./lib/trials.js');
