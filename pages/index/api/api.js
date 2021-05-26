import request from "../../../http/http"
//GET示例
export const testGet = params => request('testGet', params, false) //仅为示例
//POST示例
export const testPost = params => request("testPost", params, "post", true); //仅为示例