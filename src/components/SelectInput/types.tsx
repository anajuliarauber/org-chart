import { SelectOptions } from '@/shared/types';
import { Control } from 'react-hook-form';

export type SelectInputProps = {
  control: Control<any>;
  name: string;
  options: SelectOptions;
  defaultValue: string;
  title: string;
};
