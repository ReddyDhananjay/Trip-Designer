export function formatINR(amount: number, opts?: { maximumFractionDigits?: number }) {
  const maximumFractionDigits = opts?.maximumFractionDigits ?? 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits,
  }).format(amount);
}

