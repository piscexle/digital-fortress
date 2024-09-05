const calculateDiscountedPriceAndRound = (
  originalPrice: number,
  discountPercentage: number,
  decimalPlaces: number = 2
): string => {
  const discountValue: number = (originalPrice * discountPercentage) / 100;
  const discountedPrice: number = originalPrice - discountValue;
  const roundedPrice: string = discountedPrice.toFixed(decimalPlaces);
  return roundedPrice;
};

export default calculateDiscountedPriceAndRound;
