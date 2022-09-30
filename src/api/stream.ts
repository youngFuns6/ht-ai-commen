import request from "@/utils/http";

// 获取实时流 URL 列表
export const getLivestream = (chnId: string) => {
  return request({
    url: `/livestream/${chnId}`
  })
}
