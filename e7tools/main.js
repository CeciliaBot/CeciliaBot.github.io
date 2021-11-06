var timer = function(name) {
    var start = new Date();
    return {
        stop: function() {
            var end  = new Date();
            var time = end.getTime() - start.getTime();
            console.log('Timer:', name, 'finished in', time, 'ms');
        }
    }
};

console.log('main downloaded');
var indexedDB = window;
/* global Vue,Vuex, VueRouter*/

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
/* Get Banner Distance */
function getPositionAtCenter(element) {
  let el = document.getElementById(element);
  if (!el) return {x:0,y:0};
  return el.getBoundingClientRect();
};
function getElDistance(id1,id2) {
  const a = getPositionAtCenter(id1);
  const b = getPositionAtCenter(id2);
  return {x: a.left-b.left-10, y: a.y-b.y};
};
function httpGetAsync2(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        };
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
};
function httpGetAsync(url, method='GET') {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i) == null ? false : true;
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
	},
	IOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
	},
	any: function () {
		return (this.Android() || this.BlackBerry() || this.IOS() || this.Opera() || this.Windows());
	}
};


var routes = [
  {
    path: '/',
    name: 'CeciliaBot Tools',
    component: {
      created: function () {
        store.commit('loading', false);
        store.commit('toggleMainMenu');
      },
      render: function (h) {}
    },
  },
  {
    path: '/summon-simulator',
    name: 'Summon Simulator | CeciliaBot Tools',
    component: () => import('./component/gacha.js')
  },
  {
    path: '/tierlist-maker',
    name: 'Tier List Maker | CeciliaBot Tools',
    component: () => import('./component/tier-maker.js')
  },
  {
    path: '/gear-score',
    name: 'Gear Score | CeciliaBot Tools',
    component: () => import('./component/gear-score.js')
  },
  {
    path: '*',
    name: '404 | CeciliaBot Tools',
    component: () => import('./component/404.js')
  }
];
const router = new VueRouter({
  ///mode: 'history',
  routes: routes
})
router.beforeEach((to, from, next) => {
  store.commit('loading', true);
  next();
});

router.afterEach((to, from) => {
  store.commit('loading', false);
  Vue.nextTick(()=>{
    document.title = to.name || 'CeciliaBot Tools';
  });
});
Vue.use(router)

const bannerId = function (b)  {
  return (b.type.slice(0,1)+b.start.replace(/-/g,'')+b.c[0].id.charAt(0)+b.c[0].id.slice(-4)).toUpperCase();
};

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
      loading: [true, 'CONNECTING...'],
      mainMenu: false,
      isMobile: false,
      currentOpenBanner: null, // banner currently opened by user;
      
      /* DATA */
      HeroDB: null,
      ArtifactDB: null,
      banners: null,
      indexedDB: null,
      pulls: null
    },
    getters: {
      getHero: (state) => (id) => {
        return state.HeroDB[id] || {id: id, _id: id, name: id, rarity: 5, attribute: 'fire', role: 'knight'};
      },
      getHeroIcon: (state) => (id) => {
        return 'https://cdn.glitch.com/6c14ca82-3bcb-4fd6-afa7-815b95e04a14%2F' + (state.HeroDB[id] || {id: id}).id + '_s.png';
      },
      getArtifact: (state) => (id) => {
        return state.ArtifactDB[id] || {id: id, _id: id, name: id, rarity: 5};
      },
      getArtifactIcon: (state) => (artifact) => {
        return 'https://cdn.glitch.com/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Fmissing.png?v=1633188110287';
      },
      getBannerPulls: (state) => (id) => {
        return state.pulls[id] || {};
      },
      getRarityIcon: (state) => (id) => {
        switch (id) {
          default:
            return 'https://assets.epicsevendb.com/star/cm_icon_star.png';
          case 'all':
            return 'https://cdn.glitch.me/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Flabel-all.png';
        }
      },
      getRoleIcon: (state) => (id) => {
        var b = 'https://assets.epicsevendb.com/class/cm_icon_role_';
        switch (id) {
          default:
            return b + id + '.png';
          case 'assassin':
            return b + 'thief.png';
          case 'manauser':
            return b + 'soul-weaver.png'
          case 'all':
            return 'https://cdn.glitch.me/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Flabel-all.png';
        };
      },
      getAttributeIcon: (state) => (id) => {
        var b = 'https://assets.epicsevendb.com/attribute/cm_icon_pro';
        switch (id) {
          default:
            return b+id+'.png';
          case 'wind':
            return b+'earth.png';
          case 'dark':
            return b+'mdark.png'
          case 'all':
            return 'https://cdn.glitch.me/f70857a1-7b0f-4f6d-a1f1-2c24d95fcc88%2Flabel-all.png';
        };
      }
    },
    mutations: {
      loading: function (state, load, text='CONNECTING...') {
        Vue.set(state.loading, 0, load);
        Vue.set(state.loading, 1, text);
      },
      toggleMainMenu: function (state) {
        Vue.set(state, 'mainMenu', !state.mainMenu);
      },
      toggleBannerModal: function (state, banner=null) {
        state.currentOpenBanner = banner;
      },
      updateIsMobile: function (state, value=false) {
        state.isMobile = value;
      },
      updateHeroDB: function (state, data) {
        state.HeroDB = data;
      },
      updateArtifactDB: function (state, data) {
        state.ArtifactDB = data;
      },
      updateBanners: function (state, data) {
        state.banners = data;
      },
      updateIndexedPulls: function (state, data) {
        state.indexedDB = data;
      },
      updateUserPulls: function (state, data) {
        state.pulls = data;
      },
      addUserPull: function (state, data) {
        if (state.pulls) Vue.set(state.pulls, data.id, data);
      },
    },
    actions: {
      getHeroDB: function (context) {
        return new Promise((resolve, reject) => {
          if (context.state.HeroDB) return resolve(context.state.HeroDB);
          httpGetAsync('../HeroDatabase.json').then( (res) => {
            var data = JSON.parse(res);
            context.commit('updateHeroDB', data);
            resolve(data);
          }).catch(err => {
            reject(err);
          });
        });
      },
      getArtifactDB: function (context) {
        return new Promise((resolve, reject) => {
          if (context.state.ArtifactDB) return resolve(context.state.ArtifactDB);
          httpGetAsync('artifacts.json').then( (res) => {
            var data = JSON.parse(res);
            var obj = {};
            for (var i in data) {
              obj[data[i]._id] = data[i];
            };
            context.commit('updateArtifactDB', data);
            resolve(obj);
          }).catch(err => {
            reject(err);
          });
        });
      },
      getBanners: function (context) {
        return new Promise((resolve, reject) => {
          if (context.state.banners) return resolve(context.state.banners);
          httpGetAsync('timeline-items.json').then( (res) => {
            var data = JSON.parse(res);
            data.forEach(item => { if (item.type!='event') item.id=bannerId(item) });
            var today = new Date();
            function pad(d) {return (d < 10) ? '0' + d.toString() : d.toString();}
            today = today.getUTCFullYear() + '-' + pad(today.getUTCMonth()+1) + '-' + pad(today.getUTCDate());
            //data.push({type: 'event', name: 'Today', start: today });
            context.commit('updateBanners', data);
            resolve(data);
          }).catch(err => {
            reject(err)
          });
        });
      },
      loadIndexedDB: function (context, database = 'timeline',version=1) {
        return new Promise((resolve, reject) => {
          if (context.state.indexedDB) return resolve(context.state.indexedDB);
          let request = window.indexedDB.open(database, version);
          request.onerror = e => {
            app.$root.$emit('snackbar', {type: 'error', title: 'ERROR IndexedDB', description: 'Error while reading IndexedDB!'});
            console.log('Error opening db', e);
            reject('Error');
          };
          request.onsuccess = e => {
            console.log('IDB Loaded');
            context.commit('updateIndexedPulls', e.target.result);
            resolve(e.target.result);
          };
          request.onupgradeneeded = e => {
            var stores = [{name: 'pulls', keyPath: 'id'},{name: 'tierlist', keyPath: 'id'},{name: 'camping', keyPath: 'id'}]
            app.$root.$emit('snackbar', {type: 'info', title: 'IndexedDB', description: 'Running onupgradeneeded'});
            let db = e.target.result;
            for (var i=0; i<stores.length; i++) {
              var store = stores[i];
              if (!db.objectStoreNames.contains(store.name)) {
                var storeOS = db.createObjectStore(store.name, {keyPath: store.keyPath});
              };
            };
          };
        });
      },
      loadUserDataDB: function (context, db, storeName='pulls') {
        return new Promise((resolve, reject) => {
          if (!db)db=context.state.indexedDB;
          if (context.state[storeName]) {
            resolve(context.state[storeName]);
            return;
          };
          let trans = db.transaction(storeName, IDBTransaction.READ_ONLY);
          trans.oncomplete = e => {
            app.$root.$emit('snackbar', {type: 'success', title: 'Complete', description: 'User data obtained from IndexedDB'});
            context.commit('updateUserPulls', items);
            resolve(items);
          };
          let store = trans.objectStore(storeName);
          let items={};
          store.openCursor().onsuccess = e => {
            let cursor = e.target.result;
            if (cursor) {
              items[cursor.value.id]=cursor.value;
              cursor.continue();
            };
          };
          trans.onerror = error => {
            app.$root.$emit('snackbar', {type: 'error', title: 'Store Error', description: 'Error while reading data from ' + store});
            console.log(error);
            reject(error);
          };
        });
      },
      savePullData: function (context, data ) {
        return new Promise((resolve,reject)=>{
          if (!context.state.indexedDB) {
            reject('Can\'t open database');
            app.$root.$emit('snackbar', {type: 'error', title: 'ERROR', description: 'Database not found!<br>Try refreshing...'});
            return;
          };
          var transaction = context.state.indexedDB.transaction(['pulls'], 'readwrite');
          var store = transaction.objectStore('pulls');
          var request = store.put(data);
          request.onerror = (e) => {
            app.$root.$emit('snackbar', {type: 'error', title: 'ERROR', description: e.target.error.name});
            reject('Error', e.target.error.name);
          };
          request.onsuccess = (e) => {
            context.commit('addUserPull', data);
            resolve(e,true);
            app.$root.$emit('snackbar', {type: 'success', title: 'Success', description: 'Banner data successfully saved to database!'});
          };
        });
      },
      getBannerPulls: function (context, data ) {
        return new Promise((resolve,reject)=>{
          context.dispatch('loadIndexedDB').then(db => {
            var transaction = db.transaction(['pulls'], IDBTransaction.READ_ONLY);
            var store = transaction.objectStore('pulls');
            var request = store.get(data);
            request.onerror = (e) => {
              app.$root.$emit('snackbar', {type: 'error', title: 'ERROR', description: e.target.error.name});
              reject({});
            };
            request.onsuccess = (e) => {
              resolve(e.target.result,true);
              console.log(e.target.result);
            };
          }).catch(err => {
            reject({});
          });
        });
      },
      loadTierlistDB: function (context) { // return object with id as key
        return new Promise((resolve, reject) => {
          context.dispatch('loadIndexedDB').then(db => {
            let trans = db.transaction('tierlist', IDBTransaction.READ_ONLY);
            let items={};
            trans.oncomplete = e => {
              app.$root.$emit('snackbar', {type: 'success', title: 'Complete', description: 'User data obtained from IndexedDB'});
              resolve(items);
            };
            let store = trans.objectStore('tierlist');
            store.openCursor().onsuccess = e => {
              let cursor = e.target.result;
              if (cursor) {
                items[cursor.value.id]=cursor.value;
                cursor.continue();
              };
            };
            trans.onerror = error => {
              app.$root.$emit('snackbar', {type: 'error', title: 'Store Error', description: 'Error while reading data from ' + store});
              console.log(error);
              reject(error);
            };
          }).catch(err => reject(err));
        });
      },
      saveTierlist: function (context, data ) {
        return new Promise((resolve,reject)=>{
          context.dispatch('loadIndexedDB').then(db => {
            var transaction = db.transaction(['tierlist'], 'readwrite');
            var store = transaction.objectStore('tierlist');
            var request = store.put(data);
            request.onerror = (e) => {
              app.$root.$emit('snackbar', {type: 'error', title: 'ERROR', description: e.target.error.name});
              reject('Error', e.target.error.name);
            };
            request.onsuccess = (e) => {
              resolve(e,true);
              app.$root.$emit('snackbar', {type: 'success', title: 'Success', description: 'Tierlist data successfully saved to database!'});
            };
          }).catch(err=> reject(err));
        });
      },
      deleteTierlist: function (context, id ) {
        return new Promise((resolve,reject)=>{
          context.dispatch('loadIndexedDB').then(db => {
            var transaction = db.transaction(['tierlist'], 'readwrite');
            var store = transaction.objectStore('tierlist');
            var request = store.delete(id);
            request.onerror = (e) => {
              app.$root.$emit('snackbar', {type: 'error', title: 'ERROR', description: e.target.error.name});
              reject('Error', e.target.error.name);
            };
            request.onsuccess = (e) => {
              resolve(e,true);
              app.$root.$emit('snackbar', {type: 'success', title: 'Success', description: 'Tierlist deleted!'});
            };
          }).catch(err=> reject(err));
        });
      }
    }
});



var app = new Vue ({
  el: "#app",
  router: router,
  store: store,
  components: {
  },
  data: function () {
    return {
      VERSION: '1.1a',
      memed: false,
      userLang: navigator.language || navigator.userLanguage,
    }
  },
  methods: {
    setLoading: function (val,text) {
      this.$store.commit('loading',val,text);
    },
    mainMenuClick: function (e,keep) {
      this.$store.commit('toggleMainMenu');
      if ('/'+e === this.$route.path) return;
      router.push({ path: e}).catch(fail => {
        console.log(fail);
        console.log('failed');
      });
      return;
    },
    openHome: function () {
      this.$store.commit('toggleMainMenu');
    },
    openModal: function () {
      document.body.classList.add("modal-open");
    },
    closeModal: function () {
      document.body.classList.remove("modal-open");
    },
    randomMaxNumber: function (mn,mx) {
      return Math.floor(Math.random() * (mx - mn) + mn); 
    },
    getRandomArray: function (arr) {
      let x= arr[this.randomMaxNumber(0,arr.length)-1];
      return x;
    },
  },
  computed: {
    loading: function () {
      return this.$store.state.loading[0];
    },
    loadingText: function () {
      return this.$store.state.loading[1];
    },
    mainMenu: function () {
      return this.$store.state.mainMenu;
    },
    currentBanner: function () {
      return this.$store.state.currentOpenBanner;
    },
    dataReady: function () {
    },
  },
  watch: {
    loading: function () {
      console.log('Loading triggered');
    },
    currentBanner: function () {
      if (this.currentBanner)
          this.openModal();
      else
          this.closeModal();
    },
    mainMenu: function () {
      if (this.mainMenu)
          this.openModal();
      else
          this.closeModal();
    }
  },
  mounted: function () {
  },
  created: async function () {
    console.log('CeciliaBot Timeline is booting...');
    this.$store.commit('updateIsMobile', isMobile.any());
    console.log('Version:', this.VERSION)
    console.log('Mobile:',this.$store.state.isMobile);
    if (Math.floor(Math.random() * 100) + 1 <5) return this.memed=true;
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName==='INPUT' || e.target.tagName==='TEXTAREA' || e.target.contentEditable=="true") return; /*Don't trigger if typing*/
      if ( e.keyCode==77 || e.keyCode==27 || e.key==='Escape' || e.key==='m' ) this.openHome();
    });
  }
});
