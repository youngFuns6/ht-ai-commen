import { fabric } from 'fabric'
import { Zones, Boxes } from '@/types/DevicesInfo';

interface Bounds {
  width: number;
  height: number;
}

// let catchZones = new Set();
export const drawLinesForZones = (context: CanvasRenderingContext2D, bounds: Bounds, args: Array<Zones[]>) => {
  if (context) {
    context.lineWidth = 1;
    args.forEach(zones => {
      // if (catchZones.has(JSON.stringify(zones))) return;
      context.beginPath();
      context.moveTo(zones[0].x * bounds.width, zones[0].y * bounds.height);
      zones.forEach(zone => {
        context.lineTo(zone.x * bounds.width, zone.y * bounds.height);
      })
      context.strokeStyle = "#0000ff"
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
export const drawLinesForBoxes = (context: CanvasRenderingContext2D, bounds: Bounds, args: Boxes[]) => {
  if (context) {
    context.lineWidth = 1;
    args.forEach(box => {
      // if (catchBoxes.has(JSON.stringify(box))) return;
      context.moveTo(box.x * bounds.width, box.y * bounds.height);
      context.strokeRect(box.x * bounds.width, box.y * bounds.height, box.w * bounds.width, box.h * bounds.height);
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
