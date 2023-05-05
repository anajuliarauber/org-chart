import { Select, SelectProps } from 'antd';
import { SelectInputProps } from './types';
import { useController } from 'react-hook-form';

export function SelectInput({ control, name, options, defaultValue, title }: SelectInputProps) {
  const {
    field: { onChange },
  } = useController({
    name,
    control,
  });

  return (
    <>
      <p text-gray-900 text-xl font-normal>
        {title}
      </p>
      <Select
        allowClear
        style={{ width: '100%' }}
        placeholder="Seleccione el mes"
        onChange={onChange}
        options={options}
        defaultValue={defaultValue}
      />
    </>
  );
}
