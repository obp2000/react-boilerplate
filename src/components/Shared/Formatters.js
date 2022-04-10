import numeral from 'numeral'

export const formatPrice = value => {
  // console.log('numeral ', numeral(123).format('0,0[.]00 $'))
  // numeral.locale('ru')
  return value === undefined
    ? '' // make controlled
    : numeral(value).format('00[.]00$')
}


export const normalizePhone = value => {
  console.log('value ', value)
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, "");
  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 7)
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 7)}`;
  return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(
    6,
    10
  )}`;
};