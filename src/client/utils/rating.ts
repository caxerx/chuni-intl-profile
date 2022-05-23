import BigNumber from 'bignumber.js';

export function calculateRating(score: BigNumber, songRating: BigNumber) {
  if (score.isLessThanOrEqualTo(500000)) return new BigNumber(0);

  if (score.isLessThanOrEqualTo(800000)) {
    return BigNumber.max(songRating.minus(5).dividedBy(2), 0)
      .multipliedBy(score.minus(500000).dividedBy(300000))
      .decimalPlaces(2, BigNumber.ROUND_FLOOR);
  }

  if (score.isLessThanOrEqualTo(900000))
    return BigNumber.max(songRating.minus(5).dividedBy(2), 0)
      .plus(
        BigNumber.max(
          songRating
            .minus(5)
            .minus(BigNumber.max(songRating.minus(5).dividedBy(2), 0)),
          0,
        ).multipliedBy(score.minus(800000).dividedBy(100000)),
      )
      .decimalPlaces(2, BigNumber.ROUND_FLOOR);

  if (score.isLessThanOrEqualTo(900000))
    return BigNumber.max(songRating.minus(5).dividedBy(2), 0)
      .plus(
        BigNumber.min(songRating, 2).multipliedBy(
          score.minus(900000).dividedBy(25000),
        ),
      )
      .decimalPlaces(2, BigNumber.ROUND_FLOOR);

  if (score.isLessThanOrEqualTo(925000))
    return BigNumber.max(songRating.minus(5), 0)
      .plus(
        BigNumber.min(songRating, 2).multipliedBy(
          score.minus(900000).dividedBy(25000),
        ),
      )
      .decimalPlaces(2, BigNumber.ROUND_FLOOR);

  if (score.isLessThanOrEqualTo(975000))
    return BigNumber.max(songRating.minus(3), 0)
      .plus(
        BigNumber.min(songRating, 3).multipliedBy(
          score.minus(925000).dividedBy(50000),
        ),
      )
      .decimalPlaces(2, BigNumber.ROUND_FLOOR);

  if (score.isLessThanOrEqualTo(1000000))
    return songRating.plus(
      score
        .minus(975000)
        .dividedBy(250)
        .decimalPlaces(0, BigNumber.ROUND_FLOOR)
        .multipliedBy(0.01),
    );

  if (score.isLessThanOrEqualTo(1005000))
    return songRating
      .plus(1)
      .plus(
        score
          .minus(1000000)
          .dividedBy(100)
          .decimalPlaces(0, BigNumber.ROUND_FLOOR)
          .multipliedBy(0.01),
      );

  if (score.isLessThanOrEqualTo(1007500))
    return songRating
      .plus(1.5)
      .plus(
        score
          .minus(1005000)
          .dividedBy(50)
          .decimalPlaces(0, BigNumber.ROUND_FLOOR)
          .multipliedBy(0.01),
      );

  if (score.isLessThanOrEqualTo(1009000)) {
    return songRating
      .plus(2)
      .plus(
        score
          .minus(1007500)
          .dividedBy(100)
          .decimalPlaces(0, BigNumber.ROUND_FLOOR)
          .multipliedBy(0.01),
      );
  }

  return songRating.plus(2.15);
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
