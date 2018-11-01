
var canvas = document.getElementById('canvas');
//拿到在html中id为canvas的元素并传给设置的新变量canvas
var context = canvas.getContext('2d');
//将canvas的上下文的2d参数传给context变量
var widthl=4;

自动宽高函数(canvas)
监听用户函数(canvas)


var eraserEnabled = false;
eraser.onclick = function () {
    eraserEnabled = true  
    eraser.classList.add('active') //添加eraser的类名属性,驼峰命名法，指令中间要大写
    pen.classList.remove('active')//移除pen的类名属性
}

pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')

}
//mdn搜的
clear.onclick =function(){
    context.clearRect(0,0,canvas.width,canvas.height);
}

//google搜的
save.onclick = function () {
    var url = canvas.toDataURL("image/png");
    var a = document.createElement('a')  
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画'
    a.target = '_blank'
    a.click()
}

red.onclick= function(){
    context.strokeStyle = 'red'
    blue.classList.remove('active')
    red.classList.add('active')
    pink.classList.remove('active')
    black.classList.remove('active')
    green.classList.remove('active')
    orange.classList.remove('active')  
} 
blue.onclick = function () {
    context.strokeStyle = 'blue' 
    blue.classList.add('active')
    red.classList.remove('active')
    pink.classList.remove('active') 
    black.classList.remove('active') 
    green.classList.remove('active') 
    orange.classList.remove('active')    
} 
black.onclick = function () {
    context.strokeStyle = 'black'
    blue.classList.remove('active')
    red.classList.remove('active')
    pink.classList.remove('active')
    black.classList.add('active')
    green.classList.remove('active')
    orange.classList.remove('active')  
} 
pink.onclick = function () {
    context.strokeStyle = 'pink'
    blue.classList.remove('active')
    red.classList.remove('active')
    pink.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    orange.classList.remove('active')  
} 
green.onclick = function () {
    context.strokeStyle = 'green'
    blue.classList.remove('active')
    red.classList.remove('active')
    pink.classList.remove('active')
    black.classList.remove('active')
    green.classList.add('active')
    orange.classList.remove('active')  
} 
orange.onclick = function () {
    context.strokeStyle = 'orange'
    blue.classList.remove('active')
    red.classList.remove('active')
    pink.classList.remove('active')
    black.classList.remove('active')
    green.classList.remove('active')
    orange.classList.add('active')  
} 
thin.onclick=function(){
    widthl= 4;
    thin.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function () {
    widthl = 8;
    thin.classList.remove('active')
    thick.classList.add('active')
}



function 自动宽高函数(canvas) {
    设置宽高()
    //初始化宽高，调用函数
    window.onresize = function () {
        设置宽高()
    }
    //当用户改变宽高时不让画布变形
    function 设置宽高() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        //获取页面的宽，高
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}
//划线函数
function drawLine(x1, y1, x2, y2) {
    context.beginPath();//新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
    context.moveTo(x1, y1)
    context.lineWidth = widthl
    //context.strokeStyle = 'red'//连线的颜色
    context.lineTo(x2, y2)
    context.stroke()//通过线条来绘制图形轮廓。
    context.closePath()//闭合路径之后图形绘制命令又重新指向到上下文中。
}
function 监听用户函数(canvas) {
    //按下去
    var painting = false;
    var lastPoint = { x: undefined, y: undefined }
    //特性监测
    if ('ontouchstart' in document.body) {//触屏设备
        //视频的判断条件是document.body.ontouchstart!==undefined
        canvas.ontouchstart = function (a) {
            console.log(a)//查看输入a信息
            painting = true;
            var x = a.touches[0].clientX;
            var y = a.touches[0].clientY;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { x, y }
                console.log(lastPoint)
            }
        }
        canvas.ontouchmove = function (a) {
            if (painting) {
                var x = a.touches[0].clientX;
                var y = a.touches[0].clientY;
                var newPoint = { x, y }
                //console.log(newPoint)
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    //drawCircle(x, y, 1);仅在设计的时候用，实际划线就好了
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                }
                lastPoint = newPoint
            } else { return }
        }
        canvas.ontouchend = function (a) {
            painting = false;
        }
    } else {//非触屏设备
        canvas.onmousedown = function (a) {
            painting = true;
            var x = a.clientX;
            var y = a.clientY;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { x, y }
                console.log(lastPoint)
                //drawCircle(x,y,1);仅在设计的时候用，实际划线就好了        
            }
        }
        //动起来
        canvas.onmousemove = function (a) {
            if (painting) {
                var x = a.clientX;
                var y = a.clientY;
                var newPoint = { x, y }
                //console.log(newPoint)
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    //drawCircle(x, y, 1);仅在设计的时候用，实际划线就好了
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                }
                lastPoint = newPoint
            } else { return }
        }
        //鼠标停止
        canvas.onmouseup = function (a) {
            painting = false;
        }
    }

}