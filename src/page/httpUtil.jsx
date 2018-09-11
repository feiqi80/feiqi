function objToParam(obj) {
  let result = "";
	for(let key in obj){
		result += "&" + key + "=" + encodeURIComponent(obj[key]);
	}	
  console.log(result);
	return result ? result.substring(1) : result;
}

function http(options, data, callback) {
	let type = {"content-type": "application/json"},
			headers = (() => {
				if (!options.headers) {
					options.headers = type;
				} else if (!options.headers["content-type"]) {
					options.headers["content-type"] = "application/json"
				}
				return options.headers;
			})();
  fetch(options.url ? options.url : "", {
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
			return;
		}
		return res.json();
	}).then(d => {
		callback(d);
	});
}

export default http;