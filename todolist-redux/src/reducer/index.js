const initState = {todoObj:[]};// 默认值

const rootReducer = (state = initState, action) =>{
	switch (action.type){
		case "send_action":
			return Object.assign({}, state, action);
			// 将action和stete合并，相同的action中的子属性被state替换，放在{}中
		default:
			return state;// 返回默认值
	}
};

module.export = {
	rootReducer
};