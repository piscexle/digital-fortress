export const formatCurrency = (currency: number, lang: string) =>
  new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency: lang === 'vi' ? 'VND' : 'USD',
    maximumFractionDigits: lang === 'vi' ? undefined : 2,
    minimumFractionDigits: lang === 'vi' ? undefined : 2,
  }).format(currency);

export const formatCurrencyWithDigit = (currency: number, lang: string) =>
  new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency: lang === 'vi' ? 'VND' : 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(currency);
