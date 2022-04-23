export const calculatePrice = (duration: number, unitPrice: number) =>
  duration * unitPrice;

export const formatPrice = (
  countryCode: string,
  currency: string,
  price: number,
  digits?: number,
) =>
  new Intl.NumberFormat(countryCode, {
    minimumFractionDigits: digits ?? 2,
    style: 'currency',
    currency,
  }).format(price);
