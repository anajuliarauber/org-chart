import { EmployeeNode, SelectOptions } from '@/shared/types';
import { INode } from 'react-hierarchy-chart';

export type OrgChartProps = {
  filterOptions: SelectOptions;
  defaultSelectValue: string;
  nodes: EmployeeNode[];
  setMonth: (value: string) => void;
  totalPaidInTheMonth: number;
};

export type CustomNodes = INode &
  EmployeeNode & {
    cssClass: string;
  };
