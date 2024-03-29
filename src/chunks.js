


function chunkArray2d(e, t, n = {}, r = v(1, 1), c) {
    let a = new Array(e);
    for (let e = 0; e < a.length; e++) {
        a[e] = new Array(t);
        for (let t = 0; t < a[e].length; t++)
            a[e][t] = new Chunk(v(e * r.x, t * r.y), c);
    }
    return { array: a, data: n };
}
function tileArray2d(width, height, x, y, chunk) {

    let a = new Array(width);
    for (let e = 0; e < a.length; e++) {
        a[e] = new Array(height);
        for (let t = 0; t < a[e].length; t++)
            a[e][t] = new Tile(
                x * 1 + e * (1 / chunk.options.rows),
                y * 1 + t * (1 / chunk.options.columns)
            );
    }
    return a;
}

const TileSize = 64
function Tile(e, t, type) {
    
    this.pos = v(e, t)
    this.type = type||"grass"
    this.loaded = true
}
function Chunk(e, t) {

    (this.mobiles = new Array()),
    (this.furnitureMobiles = new Array()),
    (this.grid = tileArray2d(t.options.rows, t.options.columns, e.x, e.y, t)),
    (this.pos = e);
}
;
let startingSize = 5;

class Chunks {
    constructor(options) {
        this.options = {
            rows: 8,
            columns: 8,
            width: 10,
            height: 10,
            xSet: randInt(-1e6, 1e6),
            ySet: randInt(-1e6, 1e6),
            ...options,
        }

        this.chunkMaps = {
            x1y1array: chunkArray2d(startingSize, startingSize, "x1y1", v(1, 1), this),
            x0y1array: chunkArray2d(startingSize, startingSize, "x0y1", v(-1, 1), this),
            x1y0array: chunkArray2d(startingSize, startingSize, "x1y0", v(1, -1), this),
            x0y0array: chunkArray2d(startingSize, startingSize, "x0y0", v(-1, -1), this),
        }
    }
    requestChunk(e, t) {
        let n = e < 0 ? (t < 0 ? "x0y0" : "x0y1") : t < 0 ? "x1y0" : "x1y1",
            r = this.chunkMaps[n + "array"].array;
        let a = e < 0 ? -1 * e : e,
            l = t < 0 ? -1 * t : t;
        return (
            r.length - 1 < a &&
            ((r[a] = new Array()), (r[a][l] = new Chunk(v(e, t), this))),
            null == r[a] && (r[a] = new Array()),
            r[a].length - 1 < l && (r[a][l] = new Chunk(v(e, t), this)),
            null == r[a][l] && (r[a][l] = new Chunk(v(e, t), this)),
            r[a][l]
        );
    }
    renderChunk(e, t) {
        let chunk = this.requestChunk(e, t)
        let grid = chunk.grid
        let width = this.options.rows*TileSize
        let height = this.options.columns*TileSize
        for(let x in grid) {
            for(let y in grid[x]) {
                let tile = grid[x][y]
                ctx.fillStyle = "#000"
                //ctx.fillRect(tile.pos.x*TileSize*this.options.rows, tile.pos.y*TileSize*this.options.columns, TileSize, TileSize)
                if(tile.type=="grass")ctx.drawImage(imgs["grass"], tile.pos.x*width, tile.pos.y*height)
                else { ctx.fillRect(tile.pos.x*width, tile.pos.y*height, TileSize, TileSize)}
            }
        }
        ctx.strokeStyle = "#f0f"
        ctx.lineWidth = 4
        ctx.beginPath();
        ctx.rect(chunk.pos.x*width, chunk.pos.y*height, width, height)
        ctx.stroke();
    }
    requestTile(e, t) {
        let n = v(Math.floor(e / this.options.rows), Math.floor(t / this.options.columns)),
            tileP = v(e - n.x * this.options.rows, t - n.y * this.options.columns)
        return (
            
            this.requestChunk(n.x, n.y).grid[tileP.x][tileP.y]
        );
    }
    requestChunks(e, t, n, r) {
        let a = new Array();
        for (let l = n; l > 0; l--)
            for (let n = 0; n < r; n++) {a.push(this.requestChunk(l + e, n + t));}
        return a;
    }
    getMobiles(e) {
        let t = new Array(),
            n = new Array();
        for (let r = 0; r < e.length; r++) {
            const a = e[r];
            for (let e = 0; e < a.mobiles.length; e++) {
                const n = a.mobiles[e];
                t.push(n);
            }
            for (let e = 0; e < a.furnitureMobiles.length; e++) {
                const t = a.furnitureMobiles[e];
                n.push(t);
            }
        }
        return { mobs: t, furnitureMobs: n };
    }
    removeMob(e, t, n) {
        let r = this.requestChunk(e, t);
        for (let e = 0; e < r.mobiles.length; e++) {
            if (r.mobiles[e].id == n) {
                r.mobiles.splice(e, 1);
                break;
            }
        }
    }
    insertMob(e, t, n) {
        let r = this.requestChunk(e, t);
        return this.removeMob(e, t, n.id), r.mobiles.push(n), n;
    }
};

var map = new Chunks({rows:8, columns:8})