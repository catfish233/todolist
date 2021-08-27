import { nanoid } from "nanoid";
import React , { Component } from "react";
import Colck from "./Colck";
import '../css_style/Input.css';

export default class Input extends Component{
  handleKeyUp = (event) => {
    const {keyCode, target} = event;
    if(keyCode !== 13) return ; //当点击回车时才会传送value
    // console.log(target.value);
    if(target.value.trim() === ''){
      alert('The input cannot be empty!');
      return;
    }
    const todoObj = {id:nanoid(), name:target.value, done: false, date: new Date().toLocaleString()};//预处理，将输入封装为一个对象
    this.props.addtodo(todoObj);//将输入传给App
    target.value = "";
  }

  render(){
    return (
      <div>
          <label>Todolist </label>
          <input onKeyUp = {this.handleKeyUp} type="text" //绑定input元素
                placeholder="What needs to be done?"
                autoComplete="off" 
          />
          <Colck />
      </div>
     );
  }
}