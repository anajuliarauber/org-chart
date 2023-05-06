export type SelectOptions = {
  value: string;
  label: string;
}[];

export type Employee = {
  Area: string;
  División: string;
  'Fecha de ingreso': string;
  ID: string;
  'ID Lider': string;
  Mes: string;
  'Nivel Jerárquico': string;
  'Nombre ': string;
  Subarea: string;
  'Sueldo  bruto': string;
};

export type EmployeeNode = Employee & {
  childs?: EmployeeNode[];
  cssClass: string;
};

export type ParseResults = {
  data: ParsedEmployeeData;
};

export type ParsedEmployeeData = {
  Area: string;
  División: string;
  'Fecha de ingreso': string;
  ID: string;
  'ID Lider': string;
  Mes: string;
  'Nivel Jerárquico': string;
  'Nombre ': string;
  Subarea: string;
  'Sueldo  bruto': string;
}[];
