var radSym = 180/Math.PI
function v(t, n) {
    return { x: t, y: n };
  }
  function vc(t, n) {
    return t.x == n.x && t.y == n.y;
  }
  var uniqueId = 0;
  function newId() {
    return self.crypto.randomUUID()
  }
  function randInt(t, n, e = Math.random()) {
    return Math.floor(e * (n + 1 - t)) + t;
  }
  function bias(t, n) {
    let e = Math.pow(1 - n, 3);
    return (t * e) / (t * e - t + 1);
  }
  function falloff(t, n) {
    let e = t + 0.5,
      r = n;
    return 1 / (1 + Math.pow(Math.E, e * r - r));
  }
  function getDistance(t, n) {
    let e = t.x - n.x,
      r = t.y - n.y;
    return Math.sqrt(Math.pow(e, 2) + Math.pow(r, 2));
  }
  function fetchAngle(a, b) {
    let m = Math.atan((a.y-b.y)/(a.x-b.x))
    if(a.x < b.x) { return m } else { return Math.PI + m }
  }
  function getAngle(t, n) {
    return (Math.atan2(t.x - n.x, t.y - n.y)) / (Math.PI/180)
  }
  function snap(t, n) {
    return Math.floor(t / n) * n;
  }
  function clamp(t, n, e) {
    return t > e ? (t = e) : t < n && (t = n), t;
  }
  function stopOverflow(t, n) {
    return ((t % n) + n) % n;
  }
  function xmur3(t) {
    for (var n = 0, e = 1779033703 ^ t.length; n < t.length; n++)
      e = ((e = Math.imul(e ^ t.charCodeAt(n), 3432918353)) << 13) | (e >>> 19);
   return function () {
      return (
        (e = Math.imul(e ^ (e >>> 16), 2246822507)),
        (e = Math.imul(e ^ (e >>> 13), 3266489909)),
        ((e ^= e >>> 16) >>> 0) / 45e8
      );
    };
  }
  function seedRand() {
    let t = 1;
    for (let n = 0; n < arguments.length; n++) {
      t = xmur3(`${arguments[n]}-${t}`)();
    }
    return t;
  }
  function testRectCollision(t, n, e, r, o, u, a, i) {
    return o > t && o > t + e && u > n && u < n + r;
  }
  function roundPoint(t, n) {
    return t > n ? 1 : 0;
  }
  function average() {
    let t = 0;
    for (let n = 0; n < arguments.length; n++) t += arguments[n];
    return t / arguments.length;
  }
  function stringToChar(t) {
    let n = 0;
    for (let e = 0; e < t.length; e++) {
      n += t[e].charCodeAt() * Math.pow(2, e);
    }
    return n;
  }
  function randRadius(t, n, e) {
    let r = 2 * Math.PI * Math.random(),
      o = randInt(n, e);
    return v(t.x + Math.cos(r) * o, t.y + Math.sin(r) * o);
  }
   
  function rotate(t, n, e) {
    var r = e,
      o = Math.cos(r),
      u = Math.sin(r);
    return {
      x: o * (n.x - t.x) + u * (n.y - t.y) + t.x,
      y: o * (n.y - t.y) - u * (n.x - t.x) + t.y,
    };
  }
  function download(t, n) {
    var e = document.createElement("a");
    e.setAttribute(
      "href",
      "data:text/plaincharset=utf-8," + encodeURIComponent(n)
    ),
      e.setAttribute("download", t),
      (e.style.display = "none"),
      document.body.appendChild(e),
      e.click(),
      document.body.removeChild(e);
  }
  function pxlart(e, t, i) {
    for(let y in i) {
        for(let x in i[y]) {
          if(i[y][x] !== "") {
            ctx.fillStyle = i[y][x]
            ctx.fillRect(cx+e+x*4, cy+t+y*4, 4, 4)
          }
        }
    }
}
  
  function findXinY(array, find) {
    let b = []
    for(let a in array) {
      if(find(a)) b.push(a)
    }
    return b
  }
  function overlapping(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
        return false;
    }
    return true;
}
   
function getFunction(v1_, v2_) {
  let gradient_ = -(v2_.y-v1_.y)/(v2_.x-v1_.x)
  let offset_ = gradient_*v1_.x+v1_.y
  return {gradient:gradient_,offset:offset_,v1:v1_}
}
function findIntersection(f, f2) {
  //console.log(f, gradient, offset)
  let point = v(0, 0)
  if(f.gradient == f2.gradient) return null
  if(Math.abs(f.gradient) != Infinity) {
      point.x = (f.offset - f2.offset) / (f.gradient - f2.gradient)
  } else point.x = f.v1.x
  point.y = f2.gradient*-point.x+f2.offset
  return point
  /* 
      m1*x + b1 = m2*x + b2
      => x = (b2 - b1) / (m1 - m2)

      Then substitute x into either of the original equations to find the y-coordinate of the intersection point:

      y = m1*x + b1
      or
      y = m2*x + b2
  */
}
function overlap(a, b) {
  // Check x and y for overlap
  if (b.pos.x > a.scale.x + a.pos.x || a.pos.x > b.scale.x + b.pos.x || b.pos.y > a.scale.y + a.pos.y || a.pos.y > b.scale.y + b.pos.y) {
      return false;
  }
  return true;
}
function checkObjsOverlap(a) {
  objs = []
  for(let obj of objects) {
    if(overlap(a, obj)) objs.push(obj)
  }
  return objs
}