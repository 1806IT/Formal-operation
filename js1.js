
var canvasme = document.getElementById('canvas');//拿到在html中id为canvas的div并传给设置的新div变量
//按下去
canvas.onmousedown = function (a) {
    //var x=a.clientX
    //var y=a.clientY
    console.log(a)
    //console.log(x,y)
    //var divCircle = document.createElement(div)
}


//动起来
document.onmousemove=function(y){
    console.log('动起来了')
}
//上来
document.onmouseup=function(aa){
    console.log('不画了')
}