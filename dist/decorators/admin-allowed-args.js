"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAllowedArgs = void 0;
const common_1 = require("@nestjs/common");
const AdminAllowedArgs = (...adminAllowedArgs) => (0, common_1.SetMetadata)('adminAllowedArgs', adminAllowedArgs);
exports.AdminAllowedArgs = AdminAllowedArgs;
//# sourceMappingURL=admin-allowed-args.js.map