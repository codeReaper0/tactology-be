import { Between, FindOperator } from 'typeorm';

export function getDateRangeCondition(
  startDate?: Date,
  endDate?: Date,
): { createdAt?: FindOperator<Date> } {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  if (startDate && endDate) {
    return { createdAt: Between(startDate, endDate) };
  } else if (startDate) {
    return { createdAt: Between(startDate, today) };
  } else if (endDate) {
    return { createdAt: Between(thirtyDaysAgo, endDate) };
  } else {
    return {};
  }
}
