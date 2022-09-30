import { drawInfo } from '../types/DevicesInfo'

export const playerParse = (e: MessageEvent) => {
  return new Promise((resolve) => {
    let jsonData: drawInfo | null = null;
    //处理实时报警信息
    let ssbjReader = new FileReader();
    const alarm_extern = e.data.slice(
      e.data.size - 8 * 1024
    )
    ssbjReader.readAsText(alarm_extern);
    ssbjReader.onload = (evt) => {
      if (evt.target?.readyState === FileReader.DONE) {
        let ssbjData = (ssbjReader.result as string).substr(
          0,
          (ssbjReader.result as string).lastIndexOf('}') + 1
        )
        jsonData = JSON.parse(ssbjData as string);

        //处理分析图片流
        let reader = new FileReader();
        const data = (e.target as any).url.split('=');
        const id = data[data.length - 1];
        const bold = e.data.slice(86, e.data.size - 8 * 1024);
        // readAsDataURL
        reader.readAsArrayBuffer(bold);
        reader.onload = (evt) => {
          if (evt.target?.readyState === FileReader.DONE) {
            let data = new Uint8Array(evt.target.result as ArrayBuffer)
            let url = ''
            for (let i = 0; i < data.length; i++) {
              url += String.fromCharCode(data[i])
            }

            if (url === '') return
            const src = 'data:image/jpeg;base64,' + window.btoa(url)
            resolve({
              jsonData,
              src
            })

            // this.limitData.forEach((v) => {
            //   if (v.device === jsonData.chnId) {
            //     // v.url = src
            //     this.canvasRealTimeImg(
            //       jsonData.chnId,
            //       src,
            //       jsonData.boxes,
            //       jsonData.zones,
            //       jsonData.lines,
            //       'ssimg'
            //     )
            //   }
            // })

            // //右侧报警实时数据处理
            // let tempObj = {}
            // if (jsonData.alarmType !== '') {
            //   let bjlxObj = this.bjlxOptions.find(
            //     (element) => element.value === jsonData.alarmType
            //   )
            //   if (bjlxObj !== null) {
            //     let tempId = this.ssbjDataId++
            //     tempObj.id = jsonData.startTime + '' + jsonData.chnId
            //     tempObj.startTime = thirteenBitTimestamp(jsonData.startTime)
            //     tempObj.alarmType = bjlxObj.label
            //     tempObj.desc = jsonData.desc
            //     tempObj.alarmGrade = this.warnLevelOptions.find(
            //       (v) => v.value === jsonData.alarmGrade
            //     ).label

            //     this.bjData.push(tempObj)
            //     // this.bjData.sort((a, b) =>  b.id - a.id)
            //     this.$nextTick(function () {
            //       this.canvasRealTimeImg(
            //         tempObj.id,
            //         src,
            //         jsonData.boxes,
            //         jsonData.zones,
            //         jsonData.lines,
            //         'myCanvas'
            //       )
            //     })
            //   }
            // }
          }
        }
      }
    }
  })
}

export const byteConvert = function(bytes: number) {
  if (isNaN(bytes)) {
      return '';
  }
  let symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let exp = Math.floor(Math.log(bytes)/Math.log(2));
  if (exp < 1) {
      exp = 0;
  }
  let i = Math.floor(exp / 10);
  bytes = bytes / Math.pow(2, 10 * i);

  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
      bytes = parseFloat(bytes.toFixed(2));
  }
  return bytes + ' ' + symbols[i];
};
