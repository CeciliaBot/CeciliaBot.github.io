/* global Vue*/
const target = document.body;
target.addEventListener('wheel', event => {
  if (app.vertical) return;
  const toLeft  = event.deltaY < 0 && target.scrollLeft > 0
  const toRight = event.deltaY > 0 && target.scrollLeft < target.scrollWidth - target.clientWidth

  if (toLeft || toRight) {
    if (target.classList.contains('modal-open')) return;
    //event.preventDefault();
    target.scrollLeft += event.deltaY;
  }
});


function isElementInViewport(el) {
  if (!el) return;
  var rect = el.getBoundingClientRect();
  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};

var selectRenderRange = debounce(function(items) {
  var items = document.querySelectorAll(".timeline li");
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      //if (isElementInViewport(items[i-1])) {app.renderFrom=app.sortedDates.slice().reverse().indexOf(items[i].id); break;};
      if(!items[i].classList.contains("in-view")){
        items[i].classList.add("in-view");
      };
    } else if(items[i].classList.contains("in-view")) {
        items[i].classList.remove("in-view");
    };
  };
}, 500);
/*
window.addEventListener("load", selectRenderRange);
window.addEventListener("scroll", selectRenderRange);
window.addEventListener('resize', selectRenderRange);*/

function overlaps(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();
  const isInHoriztonalBounds =
    rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
  const isInVerticalBounds =
    rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
  const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
  return isOverlapping;
};


function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        };
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
};

var app = new Vue ({
  el: "#app",
  data: function () {
    return {
      VERSION: 1.0,
      today: null,
      vertical: false,
      daySize: 18, // 18px
      userLang: navigator.language || navigator.userLanguage,
      settings: {dev: false, showEvents: true, showUserPull: false, colorCoded: true, reverse: false},
      userPulls: {},
      devMenu: false,
      HeroDB: null,
      generalStats: null,
      sortedDates: [],
      filter: {character: false, showEvents: true, year: false, month: false},
      bannerOpen: false, //banner obj when open
      openStatWindow: false,
      banners: null
    }
  },
  methods: {
    saveUserData: function () {
      localStorage.setItem('CeciTimeline', JSON.stringify({VERSION: this.VERSION, settings: this.settings, userPulls: this.userPulls}));
    },
    loadUserData: function () {
      let l = JSON.parse(localStorage.getItem('CeciTimeline')||'{}');
      this.settings=l.settings || {dev:false, showEvents: true, colorCoded: true, showUserPull: false};
      this.userPulls=l.userPulls || {pulls: undefined, pity: undefined, c: [], a: []};
      return l;
    },
    hero: function (h) {
      return this.HeroDB[h] || {id: h, _id: h, name: h, rarity: 5, attribute: 'fire', role: 'knight'};
    },
    heroIcon: function (h) {
      return "https://res.cloudinary.com/ceciliabot/image/upload/epic-seven/face/"+this.hero(h).id+"_s.png";
    },
    bannerId: function (b)  {
      return (b.type.slice(0,1)+b.start.replace(/-/g,'')+b.c[0].id.charAt(0)+b.c[0].id.slice(-4)).toUpperCase();
    },
    fromId: function (id) {
      let start = id.slice(1,5) + '-' + id.slice(5,7) + '-' + id.slice(7,9);
      let type = ['mystic','covenant','limited','event'][['M','C','L','E'].indexOf(id.charAt(0))];
      let ch = [id.charAt(9), id.slice(10)]
      for (var i=0; i<this.banners.length;i++) {
        var a = this.banners[i];
        if (a.start===start && a.type===type && a.c[0].id.slice(-4).toUpperCase() === ch[1]  && a.c[0].id.charAt(0).toUpperCase()===ch[0]) return a;
      };
    },
    setDaySize: function (value) {
      if (!value) return;
      if (value<30) this.settings.showUserPull = false;
      this.daySize=value;
    },
    userBannerData: function (b) {
      return this.userPulls[this.bannerId(b)] || {c:[],a:[]};
    },
    getDatesArray: function () {
      var s=[];
      for (var i=0;i<this.banners.length;i++) {
        if (!this.filterBanner(this.banners[i])) continue;
        if (this.banners[i].start && !s.includes(this.banners[i].start)) s.push(this.banners[i].start);
        if (this.banners[i].end && !s.includes(this.banners[i].end)) s.push(this.banners[i].end);
      };
      s.sort((a,b) => {
        return a>b?1:a===b?0:-1;
      });
      this.sortedDates=s;
    },
    displayDate: function (date,event) {
      //@param date must be string
      var d=date.split(/-/g);
      var day=d[2], month=['January','February','March','April','May','June','July','August','September','October','November','December'][Number(d[1])-1], year=d[0];
      return Number(day) + ' ' + month.slice(0,3) + ' ' + year + (event?' - ' + event:'');
    },
    dateDiff: function (a,b) {
      if (!a||!b) return 1;
      return (new Date(b).getTime()-new Date(a).getTime())/(1000 * 3600 * 24);
    },
    dateIndexDiff: function (index,date) {
      if (isNaN(index)) index=Object.keys(this.renderList).indexOf(index)||0;
      return (Object.keys(this.renderList).indexOf(date)||1)-index;
    },
    bannerLength: function (a,b) {
      return this.daySize*this.dateDiff(a,b)+10*(this.dateIndexDiff(b,a))-10;
    },
    bannerSize: function (b) {
      return (this.vertical?'height:':'width:') + this.bannerLength(b.start,b.end) + 'px;';
    },
    shouldDraw: function (b) {
      if (!b.end) return true;
      if (this.dateDiff(this.sortedDates[this.sortedDates.length-1],b.end) < 0 && this.dateDiff(b.start,this.sortedDates[this.sortedDates.length-1]) <0 ) return false;
      return true;
    },
    startDate: function (b) {
      if (this.sortedDates.includes(b.start)) return b.start;
      return this.sortedDates[this.sortedDates.length-1];
    },
    endDate: function (b) {
      if (this.sortedDates.includes(b.end)) return b.end;
      return this.sortedDates[0];
    },
    filterBanner: function (b) {
      let f = this.filter;
      if (!f.showEvents && b.type==='event') return false;
      if (f.date&&(f.date!=b.start && f.date!=b.end)) return false;
      if (f.character && b.type!='event' && !b.c.some(x => this.hero(x.id).name.indexOf(f.character)) != -1 ) return false;
      if (f.type && f.type!=b.type) return false;
      if (f.year && b.type!='event' && !(b.start.slice(0,4)==f.year || b.end.slice(0,4)==f.year)) return false;
      return true;
    },
    openThisBanner: function (e) {
      if (this.settings.dev) {
        document.body.classList.add("modal-open");
        this.devMenu = ['editBanner',e];
        return;
      }
      //return;
      this.bannerOpen = e;
      document.body.classList.add("modal-open");
    },
    
     /* DEV STUFF */
    checkNewBanner: function (b) {
      if (!b.type) {console.log('No banner type  specified'); return false;}
      if (!b.end || !b.end) {console.log('Dates are missing!'); return false};
      if (b.end.length !== 10 || b.start.length !== 10 || b.end.split('-').length!==3 || b.start.split('-').length!==3) {console.log('Dates format is wrong!\nUse YYYY-MM-DD\nExample: 2021-01-01'); return false};
      if (!b.c || b.c.length<1) {console.log('Banner Character is missing'); return false};
      if (!b.type) {console.log('No banner type  specified'); return false;}
      if (!b.title || !b.subtitle) {console.log('No title or subtitle specified!'); return false;}
      if (!b.a) b.a = [];
      return true;
    },
    createNewBanner: function (b) {
      if (!this.checkNewBanner(b)) return;
      this.banners.push(b);
    },
    devSaveBanner: function (e) {
      var input = document.getElementById('devModal').getElementsByTagName('input');
      var b=this.devMenu[1]||{};
      var tmp = {type: input[0].value, start: input[1].value, end: input[2].value, title: input[3].value, subtitle: input[4].value, c: input[5].value.split(','), a: input[6].value.split(',')};
      console.log(tmp);
      if (this.checkNewBanner(tmp)) {
        if (this.devMenu[0]==='editBanner') this.devMenu[1] = tmp;
        else this.banners.push(tmp);
        this.devMenu=false;
        this.closeBanner(e);
      };
    }, /* END DEV STUFF */
    
    saveBannerEdit: function (e,banner) {
      try {
        if (this.dateDiff(banner.start,this.today)<0) return console.log('banner is not out yet'); // banner.start > today
        let pity=banner.type==="mystic"?200:120;
        var tmp={pulls: 0, pity: 0, c: [], a:[]};
        tmp.pulls=Number(this.$refs.pulls.value);
        banner.c.forEach( (x,i) => {tmp.c[i] = {}; tmp.c[i].g=Number(this.$refs.cinput[i].value), tmp.c[i].p=Number(this.$refs.cpity[i].value); tmp.pity+=Number(tmp.c[i].p);});
        if (tmp.pulls/( tmp.pity*pity ) < 1 ) throw new Error('Number of pulls<pity');
        this.userPulls[this.bannerId(banner)] = tmp;
        //this.saveUserData();
        this.closeBanner(e);
      } catch (err) {
        console.log(err);
      }
    },
    closeBanner: function (e,banner) {
      e.preventDefault();
      this.bannerOpen = false;
      document.body.classList.remove("modal-open");
    },
    getGeneralStats: function () {
      //if (this.generalStats!== null) return;
      var banner = this.banners;
      var t = {bannerN: {mystic: 0, limited: 0, covenant: 0}, attribute: {}, role: {}, last_limited: {}, last_new_limited: {}, character: {}, nobanner: [], userStats: {total_covenant: 0, total_limited:  0, total_mystic: 0, covenant_pity: 0, limited_pity: 0, mystic_pity: 0, most_pulled_banner: {}, least_pulled_banner: {}, by_character: {/*spent, got, pity*/}}};
      for (var i=0;i<banner.length;i++) {
        var b=banner[i];
        if (b.type==="event") continue;
        let bid = this.bannerId(b);
        t.bannerN[b.type]++;
        for (var j=0; j<b.c.length;j++) {
          let h = this.hero(b.c[j].id);
          if (!t.attribute[h.attribute]) t.attribute[h.attribute] = {count: 0, last4: {}, lastnew4: {}, last5: {}, lastnew5: {}};
          if (!t.role[h.role]) t.role[h.role] = {count: 0, last4: {}, lastnew4: {}, last5: {}, lastnew5: {}};
          if (!t.character[b.c[j].id]) t.character[b.c[j].id] = { id: b.c[j].id, count: 0, last: null }
          t.role[h.role].count++;
          t.attribute[h.attribute].count++;
          t.character[b.c[j].id].count++
          if (!t.role[h.role]['last'+h.rarity].start || b.start>t.role[h.role]['last'+h.rarity].start) t.role[h.role]['last'+h.rarity]=b;
          if ((b.c[j].new) &&(!t.role[h.role]['lastnew'+h.rarity].start || b.start>t.role[h.role]['lastnew'+h.rarity].start) ) t.role[h.role]['lastnew'+h.rarity]={start: b.start, end: b.end, c: [b.c[j]], a: []};
          if ((b.c[j].new) &&(!t.attribute[h.attribute]['lastnew'+h.rarity].start || b.start>t.attribute[h.attribute]['lastnew'+h.rarity].start) ) t.attribute[h.attribute]['lastnew'+h.rarity]={start: b.start, end: b.end, c: [b.c[j]], a: []};
          if (!t.attribute[h.attribute]['last'+h.rarity].start || b.start>t.attribute[h.attribute]['last'+h.rarity].start) t.attribute[h.attribute]['last'+h.rarity]=b;
          if (!t.character[b.c[j].id].last || b.start>t.character[b.c[j].id].last) t.character[b.c[j].id].last=b.start;
          if (b.type==="limited") {
            if (b.c[j].new && (!t.last_new_limited.start || b.start>t.last_new_limited.start) ) t.last_new_limited = b;
            if (!t.last_limited.start || b.start>t.last_limited.start) t.last_limited = b;
          };
          var u = this.userBannerData(b);
          if (u.pulls !== undefined) { //has pulled on the banner
            if (!t.character[b.c[j].id].pulls) t.character[b.c[j].id].pulls=0;
            t.character[b.c[j].id].pulls+=u.pulls;
            if (!t.character[b.c[j].id].obtained && u.c[j].g>0) t.character[b.c[j].id].obtained=0;
            if (t.character[b.c[j].id].obtained!=undefined) t.character[b.c[j].id].obtained+=u.c[j].g;
            if (!t.character[b.c[j].id].pity && u.c[j].p>0) t.character[b.c[j].id].pity=0;
            if (t.character[b.c[j].id].pity!=undefined) t.character[b.c[j].id].pity+=u.c[j].p;
          };
        };
        if (u.pulls) {
          t.userStats["total_"+b.type] += u.pulls;
          t.userStats[b.type+"_pity"] += u.pity;
        };
      };
      let d = Object.values(this.HeroDB);
      for (var i=0; i<d.length; i++) {
        if ((d[i].rarity === 5 || (d[i].rarity===4 && ['light','dark'].includes(d[i].attribute) ) ) && !t.character[d[i]._id] && !['yuna','sol','zeno','free-spirit-tieria','dark-tyrant-tenebria'].includes(d[i]._id)) t.nobanner.push(d[i].name);
      }; if (t.nobanner.length===0) t.nobanner.push('None');
      t.character = Object.values(t.character).sort( (a,b) => {return a.count<b.count?1:-1} )
      this.generalStats = t;
      //console.log(JSON.stringify(t,0,2));
    },
    sortTableStats: function (array, sorter, reverse=false) {
      return array.slice().sort( (a,b) => {return a[sorter]<b[sorter]?1:-1} );
    },
    getDB: function () {
      httpGetAsync('../../data/HeroDatabase.json', (res) => {
        var data = JSON.parse(res);
        this.HeroDB = data;
      });
    },
    getEvents: function () {
      httpGetAsync('timeline-items.json', (res) => {
        var data = JSON.parse(res);
        this.banners = data;
        var today = new Date();
        function pad(d) {return (d < 10) ? '0' + d.toString() : d.toString();}
        this.today = today.getUTCFullYear() + '-' + pad(today.getUTCMonth()+1) + '-' + pad(today.getUTCDate());
        this.banners.push({type: 'event', name: 'Today', start: this.today });
        this.loadUserData();
        this.getDatesArray();
      });
    },
    convert: function () {
      this.banners.forEach(x=> {
        if (!x.c) return;
        var r = Object.keys(this.HeroDB);
        for (var i=0;i<x.c.length;i++) {
          for (var j=0; j< r.length; j++) {
            var h=this.HeroDB[r[j]];
            if (h.id.toLowerCase()===x.c[i].toLowerCase()) {
              x.c[i] = {id: h._id, new: false};
              break;
            };
          };
        }
      });
    }
  },
  computed: {
    dataReady: function () {
      if (!this.HeroDB || !this.banners) return false;
      document.body.classList.remove("modal-open");
      return true;
    },
    renderList: function () {
      var ev=this.filter.showEvents, o=this.banners, d=this.sortedDates.slice().reverse(), x={};
      for (var i=0;i<d.length;i++) {
        for (var j=0;j<o.length;j++) {
          if (!this.filterBanner(o[j])) continue;
          if (o[j].type==="event") {
            if (!ev) continue;
            if (d[i]!=o[j].start) continue;
            if (!x[d[i]]) x[d[i]] = {};
            x[d[i]].event = o[j];
            continue;
          };
          if (!x[d[i]] || !x[d[i]].m ) x[d[i]]={m:[],n:[null]};
          var pos=-1;
          if (d[i] === o[j].end) {
            if (o[j].type==='mystic') x[d[i]].m.push(o[j]); 
            else {
              for (var k=0; k<x[d[i]].n.length; k++) {
                if (x[d[i]].n[k]) continue;
                x[d[i]].n[k] = o[j];
                pos=k;
                break;
              };
              if (pos===-1) { // could not find an empty slot;
                x[d[i]].n.push(o[j]);
                pos=x[d[i]].n.length-1;
              };
            };
          } else continue;
          if (o[j].type==='mystic') continue;
          var z=d.indexOf(o[j].start)||1;
          var diff = z-i;
          if (z-i <2) continue;
          for (var k=i;k<z;k++) {
            if (!x[d[k]]) x[d[k]]={m:[],n:[]};
            x[d[k]].n[pos] = o[j];
          };
        };
      };
      console.log('re rendered');
      return x;
    }
  },
  watch: {
    filter: {
      handler: function () {this.getDatesArray()},
      deep: true
    },
    settings: function (val) {
    },
    banners: function () {
      this.getDatesArray();
    }
  },
  mounted: function () {

  },
  created: function () {
    console.log('CeciliaBot Timeline is booting...');
    this.getDB();
    this.getEvents();
  }
});
