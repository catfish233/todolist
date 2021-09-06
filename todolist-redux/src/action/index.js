// 定义action
const sendAction = (todoObj) => {
	return{
		type:"send_action",
		todoObj:todoObj,
	}// 返回action
};

// 导出action
module.exports = {
	sendAction
};
