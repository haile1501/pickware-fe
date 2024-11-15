import { paths } from 'src/paths';
import { NavItemConfig } from 'src/types/nav';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'inventory', title: 'Inventory', href: paths.dashboard.inventory, icon: 'package' },
  {
    key: 'warehouse-layout',
    title: 'Warehouse Layout',
    href: paths.dashboard.warehouseLayout,
    icon: 'layout',
  },
  { key: 'orders', title: 'Orders', href: paths.dashboard.orders, icon: 'orders' },
  { key: 'employees', title: 'Employees', href: paths.dashboard.employees, icon: 'users' },
  { key: 'equipments', title: 'Equipments', href: paths.dashboard.equipment, icon: 'equipments' },
] satisfies NavItemConfig[];
