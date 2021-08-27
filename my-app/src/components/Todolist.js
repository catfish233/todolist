import React, {Component} from "react";
import Item from "./Item";
import '../css_style/Todolist.css'
export default class Todolist extends Component{
  constructor(props) {
    super(props);
    this.state = {
        flag: 'All'
    };
  }

  //分类显示按钮的回调函数
  handleClick(flag){
    return()=>{
      this.setState({flag: flag})
    }
  }

  render(){
    const {todos, updateTodo, editTodo, delTodo} = this.props;
    const {flag} = this.state;
    const todolist = todos.filter((todoObj)=>{return todoObj.done !== true });
    return (
      <div className="Todolist_div">
        {
          todos.map((todo) => {
            return <Item key={todo.id} {...todo} updateTodo={updateTodo} 
            editTodo={editTodo} delTodo={delTodo} 
            flag={flag}/>//遍历数组，显示Item组件的内容
          })
        }
        {
            todolist.length > 1 ?
            <p id="length">{todolist.length} items left</p>
            : <p id="length">{todolist.length} item left</p>
        }
        <button className='sort' id='All' onClick = {this.handleClick('All')} >All</button>
        <button className='sort' id='Active' onClick = {this.handleClick('Active')} >Active</button>
        <button className='sort' id='Completed' onClick = {this.handleClick('Completed')} >Completed</button>
      </div>
    );
  }
}