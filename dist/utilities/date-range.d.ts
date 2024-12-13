import { FindOperator } from 'typeorm';
export declare function getDateRangeCondition(startDate?: Date, endDate?: Date): {
    createdAt?: FindOperator<Date>;
};
