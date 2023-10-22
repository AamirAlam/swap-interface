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

export const getTokenOutWithReserveRatio = (
  tokenIn: string,
  token1Reserve: string,
  token2Reserve: string
) => {
  const _token1 = new BigNumber(token1Reserve ? token1Reserve : 0);
  const _token2 = new BigNumber(token2Reserve ? token2Reserve : 0);

  if (_token1.eq("0") || _token2.eq("0")) {
    return new BigNumber("0").toFixed(4).toString();
  }

  try {
    const _out = _token1.div(_token2).multipliedBy(tokenIn);

    return _out.toString();
  } catch (error) {
    console.log("exeption getTokenOut", error);
    return "0";
  }
};
