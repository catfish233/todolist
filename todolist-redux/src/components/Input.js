import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Clock from "./Clock";
import store from "../store";
import { sendAction } from "../action";

export default function Input(){
	const [name, setName] = useState('');

	function handleKeyUp(event){
		const {keyCode, target} = event;
		setName(target.value);

		if(keyCode !== 13) return;
		if(name.trim() === ''){
			alert('The input cannot be empty!');
			return;
		}
		const todoObj = {id:nanoid(), name:this.state.name, done: false, date: new Date().toLocaleString()};//预处理，将输入封装为一个对象
		const action = sendAction(todoObj);//生成一个action
		store.dispatch(action);//返回给reducer
		console.log(store);
		target.value = '';
	}

	useEffect(
		store.subcribe(() =>{
			console.log("subcribe:", store.getstate());
			setName();
		})// 监听组件触发事件
	)

	return(
		<div>
          <label>Todolist </label>
          <input onKeyUp = {handleKeyUp} type="text" //绑定input元素
                placeholder="What needs to be done?"
                autoComplete="off" 
          />
          <Clock />
      </div>
	)
}