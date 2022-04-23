export const icons = {
  clock15: require('../../../assets/icons/15_min.svg').default,
  clock30: require('../../../assets/icons/30_min.svg').default,
  clock60: require('../../../assets/icons/60_min.svg').default,
  clock45: require('../../../assets/icons/45_min.svg').default,
  clock90: require('../../../assets/icons/90_min.svg').default,
  clock120: require('../../../assets/icons/120_min.svg').default,
  checkGreen: require('../../../assets/icons/check.svg').default,
  crossRed: require('../../../assets/icons/cross-red.svg').default,
  starEmpty: require('../../../assets/icons/star-empty.svg').default,
  starHalf: require('../../../assets/icons/star-half.svg').default,
  starFilled: require('../../../assets/icons/star-full.svg').default,
  checkmark: require('../../../assets/icons/checkmark.svg').default,
  crossDefault: require('../../../assets/icons/cross.svg').default,
  search: require('../../../assets/icons/search.svg').default,
  chevronBack: require('../../../assets/icons/arrow-left.svg').default,
};

export type IconTypes = keyof typeof icons;
