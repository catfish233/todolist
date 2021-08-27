import '../css_style/Sitefoot.css'

function Sitefoot(){
    return(
        <div className="foot">{/* 在jsx中，类名使用className,而不是class */}
            <p id='text'>Double Click to edit a todo</p><span></span>
            <p id='author-fo'>Created by </p><span></span>
            <p id='author'>RHJ</p><span></span>
            <p id='email'>Email: <a  href="https://www.google.com/intl/zh-CN/gmail/about/#">liu_0818@qq.com</a></p>
        </div>
    )
}

export default Sitefoot;