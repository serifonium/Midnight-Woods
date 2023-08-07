class Player {
    constructor(pos) {
        this.pos = pos || v(0, 0)
        this.scale = v(64, 64)
        this.vel = v(0, 0)
        this.middle = this.pos

        this.render = () => {
            ctx.fillStyle = "#0af"
            ctx.fillRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y)
        }
        this.update = () => {
            this.middle = v(this.pos.x+this.scale.x/2,this.pos.y+this.scale.y/2)
            if(keys["w"]&&!keys["s"]) this.vel.y = -2
            else if(keys["s"]&&!keys["w"]) this.vel.y = 2
            else this.vel.y = 0
            if(keys["a"]&&!keys["d"]) this.vel.x = -2
            else if(keys["d"]&&!keys["a"]) this.vel.x = 2
            else this.vel.x = 0
            if(keys["="]) {
                scaleFactor *= 2
                keys["="] = false
            } if(keys["-"]) {
                scaleFactor *= 1/2
                keys["-"] = false
            }
            this.move()
        }
        this.move=()=>{
            player.pos.x += player.vel.x*getDeltaTime()
            player.pos.y += player.vel.y*getDeltaTime()
        }
        this.getNearChunks=()=>{
            let mid = this.getPlayerChunk().pos
            let size = 2
            return map.requestChunks(mid.x-size-1, mid.y-size, 2*size+1, 2*size+1)
        }
        this.getPlayerChunk=()=>{
            let width = TileSize*map.options.rows
            let height = TileSize*map.options.columns
            let pos = v(snap(player.middle.x/width, 1), snap(player.middle.y/height,1))
            return map.requestChunk(pos.x, pos.y)
        }
         
    }
}
var player = new Player(v(0, 0))