import request from "@/utils/http";
import { User } from "@/types/User";

export const login = (data: User) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
