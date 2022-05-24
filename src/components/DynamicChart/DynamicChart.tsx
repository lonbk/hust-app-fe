
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
/* Libs */
import React from 'react';
/* Utils */
import data from '../../data/patients.json';
import type { PatientData } from '../../types/data';

import { theme } from '../../theme'

interface ChartProps {
  dataType?: keyof PatientData;
  disease?: string;
  size: 'small' | 'big'
}

ChartJS.register(ArcElement, Tooltip, Legend);

const DynamicChart: React.FC<ChartProps> = ({ size, dataType, disease }: ChartProps) => {
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

  const chartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: '# of Votes',
        data: dataType ? formatedData : filteredData,
        backgroundColor: [
          '#FF754C',
          '#3F8CFF',
          '#FFA2C0',
          '#FFCE73',
          '#86F0A4',
          '#A488F2',
          '#A0D7E7'
        ],
        borderRadius: 5,
        border: 'none',
        borderWidth: 1
      },
    ],
  };

  const options = {
    aspectRatio: 1,
    cutout: size === 'small' ? 100 : 110,
    radius: size === 'small' ? 100 : 130,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: size === 'small' ? 'bottom' as const : 'right' as const,
      },
    },
    layout: {
      padding: 0
    },
  }

  console.log('theme', theme)

  return (
      <Doughnut data={chartData} options={options} />
  );
};

export default DynamicChart;

