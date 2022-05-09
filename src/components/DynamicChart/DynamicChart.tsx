/* Libs */
import React from 'react';
import { Box, Grid } from '@mui/material';
import DonutChart from 'react-donut-chart';
/* Components */
import Item from '../../components/Item';
/* Utils */
import data from '../../data.json';
import type { PatientData } from '../../types/data';

interface ChartProps {
  dataType?: keyof PatientData;
  disease?: string;
}

const DynamicChart: React.FC<ChartProps> = ({ dataType, disease }: ChartProps) => {
  const getDataByType = (type: keyof PatientData) => {
    // Get the values of type: type = gender => valuesOfType = [Male, Female]
    const valuesOfType: string[] = [];
    for (let i = 0; i < data.length; i++) {
      const curObj = data[i];
      const curType = curObj[type] as string;
      if (valuesOfType.length === 0) {
        valuesOfType.push(curType);
      } else {
        let flag = 0;
        for (let j = 0; j < valuesOfType.length; j++) {
          if (curType === valuesOfType[j]) {
            flag = 1;
            break;
          }
        }
        if (flag === 0) {
          valuesOfType.push(curType);
        }
      }
    }
    // Get all the records that match the type
    const resArr = [];
    for (let i = 0; i < valuesOfType.length; i++) {
      const curType = valuesOfType[i];
      const curTypeArr = data.filter((item) => item[type] === curType);
      const res = {
        label: curType,
        value: curTypeArr.length,
        data: curTypeArr,
      };
      resArr.push(res);
    }
    return resArr;
  };

  const checkDiseaseStatus = (disease: string) => {
    const diseaseArr = data.filter(
      (item) => item.disease.toLowerCase() === disease.toLowerCase()
    );
    if (diseaseArr && diseaseArr.length > 0) {
      const stage1 = diseaseArr.filter(
        (item) => item?.status >= 1 && item?.status <= 5
      );
      const stage2 = diseaseArr.filter(
        (item) => item?.status >= 6 && item?.status <= 10
      );
      const stage3 = diseaseArr.filter(
        (item) => item?.status >= 11 && item?.status <= 15
      );
      const stage4 = diseaseArr.filter(
        (item) => item?.status >= 16 && item?.status <= 20
      );
      return [
        {
          label: 'S1',
          value: stage1.length,
        },
        {
          label: 'S2',
          value: stage2.length,
        },
        {
          label: 'S3',
          value: stage3.length,
        },
        {
          label: 'S4',
          value: stage4.length,
        },
      ];
    }
    return [];
  };

  const chartColors = [
    '#FF754C',
    '#3F8CFF',
    '#FFA2C0',
    '#FFCE73',
    '#86F0A4',
    '#A488F2',
    '#A0D7E7',
  ];

  const filteredData = dataType ? getDataByType(dataType as keyof PatientData) : checkDiseaseStatus(disease as string);
  const formatedData = filteredData.map((item) => {
    return {
      label: item.label,
      value: item.value,
    };
  });

  return (
    <DonutChart
      className='dchart'
      innerRadius={0.8}
      outerRadius={0.7}
      width={300}
      height={300}
      colors={chartColors}
      data={dataType ? formatedData : filteredData}
    />
  );
};

export default DynamicChart;
