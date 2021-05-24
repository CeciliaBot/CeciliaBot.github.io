function getCoords(e,size) {
    const { x, y } = e.target.getBoundingClientRect();
    const mouseX = e.clientX - x;
    const mouseY = e.clientY - y;
    return [Math.floor(mouseX / size), Math.floor(mouseY / size)];
}

var normalRaid = {"name":"Normal Raid", "type":"raid","start":"18-22","data":{"2-19":{"type":"battle"},"2-20":{"type":null},"3-19":{"type":null},"4-19":{"type":"battle"},"2-21":{"type":null},"2-22":{"type":"mini-boss"},"3-22":{"type":null},"4-22":{"type":"battle"},"5-22":{"type":null},"6-22":{"type":null},"6-21":{"type":null},"6-20":{"type":null},"5-19":{"type":null},"6-19":{"type":"mini-boss"},"7-22":{"type":null},"8-22":{"type":"battle"},"9-22":{"type":null},"10-22":{"type":"battle"},"10-21":{"type":null},"10-20":{"type":null},"10-19":{"type":"battle"},"9-19":{"type":null},"8-19":{"type":null},"7-19":{"type":null},"6-17":{"type":null},"6-18":{"type":null},"6-16":{"type":"battle"},"7-16":{"type":null},"8-16":{"type":"battle"},"9-16":{"type":null},"10-16":{"type":"battle"},"10-15":{"type":null},"10-14":{"type":null},"10-13":{"type":"battle"},"9-13":{"type":null},"8-13":{"type":"battle"},"7-13":{"type":null},"6-13":{"type":"battle"},"6-14":{"type":null},"6-15":{"type":null},"5-13":{"type":"boss"},"12-22":{"type":"battle"},"11-22":{"type":null},"13-22":{"type":null},"14-22":{"type":"battle"},"14-23":{"type":null},"15-22":{"type":null},"16-22":{"type":"battle"},"17-22":{"type":null},"18-22":{"type": 'tp'},"18-23":{"type":"shop"},"14-24":{"type":"battle"},"14-25":{"type":null},"15-26":{"type":null},"14-26":{"type":null},"16-26":{"type":"battle"},"17-26":{"type":null},"18-26":{"type":"battle"},"18-27":{"type":null},"18-28":{"type":null},"18-29":{"type":null},"18-30":{"type":"mini-boss"},"17-30":{"type":null},"16-30":{"type":null},"15-30":{"type":null},"14-30":{"type":"battle"},"14-29":{"type":null},"14-28":{"type":"battle"},"14-27":{"type":null},"13-26":{"type":null},"12-26":{"type":null},"11-26":{"type":null},"10-26":{"type":"battle"},"10-27":{"type":null},"10-28":{"type":"battle"},"10-29":{"type":null},"10-30":{"type":"mini-boss"},"9-30":{"type":null},"8-30":{"type":"battle"},"7-30":{"type":null},"6-30":{"type":"battle"},"6-29":{"type":null},"6-28":{"type":null},"6-27":{"type":null},"6-26":{"type":"battle"},"7-26":{"type":null},"8-26":{"type":"battle"},"9-26":{"type":null},"10-31":{"type":null},"10-32":{"type":null},"10-33":{"type":"battle"},"10-34":{"type":null},"10-35":{"type":"battle"},"11-35":{"type":"boss"},"19-22":{"type":null},"20-22":{"type":"battle"},"21-22":{"type":null},"22-22":{"type":"battle"},"23-22":{"type":null},"24-22":{"type":"battle"},"25-22":{"type":null},"26-22":{"type":null},"26-21":{"type":null},"26-18":{"type":null},"26-19":{"type":null},"26-20":{"type":"battle"},"30-18":{"type":"battle"},"29-18":{"type":null},"28-18":{"type":"battle"},"27-18":{"type":null},"27-22":{"type":null},"28-22":{"type":null},"29-22":{"type":null},"30-22":{"type":"mini-boss"},"31-22":{"type":null},"32-22":{"type":"battle"},"22-23":{"type":null},"22-24":{"type":null},"22-25":{"type":"battle"},"30-19":{"type":null},"30-20":{"type":"battle"},"30-21":{"type":null},"31-18":{"type":null},"33-18":{"type":null},"32-18":{"type":"battle"},"30-17":{"type":null},"30-16":{"type":"battle"},"30-15":{"type":null},"30-14":{"type":"battle"},"31-14":{"type":null},"32-14":{"type":null},"33-14":{"type":null},"34-14":{"type":"mini-boss"},"34-15":{"type":null},"34-16":{"type":null},"34-17":{"type":null},"34-18":{"type":"battle"},"34-22":{"type":"battle"},"33-22":{"type":null},"35-22":{"type":null},"36-22":{"type":"battle"},"36-21":{"type":null},"36-20":{"type":null},"36-19":{"type":"battle"},"37-19":{"type":"boss"},"22-26":{"type":null},"22-27":{"type":"mini-boss"},"23-27":{"type":null},"24-27":{"type":null},"25-27":{"type":null},"25-26":{"type":null},"25-25":{"type":null},"25-24":{"type":"battle"},"26-24":{"type":null},"27-24":{"type":"battle"},"28-24":{"type":null},"29-24":{"type":"battle"},"29-25":{"type":null},"29-26":{"type":null},"29-27":{"type":"battle"},"28-27":{"type":null},"27-27":{"type":"battle"},"26-27":{"type":null},"25-28":{"type":null},"25-29":{"type":null},"25-30":{"type":"battle"},"24-30":{"type":null},"23-30":{"type":"battle"},"22-30":{"type":null},"21-30":{"type":"battle"},"21-31":{"type":null},"21-32":{"type":null},"21-33":{"type":"mini-boss"},"22-33":{"type":null},"23-33":{"type":null},"24-33":{"type":null},"25-33":{"type":"battle"},"25-32":{"type":null},"25-31":{"type":null},"26-30":{"type":null},"27-30":{"type":"battle"},"28-30":{"type":null},"29-30":{"type":"battle"},"30-30":{"type":null},"31-30":{"type":"battle"},"31-31":{"type":"boss"},"18-21":{"type":null},"18-20":{"type":"battle"},"18-19":{"type":null},"17-18":{"type":null},"18-18":{"type":"battle"},"18-17":{"type":null},"18-16":{"type":null},"18-15":{"type":"battle"},"14-14":{"type":null},"14-15":{"type":null},"14-16":{"type":"battle"},"14-17":{"type":null},"14-18":{"type":"battle"},"15-18":{"type":null},"16-18":{"type":null},"19-18":{"type":null},"20-18":{"type":null},"21-18":{"type":null},"22-18":{"type":"battle"},"22-17":{"type":null},"22-16":{"type":"battle"},"22-15":{"type":null},"22-14":{"type":null},"14-13":{"type":"mini-boss"},"14-12":{"type":null},"14-11":{"type":"battle"},"22-11":{"type":"battle"},"22-12":{"type":null},"22-13":{"type":"mini-boss"},"18-9":{"type":null},"18-8":{"type":"boss"},"21-13":{"type":null},"20-13":{"type":"battle"},"19-13":{"type":null},"18-13":{"type":null},"17-13":{"type":null},"16-13":{"type":"battle"},"15-13":{"type":null},"18-14":{"type":null},"14-10":{"type":null},"22-10":{"type":null},"22-9":{"type":"battle"},"21-9":{"type":null},"20-9":{"type":"battle"},"19-9":{"type":null},"14-9":{"type":"battle"},"15-9":{"type":null},"16-9":{"type":"battle"},"17-9":{"type":null}}};
var hellRaid = {"name":"Hell Raid", "type": 'raid', "start": '18-22', "data": {"2-19":{"type":"battle"},"2-20":{"type":null},"3-19":{"type":null},"4-19":{"type":"battle"},"2-21":{"type":null},"2-22":{"type":"mini-boss"},"3-22":{"type":null},"4-22":{"type":"battle"},"5-22":{"type":null},"6-22":{"type":null},"6-21":{"type":null},"6-20":{"type":null},"5-19":{"type":null},"6-19":{"type":"mini-boss"},"7-22":{"type":null},"8-22":{"type":"battle"},"9-22":{"type":null},"10-22":{"type":"mini-boss"},"10-21":{"type":null},"10-20":{"type":null},"10-19":{"type":"battle"},"9-19":{"type":null},"8-19":{"type":null},"7-19":{"type":null},"6-17":{"type":null},"6-18":{"type":null},"6-16":{"type":"battle"},"7-16":{"type":null},"8-16":{"type":"battle"},"9-16":{"type":null},"10-16":{"type":"mini-boss"},"10-15":{"type":null},"10-14":{"type":null},"10-13":{"type":"mini-boss"},"9-13":{"type":null},"8-13":{"type":"battle"},"7-13":{"type":null},"6-13":{"type":"battle"},"6-14":{"type":null},"6-15":{"type":null},"5-13":{"type":"boss"},"12-22":{"type":"battle"},"11-22":{"type":null},"13-22":{"type":null},"14-22":{"type":"battle"},"14-23":{"type":null},"15-22":{"type":null},"16-22":{"type":"battle"},"17-22":{"type":null},"18-22":{"type":"tp"},"18-23":{"type":"shop"},"14-24":{"type":"battle"},"14-25":{"type":null},"15-26":{"type":null},"14-26":{"type":null},"16-26":{"type":"battle"},"17-26":{"type":null},"18-26":{"type":"mini-boss"},"18-27":{"type":null},"18-28":{"type":null},"18-29":{"type":null},"18-30":{"type":"mini-boss"},"17-30":{"type":null},"16-30":{"type":null},"15-30":{"type":null},"14-30":{"type":"battle"},"14-29":{"type":null},"14-28":{"type":"battle"},"14-27":{"type":null},"13-26":{"type":null},"12-26":{"type":null},"11-26":{"type":null},"10-26":{"type":"mini-boss"},"10-27":{"type":null},"10-28":{"type":"battle"},"10-29":{"type":null},"10-30":{"type":"mini-boss"},"9-30":{"type":null},"8-30":{"type":"battle"},"7-30":{"type":null},"6-30":{"type":"mini-boss"},"6-29":{"type":null},"6-28":{"type":null},"6-27":{"type":null},"6-26":{"type":"battle"},"7-26":{"type":null},"8-26":{"type":"battle"},"9-26":{"type":null},"10-31":{"type":null},"10-32":{"type":null},"10-33":{"type":"battle"},"10-34":{"type":null},"10-35":{"type":"battle"},"11-35":{"type":"boss"},"19-22":{"type":null},"20-22":{"type":"battle"},"21-22":{"type":null},"22-22":{"type":"battle"},"23-22":{"type":null},"24-22":{"type":"battle"},"25-22":{"type":null},"26-22":{"type":null},"26-21":{"type":null},"26-18":{"type":"mini-boss"},"26-19":{"type":null},"26-20":{"type":"battle"},"30-18":{"type":"mini-boss"},"29-18":{"type":null},"28-18":{"type":"battle"},"27-18":{"type":null},"27-22":{"type":null},"28-22":{"type":null},"29-22":{"type":null},"30-22":{"type":"mini-boss"},"31-22":{"type":null},"32-22":{"type":"battle"},"22-23":{"type":null},"22-24":{"type":null},"22-25":{"type":"battle"},"30-19":{"type":null},"30-20":{"type":"battle"},"30-21":{"type":null},"31-18":{"type":null},"33-18":{"type":null},"32-18":{"type":"battle"},"30-17":{"type":null},"30-16":{"type":"battle"},"30-15":{"type":null},"30-14":{"type":null},"31-14":{"type":null},"32-14":{"type":null},"33-14":{"type":null},"34-14":{"type":"mini-boss"},"34-15":{"type":null},"34-16":{"type":null},"34-17":{"type":null},"34-18":{"type":"mini-boss"},"34-22":{"type":"mini-boss"},"33-22":{"type":null},"35-22":{"type":null},"36-22":{"type":"battle"},"36-21":{"type":null},"36-20":{"type":null},"36-19":{"type":"battle"},"37-19":{"type":"boss"},"22-26":{"type":null},"22-27":{"type":"mini-boss"},"23-27":{"type":null},"24-27":{"type":null},"25-27":{"type":null},"25-26":{"type":null},"25-25":{"type":null},"25-24":{"type":"battle"},"26-24":{"type":null},"27-24":{"type":"battle"},"28-24":{"type":null},"29-24":{"type":"mini-boss"},"29-25":{"type":null},"29-26":{"type":null},"29-27":{"type":"battle"},"28-27":{"type":null},"27-27":{"type":"battle"},"26-27":{"type":null},"25-28":{"type":null},"25-29":{"type":null},"25-30":{"type":"mini-boss"},"24-30":{"type":null},"23-30":{"type":"battle"},"22-30":{"type":null},"21-30":{"type":"battle"},"21-31":{"type":null},"21-32":{"type":null},"21-33":{"type":"mini-boss"},"22-33":{"type":null},"23-33":{"type":null},"24-33":{"type":null},"25-33":{"type":"mini-boss"},"25-32":{"type":null},"25-31":{"type":null},"26-30":{"type":null},"27-30":{"type":"battle"},"28-30":{"type":null},"29-30":{"type":"battle"},"30-30":{"type":null},"31-30":{"type":"battle"},"31-31":{"type":"boss"},"18-21":{"type":null},"18-20":{"type":"battle"},"18-19":{"type":null},"17-18":{"type":null},"18-18":{"type":"mini-boss"},"18-17":{"type":null},"18-16":{"type":null},"18-15":{"type":"battle"},"14-14":{"type":null},"14-15":{"type":null},"14-16":{"type":"battle"},"14-17":{"type":null},"14-18":{"type":"mini-boss"},"15-18":{"type":null},"16-18":{"type":null},"19-18":{"type":null},"20-18":{"type":null},"21-18":{"type":null},"22-18":{"type":"mini-boss"},"22-17":{"type":null},"22-16":{"type":"battle"},"22-15":{"type":null},"22-14":{"type":null},"14-13":{"type":"mini-boss"},"14-12":{"type":null},"14-11":{"type":"battle"},"22-11":{"type":"battle"},"22-12":{"type":null},"22-13":{"type":"mini-boss"},"18-9":{"type":null},"38-19":{"type":null},"39-19":{"type":null},"40-19":{"type":"tp"},"18-8":{"type":"boss"},"18-7":{"type":null},"18-6":{"type":null},"4-13":{"type":null},"3-13":{"type":null},"2-13":{"type":"tp"},"12-35":{"type":null},"13-35":{"type":null},"14-35":{"type":"tp"},"31-32":{"type":null},"31-33":{"type":null},"31-34":{"type":"tp"},"21-13":{"type":null},"20-13":{"type":"battle"},"19-13":{"type":null},"18-13":{"type":null},"17-13":{"type":null},"16-13":{"type":"battle"},"15-13":{"type":null},"18-14":{"type":null},"14-10":{"type":null},"22-10":{"type":null},"22-9":{"type":"battle"},"21-9":{"type":null},"20-9":{"type":"battle"},"19-9":{"type":null},"14-9":{"type":"battle"},"15-9":{"type":null},"16-9":{"type":"battle"},"17-9":{"type":null},"18-5":{"type":"tp"}}};

Vue.component('route-maker', {
    name: 'route-maker',
    props: {
      renderCanvas: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data: function () {
        return {
            firstRender: true,
            dev: false, /* true will enable map editing */
            hideRouteMenu: false,
            mode: 'route', /* */
            eventOptions: [{type: null, name: null}, {type: 'start', name: 'Start'},{type: 'tp', name: 'Teleport'}, {type: 'shop', name: 'Shop'}, {type: 'battle', name: 'Battle'}, {type: 'mini-boss', name: 'Mini-boss'}, {type: 'boss', name: 'Boss Battle'}],
            eventType: 0, /* if mode = event on click set cells to that event type (0: null, 1: start, 3: tp, 4: shop, 5: battle, 6: mini-boss, 7: boss) */
            canvas: this.$refs.route_canvas,
            cellSize: 32,
            mapSize: 42, /* Canvas size = mapSize * cellSize */
            currTheme: "white",
            theme: {
                white: {
                    cellStroke: 'grey',
                    cellStrokeWidth: 2,
                    lineWidth: 5,
                    null: 'white',
                    shop: '#4CAF50',
                    battle: '#3ed7f0',
                    'mini-boss': 'yellow',
                    boss: 'red',
                    tp: 'orange',
                    start: 'green'
                },
                dark: {
                    cellStroke: 'grey',
                    cellStrokeWidth: 2,
                    lineWidth: 5,
                    null: 'transparent',
                    shop: '#4CAF50',
                    battle: '#A1AEBD',
                    'mini-boss': 'yellow',
                    boss: 'red',
                    tp: 'orange',
                    start: 'green'
                }
            },
            isMouseDown: false,
            currentRoute: 0,
            userRoutes: [],
            routesPerCell: {},
            map: normalRaid
        }
    },
    methods: {
        changeCellSize: function (size) {
            this.cellSize = size;
            Vue.nextTick(()=>{
                this.draw()
            });
        },
        clearCanvas: function () {
            this.map = {
                type: null, /* type lab or raid */
                start: null, /* starting point */
                data: {}
            };
            this.clearRoutes();
            this.draw();
        },
        clearRoutes: function () {
            this.userRoutes = [];
            this.currentRoute = 0;
            this.userRoutes[0] = [this.map.start!=null? this.map.start : '0-0'];
            this.draw();
        },
        deleteRoute: function (n) {
            this.userRoutes.splice(n,1);
            if (this.currentRoute>0) this.currentRoute--;
            this.draw();
        },
        countLinesForCell: function () {
            this.routesPerCell = {};
            for (var i=0;i<this.userRoutes.length; i++) {
                for (var j=0;j<this.userRoutes[i].length; j++) {
                    var currCell = this.userRoutes[i][j];
                    if (!this.routesPerCell[currCell]) this.routesPerCell[currCell] = [0,0];
                    this.routesPerCell[currCell][0]++;
                    this.routesPerCell[currCell][1]++;
                };
            };
        },
        routeColor: function (i) {
            var color = ['red','green','blue','orange','pink','purple','cyian']
            return color[i%color.length];
        },
        isCrossWalk: function (key,cells) {
            var x = Number(key.split("-")[0]), y = Number(key.split("-")[0]);
            if (cells[(x+1)+"-"+(y+1)] || cells[(x+1)+"-"+(y-1)] || cells[(x-1)+"-"+(y-1)] || cells[(x-1)+"-"+(y+1)]) { // |_ or .-
                return true;
            }
            return false;
        },
        calculateMorale: function () {
            var tmp = [];
            for (var i = 0; i < this.userRoutes.length; i++) {
                tmp[i] = 0;
                for (var j = 0; j < this.userRoutes[i].length; j++) {
                    if (j===0) continue; //start point
                    var isLast = j===this.userRoutes[i].length-1;
                    var key = this.userRoutes[i][j];
                    var cell = this.map.data[key];
                    if (cell.type==='tp') { // Applay teleporting cost
                        tmp[i] += 3; 
                        continue;
                    } else if (['battle','mini-boss','boss'].includes(cell.type)) {
                        var isCrossWalk = this.isCrossWalk(key,this.map.data);
                        var isBattleOver = (this.map.type==='raid' && this.userRoutes.some( (item,index) => {if (index>=i)return; return item.includes(key)})) || this.userRoutes[i].indexOf(key)<j;
                        if (!isBattleOver) {
                            if (!isLast) {
                                tmp[i]++;
                                if (!isCrossWalk) {
                                    tmp[i]+=6;
                                } else 
                                    tmp[i]+=7;
                            } else if (isCrossWalk) {
                                tmp[i]++;
                            };
                        } else 
                            tmp[i]++;
                    } else {
                        tmp[i]++;
                    }
                };
            };
            return tmp;
        },
        exportMapJSON: function () {
            this.$refs.canvasDiv.innerHTML += JSON.stringify(this.map);
        },
        moveMap: function (x,y) {
            var tmp={type: this.map.type, start: this.map.start, data: {}};
            Object.keys(this.map.data).forEach((key) => {
                var posx = Number(key.split('-')[0]);
                var posy = Number(key.split('-')[1]);
                tmp.data[(posx+x)+"-"+(posy+y)] = this.map.data[key];
            });
            this.map = tmp;
            this.draw();
        },
        thisRouteLine: function (j) {
            var tmp = [/* [x,y,extrax,extray],[x,y,extrax,extray]... */];
            for (var i=0;i<this.userRoutes[j].length;i++) {
                var x = Number(this.userRoutes[j][i].split('-')[0]);
                var y = Number(this.userRoutes[j][i].split('-')[1]);
                var cell = this.userRoutes[j][i];
                if (i===0) {
                    tmp.push([x,y,this.cellSize/2, this.cellSize/2]);
                    continue;
                } else {
                    var lastX = Number(this.userRoutes[j][i-1].split('-')[0]);
                    var lastY = Number(this.userRoutes[j][i-1].split('-')[1]);
                    var diffX = Math.abs(lastX-x);
                    var diffY = Math.abs(lastY-y);
                    var inCellPos = this.routesPerCell[cell][0]!=0?this.cellSize/(this.routesPerCell[cell][0]+1)*(this.routesPerCell[cell][1] || 0) : this.cellSize/2;
                    if (diffX===0 && diffY===1) {
                        tmp.push([x,y,inCellPos,this.cellSize/2]);
                    } else {
                        tmp.push([x,y,this.cellSize/2,inCellPos]);
                    };
                };
                this.routesPerCell[cell][1]--;
            };
            return tmp;
        },
        drawRoutes: function () {
            var ctx = this.ctx;
            this.countLinesForCell();
            for (var j=0; j<this.userRoutes.length; j++) {
                var lines = this.thisRouteLine(j);
                for (var i=0;i<lines.length;i++) {
                    ctx.beginPath();
                    ctx.setLineDash([]);
                    if (i!=0) {
                        if (Math.abs(lines[i][0]-lines[i-1][0])>1 || Math.abs(lines[i][1]-lines[i-1][1])>1 ) ctx.setLineDash([10,10]);
                        ctx.moveTo(lines[i-1][0]*this.cellSize+lines[i-1][2],lines[i-1][1]*this.cellSize+lines[i-1][3]);
                        ctx.lineTo(lines[i][0]*this.cellSize+lines[i][2],lines[i][1]*this.cellSize+lines[i][3]);
                        ctx.lineWidth = this.pathLineWidth;
                        ctx.strokeStyle = this.routeColor(j);
                    } else { // start
                        ctx.strokeStyle = this.theme[this.currTheme].cellStroke;
                        ctx.rect(lines[i][0] * this.cellSize + this.cellSize/3, lines[i][1] * this.cellSize + this.cellSize/3, this.cellSize/3, this.cellSize/3);
                        ctx.fillStyle = "#f4893a";
                        ctx.fill();
                    };
                    ctx.stroke();
                };
            };
            var morale = this.calculateMorale();
            morale.forEach( ( route, i )=>{
                ctx.font = "30px Arial";
                ctx.fillStyle = this.routeColor(i);
                ctx.fillText("Route " + (i+1) + ": " + (route-100>0?route-100 : 0)/*+ " (" + route + ")"*/, 10, 50*(1+i));
            });
            [2,3,4,5,6].map( (key,i) => {
                ctx.beginPath();
                ctx.fillStyle = this.theme[this.currTheme][this.eventOptions[key].type];
                ctx.rect((this.mapSize-8)*this.cellSize, this.cellSize*(i+1)+10, this.cellSize, this.cellSize);
                ctx.fill();
                ctx.lineWidth = this.theme[this.currTheme].cellStrokeWidth;
                ctx.strokeStyle = this.theme[this.currTheme].cellStroke;
                ctx.font = this.cellSize + "px Arial";
                ctx.fillText(this.eventOptions[key].name, (this.mapSize-7)*this.cellSize+this.cellSize/2, this.cellSize+this.cellSize*(1+i)+5); 
                ctx.stroke();
            });
        },
        draw: function () {
            var ctx = this.ctx;
            var canvas = this.$refs.route_canvas;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 1;
            Object.keys(this.map.data).forEach((key) => {
                var positionX = Number(key.split("-")[0]);
                var positionY = Number(key.split("-")[1]);
                ctx.beginPath();
                ctx.setLineDash([]);
                ctx.rect(positionX * this.cellSize, positionY * this.cellSize, this.cellSize, this.cellSize);
                ctx.fillStyle = this.theme[this.currTheme][this.map.data[key].type] || 'white';
                ctx.fill();
                ctx.lineWidth = this.theme[this.currTheme].cellStrokeWidth;
                ctx.strokeStyle = this.theme[this.currTheme].cellStroke;
                ctx.stroke();
            });
            this.drawRoutes();
        },
        addTile: function (mouseEvent) {
            var clicked = getCoords(mouseEvent, this.cellSize);
            var key = clicked[0] + "-" + clicked[1];
            if (mouseEvent.ctrlKey && mouseEvent.shiftKey) {
                this.dev = true;
            };
            if (this.mode==='map') {
                if (mouseEvent.shiftKey) {
                    delete this.map.data[key];
                } else {
                    this.map.data[key] = {
                        type: null
                    };
                };
            } else if (this.mode==='route') {
                if (this.userRoutes.length===0) this.userRoutes = [[this.map.start]];
                if (!this.userRoutes[this.currentRoute] || this.userRoutes[this.currentRoute].length===0) this.userRoutes[this.currentRoute] = [this.map.start];
                if (mouseEvent.shiftKey) {
                    for (var i=this.userRoutes[this.currentRoute].length-1; i>=0; i--) {
                        if (this.userRoutes[this.currentRoute][i]===key) {
                            this.userRoutes[this.currentRoute].splice(i);
                            break;
                        };
                    };
                    if (this.userRoutes[this.currentRoute].length<1) this.userRoutes[this.currentRoute] = [this.map.start];
                } else {
                    if (this.userRoutes[this.currentRoute][this.userRoutes[this.currentRoute].length-1]===key) return;
                    if (!this.map.data[key])  return; /* Out of borders */
                    var [lastX, lastY] = this.userRoutes[this.currentRoute][this.userRoutes[this.currentRoute].length-1].split("-");
                    var diffX = Math.abs(Number(lastX) - clicked[0]);
                    var diffY = Math.abs(Number(lastY) - clicked[1]);
                    if ( this.map.data[key].type!="tp" && (diffX > 1 ||  diffY > 1  || (diffX === 1 && diffY === 1)) )  return; /* Too far from last point */
                    this.userRoutes[this.currentRoute].push(key);
                };
            } else if (this.mode === 'events') {
                if (!this.map.data[key]) return;
                switch (this.eventOptions[this.eventType].type) {
                    case 'start':
                        this.map.start = key;
                        this.clearRoutes();
                        break;
                    default:
                        this.map.data[key].type = this.eventOptions[this.eventType].type;
                };
            };
            this.draw();
        }
    },
    watch: {
        renderCanvas: function (status) {
            if (this.renderCanvas===true) {
                if (gtag && this.firstRender) {
                    gtag('event', 'render', {
                        'event_category': 'Map Maker',
                        'event_label': 'First render'
                    });
                };                  
                this.hideRouteMenu = false;
                Vue.nextTick ( () => {
                    this.firstRender = false;
                    document.body.classList.add('modal-open');
                    this.ctx = this.$refs.route_canvas.getContext('2d');
                    this.clearRoutes();
                    this.draw();
                });
            } else {
                this.dev = false;
                document.body.classList.remove('modal-open');
            };
        }
    },
    mounted: function () {
    },
    computed: {
        pathLineWidth:  function () {
            return Math.ceil(this.cellSize/32*this.theme[this.currTheme].lineWidth);
        }
    },
    render: function (h) {
        if (!this.renderCanvas) 
            return h('span',{on: {click: () => this.renderCanvas = !this.renderCanvas}, style: {overflow: 'hidden', background: 'grey', height: '200px', width: '200px', verticalAlign: 'top', cursor: 'pointer'}}, [
                h('img', {attrs: {src: './img/Raid-Hell_en.png'}}),
                h('div', {style: {transform: "rotate(-45deg)", position: 'absolute', boxShadow: '#00000024 0 5px 8px', top: '8px', left: '-30px', padding: '5px 30px', color: 'white', backgroundColor: 'red'}}, 'NEW'),
                h('span','Custom route')
            ]);

        return h('div', {class: 'modal', style: {display: 'block'}}, [
            h('div', {class: 'modal-content', style: {textAlign: 'center', width: '95%', height: '98%', overflow: 'scroll', padding: 0}}, [
                this.renderCanvas ? [
                    h('header', {style: {boxSizing: 'border-box', position: 'sticky', top: 0, left: 0, backgroundColor: 'var(--bg-color)', borderBottom: 'solid #776048', padding: '10px 0', height: '73px'}}, [
                        h('div', {on: {click: () => this.renderCanvas = !this.renderCanvas}, class: 'close', style: {position: 'absolute', right: 0, top: 0, height: '100%', width: '72px', lineHeight: '72px', fontSize: '44px'}}, '×'),
                        this.dev ? h('div', {ref: 'canvasDiv'}, [ 
                            h('button', {on: {click: () => this.mode = 'map'}}, 'Edit Map'),
                            h('button', {on: {click: () => this.mode = 'events'}}, 'Edit Events'),
                            h('button', {on: {click: () => this.mode = 'route'}}, 'Edit Routes'),
                            h('button', {on: {click: () => this.moveMap(0,3)}}, 'Move down'),
                            h('button', {on: {click: () => this.moveMap(0,-3)}}, 'Move up'),
                            h('button', {on: {click: this.clearCanvas}}, 'Clear Canvas'),
                            h('button', {on: {click: this.exportMapJSON}}, 'JSON Map'),
                        ]) : null,
                        this.mode==='events' ? h('div', {}, this.eventOptions.map((x,i) => {
                            return h('button', {on: {click: () => this.eventType=i}}, 'Set '+ x.name);
                        })) : null,
                        /*h('button', {on: {click: () => {this.currTheme==='dark' ? this.currTheme='white':this.currTheme='dark';this.draw();}}}, this.currTheme==='white'?'Dark map':'Light map'),
                        [64,40,32,24,16].map(x => {return h('button', {on: {click: () => this.changeCellSize(x) }}, 'x'+x)}),*/
                        !this.dev?h('span', {class: 'modal-title'}, 'Custom Route Maker'):null
                    ]),
                    h('div', {style: {position: 'sticky', top: '73px'}}, [
                        h('div', {class: 'noselect', style: {overflow: 'scroll', overscrollBehavior: 'contain', cursor: 'default', position: 'absolute', left: 0, backgroundColor: 'var(--bg-color)', maxHeight: this.hideRouteMenu?'40px':'300px', borderRadius: '0 0 13px', borderBottom: 'solid', borderRight: 'solid', borderColor: '#776048', width: '250px'}}, [
                            h('div', [{name: 'Normal Raid', data: normalRaid}, {name: 'Hell Raid', data: hellRaid}].map(item => {return h('span', {on: {click: () => {this.map = item.data; this.clearRoutes()} }, style: {display: 'inline-block', width: '50%', padding: '10px 0', backgroundColor: this.map.name===item.name?'var(--bg-color-secondary)':null}}, item.name)}) ),
                            h('span', {on: {click: () => {this.userRoutes.push([this.map.start]); this.currentRoute = this.userRoutes.length-1;this.draw()}}, class: 'fa fa-plus', style: {width: '50%', padding: '10px 0'}}, 'New Route'),
                            h('span', {on: {click: this.clearRoutes}, class: 'fa fa-trash', style: {width: '50%', padding: '10px 0'}}, 'Delete all'),
                            this.userRoutes.map( (x,i) => {
                                return h('div', {on: {click: () => { this.currentRoute = i;}}, style: {backgroundColor: this.currentRoute===i?'var(--bg-color-secondary)':null, color: this.routeColor(i), textAlign: 'initial', padding: '15px'}}, [
                                    h('span', {}, 'Route '+(i+1)),
                                    h('i', {on: {click: () => this.deleteRoute(i)}, class: 'fa fa-trash', style: {float: 'right'}})
                                ]);
                            }),
                            h('div', {on: {click: () => this.hideRouteMenu = !this.hideRouteMenu}, class: !this.hideRouteMenu?'fa fa-angle-double-up':'fa fa-angle-double-down',style: {cursor: 'pointer', position: 'sticky', height: '40px', width: '100%', bottom: 0, backgroundColor: '#776048', fontSize: '35px', color: 'white'}}),
                        ])
                    ]),
                    h('p',{style: {textAlign: 'center', marginTop: '45px'}}, [
                        h('b', 'Click'),
                        ' (and hold) to start drawing your route.',
                        h('br'),
                        h('b', 'Hold SHIFT'),
                        ' and click to remove part of your route.',
                        h('br'),
                        h('b', 'You can right click and select "Save image as..." if you want to save your work.'),
                        h('br'),
                        h('i', 'Last fight\'s morale will not be included.'),
                        h('br'),
                        h('b', {style: {fontSize: '20px'}}, 'If you encounter any problems with this tool feel free to contact me on discord: gio#0898')
                    ]),
                    h('canvas', {ref: 'route_canvas', on: {mousedown: (event) => {this.isMouseDown = true; this.addTile(event)}, mousemove: (event) => {if (this.isMouseDown) this.addTile(event)}, mouseup: () => this.isMouseDown = false, mouseleave: () => this.isMouseDown = false}, style: {/*border: 'solid thin white'*/}, attrs: {height: this.mapSize*this.cellSize, width: this.mapSize*this.cellSize}})
                ] : null
            ])
        ]);
    }
});
