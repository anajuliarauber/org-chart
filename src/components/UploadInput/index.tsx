import { Button, message, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadInputProps } from './types';
import { useController } from 'react-hook-form';

export function UploadInput({ control, name }: UploadInputProps) {
  const { field } = useController({
    name,
    control,
  });

  const props: UploadProps = {
    name: name,
    multiple: false,
    maxCount: 1,

    // file type validation
    beforeUpload: (file) => {
      const isCSV = file.type === 'text/csv';

      if (!isCSV) {
        message.error(`${file.name} no es un archivo csv.`);
      }
      return isCSV || Upload.LIST_IGNORE;
    },
  };

  return (
    <Upload {...props} {...field}>
      <Button icon={<UploadOutlined />}>Click para elegir un archivo</Button>
    </Upload>
  );
}
