// 页面功能：
//  1、添加 todo 事项 -> 往 todo ul 中添加 li, 本地要记录
//  2、删除 todo 事项 -> 删除对应li 内容，本地记录
//  3、修改 todo 事项 -> 更改 li 内部 p 标签的内容（将 p 标签改成 input, 再更改回来），本地记录
//  4、切换 todo 事项状态 -> 更改成 已完成/未完成 ，切换 li 中 checkbox 的选中状态，本地记录
//  5、清空页面内容 -> 删除页面上所用的 li 本地记录

//简化：
//  增/删/修/切换状态 -> 不做本地存储
//      -> 用数组标识后，将数据增删改切 改成对数组的操作，根据数组渲染页面、离开页面后再存储数据
//进入页面，获取本地数据，渲染 => todoLs : [{ content: xxx, done: true/false },……]（数据格式）
//  遍历本地存储数组，生成 li , 对应状态添加到 ul 元素中
//Todolist 的数据由输入框接收。可用一个对象 obj 来表征，
//obj属性是text（输入的内容）、status（布尔值来表示 完成/未完成）、time（输入时间）、del（删除标签）
//输入后将该对象放入数组中，根据属性：time 进行排序。显示时，通过遍历数组，根据status分类，分别显示完成项和未完成项。
//删除时可以将数组中对应的项删除

//清理所有项
function clear(){
    localStorage.clear();
    load();
}

//添加(获取）todo
function getTodo(){
    var obj = new Object;//可优化：输入为空时可不创建新属性，将这步放在else 里面，减少内存使用
    obj.status = false;
    obj.text = document.querySelector("#title").value;//加上.value后获取输入文本
    if (obj.text.trim() == "") {
        alert("输入不能为空!");//trim方法的作用：使输入都是空格也会报错
    }else{
        var data = getLocalData();
        data.push(obj);
        saveData(data);
        document.querySelector("#form").reset();//重置输入框
        load();
    }
}

//获取本地数据
function getLocalData(){
    let localdata = localStorage.getItem("localdata");
    if (localdata != null) {
        return JSON.parse(localdata);
    }else return [];//无本地数据返回空数组
}

//保存data
function saveData(data){
    localStorage.setItem("localdata", JSON.stringify(data));//将数组保存在“localdata”字段
}

//删除todo项
function del(i){  
    var data = getLocalData();
    //click del按钮 触发del
    //data[i].del = true;删除了data[i]，没必要更改del属性
    data.splice(i, 1)[0];//删除第i个（当前）data元素
    saveData(data);
    load();
}

//更新data
function upDate(i,text){
    var data = getLocalData();
    data[i].status = text;
    saveData(data);
    load();
}

//编辑todo项
function edit(i){
    let data = getLocalData();
    var p = document.querySelector("#p-" + i);
    title = data[i].text;//保存原信息，当输入为空时，保持原信息(data[i].text)不变
    // p.innerHTML = "<input value='" + title + "' id='input-" + i + "'/>";
    p.innerHTML = `<input id=input-${i} value="${title}"  />`;
    var input = document.querySelector("#input-" + i);//获取输入的内容
    input.focus();
    input.setSelectionRange(10000,10000);//将光标移动到文本最后
    input.onblur = function() {
        if (input.value.length == 0) {
            p.innerHTML = title;
            // alert("内容不能为空");
        } else {
            let data = getLocalData();
            let todo = data[i];
            todo.text = input.value;
            data.splice(i, 1, todo);//替换当前项的text，其余不变
            saveData(data);
            load();
        }
    };
}

//根据数组显示todo项(todo项 和 done项)
function load(){
    const localdata = localStorage.getItem("localdata");
    if (localdata != null){
        let data = JSON.parse(localdata);
        let todoCount = 0;
        let doneCount = 0;
        let todoString = "";
        let doneString = "";//初始化计数值和列表
        for (let i = 0; i < data.length; i++){
            if (data[i].status){
                doneString += "<li><input id='donecheck' type='checkbox' onchange='upDate(" + i + ",false)' checked='checked' />" +
                    `<p id=p-${i} onclick=edit(${i})>${data[i].text}</p>` +
                    `<button onclick=del(${i})>X</button></li>`;
                    // "<p id='p-" + i + "' onclick='edit(" + i + ")' >" + data[i].text + "</p>" +//点击文本，转到编辑函数
                    // "<a href='javascript:del(" + i + ")'>-</a></li>";//点击del按钮，跳转到删除函数
                doneCount++;
            } else {
                todoString += "<li><input id='doingcheck' type='checkbox' onchange='upDate(" + i + ",true)' />" +
                    //`<li><input type='checkbox' onchange='upDate(${i},ture)' />` +
                    `<p id=p-${i} onclick=edit(${i})>${data[i].text}</p>` +
                    `<button onclick=del(${i})>X</button></li>`;
                    // "<p id='p-" + i + "' onclick='edit(" + i + ")'>" + data[i].text + "</p>" +
                    // "<a href='javascript:del(" + i + ")'>-</a></li>";
                    // 可以使用模版字符串实现
                todoCount++;
            }
        };
        todocount.innerHTML = todoCount;
        todolist.innerHTML = todoString;//在id=todolist处插入todoString语句，以显示todo项
        donecount.innerHTML = doneCount;
        donelist.innerHTML = doneString;//dom节点插入，dom操作， 可以使用文档片段对象DocumentFragment创建元素
    }else{
        todocount.innerHTML = 0;
        todolist.innerHTML = "";
        donecount.innerHTML = 0;
        donelist.innerHTML = "";
    }
}

window.onload = load;