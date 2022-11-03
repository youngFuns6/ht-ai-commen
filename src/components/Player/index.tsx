import React, { useRef, useEffect, useState, useImperativeHandle } from "react";
import flvjs from "flv.js";
import { getLivestream } from "@/api/stream";

interface Props {
  channelId?: string;
  controls?: boolean;
  width?: string;
  height?: string;
  autoPlay?: boolean;
  muted?: boolean;
  flvUrl?: string;
  name?: string;
}

export default React.forwardRef(function Player(props: Props, ref) {
  const {
    channelId,
    controls = true,
    width = "100%",
    height = "100%",
    autoPlay = true,
    muted = false,
    flvUrl = "",
    name = "",
  } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const flvRef = useRef<flvjs.Player | null>(null);
  console.log(flvUrl);
  useEffect(() => {
    if (channelId) {
      console.log("通道号：", channelId);
      asyncGetChannelStream();
    }
    return () => {
      if (flvRef && flvRef.current) {
       try {
        flvRef.current.pause();
        flvRef.current.unload();
        flvRef.current.detachMediaElement();
        flvRef.current.destroy();
       } catch (error) {
        
       } 
      }
    };
  }, [channelId]);

  // 获取视频流地址
  const asyncGetChannelStream = async () => {
    if (!flvjs.isSupported) return;
    const data: any = await getLivestream(channelId as string);
    flvRef.current = flvjs.createPlayer(
      {
        type: "flv",
        cors: true,
        isLive: true,
        hasAudio: false,
        hasVideo: true,
        // isLive: true,
        url: flvUrl ? flvUrl : data.flv,
        // url: "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-720p.flv",
        // url: 'http://192.168.1.152:7080/0'
      },
      {
        deferLoadAfterSourceOpen: false,
      }
    );
    flvRef.current.attachMediaElement(videoRef.current as HTMLVideoElement);
    flvRef.current.load();
  };

  // 暴露实例
  useImperativeHandle(ref, () => ({
    flvPlayer: flvRef.current,
    getCurrentBounts: () => videoRef.current!.getBoundingClientRect(),
  }));

  return (
    <>
      {(channelId || flvUrl) && (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <video
            style={{ objectFit: "fill", width, height }}
            ref={videoRef}
            muted={muted}
            autoPlay={autoPlay}
            controls={controls}
          ></video>
          <h3
            style={{
              position: "absolute",
              left: "5px",
              top: "5px",
              color: "#fff",
            }}
          >
            {name}
          </h3>
        </div>
      )}
    </>
  );
});
