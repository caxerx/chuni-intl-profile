import BigNumber from 'bignumber.js';

export function calculateRating(score: BigNumber, songRating: BigNumber) {
  let offset = new BigNumber(0);

  if (score.isGreaterThanOrEqualTo(1009000)) {
    offset = new BigNumber(2.15);
  } else if (score.isGreaterThanOrEqualTo(1007500)) {
    offset = new BigNumber(2).plus(
      score.minus(1007500).multipliedBy(5).dividedBy(50000),
    );
  } else if (score.isGreaterThanOrEqualTo(1005000)) {
    offset = new BigNumber(1.5).plus(
      score.minus(1005000).multipliedBy(10).dividedBy(50000),
    );
  } else if (score.isGreaterThanOrEqualTo(1000000)) {
    offset = new BigNumber(1).plus(
      score.minus(1000000).multipliedBy(5).dividedBy(50000),
    );
  } else if (score.isGreaterThanOrEqualTo(975000)) {
    offset = score.minus(975000).multipliedBy(2).dividedBy(50000);
  } else if (score.isGreaterThanOrEqualTo(950000)) {
    offset = new BigNumber(-1.5).plus(
      score.minus(950000).multipliedBy(3).dividedBy(50000),
    );
  } else if (score.isGreaterThanOrEqualTo(925000)) {
    offset = new BigNumber(-3).plus(
      score.minus(925000).multipliedBy(3).dividedBy(50000),
    );
  } else {
    offset = new BigNumber(-5).plus(
      score.minus(900000).multipliedBy(4).dividedBy(50000),
    );
  }
  return songRating
    .plus(offset)
    .multipliedBy(100)
    .decimalPlaces(0, BigNumber.ROUND_FLOOR)
    .dividedBy(100);
}

export function calculateBest30(ratingList: BigNumber[]) {
  return ratingList
    .sort((a, b) => b.minus(a).toNumber())
    .slice(0, 30)
    .reduce((acc, val) => acc.plus(val), new BigNumber(0))
    .dividedBy(30);
}

export function calculateMaxAchievable(ratingList: BigNumber[]) {
  const maxRating = ratingList.reduce(
    (acc, val) => (val.isGreaterThan(acc) ? val : acc),
    new BigNumber(0),
  );
  const best30Avg = calculateBest30(ratingList);
  return best30Avg
    .multipliedBy(30)
    .plus(maxRating.multipliedBy(10))
    .dividedBy(40);
}
