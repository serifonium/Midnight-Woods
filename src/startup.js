const FrameRate = 60
const UpdateRate = 240
var hover = v(0, 0)
var keys = {}
var lastkey = undefined 
var tick = Date.now()
var lastTick = Date.now()
function getDeltaTime() {return (tick-lastTick)/(1000/UpdateRate)}
var imgs = {}
function addImg(name, src) {
    let img = new Image()
    img.src = "./src/imgs/"+src
    imgs[name] = img
}
addImg("grass", "grass.png")


document.addEventListener('keydown', (e)=>{
    keys[e.key.toLowerCase()]=true
    lastkey = e.key.toLowerCase()
})
document.addEventListener('keyup', (e)=>{
    keys[e.key.toLowerCase()]=false
})
window.addEventListener('mousemove', (e) => {
    hover.x = e.pageX / scaleFactor;     
    hover.y = e.pageY / scaleFactor;
    //hoverVector = v(hover.x+untrs('x'), hover.y+untrs('y'))
})
