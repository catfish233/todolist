import { Component } from 'react';
import './App.css';
import Input from './components/Input';
import Todolist from './components/Todolist';
import Sitefoot from './components/Sitefoot';
import Clear from './components/Clear';

export default class App extends Component {
  constructor(props) {
    //初始化state状态
    super(props);
    let localdata = localStorage.getItem("localdata");
    if (localdata !== null){
      this.state = JSON.parse(localdata);
    }else{
      this.state = { todos:[] }
    }
  }

  //添加todo项
  addtodo = (todoObj)=>{
    const {todos} = this.state;
    const newtodos = [todoObj, ...todos];
    this.setState({
      todos: newtodos
    })  //更新state  
    // this.saveLocalData(this.state);
  }

  //编辑点击的todo项内容
  editTodo = (newtodo) =>{//传回一个新的todo对象，替换原有的todo项
    const {todos} = this.state;
    const newtodos = todos.map((Item)=>{return Item.id === newtodo.id ? newtodo : Item});//替换
    this.setState({
      todos: newtodos
    });  //更新state  
    // this.saveLocalData(this.state);
  }

  //更新某一项todo的done状态
  updateTodo = (id, done, date) =>{
    //获取原todos
    const {todos} = this.state
    const newtodos = todos.map((todoObj)=>{
      if(todoObj.id ===id) return {...todoObj,done,date}
      else return todoObj;
    })
    this.setState({
      todos: newtodos
    }, () => this.setsort(this.state.todos));//更新state，并分类显示todo项
    // this.saveLocalData(this.state);
  }

   //del按钮删除某一项todo
   delTodo = (id) =>{
    const {todos} = this.state;
    const newtodos = todos.filter((todoObj)=>{
      return todoObj.id !== id
    })
    this.setState({
      todos: newtodos
    });
    // this.saveLocalData(this.state);
  }

  //Clear按钮清除所有todo项
  clearTodo = (flag) =>{
    const newtodos = [];
    if (flag){
      this.setState({todos: newtodos}, ()=>{this.saveLocalData(this.state)});
    }
  }

  //保存本地数据
  saveLocalData(state){
    localStorage.setItem("localdata", JSON.stringify(state));
    // this.setsort(state.todos);
  }

  //todo项分类（使用生命周期函数保存数据、触发这个分类函数会引发死循环）
  setsort(todos){
    const todolist = todos.filter((todoObj)=>{return todoObj.done !== true });
    const donelist = todos.filter((todoObj)=>{return todoObj.done !== false });
    const newtodos = todolist.concat(donelist);
    this.setState({
      todos: newtodos
    });//更新state
  }

  //生命周期函数（组件状态更新）将更新的数据保存在本地
  componentDidUpdate(){
   this.saveLocalData(this.state);//本地保存数据
  }

  render() {
    const {todos} = this.state;
    return (
      <div className="App">
          <Input addtodo = {this.addtodo} />
          <Todolist 
            todos={todos} 
            updateTodo={this.updateTodo} 
            editTodo={this.editTodo} 
            delTodo={this.delTodo}/>
          <Clear clearTodo={this.clearTodo} todos={todos}/>
          <Sitefoot />
      </div>
    );
  }
}