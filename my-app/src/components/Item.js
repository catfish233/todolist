import React, {Component} from "react";
import '../css_style/Item.css'
export default class Item extends Component{
	constructor(props) {
		super(props);
		this.state = {
				mouse: false,
				isEditing: false, // 是否编辑状态
				name: props.name,
				date: props.date,
		};
	}
	
	//鼠标移入移出的回调函数
	handleMouse = (flag) =>{
		return ()=>{
			this.setState({mouse: flag})
		}
	}

	//修改后将状态传递回App，并修改isEditing为false
	handleEdit = (id, done) =>{
		return (event) =>{
			const {keyCode, target} = event;
			const date = new Date().toLocaleString();
			if(keyCode !== 13) return;
			else{
				if(target.value === '') return alert('The input cannot be empty!');
				const newtodo = {id:id, name:target.value, done:done, date:date};//预处理，将输入封装为一个对象
				this.props.editTodo(newtodo);//将输入传给App
				this.setState({isEditing: false,});
				this.setState({
						date: date
				});
			}
		}
	}

	//input框失去焦点时，提交修改
	handleOnblur = (id, done) =>{
		return (event) =>{
			const {target} = event;
			const date = new Date().toLocaleString();
			if(target.value === '') return alert('The input cannot be empty!');
			const newtodo = {id:id, name:target.value, done:done, date:date};//预处理，将输入封装为一个对象
			this.props.editTodo(newtodo);//将输入传给App
			this.setState({isEditing: false,});
			this.setState({
				date: date
			});
		}
	}

	//todo项done状态更新的回调函数
	handleCheck = (id)=>{
			const date = new Date().toLocaleString();
			return (event)=>{
					this.props.updateTodo(id, event.target.checked, date);//传回App组件
					this.setState({
							date: date
					});
			}
	}

	//删除按钮的回调函数
	delTodo = (id)=>{
			return ()=>{
					// if (window.confirm("Do you really want to delete this todo?")) { //确认删除弹窗
					//     this.props.delTodo(id);
					//   }return 
					this.props.delTodo(id);
			}
	}
	
	render(){
		const{id, done, flag} = this.props;
		const { name } = this.state;
		const time = this.state.date.toLocaleString();
		const {mouse, isEditing} = this.state;
		return(
				<li style = {{backgroundColor:mouse ? '#ddd' : 'rgb(235, 232, 219)', 
										display:((flag==='Active'? done: !done)&&(flag==='All'? null: true) )?'none':'block',
								}} 
				onMouseEnter={this.handleMouse(true)} 
				onMouseLeave={this.handleMouse(false)}>  {/* 鼠标移入Item项高亮显示，移出恢复 */}
						
					<input type="checkbox" defaultChecked = {done} onChange={this.handleCheck(id)}/>
					<p id='Time'>{time}</p>{/* 设置为<p style={{opacity:done?'0.5':'1'}}>{time}</p>之后，复选框就不能点击 */}
					{
						isEditing ?
							<input className='input'
								autoFocus value={name}
								onKeyUp={this.handleEdit(id, done)}
								onBlur={this.handleOnblur(id, done)} 
								onChange={(e) => {
										this.setState({name: e.target.value,})
								}}
							/> :
							<p  className='text' style={{opacity:done?'0.5':'1'}} 
								onDoubleClick={() => {
										this.setState({isEditing: true,});  
								}}
							>
								{name}
							</p>
					}
					<button className="del" onClick = {this.delTodo(id)} style={{opacity:mouse?'1':'0'}}>X</button>
			</li>
		)
	}
}