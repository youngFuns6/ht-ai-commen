import moment from "moment";
import { clone } from 'lodash';

export const getAlarmLev = (alarmGrade?: number) => {
  if (!alarmGrade && alarmGrade !== 0) return;
  switch (alarmGrade) {
    case 0:
      return '一级报警';
    case 1:
      return '二级报警';
    case 2:
      return '三级报警';
  }
}

export const getEventTypeByText = (type: string) => {

}

// 过滤查询参数
export const fillterQuery = (obj: { [key: string]: any }, fillter: string = '全部', day: boolean = false) => {
  let newObj = clone(obj);
  Object.keys(newObj).forEach(item => {
    if(newObj[item] === fillter || !newObj[item]){
      delete newObj[item];
    }
    if(newObj[item] instanceof moment){
      if(!day){
        newObj[item] = moment(newObj[item].valueOf()).format('X');
      }else {
        newObj[item] = moment.duration(newObj[item].format('HH:mm:ss')).as('seconds');
        // console.log(moment.duration(newObj[item].format('HH:mm:ss')).as('seconds'))
      }
    }
  })
  return newObj;
}
