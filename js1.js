var canvas = document.getElementById('canvas');
//拿到在html中id为canvas的元素并传给设置的新变量canvas
var context = canvas.getContext('2d');
//将canvas的上下文的2d参数传给context变量

自动宽高函数(canvas)
监听用户函数(canvas)


var rubberEnabled = false;
rubber.onclick = function () {
    rubberEnabled = true
    action.className = 'actions x'
}
pen.onclick = function () {
    rubberEnabled = false
    action.className = 'actions'
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
function drawLine(x1, y1, x2, y2, widthl) {
    context.beginPath();//新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
    context.moveTo(x1, y1)
    context.lineWidth = widthl
    context.strokeStyle = 'red'//连线的颜色
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
            if (rubberEnabled) {
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
                if (rubberEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    //drawCircle(x, y, 1);仅在设计的时候用，实际划线就好了
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, 2)
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
            if (rubberEnabled) {
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
                if (rubberEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    //drawCircle(x, y, 1);仅在设计的时候用，实际划线就好了
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, 2)
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