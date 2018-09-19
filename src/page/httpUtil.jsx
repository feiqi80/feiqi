/**
 * 请求接口 * 
 * @param   options    请求配置（无特殊要求，只需传url即可）
 *                     如果多个请求参数需要按顺序执行，则可在option中传async=false，此时该方法返回一个promise，同时回调方法失效 *                     具体
 * @param   data       请求参数
 * @param   callback   单个请求的回调
 */
function http(options, data, callback) {
	let type = {"content-type": "application/json"},
			headers = (() => {
				if (!options.headers) {
					options.headers = type;
				} else if (!options.headers["content-type"]) {
					options.headers["content-type"] = "application/json"
				}
				return options.headers;
			})(),
			async = typeof(options.async) === "boolean" ? options.async : true;
  let result = fetch(options.url ? options.url : "", {
		method: options.method ? options.method : "post",
		mode: options.mode ? options.mode : "cors",
		cache: options.cache ? options.cache : "default",
		credentials: options.credentials ? options.credentials : "omit",
		redirect: options.redirect ? options.redirect : "follow",
		referrer: options.referrer ? options.referrer : "client",
		headers: headers,
		body: JSON.stringify(data)
	}).then(res => {
		console.log(res);
		if (res.status !== 200) {
			alert("网络有问题！");
			return false;
		}
		return res.json();
	})
	if (async) {
		result.then(d => {
			callback(d);
		});
	} else {
		return result;
	}
}

export default http;