import ExportJsonExcel from 'js-export-excel';

export default <T>(dataList: T[], optios: { [key: string]: string }, fileName?: string) => {
  return new Promise((resolve) => {
    const excel = {
      fileName: fileName,
      datas: [{
        sheetData: dataList,
        sheelFilter: Object.keys(optios),
        sheetName: 'sheet',
        sheetHeader: Object.keys(optios).map(item => optios[item]),
        columnWidths: new Array(10).fill(10),
      }]
    }
  
    const toExcel = new ExportJsonExcel(excel);
    toExcel.saveExcel();
    resolve(true);
  })
}
