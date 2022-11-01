import request from "@/utils/http";
import { User, SearchUser, UserInfo } from "@/types/User";

export const login = (data: User) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取角色
export const getRoleList = () => {
  return request({
    url: '/role/role/list'
  })
}

// 获取用户
export const getUser = (search: SearchUser) => {
  return request({
    url: '/user',
    params: search
  })
}

// 添加用户
export const addUser = (data: UserInfo) => {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

// 编辑用户
export const editUser = (id: number, data: UserInfo) => {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data
  })
}

// 删除用户
export const deleteUser = (id: number) => {
  return request({
    url: `/user/${id}`,
    method: 'delete',
  })
}
