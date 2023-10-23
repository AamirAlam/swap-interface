// contract addresses
export const ROUTER_ADDRESS = "0x3990eE369Fb517906362F3C69fa78dc78672A146";
export const FACTORY_ADDRESS = "0xDd2183623973093F149000Be20224056d68ADD5a";
export const API3_PROXY_READER = "0xCF63299e788343A7431AE7428593EEc5560BE93F";

export interface Token {
  id: number;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  chainId: number;
  icon: string;
}

export interface TradeQuote {
  token0Amount: string;
  token1Amount: string;
  dexPrice: string;
  oraclePrice: string;
  deviation: string;
}

export const SWAP_TYPE = {
  FROM: "FROM",
  TO: "TO",
};
