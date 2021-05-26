import settle from "../node_modules/axios/lib/core/settle"
//请求适配器
const adapter = (config) => {
  let {
    method,
    baseURL: baseHost,
    url: api_name,
    header: header,
    params: data
  } = config;
  api_name = config.url.replace(/\s/g, "");
  const url = baseHost + api_name;
  //图片上传请求拦截器
  if (data.fileName) {
    let {
      fileName: name, //文件名称
      filePath,
      fileSize,
      formData,
    } = data;
    const fileBytes = fileSize ? fileSize / 1024 / 1024 : false;
    console.log("图片大小->", fileBytes);
    const issize = data.issize ? data.issize : 5;
    if (fileBytes && fileBytes > issize) {
      utils.uniFuncs.uniToast(`图片超过${issize}MB,请重新上传`);
      return;
    }
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        name,
        url,
        filePath,
        formData,
        header,
        complete: function complete(response) {
          console.log("1-uni->请求完成,准备进行响应=>", response);
        //判断单独接口是否开启拦截功能
          if (config.isHmr) {
            config.pendingAjax.delete(config.duplicatedKey);
          }
          response = {
            data: response.data,
            status: response.statusCode,
            errMsg: response.errMsg,
            header: response.header,
            config: config,
            code: JSON.parse(response.data).code
          };
          settle(resolve, reject, response);
        }
      })
    })
  }
  //普通请求拦截器
  return new Promise((resolve, reject) => {
    uni.request({
      method,
      url,
      header,
      data,
      params: data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        console.log("请求完成,准备进行响应=>", response);
        //判断单独接口是否开启拦截
        if (config.isHmr) {
          config.pendingAjax.delete(config.duplicatedKey);
        }
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config,
          code: response.data.code
        };
        settle(resolve, reject, response);
      }
    })
  })
}
export default adapter;