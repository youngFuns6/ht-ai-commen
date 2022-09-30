export const getAlarmLev = (alarmGrade?: number) => {
  if(!alarmGrade) return;
  switch (alarmGrade) {
    case 0:
      return '一级报警';
    case 1:
      return '二级报警';
    case 2:
      return '三级报警';
  }
}
