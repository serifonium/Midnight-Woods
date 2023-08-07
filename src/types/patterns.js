
let tileTypeIndex = {
    "grass":"g",
    "wood":"w"
}
let tileTypeIndexReverse = {
    "g":"grass",
    "w":"wood"
}


class Pattern {
    constructor(string) {
        this.grid = this.parse(string)
    }
    loadPattern(pos) {
        let chunk = map.requestChunk(pos.x,pos.y)
        for(let x = 0;x<map.options.rows;x++) {
            for(let y = 0;y<map.options.columns;y++) {
                console.log(
                    map.requestTile(x, y)
                )
                map.requestTile(x, y) = this.grid[x][y]
            }
        }
    }
    stringify(pos) {
        let chunk = map.requestChunk(pos.x,pos.y)
        let string = ""
        for(let x in chunk.grid) {
            for(let y in chunk.grid[x]) {
                let tile = chunk.grid[x][y]
                string += tileTypeIndex[tile.type]
            }
        }
        return string
    }
    parse(string) {
        for(let x = 0;x<map.options.rows;x++) {string = string.replace(" ","")}
        this.grid = []
        for(let x = 0;x<map.options.rows;x++) {
            this.grid.push(new Array(map.options.rows))
            for(let y = 0;y<map.options.columns;y++) {
                let index = x*map.options.rows+y
                this.grid[x][y] = {}
                this.grid[x][y].type = tileTypeIndexReverse[string[index]]
            }
        }
        return this.grid
    }
}


var Patterns = [
    new Pattern("wwwwwwww wggggggw wggggggw wggggggw wggggggw wggggggw wggggggw wwwwwwww")
]
