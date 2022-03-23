/* 测试引入其它js文件 */
import $ from '../utils/$'
/* 测试树摇 */
import { viewWidth } from '../utils/getView'

$('d2').style.backgroundColor = 'red'
window.onresize = function () {
    console.log('viewWidth:' + viewWidth())
}

/* 测试通过js的方式操控DOM生成图片 */
let oImg = document.createElement('img')
oImg.width = '200'
oImg.height = '100'
oImg.src = require('../img/guowairenwu-2013-07-15-7(5).jpg')
oImg.onload = function () {
    document.body.appendChild(oImg)
}
