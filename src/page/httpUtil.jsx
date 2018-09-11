function objToParam(obj) {
  let result = "";
	for(let key in obj){
		result += "&" + key + "=" + encodeURIComponent(obj[key]);
	}	
  console.log(result);
	return result ? result.substring(1) : result;
}

function post(url, param, callback) {
  return fetch(url, {
		method: 'post',
		mode:'cors',
		headers: {
			'Accept': 'application/json',
      'Content-Type': 'application/json',
		},
		body: JSON.stringify(param)
	}).then(res => {
		console.log(res);
		if (res.status !== 200) {
			alert("网络有问题！");
			return;
		} else {
			return res.json();
		}
	});
}

export default post;


