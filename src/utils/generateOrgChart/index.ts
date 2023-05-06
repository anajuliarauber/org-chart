import { EmployeeNode, ParsedEmployeeData } from '@/shared/types';

export function generateOrgChart(employees: ParsedEmployeeData): EmployeeNode[] {
  if (!employees) {
    return undefined;
  }

  const map = new Map<string, EmployeeNode>();

  //create all nodes and map them by ID
  employees.forEach((employee) => {
    const node = { ...employee, childs: [], cssClass: '' };
    map.set(employee.ID, node);
  });

  //connect nodes to their parent
  employees.forEach((employee) => {
    const node = map.get(employee.ID)!;
    const parentNode = map.get(employee['ID Lider']);
    if (parentNode) {
      parentNode.childs!.push(node);
    }
  });

  //return the top-level nodes
  return employees
    .filter((employee) => !map.get(employee['ID Lider']))
    .map((employee) => map.get(employee.ID)!);
}
