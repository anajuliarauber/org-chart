import { Employee, EmployeeNode } from '@/shared/types';

export function generateOrgChart(employees: Employee[]): EmployeeNode[] {
  const map = new Map<string, EmployeeNode>();

  //create all nodes and map them by ID
  employees?.forEach((employee) => {
    const node = { ...employee, childs: [] };
    map.set(employee.ID, node);
  });

  //connect nodes to their parent
  employees?.forEach((employee) => {
    const node = map.get(employee.ID)!;
    const parentNode = map.get(employee.ID_Lider);
    if (parentNode) {
      parentNode.childs!.push(node);
    }
  });

  //return the top-level nodes
  return employees
    ?.filter((employee) => !map.get(employee.ID_Lider))
    .map((employee) => map.get(employee.ID)!);
}
