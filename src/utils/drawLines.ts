import { Zones, Boxes } from '@/types/Alarm';
import { drawInfo } from '@/types/Socket';

interface Bounds {
  width: number;
  height: number;
}

// let catchZones = new Set();
export const drawLinesForZones = (context: CanvasRenderingContext2D, bounds: Bounds, args: Array<Zones[]>, strokeColor: string = "yellow", lineWidth: number = 1) => {
  if (context) {
    context.lineWidth = lineWidth;
    args.forEach(zones => {
      // if (catchZones.has(JSON.stringify(zones))) return;
      context.beginPath();
      context.moveTo(zones[0].x * bounds.width, zones[0].y * bounds.height);
      zones.forEach(zone => {
        context.lineTo(zone.x * bounds.width, zone.y * bounds.height);
      })
      context.strokeStyle = strokeColor;
      context.closePath();
      context.stroke();
      // catchZones.add(JSON.stringify(zones));
      // if (catchZones.size > args.length) {
      //   catchZones.delete(JSON.stringify(zones));
      // }
    })
  }
}

// let catchBoxes = new Set();
export const drawLinesForBoxes = (context: CanvasRenderingContext2D, bounds: Bounds, args: Boxes[], strokeColor: string = 'red', lineWidth: number = 1) => {
  if (context) {
    context.lineWidth = 1;
    args.forEach(box => {
      // if (catchBoxes.has(JSON.stringify(box))) return;
      context.moveTo(box.x * bounds.width, box.y * bounds.height);
      context.strokeStyle = strokeColor;
      context.strokeRect(box.x * bounds.width, box.y * bounds.height, box.w * bounds.width, box.h * bounds.height);
      context.font = `${bounds.width * 0.03}pt Calibri`;
      context.fillStyle = strokeColor;
      context.fillText(box.name, box.x * bounds.width, box.y * bounds.height + bounds.width * 0.03);
      // if (catchBoxes.size > args.length) {
      //   catchBoxes.delete(JSON.stringify(box));
      // }
    })
  }
}

export const drawLinesOfPoint = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');
  canvas.onmousedown = (e) => {
    const { offsetX, offsetY } = e;
    console.log(offsetX, offsetY)
    if(context){
      context.lineTo(offsetX, offsetY);
      context.stroke();
    }
  }
}

export const drawAlarmImage = (src: string, zones: Zones[][], boxes: Boxes[], zonesColor?: string, boxesColor?: string, lineWidth?: number) => {
  return new Promise<string>((resolve) => {
    if (src) {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
  
      if (ctx) {
        img.src = src;
        img.setAttribute("crossOrigin",'Anonymous'); // 谷歌策略（画布污染），图片设置跨域解决
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          const bounds = { width: canvas.width, height: canvas.height };
  
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          if (zones && zones.length) {
            // 绘制检测区
            drawLinesForZones(ctx, bounds, zones, zonesColor, lineWidth);
          }
  
          if (boxes && boxes.length) {
            // 绘制报警区
            drawLinesForBoxes(ctx, bounds, boxes, boxesColor, lineWidth);
          }
           resolve(canvas.toDataURL());
        }
      }
    }
  })
}
