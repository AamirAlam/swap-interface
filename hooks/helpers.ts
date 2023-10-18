import BigNumber from "bignumber.js";

export const fromWei = (value: number | string, decimals = 18) => {
  if (!value) {
    return "0";
  }
  return new BigNumber(value)
    .div(new BigNumber(10).exponentiatedBy(decimals))
    .toString();
};

export const toWei = (value: number | string, decimals = 18) => {
  if (!value) {
    return new BigNumber(0).toString();
  }
  return new BigNumber(value)
    .multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
    .toFixed(0)
    .toString();
};

export const formatCurrency = (value: number, fractionDigits: number = 1) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
  });

  return formatter.format(value ? value : 0).slice(1);
};

export const getUnixTime = (timeInMintes: number) => {
  const now: any = new Date();
  now.setMinutes(now.getMinutes() + timeInMintes); // timestamp
  const _timeUnix = Math.floor(now / 1000);
  return _timeUnix;
};
