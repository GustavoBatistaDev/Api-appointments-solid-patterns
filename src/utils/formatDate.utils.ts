const addLeadingZero = (value: number): string =>
  value < 10 ? `0${value}` : `${value}`;

export const formatDate = (date: Date): string => {
  const day = addLeadingZero(date.getDate());
  const month = addLeadingZero(date.getMonth() + 1); // Months in JavaScript are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
