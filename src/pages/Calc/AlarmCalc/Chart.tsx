import React from 'react';
import { Line, LineConfig, Column, ColumnConfig, Plot, } from '@ant-design/plots';

interface Props {
  data: Array<{
    Date: string;
    count: number;
  }>;
  type?: string;
}

export default function Chart(props: Props) {
  const { data, type='line', } = props;

  const lineConfig: LineConfig = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'count',
    xAxis: {
      tickCount: 5,
      line: {
        style: {
          stroke: '#ddd',
          lineWidth: 1,
        }
      },
    },
    yAxis: {
      line: {
        style: {
          stroke: '#ddd',
          lineWidth: 1
        }
      },
      grid: {
        line: {
          style: {
            stroke: '#999',
            lineWidth: 0.5,
            opacity: 0.5
          }
        }
      },
    },
    // slider: {
    //   start: sliderRange[0],
    //   end: sliderRange[1],
    //   textStyle: {
    //     fill: '#fff'
    //   }
    // },
  };

  const columnConfig: ColumnConfig = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'count',
    maxColumnWidth: 60,
    // slider: {
    //   start: sliderRange[0],
    //   end: sliderRange[1],
    //   textStyle: {
    //     fill: '#fff'
    //   }
    // },
  };

  return (
    <>
      {type==='line' ? <Line {...lineConfig} /> : <Column {...columnConfig} />}
    </>
  )
}
