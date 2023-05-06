import { useForm } from 'react-hook-form';
import { ReactHiererchyChart } from 'react-hierarchy-chart';
import { useEffect } from 'react';
import { Button } from 'antd';

import { EmployeeNode } from '@/shared/types';

import { OrgChartProps } from './types';

import { SelectInput } from '../SelectInput';

export function OrgChart({
  filterOptions,
  defaultSelectValue,
  nodes,
  setMonth,
  totalPaidInTheMonth,
}: OrgChartProps) {
  const { watch, control, handleSubmit } = useForm();

  const month = watch('month');

  useEffect(() => {
    if (month) {
      setMonth(month);
    }
  }, [month, setMonth]);

  const onPrint = () => window.print();

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="w-64">
          <SelectInput
            name="month"
            control={control}
            options={filterOptions}
            defaultValue={defaultSelectValue}
            title="Seleccione el mes"
          />
        </div>
      </form>
      <ReactHiererchyChart
        nodes={nodes}
        direction="vertical"
        randerNode={(node: EmployeeNode) => {
          return (
            <div className=" p-4 rounded-full border-gray-100">
              <strong>{node['Nombre ']} </strong>
              <p>{node['Nivel Jerárquico']}</p>
            </div>
          );
        }}
      />
      <p>Total pagado en el mes: {totalPaidInTheMonth}</p>
      <Button onClick={onPrint}>Imprimir</Button>
    </div>
  );
}
