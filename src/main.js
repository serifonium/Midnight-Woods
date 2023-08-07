var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d");

var scaleFactor = 1


function render() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.scale(scaleFactor, scaleFactor);
    ctx.translate(-player.middle.x+window.innerWidth/(2*scaleFactor), -player.middle.y+window.innerHeight/(2*scaleFactor));


    for(let chunk of player.getNearChunks()) {
        map.renderChunk(chunk.pos.x, chunk.pos.y)
    }
    player.render()
    
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    
}

function update() {
    tick = Date.now()
    player.update()
    lastTick = Date.now()
}



setInterval(render, 1000/FrameRate)
setInterval(update, 1000/UpdateRate)

//import { Patterns } from "./src/types/patterns.js"
//console.log(Patterns)