export const npr = (paisa: number) =>
  "NPR " + (paisa / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const kg = (grams: number) => (grams / 1000).toFixed(1) + " kg";