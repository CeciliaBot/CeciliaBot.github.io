export default {
  name: "gacha",
  props: {
  },
  data: function () {
    return {
      banners: [],
      database: [],
      artifacts: [],
      
      selectingBanner: true,
      playAnimation: false,
      gachaResult: [],
      pityCounter: 0,
      pities: 0,
      pull: 0,
      no5StarsHero: 0,
      no5StarsArti: 0,
      highestRarity: 'covenant',
      gachaHistory: {},
      ongoingBanners: [],
      currentBanner: null,
      heroPull: {
        ml_5: [],
        ml_4: [],
        ml_3: [],
        rgb_5: [],
        rgb_4: [],
        rgb_3: [],
        artifact_5: [],
        artifact_4: [],
        artifact_3: []
      }
    }
  },
  beforeCreate: function () {
    this.$store.commit('loading', true);
  },
  created: function () {
    this.loading().then(async ()=>{
      Promise.all([
        this.$store.dispatch('getHeroDB'),
        this.$store.dispatch('getArtifactDB'),
        this.$store.dispatch('getBanners')
      ]).then(data => {
        this.database=data[0];
        this.artifacts=data[1];
        this.banners=data[2];

        var limited = ['emilia','rem','ram','fairytale-tenebria','landy','luna','summertime-iseria','seaside-bellona','holiday-yufine','cerise','dizzy','baiken','elphelt','diene'];
        var eventOnly = ['kikirat-v2','sol','bask','zeno','kizuna-ai','yuna','ras','mercedes','dark-tyrant-tenebria','serila'];
        for (var i in this.database) {
          var target = this.database[i];
          if (target.rarity<3) continue;
          else if (limited.includes(target._id) || eventOnly.includes(target._id) || target.id.charAt(1)=='4' || target.id.charAt(1)=='5') continue;
          var t = (target.attribute==='light'||target.attribute==='dark'?'ml':'rgb') + '_' + target.rarity;
          this.heroPull[t].push(target._id);
        };
        var artifacts = this.artifacts;
        for (var i in artifacts) {
          var target = artifacts[i];
          if (target.limited || !target.gacha || (target.rarity>=4&&!target.role) ) continue; // gacha artifacts with rarity > 3 usually have a role 
          var t = 'artifact_' + target.rarity;
          this.heroPull[t].push(i);
        };
        console.log(this.heroPull);
        var today = this.getUtcString(new Date);
        var a= this.banners;
        for (var i=a.length-1;i>0;i--) {
          var item=a[i];
          //console.log(item)
          if (item.type==="event") continue;
          if (today>item.end) continue;// continue next
          if (today<item.start) continue; // break
          var b = {type: item.type==='mystic'?'mystic':'rate_up', limited: item.type=='limited', pity: item.type==='mystic'?200:120, name: item.title};
          item.c.forEach( h => {
            var t = this.database[h.id] || {_id: h.id, rarity: 5, attribute: "fire"};
            var c = (t.attribute==='light'||t.attribute==='dark'?'ml':'rgb') + '_' + t.rarity;
            if (!b[c]) b[c] = [];
            b[c].push(t._id);
          });
          var ar=0;
          if (item.a) ar=this.heroPull['artifact_5'].length/item.a.length;
          item.a.forEach( arti => {
            var c = 'artifact_5';
            var og=this.heroPull['artifact_5'].slice();
            og.push(new Array(ar).fill(arti.id));
            og=og.flat();
            b[c] = og;//.push(new Array(this.heroPull['artifact_5']||[]).length).fill(item.id) ).flat();
            console.log(b[c])
          });
          this.ongoingBanners.push(b);
        };
        this.ongoingBanners.push({type: 'moonlight', pity: 0, name: 'Moonlight'}),
        this.ongoingBanners.push({type: 'covenant', pity: 0, name: 'Covenant'}),
        this.ongoingBanners.push({type: 'ticket-4-5', pity: 0, name: '4-5 Ticket'}),
        console.log(this.ongoingBanners);
        
      }).catch(err => {
        console.log('Error');
      });
    });
  },
  mounted: async function () {
  },
  methods: {
    home: function () {
      this.$store.commit('toggleMainMenu');
    },
    startSummon: function () { /*VUE  will update dom then run js*/
      this.playAnimation=true;
      this.gachaResult=[];
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
          resolve();
          this.$nextTick(()=>{
            this.playAnimation=false;
          })
        }, 1300);
      })
    },
    loading: function () { /*VUE  will update dom then run js*/
      this.$store.commit('loading', true);
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
          resolve();
          this.$nextTick(()=>{
            this.$store.commit('loading', false);
          })
        }, 0);
      })
    },
    hero: function (id) {
      return this.$store.getters.getHero(id);
    },
    heroicon: function (id) {
      return this.$store.getters.getHeroIcon(id);
    },
    artifactIcon: function (id) {
      return (this.artifacts[id] || {}).icon || "https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Fartifact-missing.png?v=1633188110287";
    },
    getRandom: function (array) {
      return array[Math.floor(Math.random()*array.length)];
    },
    pad: function (d) {return (d < 10) ? '0' + d.toString() : d.toString()},
    getUtcString: function (date) {
      return date.getUTCFullYear() + '-' + this.pad(date.getUTCMonth()+1) + '-' + this.pad(date.getUTCDate())
    },
    switchBanner: function (b) {
      this.selectingBanner=false;
      if (this.currentBanner&&b.name===this.currentBanner.name) return;
      this.clearHistory();
      this.currentBanner= b;
    },
    clearHistory: function () {
      this.gachaResult= [];
      this.pityCounter= 0;
      this.pities= 0;
      this.pull=0;
      this.no5StarsHero=0;
      this.no5StarsArti=0;
      this.highestRarity= 'covenant';
      this.gachaHistory= {};
      this.$root.$emit('snackbar', {type: 'info', title: '[SS] Completed', description: 'Summon Simulator data cleared.'});
    },
    summon: function (pulls=10) {
      const rates = {
        covenant: {
          pity: 0,
          currency: 'Covenant Bookmarks',
          cost: 5,
          rates: [
            {
              type: 'rgb_5',
              rate: 0.0125,
            },
            {
              type: 'rgb_4',
              rate: 0.045,
            },
            {
              type: 'rgb_3',
              rate: 0.41,
            },
            {
              type: 'ml_5',
              rate: 0.0015,
            },
            {
              type: 'ml_4',
              rate: 0.005,
            },
            {
              type: 'ml_3',
              rate: 0.0435,
            },
            {
              type: 'artifact_5',
              rate: 0.0175,
            },
            {
              type: 'artifact_4',
              rate: 0.065,
            },
            {
              type: 'artifact_3',
              rate: 0.4,
            }
          ]
        },
        rate_up: {
          pity: 120,
          pity_type: 'rgb_5',
          currency: 'Covenant Bookmarks',
          cost: 5,
          rates: [
            {
              type: 'rgb_5',
              rate: 0.01,
            },
            {
              type: 'rgb_4',
              rate: 0.045,
            },
            {
              type: 'rgb_3',
              rate: 0.4125,
            },
            {
              type: 'artifact_5',
              rate: 0.0175,
            },
            {
              type: 'artifact_4',
              rate: 0.065,
            },
            {
              type: 'artifact_3',
              rate: 0.45,
            }
          ]
        },
        moonlight: {
          pity: 0,
          currency: 'Galaxy Bookmarks',
          cost: 5,
          rates: [
            {
              type: 'ml_5',
              rate: 0.025,
            },
            {
              type: 'ml_4',
              rate: 0.275,
            },
            {
              type: 'ml_3',
              rate: 0.70,
            }
          ]
        },
        mystic: {
          pity: 200,
          pity_type: 'ml_5',
          currency: 'Mystic Medals',
          cost: 50,
          rates: [
            {
              type: 'rgb_5',
              rate: 0.00625,
            },
            {
              type: 'rgb_4',
              rate: 0.036,
            },
            {
              type: 'rgb_3',
              rate: 0.41,
            },
            {
              type: 'ml_5',
              rate: 0.00625,
            },
            {
              type: 'ml_4',
              rate: 0.009,
            },
            {
              type: 'artifact_5',
              rate: 0.0175,
            },
            {
              type: 'artifact_4',
              rate: 0.0650001,
            },
            {
              type: 'artifact_3',
              rate: 0.45,
            }
          ]
        },
        'ticket-4-5': {
          pity: 0,
          currency: 'Ticket',
          cost: 1,
          rates: [
            {
              type: 'rgb_5',
              rate: 0.15,
            },
            {
              type: 'rgb_4',
              rate: 0.85,
            }
          ]
        },
      };

      this.startSummon().then(() => {
      var r=rates[this.currentBanner.type];
      var b=r.rates;
      var targetPity=r.pity?r.pity+1:null;
      var res = [], highestRank = 0;
      var highest = ['rgb', 3];
      
      for (var i=0;i<pulls;i++) {
        var item={};
        var cr=0;
        var p=Math.random();
        this.pityCounter++;
        this.pull++; //number of pulls on banner counter
        
        b.some( j=> {
          cr+=j.rate;
          if (targetPity===this.pityCounter) {
            item={type: r.pity_type || j.type};
            this.pities++;
            return true;
          }
          if (p<=cr) {
            item={type: j.type||'artifact_3'};
            return true;
          };
        });
        item.type=item.type?item.type:'artifact_3'; // fakkback;
  
        if (r.pity_type===item.type) {
          this.pityCounter=0;
        };
        var itemType='hero';
        if (item.type.indexOf('artifact')!=-1) itemType='artifact';
        var rarity = Number(item.type.slice(-1));
        if (rarity<5) {
          this.no5StarsHero++;
          this.no5StarsArti++;
        } else {
          if (itemType==='hero') this.no5StarsHero=0,this.no5StarsArti++;
          else this.no5StarsHero++,this.no5StarsArti=0;
        };
        var oldHighest = (Number(this.highestRarity.slice(-1)));
        if (rarity > 3 && rarity>=highest[1]) {
          if (rarity>highest[1]) highest[0]=item.type.slice(0,-2),highest[1]=rarity;
          else {
            if (highest[0] == 'ml') null;
            else if (item.type.slice(0,-2)=='ml') highest[0]=item.type.slice(0,-2);
          }
        };
        var got = this.currentBanner[item.type] || this.heroPull[item.type] || [item.type];
        var ch=this.getRandom(got);
        res.push( {type: itemType, id: ch, class: item.type});
        var history = this.gachaHistory[ch]||{id: ch, type: itemType, rarity: rarity, class: item.type, pull: 0};
        history.pull+=1;
        this.$set(this.gachaHistory, ch, history);
      };
      this.highestRarity=highest.join('_');
      this.gachaResult=res;
      console.log(this.gachaResult)
      });
    },
    clickEvent: function () {
    }
  },
  computed: {
    mobile: function () {
      return this.$store.state.isMobile;
    },
    sortedHistory: function () {
      var t = Object.values(this.gachaHistory);
      t.sort( (a,b) => {
        return b.pull-a.pull;
      });
      return t;
    },
    disableButtons: function () {
      if (this.playAnimation || this.selectingBanner) return true;
      return false;
    }
  },
  render: function (h) {
    return h('div', {staticClass: 'gacha-box '+this.highestRarity}, [
      h('div', {staticClass: 'gacha-container'}, [
        h('div', {staticClass: 'gacha-content'},[
          h('floating-menu',{props: {mobile: this.mobile, options: [{title: 'Home', class: 'fa fa-home', click: 'home'}]}, on: {home: ()=>this.home()} }),
          h('h2', 'Summon Simulator'),
          this.currentBanner ? h('div', {style: {'text-align': 'center'}}, [
            this.currentBanner.name,
            this.currentBanner.pity?h('p', 'Pity in ' + (this.currentBanner.pity - this.pityCounter)+' pulls'):null,
          ]):null,
          h('div', {staticClass: 'pull'}, [
            this.playAnimation? h('img', {staticClass: 'summon-animation', style: {height: '100%', /*position: 'absolute',*/ 'margin': 'auto', 'margin-top': 0, /*transform: 'translateX(-50%)'*/}, attrs: {src: 'https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Fsummon-animation.gif?v=1632755200634'}}):null,
            this.gachaResult.map(i=>{
              return i.type==="hero"
              ?
                h('img', {staticClass: 'game-item got ' + i.class, attrs: {src: this.heroicon(i.id), alt: i.id}, directives: [{name: 'tooltip', value: i.id}]})
              :
                h('img', {staticClass: 'game-item got ' + i.class, style: {'border-radius': 0}, attrs: {src: this.artifactIcon(i.id), alt: i.id} })
              })
          ]),
          h('p', 'Pulls: ' + this.pull),
          this.currentBanner&&this.currentBanner.pity?h('p','Pity hit '+ this.pities + ' times!'):null,
          h('p', 'Pulls without 5 Stars hero: ' + this.no5StarsHero),
          h('p', 'Pulls without 5 stars artifact: ' + this.no5StarsArti),
          h('div', {staticClass: 'history'}, [
            this.sortedHistory.map( item => {
              return h('div', [
                h('img', {staticClass: 'game-item', attrs: {src: this.heroicon(item.id), alt: item.id}, on: {error: function (el) {el.target.src="https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Fmissing.png?v=1633188110287"; el.target.onerror=null} }}),
                h('b', 'x'+item.pull)
              ])
            })
          ])
        ])
      ]),
      h('div', {style: {position: 'absolute', bottom: 30 +'px', right: 130+'px'}}, [
        h('button', {staticClass: 'e7-button blue', attrs: {disabled: this.disableButtons}, on: {click: () => this.selectingBanner=true} }, 'Select Banner'),
        h('button', {staticClass: 'e7-button brown', attrs: {disabled: this.disableButtons}, on: {click: () => this.clearHistory()} }, 'Clear History'),
        h('br'),
        h('button', {staticClass: 'e7-button green', attrs: {disabled: this.disableButtons}, on: {click: () => this.summon(1)} }, 'Summon'),
        h('button', {staticClass: 'e7-button green', attrs: {disabled: this.disableButtons}, on: {click: () => this.summon(10)} }, 'Summon x10'),
      ]),
      this.selectingBanner
      ? h('div', {style: {position: 'fixed', top: 0, right: 0, height: '100%', width: '100%', display: 'flex', 'justify-content': 'center', 'align-items': 'center'}}, [
          h('div', {staticClass: 'modal-content noselect', style: {overflow: 'auto', margin: 0, 'text-align': 'center','max-width': 800}}, [
            this.ongoingBanners.map( item => {
              return item.type==='rate_up' ? 
                h('div', {staticClass: 'drop-rate-up-box', class: {limited: item.limited}, on: {click: () => this.switchBanner(item)}}, [
                  h('div', {staticClass: 'text'}, item.name.split('&')[0])
                ])
              :
                h('div', {staticClass: 'generic_banner '+ item.type, on: {click: () => this.switchBanner(item)}}, [
                  h('div', {staticClass: 'text'}, item.name.split('&')[0])
                ])
            }),
          ])
        ])
      : null,
    ]);
  }
};








/* ADD extra css */
(function () {
  var styles = `
  .gacha-container{
    width: 100%;
    height: 100%;
    background-image: url(https://static.smilegatemegaport.com/event/live/epic7/guide/home/images/bg.jpg);
    background-size: cover;
    overflow: auto;
  }
  .gacha-content {
    display: flex;
    flex-direction: column;
    pointer-events: revert;
    width: 100%;
    max-width: 900px;
    background-color: var(--background-color);
    margin: 30px 0;
    box-shadow: 0 0 10px 10px rgb(0 0 0 / 30%);
    border-radius: 10px;
    margin: 40px auto;
    min-height: calc(100% - 80px);
    padding: 10px;
    color: white;
  }
  .gacha-content > h2 {
    font-size: 30px;
    color: white;
    text-align: center;
    padding: 10px;
  }
  .gacha-content > .pull {
    min-height: 300px;
    width: 100%;
    background-color: rgba(0,0,0,.3);
    text-align: center;
    padding: 10px;
    margin: 5px 0;
    border-radius: 10px;
    overflow-x: hidden;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
  }
  .gacha-content > .pull > *:not(.summon-animation) {
    flex-shrink: 0;
    margin: 10px 5%;
    border-radius: 100%;
  }
  .gacha-content > .history {
    flex: 1;
    flex-shrink: 0;
    width: 100%;
    background-color: rgba(0,0,0,.3);
    text-align: center;
    padding: 10px;
    margin: 5px 0 50px;
    border-radius: 10px;
    overflow: hidden;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .gacha-content > .history > * {
    display: inline-block;
    width: 130px;
    flex-shrink: 0;
    height: 100px;
  }
  .got.ml_4, .got.ml_5 {
    box-shadow: 15px 0 10px purple, -15px 0 10px purple, 0 15px 10px purple, 0 -15px 10px purple;
  }
  .got.rgb_4, .got.artifact_4, .got.artifact_5, .got.rgb_5 {
    box-shadow: 0 0 10px 10px #eb9d0e;
  }
  .gacha-box {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: auto;
  }
  .gacha-box:before {
    pointer-events: none;
    content: '';
    height: 100%;
    width: 100%;
    display: inline-block;
    background-size: 50%;
    background-position-y: top, bottom;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    background-position-x: left, right;
  }
  .gacha-box.mystic:before,
  .gacha-box.ml_3:before,.gacha-box.ml_4:before,.gacha-box.ml_5:before {
    background-image: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Fml-top.png?v=1632596936388), url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Fml-bottom.png?v=1632596936388);
  }
  .gacha-box.rgb_3:before,.gacha-box.artifact_3:before,
  .gacha-box.covenant:before {
    background-image: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Fcovenant-top.png?v=1632596936388), url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Fcovenant-bottom.png?v=1632596936388);
  }
  .gacha-box.rgb_4:before,.gacha-box.rgb_5:before,.gacha-box.artifact_5:before,.gacha-box.artifact_4:before,
  .gacha-box.rate_up:before {
    background-image: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Frgb-top.png?v=1632596936388), url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Frgb-bottom.png?v=1632596936388);
  }
  .e7-button {
    border: none;
    background-color: transparent;
    color: white;
    text-align: center;
    min-width: 8em;
    height: 3em;
    cursor: pointer;
    font-size: 18px;
    padding: 0 20px;
    background-size: 100% 100%;
  }
  .e7-button.red {
    background-image: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2FFile0448.png?v=1632601519067);
  }
  .e7-button.green {
    background-image: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2FFile0450.png?v=1632601519067);
  }
  .e7-button.brown {
    background-image: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2FFile0452.png?v=1632601519067);
  }
  .e7-button.blue {
    background-image: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2FFile0454.png?v=1632601519067);
  }
  
  .drop-rate-up-box {
    position: relative;
    display: inline-block;
    background-image: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2FFile8486.png?v=1632686489179);
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 30px;
    height: 4.34em;
    width: 8.34em;
    font-family: "Times New Roman", Times, serif;
    background-position-y: bottom;
    background-position-x: center;
    cursor: pointer;
  }
  .drop-rate-up-box.limited {
    background-image: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2FFile8485.png?v=1632688505913);
  }
  .drop-rate-up-box .text, .generic_banner .text {
    position: absolute;
    bottom: 10%;
    color: white;
    text-align: center;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .generic_banner {
    position: relative;
    display: inline-block;
    font-size: 30px;
    height: 4.34em;
    width: 8.34em;
    font-family: "Times New Roman", Times, serif;
    cursor: pointer;
  }
  .generic_banner.moonlight {
    background: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Fgalaxy-bookmark.png?v=1632705805589) no-repeat;
    background-size: 45%;
    background-position: center top;
  }
  .generic_banner.covenant {
    background: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Fcovenant-bookmark.png?v=1632705805648) no-repeat;
    background-size: 45%;
    background-position: center top;
  }
  .generic_banner.mystic {
    background: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Fmystic-medal.png?v=1632705805589) no-repeat;
    background-size: 45%;
    background-position: center top;
  }
  .generic_banner.ticket-4-5 {
    background: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2F4-5-ticket.png?v=1632705776358) no-repeat;
    background-size: 45%;
    background-position: center top;
  }
  .generic_banner:before {
    background-image: url(https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2FFile8472.png?v=1632689087965);
    background-repeat: no-repeat;
    background-size: cover;
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: -23%;
    left: 0;
  }
  `;
  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
})();