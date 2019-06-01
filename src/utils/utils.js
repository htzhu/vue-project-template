/**
 * 通过参数名称来获得url中指定的参数值
 * @param url url
 * @param paramName 参数名
 * @return {*} 参数值，如果没有该参数则返回null
 */
export const getUrlParamByParamName = function(url, paramName) {
  let splits = url.split('?');
  if (splits.length <= 1) {
    // 如果url中没有参数
    return null;
  } else {
    let params = splits[1].split('&');
    for (let i = 0; i < params.length; i++) {
      if (params[i].split('=')[0] == paramName) {
        return params[i].split('=')[1];
      }
    }
    return null;
  }
};
