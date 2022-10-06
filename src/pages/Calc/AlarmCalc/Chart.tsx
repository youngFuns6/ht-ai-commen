import React from 'react';
import { Line, LineConfig, Column, ColumnConfig } from '@ant-design/plots';

interface Props {
  data: Array<{
    Date: string;
    count: number;
  }>;
  type?: string;
}

export default function Chart(props: Props) {
  const { data, type='line' } = props;

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
    slider: {
      start: 0.1,
      end: 0.5,
      textStyle: {
        fill: '#fff'
      }
    },
  };

  const columnConfig: ColumnConfig = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'count',
    maxColumnWidth: 60,
    slider: {
      start: 0.1,
      end: 0.2,
      textStyle: {
        fill: '#fff'
      }
    },
  };

  return (
    <>
      {type==='line' ? <Line {...lineConfig} /> : <Column {...columnConfig} />}
    </>
  )
}
