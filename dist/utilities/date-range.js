"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRangeCondition = getDateRangeCondition;
const typeorm_1 = require("typeorm");
function getDateRangeCondition(startDate, endDate) {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    if (startDate && endDate) {
        return { createdAt: (0, typeorm_1.Between)(startDate, endDate) };
    }
    else if (startDate) {
        return { createdAt: (0, typeorm_1.Between)(startDate, today) };
    }
    else if (endDate) {
        return { createdAt: (0, typeorm_1.Between)(thirtyDaysAgo, endDate) };
    }
    else {
        return {};
    }
}
//# sourceMappingURL=date-range.js.map