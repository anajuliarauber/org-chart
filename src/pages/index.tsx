import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'antd';
import CSVParser from 'papaparse';

import { UploadInput } from '@/components/UploadInput';
import { OrgChart } from '@/components/OrgChart';

import { generateOrgChart } from '@/utils/generateOrgChart';

import { EmployeeNode, SelectOptions, ParseResults, ParsedEmployeeData } from '@/shared/types';
import Head from 'next/head';

export default function Home() {
  const { handleSubmit, control } = useForm();

  const [parsedData, setParsedData] = useState<ParsedEmployeeData>();
  const [month, setMonth] = useState<string>();
  const [orgChart, setOrgChart] = useState<EmployeeNode[]>();
  const [filterOptions, setFilterOptions] = useState<SelectOptions>();
  const [totalPaidInTheMonth, setTotalPaidInTheMonth] = useState(0);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const file = data.file?.file.originFileObj;

    if (!file) {
      return;
    }

    CSVParser.parse(file, {
      complete(results: ParseResults) {
        setParsedData(results.data);

        const months: string[] = [];

        results.data.forEach((item) => {
          const month = item.Mes;
          if (!months.includes(month)) {
            months.push(month);
          }
        });

        setMonth(months[0]);

        const options = months.map((item) => {
          return { value: item, label: item };
        });
        setFilterOptions(options);
      },

      header: true,
    });
  };

  useEffect(() => {
    const dataFilteredByMonth: ParsedEmployeeData = parsedData?.filter(
      (item) => item.Mes === month
    );

    const employeeTree = generateOrgChart(dataFilteredByMonth);
    setOrgChart(employeeTree);
    const initialValue = 0;

    const totalPaid = dataFilteredByMonth?.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue['Sueldo  bruto']),
      initialValue
    );
    setTotalPaidInTheMonth(totalPaid);
  }, [month, parsedData]);

  return (
    <>
      <Head>
        <title>Organigrama</title>
      </Head>
      <main className={`flex min-h-screen items-center justify-center p-32`}>
        <div className="w-full">
          <p className="text-gray-900 text-5xl font-bold leading-none mt-0 mb-12">
            Conversor de CSV a <br />
            Organigrama
          </p>
          <p className="text-gray-900 text-xl font-normal">
            Sube tu archivo CSV y crea tu organigrama en línea.
          </p>
        </div>
        {!orgChart ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-12 items-center justify-center w-full"
          >
            <UploadInput control={control} name="file" />

            <Button htmlType="submit">Generar oganigrama</Button>
          </form>
        ) : (
          <OrgChart
            filterOptions={filterOptions}
            defaultSelectValue={month}
            nodes={orgChart}
            setMonth={setMonth}
            totalPaidInTheMonth={totalPaidInTheMonth}
          />
        )}
      </main>
    </>
  );
}
