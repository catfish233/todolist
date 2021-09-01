import React, { Component } from 'react'
import '../css_style/Clock.css'
export default class Colck extends Component {
  constructor(props) {
      super(props);
      this.state = {
        date: new Date()
      };
      this.fn = this.fn.bind(this);
  }

  //挂载
  // componentDidMount(){
  //   this.timerID = setInterval(//setInterval只是间隔一秒将this.tick推入任务队列，并未立即执行
  //     () => this.tick(), 1000
  //   );
  // }

  //卸载
  // componentWillUnmount(){
  //   clearInterval(this.timerID);//清除定时器
  // }

  //挂载
  componentDidMount(){
    this.timerID = this.fn();//使用setTimeout替换setInterval
  }

  //卸载
  componentWillUnmount(){
    clearTimeout(this.timerID);//清除定时器
  }

  fn(){
    setTimeout(this.fn, 1000);//递归调用fn实现时间的跳动效果
    return this.tick();
  }

  //获取当前时间
  tick(){
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div className="time">
        Current time：{this.state.date.toLocaleString()}
      </div>
    )
  }
}
