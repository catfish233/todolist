import React, {Component} from "react";
import '../css_style/Clear.css'
export default class Clear extends Component{

  //删除所有todo项
  clearTodo=(flag) =>{
      return() =>{
      if (window.confirm("Do you really want to clear all todo?")) { //确认清空todolist的弹窗
          this.props.clearTodo(flag);
        }return 
    } 
  }

  render(){
    const {todos} = this.props;
    return(
        <button id='Clear' onClick = {this.clearTodo(true)} disabled={(todos.length===0)}>Clear All</button>
    );
  }
}