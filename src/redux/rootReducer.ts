import { combineReducers } from 'redux';
// slices
import authenticationReducer from './slices/authentication';
import userReducer from './slices/user';
import orderReducer from './slices/order';
import employeeReducer from './slices/employee';
import inventoryReducer from './slices/inventory';
import warehouseReducer from './slices/warehouse';
import workLogReducer from './slices/work-log';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
  order: orderReducer,
  employee: employeeReducer,
  inventory: inventoryReducer,
  warehouse: warehouseReducer,
  workLog: workLogReducer,
});

export default rootReducer;
