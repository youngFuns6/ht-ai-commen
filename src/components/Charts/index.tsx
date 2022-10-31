import React from 'react';
import { Line, LineConfig, Column, ColumnConfig, } from '@ant-design/plots';
import './index.scss';
import TextBar from '@/components/base/TextBar';
import ToolBtn from '@/components/base/ToolBtn';

import chartCircleBtn from '@/assets/images/btn/tools/chart_circle.png'
import chartCircleAcBtn from '@/assets/images/btn/tools/chart_circle_ac.png'
import chartLineBtn from '@/assets/images/btn/tools/chart_line.png'
import chartLineAcBtn from '@/assets/images/btn/tools/chart_line_ac.png'

interface Props {
  data: Array<{
    Date: string;
    count: number;
  }>;
  type?: string;
  xField: string;
  yField: string;
  textBarSrc: string;
  onClick?: (type: 'line' | 'column') => void;
}

export default function Charts(props: Props) {
  const { data = [], type = 'line', xField, yField, textBarSrc, onClick } = props;

  const lineConfig: LineConfig = {
    data,
    padding: 'auto',
    xField,
    yField,
    xAxis: {
      tickCount: data.length,
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
    xField,
    yField,
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
    <div className='charts'>
      <div className='charts-header'>
        <TextBar src={textBarSrc} />
        <div className='charts-header-btn'>
          <ToolBtn onClick={() => {onClick && onClick('line')}}  src={chartLineBtn} acSrc={chartLineAcBtn} />
          <ToolBtn onClick={() => {onClick && onClick('column')}} src={chartCircleBtn} acSrc={chartCircleAcBtn} />
        </div>
      </div>
      <div className='charts-content'>
      {type === 'line' ? <Line {...lineConfig} /> : <Column {...columnConfig} />}
      </div>
    </div>
  )
}
