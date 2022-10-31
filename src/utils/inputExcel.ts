import * as XLSX from "xlsx";

export default (file: File) => {
  return new Promise((resolve, reject) => {
    let data: ArrayBuffer[] = []; // 存储获取到的数据
    // 通过FileReader对象读取文件

    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      try {
        const { result }: any = event.target;

        // 以二进制流方式读取得到整份excel表格对象

        const workbook = XLSX.read(event.target?.result, { type: "binary" });
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据

            data = data.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
                header: ['event_type', 'alarm_type_code', 'alarm_type', 'alarm_voice_text', 'desc', 'memo'],
                defval: "",
                blankrows: true,
              })
            );

            break; // 如果只取第一张表，就取消注释这行
          }
        }

        resolve(data);
      } catch (e) {
        reject(e);

        return;
      }
    };

    fileReader.readAsBinaryString(file); //二进制
  });
};
