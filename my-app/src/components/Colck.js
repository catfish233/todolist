import React, { Component } from 'react'
import '../css_style/Colck.css'
export default class Colck extends Component {
  constructor(props) {
      super(props);
      this.state = {
        date: new Date()
      };
  }

  //挂载
  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  //卸载
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  //获取当前时间
  tick(){
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        Current time：{this.state.date.toLocaleString()}
      </div>
    )
  }
}
