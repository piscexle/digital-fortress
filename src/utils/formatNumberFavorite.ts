export const formatNumberFavorite = (input: number): string => {
  if (input < 1000) {
    return input.toString(); // Trả về số nguyên nếu nhỏ hơn 1000
  }

  const suffixes = ['', 'K', 'M', 'B', 'T']; // Các hệ số đơn vị
  const suffixIndex = Math.floor(Math.log10(input) / 3); // Tính toán hệ số đơn vị
  const scaledValue = input / 1000 ** suffixIndex; // Chia cho 1000 theo hệ số đơn vị

  const formattedValue = suffixIndex === 0 ? scaledValue.toFixed(0) : scaledValue.toFixed(1); // Làm tròn giá trị

  return `${formattedValue}${suffixes[suffixIndex]}`;
};
