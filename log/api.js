import request from "./loghttp"
//post示例
export const insert_log = params => request('insert_log', params) //收集错误日志
export const insert_none_log = params => request('insert_none_log', params) //收集无商品错误日志