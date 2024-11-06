import { ChainWithAttributes } from "@scaffold-stark-2/utils/scaffold-stark";

// Cache object to store the last fetched prices based on currency symbols
const priceCache: Record<string, number> = {};

export const fetchPriceFromCoingecko = async (symbol: string, retryCount = 3): Promise<number> => {
  if (symbol !== "ETH" && symbol !== "SEP" && symbol !== "STRK") {
    return 0;
  }

  // Check cache first
  if (priceCache[symbol] !== undefined) {
    return priceCache[symbol];
  }

  return updatePriceCache(symbol, retryCount);
};

const updatePriceCache = async (symbol: string, retries = 3): Promise<number> => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const response = await fetch(`/api/price/${symbol}`);
      const data = await response.json();
      const price = symbol === "ETH" ? data.ethereum.usd : data.starknet.usd;
      priceCache[symbol] = price;
      return price;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} - Error fetching ${symbol} price from Coingecko: `, error);
      attempt++;
      if (attempt === retries) {
        console.error(`Failed to fetch price after ${retries} attempts.`);
        return priceCache[symbol] || 0;
      }
    }
  }
  return priceCache[symbol] || 0;
};

setInterval(() => {
  Object.keys(priceCache).forEach(symbol => {
    console.log(`Updating price for ${symbol}`);
    updatePriceCache(symbol);
  });
}, 300000);
