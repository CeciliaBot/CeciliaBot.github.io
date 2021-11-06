import * as toCanvas from 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';

var alphabet = ['S','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function findParent (el, css, tag) {
  while (el.parentNode) {
    el=el.parentNode;
    if (css) {
      if (el.className && el.className.indexOf('tier-wrapper') !==-1)
        return el;
    } else if (tag) {
      if (el.tagName === tag)
        return el;
    };
  };
};

function canvas2png (target, fileName) {
  if (store) store.commit('loading',true, 'CONVERTING...');
  var options = {
    allowTaint: true, 
    backgroundColor: '#252B35', 
    logging: false, 
    x: 0,
    y: 0,
    scrollX: 0,
    scrollY: 0,
    windowWidth: 2080,
    windowHeight: 2000,
    onclone: function(doc) {
      var canvas = doc.querySelector('#tier');
      options.height=canvas.scrollHeight;
      options.windowHeight=canvas.scrollHeight;
      canvas.style.overflow = 'visible';
    }, 
    onrendered: function(canvas) {
    },
  };
  html2canvas(target, options).then(canvas => {
    if (store) store.commit('loading',false);
    var newTab = window.open();
    newTab.document.title = fileName;
    newTab.document.body.appendChild(canvas);
  });
};

const getClosest = function (el, x, y) {
  console.log(el);
  return el.children.reduce( (closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y-box.top-box.height / 2;
    if (offset<0 && offset>closest.offset) {
      return {offset: offset, element: child};
    } else {
      return offset;
    };
  }, {offset: Number.NEGATIVE_INFINITY} );
};
function arrayMove(arr, old_index, new_index) {
    if (old_index < new_index) new_index--;
    if (old_index === new_index) return;
    if (old_index >= arr.length) old_index=arr.length-1;
    if (new_index >= arr.length) new_index=arr.length-1;
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
};
var sortingOptions = ['name','rarity','attribute','id'];
var filteringOptions = [{filter: 'rarity', options: [{value: 'all', display: "All"},{value: 5, display: 5, src: 'https://assets.epicsevendb.com/star/cm_icon_star.png'},{value: 4, display: 4, src: 'https://assets.epicsevendb.com/star/cm_icon_star.png'},{value: 3, display: 3, src: 'https://assets.epicsevendb.com/star/cm_icon_star.png'}]}, {filter: 'attribute', options: [{value: 'all', display: 'All'},{value: 'fire', display: '', src: 'https://assets.epicsevendb.com/attribute/cm_icon_profire.png'},{value: 'ice', display: '', src: 'https://assets.epicsevendb.com/attribute/cm_icon_proice.png'},{value: 'wind', display: '', src: 'https://assets.epicsevendb.com/attribute/cm_icon_proearth.png'},{value: 'light', display: '', src: 'https://assets.epicsevendb.com/attribute/cm_icon_prolight.png'},{value: 'dark', display: '', src: 'https://assets.epicsevendb.com/attribute/cm_icon_promdark.png'}]}, {filter: 'role', options: [{value: 'all', display: 'All'},{value: 'knight', display: '', src: 'https://assets.epicsevendb.com/class/cm_icon_role_knight.png'},{value: 'warrior', display: '', src: 'https://assets.epicsevendb.com/class/cm_icon_role_warrior.png'},{value: 'assassin', display: '', src: 'https://assets.epicsevendb.com/class/cm_icon_role_thief.png'},{value: 'ranger', display: '', src: 'https://assets.epicsevendb.com/class/cm_icon_role_ranger.png'},{value: 'mage', display: '', src: 'https://assets.epicsevendb.com/class/cm_icon_role_mage.png'},{value: 'manauser', display: '', src: 'https://assets.epicsevendb.com/class/cm_icon_role_soul-weaver.png'}]}]
import * as tierModal from './tier-row-modal.js'
import * as tierModalComment from './tier-comment-modal.js'
export default {
  name: 'tier-maker',
  components: {
    'tier-editor-modal': tierModal.default,
    'tier-comment-modal': tierModalComment.default
  },
  props: {
  },
  created: function () {
    this.createNTiers(5);
    this.$store.dispatch('loadTierlistDB').then( tierlists => {
      this.tierlistHistory=tierlists;
    }).catch(err => {
      // browser does not support indexededb
    });
  },
  data: function () {
    return {
      tierlistHistory: {},
      database: {},//heroDB
      
      tierType: 0, // tier layout; type 1 === xy
      layout: 1, // or 0
      labelColors: ['#ff5f5f','#fa6e6e','#fa9560','#fac552','#f4fa43','#b0fa35','#62fb26','#18fb26','#09fb6b','#03f3b7','#0383f3','#095ab0','#503ece','#5b31f0','#7640b7','#c44bc8','#ec7597','#f9b4c8','#fdedf2','#c4babd','#686566'],
      sort: ['rarity',false], // sort by, reversed
      filter: {rarity: [], attribute: [], role: []},
      openMobileFilters: false, //toggle filters for mobile users
      filterPlacedElements: false,
      elementType: 'character', //can be artifact
      tierId: null,
      tierListName: 'Untitled Tier List',
      charList: [],
      tiers: [],
      xy: {names: [], list: []},
      comments: {cecilia: 'Epico 7 best f2p gacha game btw'}, //charcter comments
      
      dragging: null,
      newMenu: true,
      editorModal: null,
      commentModal: null,
      editingAxes: false
    }
  },
  watch: {
    tierType: function (val) {
      // val =>> tierlist type user is opening
      this.getHeroList();
      if (val === 0) {
        this.removeRankedTier(this.tiers, this.charList);
      } else {
        this.removeRankedTierXY(this.xy.list, this.charList);
      };
    },
    sort: function () {
      this.sortList(this.charList, this.sort[0], true);
    }
  },
  computed: {
    floatyOptions: function () {
      if (this.mobile) {
        var o = [{title: 'New tierlist', class: 'fa fa-plus', click: 'new'}, {title: 'Save', class: 'fa fa-save', click: 'save'}, {title: 'Export as JSON', class: 'fas fa-code', click: 'exportJSON'}, {title: this.tierType===0?'Alignment chart':'Classic tierlist', class: 'fas fa-border-all', click: 'toggletier'},/*{title: 'Compare', class: 'fa fa-code-compare', click: 'compare'},*/ {title: 'Filter and Sort', class: 'fa fa-filter', click: 'filters'}/*, {title: 'Home', class: 'fa fa-home', click: 'home'}*/];
        if (this.canSaveAsNew) o.splice( 2, 0, {title: 'Save as new', class: 'fa fa-save', click: 'saveAsNew'});
        if (this.tierType === 0) o.splice(-2, 0, {title: 'Switch Label Layout', class: 'fa fa-columns', click: 'layout'})
        if (this.tierType === 1) o.splice(-2, 0, {title: 'Rename cartesian axes', class: 'fa fa-columns', click: 'renameAxes'})
        return o;
      } else
        return [/*{title: 'Home', class: 'fa fa-home', click: 'home'}*/]
    },
    oldTierlists: function () {
      return Object.values(this.tierlistHistory);
    },
    canSaveAsNew: function () {
      return this.tierlistHistory[this.tierId] !== undefined;
    },
    mobile: function () {
      return this.$store.state.isMobile;
    },
  },
  methods: {
    home: function () {
      this.$store.commit('toggleMainMenu');
    },
    newTierlist: function (type='character') {
      return new Promise((resolve, reject) => {
        this.$store.commit('loading', true);
        var dispatch = type==='character'? 'getHeroDB' : 'getArtifactDB';
        this.database = {};
        this.charList = [];
        this.tiers = [];
        this.xy = {names: [], list: []};
        this.comments = {};
        this.tierType = 0;
        this.createNTiers(5);
        this.elementType = type;
        this.tierListName = 'Untitled Tier List';
        this.$store.dispatch(dispatch).then( data => {
          this.database = data;
          this.getHeroList();
          this.tierId = new Date().getTime();
          this.sortList(this.charList, this.sort[0], true);
          this.$store.commit('loading', false);
          resolve();
          this.newMenu = false;
        }).catch(err => {
          this.$store.commit('loading', false);
          this.$root.$emit('snackbar', {type: 'error', title: 'ERROR', description: 'Database fatching failed with code ' + err.status});
          reject(err);
        });
      });
    },
    openNewModal: function () {
      this.newMenu = !this.newMenu;
    },
    toggleTierType: function () {
      this.tierType = this.tierType===1? 0 : 1;
    },
    loadTierlistAsCopy: function (id) {
      var load = JSON.parse(JSON.stringify(this.tierData(id)));
      this.elementType = load.type;
      this.tierListName = load.name;
      this.tiers = load.tiers;
      this.tierId = load.id;
      this.xy = load.xy;
      this.comments = load.comments;
    },
    removeRankedTier: function (tiers, database) {
      this.tiers.forEach(tier => {
        tier.list.forEach(char => {
          this.charList.splice(this.charList.indexOf(char), 1);
        });
      });
    },
    removeRankedTierXY: function (list, database) {
      list.forEach(char => {
        this.charList.splice(this.charList.indexOf(char.id), 1);
      });
    },
    getItemComment: function (id) {
      return this.comments[id];
    },
    setItemComment: function (id, com) {
      this.$set(this.comments, id, com.replace(/\n/gi, '<br>'));
    },
    setAfterLoad: function (load) {
      this.elementType = load.type;
      this.tierListName = load.name || '';
      this.tiers = load.tiers|| [];
      this.xy = load.xy || {names: [], list: []};
      this.comments = load.comments || {};
      this.tierId = load.id;
      this.removeRankedTier();
    },
    loadTierlist: function (id) {
      // Create copy to avoid editing orginal
      // Original tierlist can be updated by clicking 'Save'
      var load = JSON.parse(JSON.stringify(this.tierData(id)));
      this.newTierlist(load.type).then(res => {
        this.setAfterLoad(load);
      }).catch(err => {
        console.log(err);
      });
    },
    tierData: function (id) {
      return this.tierlistHistory[id] || {};
    },
    deleteTierlist: function (id) {
      this.$store.dispatch('deleteTierlist',id).then( tierlists => {
        this.$delete(this.tierlistHistory, id);
      }).catch(err => {
        console.log(err);
      });
    },
    saveAsNew: function () {
      var x = JSON.stringify(this.tiers);
      this.tiers = JSON.parse(x);
      this.xy = JSON.parse(JSON.stringify(this.xy));
      this.comments = JSON.parse(JSON.stringify(this.comments));
      this.tierId = new Date().getTime();
      this.saveTierlist();
    },
    saveModelObject: function () {
      this.tierId = this.tierId || new Date().getTime()
      return {
        id: this.tierId,
        type: this.elementType,
        name: this.tierListName,
        tiers: this.tiers,
        xy: this.xy,
        comments: this.comments
      };
    },
    exportAsJSON: function () {
      //exportAsJSON from utils.js
      exportAsJSON(this.tierListName, this.saveModelObject());
    },
    dropFile: function (evt) {
      evt.preventDefault();
      this.loadJSONFile(evt.dataTransfer.files[0]);
    },
    loadJSONFile: function (file) {
      try {
        if (!file) throw new Error();
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload = readerEvent => {
          try {
            var content = readerEvent.target.result;
            var load = JSON.parse(content);
            if (!['character', 'artifact'].includes(load.type)) {
              this.$root.$emit('snackbar', {type: 'error', title: 'ERROR', description: 'Unsupported tierlist type!'});
              return;
            };
            this.newTierlist(load.type).then(res => {
              this.setAfterLoad(load);
            }).catch(err => {
              console.log(err);
            });
          } catch (err) {
            this.$root.$emit('snackbar', {type: 'error', title: 'ERROR', description: 'Corrupt or unsupported file!'});
          };
        };
      } catch (err) {
        console.log('No file selected')
      };
    },
    saveTierlist: function () {
      this.$store.commit('loading', true);
      //this.getNamesFromDOM();
      var data = this.saveModelObject();
      this.$store.dispatch('saveTierlist', data).then(res => {
        this.$set(this.tierlistHistory, data.id, data);
        this.loadTierlistAsCopy(data.id); //reload to create copy
        this.$store.commit('loading', false);
      }).catch(err => {
        console.log(err);
        this.$store.commit('loading', false);
      });
    },
    getHeroList: function () {
      var _ = Object.keys(this.database);
      _.splice(_.indexOf('dark-tyrant-tenebria'),1);
      for (var i in this.tiers) {
        var tier = this.tiers[i].list;
        for (var j in tier) {
          var c = tier[j];
          if (_.includes[c]) {
            _.splice(_.indexOf(c),1);
          };
        };
      };
      this.charList = _;
    },
    getItemIcon: function (id) {
      switch (this.elementType) {
        case 'character':
          return this.$store.getters.getHeroIcon(id);
        case 'artifact':
          return this.$store.getters.getArtifactIcon(id);
        case 'custom': 
          return;
      }
    },
    hero: function (h) {
      return this.database[h] || {};
    },
    heroIcon: function (id) {
      return this.$store.getters.getHeroIcon(id);
    },
    deleteTierRow: function (row,from) {
      this.removeElementsRow(row);
      for (var i in from) {
        if (from[i] === row) {
          this.$delete(from, i);
          break;
        };
      };
      this.closeEditorModal();
    },
    removeElementsRow: function (row) {
      row.list.forEach(el => {
        this.charList.push(el);
      });
      this.$set(row, 'list', []);
    },
    closeEditorModal: function () {
      this.editorModal = null;
    },
    createNTiers: function (n) {
      for (var i=0; i<n;i++) {
        this.createNewTier();
      };
    },
    createNewTier: function () {
      this.tiers.push({
        name: alphabet[this.tiers.length % alphabet.length],
        color: null,
        list: []
      });
    },
    manageFilter: function (f, o) {
      var t = this.filter;
      if (o==="all") t[f] = [];
      else {
        if (t[f].includes(o)) t[f].splice(t[f].indexOf(o),1);
        else t[f].push(o);
      };
    },
    filterHero: function (filter, hero) {
      for (var f in filter) {
        var v = filter[f];
        if (v.length && !v.includes(this.hero(hero)[f])) return false;
      };
      return true;
    },
    filterRankedHero: function (filter,hero) {
      if (!this.filterPlacedElements) return true;
      else return this.filterHero(filter,hero);
    },
    sortList: function (list, by, disableReversed=false) {
      this.sort[1]=!disableReversed&&this.sort[0]===by?!this.sort[1]:false;
      this.sort[0]=by;
      if (by!='rarity') list.sort((x, y) => { return (this.hero(x)[by] > this.hero(y)[by] ) - (this.hero(x)[by] < this.hero(y)[by] ) || (this.hero(x).name > this.hero(y).name ) - (this.hero(x).name < this.hero(y).name ) });
      else list.sort((x, y) => { return (this.hero(x)[by] < this.hero(y)[by] ) - (this.hero(x)[by] > this.hero(y)[by] ) || (this.hero(x).name > this.hero(y).name ) - (this.hero(x).name < this.hero(y).name ) });
      if (this.sort[1]) list.reverse();
    },
    isActiveSort: function (sort,o) {
      return sort[0]===o;
    },
    isActiveFilter: function (t,f,o) {
      if (o==='all') return !t[f].length
      else return t[f].includes(o);
    },
    switchLayout: function (n=1) {
      var o = [0,1];
      this.layout += n;
      if (this.layout>=o.length) this.layout = 0;
    },
    openCommentModal: function (e, id) {
      e.preventDefault();
      this.commentModal = id;
    },
    closeCommentModal: function (comment) {
      this.setItemComment(this.commentModal, comment);
      this.commentModal = null;
    },
    
    openCompareModal: function () {
      this;
    },
    
    createPlaceholder: function (p,c) {
      const e = document.createElement('span');
      e.className= this.dragging.node.className + " dragPlaceholder";
      e.id = 'item-placeholder';
      e.style.height = getComputedStyle(this.dragging.node).height;
      e.style.width = getComputedStyle(this.dragging.node).width;
      
      // freeze flex elements
      this.dragging.node.style.width = getComputedStyle(this.dragging.node).width;
      this.dragging.node.style.height = getComputedStyle(this.dragging.node).height;
      //e.src = this.dragging.node.src;
      p.insertBefore(e,c);
    },
    movePlaceholder: function (tier,sib) {
      var el = document.getElementById('item-placeholder');
      if (!el)return
      el.style.display = 'inline-blocK';
      tier.insertBefore(el,sib);
    },
    hidePlaceholder: function () {
      var el = document.getElementById('item-placeholder');
      if (el) el.style.display="none";
    },
    removePlaceholder: function () {
      var el = document.getElementById('item-placeholder');
      if (el) el.remove();
    },
    resetDrop: function () {
      if (this.dragging) { // force mouse release
        this.dragging.node.classList.remove("is-dragging");
        this.removePlaceholder();
        this.dragging = null;
      };
    },
    onMouseDown: function (event, touch, item, start, index, drops, node, vertical=false, hidePlaceholder = false) {
      document.activeElement.blur(); // remove focus from input elements to trigger vue data update from blur events
      event.preventDefault();
      if (!touch && event.button !==0) return;
      this.resetDrop();
      var click = event;
      if (touch) click = event.touches[0] || event.changedTouches[0];
      var x = click.clientX;
      var y = click.clientY;
      this.dragging= {
        item: item,
        from: start,
        index: index,
        drop: drops, // array of css selectors for drop area
        node: node || event.target,
        targetNode: null,
        vertical: vertical,
        touch: touch,
        freezeX: x,
        targetList: null,
        targetIndex: null
      };
      this.createPlaceholder(this.dragging.node.parentNode, this.dragging.node);
      if (hidePlaceholder) this.hidePlaceholder();
      this.dragging.node.style.top = y - (this.dragging.node.getBoundingClientRect().bottom - this.dragging.node.getBoundingClientRect().top) / 2 + 'px';
      if (!this.dragging.vertical)
        this.dragging.node.style.left = x - (this.dragging.node.getBoundingClientRect().right - this.dragging.node.getBoundingClientRect().left) / 2 + 'px';
      this.dragging.node.classList.add("is-dragging");
    },
    onMouseMove: function (e,touch) {
      if (!this.dragging) return;
      var click = e;
      if (touch) click = e.touches[0] || e.changedTouches[0];
      var x = click.clientX;
      var y = click.clientY;
      
      this.dragging.node.style.top = y - (this.dragging.node.getBoundingClientRect().bottom - this.dragging.node.getBoundingClientRect().top) / 2 + 'px';
      if (!this.dragging.vertical)
        this.dragging.node.style.left = x - (this.dragging.node.getBoundingClientRect().right - this.dragging.node.getBoundingClientRect().left) / 2 + 'px';
      else
        x = this.dragging.freezeX; // freeze x
      var dropAreas = this.dragging.drop; //['tier-list', 'tier-database'];
      var els = document.elementsFromPoint(x,y);
      
      
      for (var i in els) {
        if ( dropAreas.some(className => els[i].className.indexOf(className)!==-1) && els[i].attributes['data-listname']) {
          if (els[i].attributes['data-drop-type']) {
            this.hidePlaceholder();
            this.dragging.targetList = this.xy.list;
            this.dragging.targetNode = els[i];
            break;
          };
          var listIndex = els[i].attributes['data-index'];
          this.dragging.targetList = this[els[i].attributes['data-listname'].value];
          if (listIndex) this.dragging.targetList = this[els[i].attributes['data-listname'].value][Number(listIndex.value)].list;
          if (i>0) {
            for (var j=0;j<i;j++ ) {
              if (els[j].id === 'item-placeholder') {
                if (this.dragging.targetIndex === null) {
                  this.dragging.targetList = this.dragging.from;
                  this.dragging.targetIndex = this.dragging.index;
                };
                break;
              }
              else if (this.dragging.node.classList.contains(els[j].classList[0]) /*this.dragging.node.className.indexOf(els[j].className) !==-1*/ && els[j].attributes['data-index']) {
                var index = els[j].attributes['data-index'].value;
                const _pos= els[j].getBoundingClientRect();
                var dist = this.dragging.vertical ? _pos.top+ _pos.height/2 <y : _pos.left+ _pos.width/2 <x;
                if  ( dist ) {
                  index++;
                  this.movePlaceholder(els[i], els[j].nextSibling);
                } else {
                  this.movePlaceholder(els[i], els[j]);
                };
                this.dragging.targetIndex = index>0?index:0;
                break;
              };
            };
          } else { // No elements collision
            this.movePlaceholder(els[i], els[i].children[els[i].children.length]);
            this.dragging.targetIndex = this.dragging.targetList.length;
          };
          break;
        } else if (i>els.length-2) { // remove data because user left the target div
          this.hidePlaceholder();
          this.dragging.targetList = null;
          this.dragging.targetIndex = null;
        };
      };
    },
    onMouseUp: function (e) {
      if (this.dragging) {
        //unfreeze flex element
        this.dragging.node.style.height = '';
        this.dragging.node.style.width = '';
        this.removePlaceholder();
        if (this.tierType === 1) return this.handleDropXY(e);
        if (this.dragging.targetList) {
          this.dragging.node.classList.remove("is-dragging");
          if (this.dragging.from === this.dragging.targetList) {
            arrayMove(this.dragging.targetList, this.dragging.index, this.dragging.targetIndex);
          } else {
            this.dragging.targetList.splice(this.dragging.targetIndex, 0,this.dragging.item);
            this.dragging.from.splice(this.dragging.index, 1);
          };
        } else {
          this.dragging.node.classList.remove("is-dragging");
        };
      };
      //console.log('drag touch over')
      this.dragging = null
    },
    relativePerClick: function(e,el,dragged) {
      var ev = e;
      var rect = el.getBoundingClientRect();
      var d = dragged.getBoundingClientRect();
      if (this.dragging.touch) ev = e.touches[0]||e.changedTouches[0];
      var x = ev.clientX - rect.left -(d.width/2); //x position within the element.
      var y = ev.clientY - rect.top -(d.height/2);  //y position within the element.
      return {x: x, y: y, xPer: x/(rect.right-rect.left)*100, yPer: y/rect.height*100}
    },
    handleDropXY: function (e) { // Handle drop on XY tier list type (this.tierType = 1)
      this.dragging.node.classList.remove("is-dragging");
      if (!this.dragging.targetList) {
        if (this.dragging.from[this.dragging.index].x) {
          this.dragging.node.style.left = this.dragging.from[this.dragging.index].x;
          this.dragging.node.style.top = this.dragging.from[this.dragging.index].y;
        };
        this.dragging = null;
        return;
      };
      if (this.dragging.targetList !== this.xy.list) { // back to list or inside list
        if (this.dragging.from === this.dragging.targetList)
          arrayMove(this.dragging.targetList, this.dragging.index, this.dragging.targetIndex);
        else
          this.dragging.targetList.splice(this.dragging.targetIndex, 0,this.dragging.item),
          this.dragging.from.splice(this.dragging.index, 1);
        this.dragging = null;
        return;
      } else { // from or to XY graph
        var click = this.relativePerClick(e, this.dragging.targetNode, this.dragging.node);
        if (this.dragging.from === this.dragging.targetList) {
          var i = this.dragging.index;
          this.dragging.targetList[i].x = click.xPer+'%';
          this.dragging.targetList[i].y = click.yPer+'%';
        } else {
          this.dragging.targetList.push({id: this.dragging.item, x: click.xPer+'%', y: click.yPer+'%'});
          this.dragging.from.splice(this.dragging.index, 1);
        };
      };
      this.dragging = null;
    }
  },
  render: function (h)  {
    return h('div', {staticClass: 'tier-maker-container tier', class: {mobileView: this.mobile}, on: {mousemove: (e) => this.onMouseMove(e,false), mouseup: (e) => this.onMouseUp(e), touchend: (e) => this.onMouseUp(e), touchmove: (e) => this.onMouseMove(e,true)} }, [
      h('floating-menu',{props: {mobile: this.mobile, options: this.floatyOptions}, on: {home: ()=>this.home(), new: () => this.openNewModal(), filters: () => this.openMobileFilters=true, save: () => this.saveTierlist(), saveAsNew: () => this.saveAsNew(), exportJSON: () => this.exportAsJSON(), renameAxes: () => this.editingAxes = true, toggletier: () => this.toggleTierType(), layout: () => this.switchLayout(), compare: () => this.openCompareModal() } }),
      h('div', {staticClass: 'tier-draw-area'}, 
        [
          this.editorModal ? h('tier-editor-modal', {props: {tier: this.editorModal, tiers: this.tiers, colors: this.labelColors}, on: {close: (e) => this.closeEditorModal(), clear: (a,b) => this.removeElementsRow(a,b), delete: (a,b) => this.deleteTierRow(a,b)} }) : null,
          this.commentModal ? h('tier-comment-modal', {props: {name: this.hero(this.commentModal).name, comment: this.getItemComment(this.commentModal) || ''}, on: {close: (e) => this.closeCommentModal(e)} } ):null,
          !this.mobile ? h('div', {staticClass: 'tier-control-buttons'}, [
            h('button', {on: {click: () => this.openNewModal() } }, 'New tierlist'),
            h('button', {on: {click: () => this.toggleTierType() }}, this.tierType===0?'Alignment chart':'Classic tierlist'),
            //h('button', {on: {click: () => this.openCompareModal() } }, 'Compare'),
            h('button', {on: {click: () => this.saveTierlist() } }, 'Save'),
            this.canSaveAsNew ? h('button', {on : {click: () => this.saveAsNew() } }, 'Save as new'):null,
            h('button', {on: {click: () => this.exportAsJSON() }}, 'Export as JSON'),
            h('button', {on: {click: () => canvas2png( document.getElementById('tier'), this.tierListName ) }}, 'Save as PNG'),
            this.tierType === 0 ? h('button', {on: {click: () => this.switchLayout() } }, 'Switch Layout'):null,
            this.tierType === 1 ? h('button', {on: {click: () => this.editingAxes=true }}, 'Edit axes'):null
          ]) : null,
          this.tierType === 0 ? [
            h('div', {staticClass: 'tier-drop-area', attrs: {id: 'tier', 'data-listname': 'tiers'}}, [
              h('h2', {staticClass: 'tier-list-title', attrs: {contenteditable: true}, on: {blur: (e) => this.$set(this,'tierListName',e.target.innerHTML)}, domProps: {innerHTML: this.tierListName} } ),
              this.tiers.map( (tier,ti) => {
                return h('div', {key: 'tier'+ti, staticClass: 'tier-wrapper', class: {type1: !this.layout, type2: this.layout===1}, attrs: {'data-index': ti} }, [
                  h('div', {staticClass: 'tier-name', domProps: {innerHTML: tier.name}, attrs: {contenteditable: true}, on: {blur: (e) => {this.$set(tier,'name',e.target.innerText);}, contextmenu: (e) => {e.preventDefault(); window.getSelection().removeAllRanges(); document.activeElement.blur(); this.editorModal=tier}}, style: {'background-color': tier.color || this.labelColors[ti % this.labelColors.length]}, directives: [{name: 'tooltip', value: 'Click to edit tier name.<br>Right click for more options!'}] } ),
                  h('div', {staticClass: 'tier-list noselect', attrs: {'data-index': ti, 'data-listname': 'tiers'} }, [
                    tier.list.map( (c,i) => {
                      return h('img', {staticClass: 'tier-item', key: c, style: { display: this.filterRankedHero(this.filter, c)?'':'none'}, attrs: {'data-index': i,src: this.getItemIcon(c)},  on: {contextmenu: (e) => this.openCommentModal(e, c), mousedown: (e) => this.onMouseDown(e,false,c,tier.list,i,['tier-database','tier-list']), touchstart: (e) => this.onMouseDown(e,true,c,tier.list,i,['tier-database','tier-list'])}, directives: [{name: 'tooltip', value: this.hero(c).name + (this.getItemComment(c) ? '<br><br>'+this.getItemComment(c) : '') }] })
                    }),
                    h('div', {staticClass: 'drag-tier-container', on: {mousedown: (e) => this.onMouseDown(e,false,tier,this.tiers,ti,['tier-drop-area'], findParent(e.target, 'tier-wrapper'), true), touchstart: (e) => this.onMouseDown(e,true,tier,this.tiers,ti,['tier-drop-area'], findParent(e.target, 'tier-wrapper'), true) }, attrs: {'data-html2canvas-ignore': true}}, [h('i', {staticClass: 'fas fa-grip-lines'})])
                  ])
                ]);
              })
            ]),
            h('div', {staticClass: 'new-tier-box noselect', style: {height: '100px'}, on: {click: () => this.createNewTier()}, attrs: {'data-html2canvas-ignore': true}}, [
              h('i', {staticClass: 'fa fa-plus'}),
              h('span', 'Add new tier')
            ])
          ]
        :
            /* X Y Tierlist */
          [
            h('div', {staticClass: 'tier-graph-xy noselect', attrs: {id: 'tier', 'data-listname': 'xy', 'data-drop-type': 1}}, [
              [{top: '0', left: '50%'},{top: '50%', right: '0'},{bottom: '0', left: '50%'},{top: '50%', left: '0'}].map( (s,i) => {
                return h('span', {style: {position: 'absolute', 'z-index': 1, 'pointer-events': 'none', top: s.top||'', left: s.left||'', right: s.right || '', bottom: s.bottom || ''}}, this.xy.names[i] || '')
              }),
              this.xy.list.map( (c,i) => {
                return h('img', {staticClass: 'tier-item', key: c.id, style: { display: this.filterRankedHero(this.filter, c.id)?'':'none', position: 'absolute', left: c.x, top: c.y}, attrs: {'data-index': i, src: this.getItemIcon(c.id), 'data-x': c.x, 'data-y': c.y},  on: {contextmenu: (e) => this.openCommentModal(e,c.id), mousedown: (e) => this.onMouseDown(e,false,c.id,this.xy.list,i,['tier-database','tier-graph-xy'], false, false, true), touchstart: (e) => this.onMouseDown(e,true,c.id,this.xy.list,i,['tier-database','tier-graph-xy'],false,false,true)}, directives: [{name: 'tooltip', value: this.hero(c.id).name + (this.getItemComment(c) ? '<br><br>'+this.getItemComment(c) : '') }] })
              })
            ])
          ]
      ]),
      // Character box
      h('div', {class: {'mobile-list': this.mobile, 'desktop-list':  !this.mobile}}, [
        h('div', {}, !this.mobile? [
          h('div', {staticClass: 'box-manage'}, [
            h('span', {staticClass: 'fas fa-sort-alpha-down'}),
            sortingOptions.map(i => {
              return h('span', {on:{click:()=>this.sortList(this.charList,i)}, class: {active: this.isActiveSort(this.sort,i)}}, i);
            })
          ]),
          h('div', {}, [
            h('input', {attrs: {id: 'filterRankedTier', type: 'checkbox'}, on: {change: e => {this.filterPlacedElements = e.target.checked}  }}),
            h('label', {attrs: {for: 'filterRankedTier'}}, 'Apply filter to ranked elements')
          ]),
          h('div', {}, 
            filteringOptions.map(filter => {
              return h('div', {staticClass: 'box-manage'},
                filter.options.map(option => {
                  return h('span', {on:{click: ()=>this.manageFilter(filter.filter, option.value) }, class: {active: this.isActiveFilter(this.filter,filter.filter,option.value)} }, [
                    option.display,
                    option.src?h('img', {attrs: {src: option.src}}):null
                  ]);
                })
              );
            })
          ),/*
          h('filters-ingame', {on: {close: () => this.openMobileFilters=false}, props: {res: this.filter, relative: true}}, [
            h('div', {}, [
              h('label', {staticClass: 'custom-check'}, [
                h('input', {attrs: {id: 'filterRankedTier', type: 'checkbox', checked: this.filterPlacedElements}, on: {change: e => {console.log(e); this.filterPlacedElements = e.target.checked}  }}),
                h('span', {staticClass: 'checkmark'}),
                'Apply filter to ranked elements'
              ])
            ])
          ])*/
        ] : [
          this.openMobileFilters ? h('filters-modal', {on: {close: () => this.openMobileFilters=false, save: () => this.openMobileFilters=false}, props: {res: this.filter, sorting: this.sort}}, [
            h('div', {}, [
              h('label', {staticClass: 'custom-check'}, [
                h('input', {attrs: {id: 'filterRankedTier', type: 'checkbox', checked: this.filterPlacedElements}, on: {change: e => {this.filterPlacedElements = e.target.checked}  }}),
                h('span', {staticClass: 'checkmark'}),
                'Apply filter to ranked elements'
              ])
            ])
          ]) : null
        ]),
        h('div', { staticClass: 'tier-database noselect', attrs: {'data-listname': 'charList'}},
          this.charList.map( (item,i)=> {
            return h('img', {staticClass: 'tier-item', key: item, style: { display: this.filterHero(this.filter, item)?'':'none'}, attrs: {'data-index': i, src: this.getItemIcon(item)}, directives: [{name: 'tooltip', value: this.hero(item).name + (this.getItemComment(item) ? '<br><br>'+this.getItemComment(item) : '') }], on: {contextmenu: (e) => this.openCommentModal(e, item), mousedown: (e) => this.onMouseDown(e,false,item, this.charList,i,['tier-database','tier-list','tier-graph-xy']), touchstart: (e) => this.onMouseDown(e,true,item,this.charList,i,['tier-database','tier-list','tier-graph-xy'])} })
          })
        )
      ]),
      /* EDIT CARTESIAN AXES */
      this.editingAxes ? h('div', {staticClass: 'center-modal'}, [
        h('div', {staticClass: 'flat-modal'}, [
          h('span', {staticClass: 'flat-modal-close', on: {click: () => this.$set(this, 'editingAxes', false)}}, '×'),
          h('h1', 'Cartesian axes'),
          h('div', {style: {padding: '10px', height: '250px', 'text-align': 'center'}}, [
            ['Top','Right','Bottom','Left'].map( (p,i) => {
              return h('div', [
                h('span', {style: {display: 'inline-block', width: '70px'}}, p),
                h('input', {on: {blur: (e) => this.$set(this.xy.names, i, e.target.value) }, attrs: {value: this.xy.names[i]} })
              ])
            })
          ])
        ])
      ]) : null,
      /* NEW TIERLIST */
      this.newMenu ? h('div', {staticClass: 'center-modal noselect'}, [
        h('div', {staticClass: 'flat-modal'}, [
          this.tierId ? h('span', {staticClass: 'flat-modal-close', on: {click: () => this.$set(this, 'newMenu', false)}}, '×') : null,
          h('h1', 'New Tier List'),
          h('div', {staticClass: 'new-tier-modal'}, [
            h('div', {style: {display: 'flex', 'flex-direction': 'column'} }, [
              h('div', {staticClass: 'new-tier-box', on: {click: () => {this.newTierlist('character').catch(err => {}) } }}, [
                h('i', {staticClass: 'fa fa-plus'}),
                h('span', 'New Hero tierlist')
              ]),
              h('div', {staticClass: 'new-tier-box', on: {click: () => {this.newTierlist('artifact').catch(err => {}) } }}, [
                h('i', {staticClass: 'fa fa-plus'}),
                h('span', 'New Artifact tierlist')
              ]),
              h('div', {staticClass: 'new-tier-box', on: {click: () => {document.getElementById('json-tierlist-input').click()}, dragover: (e) => e.preventDefault(), dragenter: (e) => e.preventDefault(), drop: (e) => {this.dropFile(e)} }}, [
                h('input', {on: {change: (e) => this.loadJSONFile(e.target.files[0])}, attrs: {type: 'file', accept: '.json', 'id': 'json-tierlist-input'}, style: {display: 'none'} }),
                h('i', {staticClass: 'fa fa-plus'}),
                h('span', 'Load tierlist from JSON file')
              ])
            ]),
            h('div', {staticClass: 'tierlist-history'}, [
              h('h2', 'Load:'),
              this.oldTierlists.map(tier => {
                return h('div', {staticClass: 'flex-option-delete'}, [
                  h('span', {on: {click: () => this.loadTierlist(tier.id)}}, tier.name),
                  h('div',  {on: {click: () => this.deleteTierlist(tier.id)}}, [
                    h('i', {staticClass: 'fa fa-trash'})
                  ])
                ])
              })
            ])
          ])
        ])
      ])  : null
    ])
  }
};

/* ADD extra css */
(function () {
  const styles = `
    .tier-list-title {
      font-family: 'Italianno', cursive;
      color: white;
      text-align: center;
      margin: 15px;
      font-size: 60px;
      font-weight: normal;
      white-space: break-spaces;
      word-break: break-word;
    }
    .tier-database {
      overflow: scroll;
    }
    .type1 {
      margin: 10px 0;
    }
    .type1 .tier-name {
      background-color: blue;
      border-radius: 6px;
      padding: 5px 20px;
      display: inline-block;
      margin-left: 10px;
      /*
      background: rgb(180,58,58);
      background: linear-gradient(90deg, rgba(180,58,58,1) 0%, rgba(253,29,29,1) 47%, rgba(252,176,69,1) 100%);
      color: white;*/
      color: black;
      max-width: 60%;
      white-space: break-spaces;
      word-break: break-word;
      position: relative;
      z-index: 1;
    }
    .type1 .tier-list {
      min-height: 127px;
      margin-top: -20px;
      padding: 30px 15px 20px;
      background-color: #0000006e;
      border-radius: 12px;
      position: relative;
    }
    .type2 {
      display: flex;
      border-bottom: solid 1px black;
    }
    .type2 .tier-name {
      flex: 0 0 100px;
      white-space: break-spaces;
      word-break: break-word;
      background: rgb(180,58,58);
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .type2 .tier-list {
      flex: 1;
      min-height: 127px;
      padding: 30px 15px 20px;
      background-color: #0000006e;
      position: relative;
    }
    .drag-tier-container {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: move;
    }
    
    .tier
    .dragPlaceholder {
      height: 70px;
      width: 70px;
      /*background-color: #ffffff29;*/
      /*border-radius: 100%;*/
      display: inline-block;
      vertical-align: bottom;
    }
    .tier .tier-item.dragPlaceholder:before {
      content: '';
      height: 100%;
      width: 100%;
      background-color: #ffffff29;
      border-radius: 100%;
      display: inline-block;
      vertical-align: bottom;
    }
    .tier .dragPlaceholder:not(.tier-item):before {
      content: '';
      height: 100%;
      width: 100%;
      background-color: #ffffff29;
      display: inline-block;
      vertical-align: bottom;
    }
    .tier-item {
      height: 70px;
      width: 70px;
      cursor: grab;
      vertical-align: bottom;
    }
    .desktop-list {
      /*flex: 0.3 1 0%;*/
      overflow: scroll;
      padding-bottom: 100px;
      width: 350px; /* fit 5 heroes per row */
    }
    .mobile-list {
      white-space: nowrap;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 140px;
      padding: 10px;
      border-radius: 20px 20px 0 0px;
      background-color: var(--bg-color-secondary);
      z-index: 1; /* fix tier type1 labels over filters modal*/
    }
    .mobile-list .tier-database::before {
      content: '« Swipe here »';
      display: block;
      text-align: center;
      font-size: 30px;
      position: sticky;
      left: 0;
      right: 0;
      color: var(--font-color);
      pointer-events: none;
    }
    .mobile-list .tier-database:after { /* Add extra space at the end*/
      content: '';
      width: 100px;
      display: inline-block;
    }
    .tier-maker-container.mobileView #tier {
    }
    .is-dragging {
      position: fixed !important;
      opacity: 0.5;
      z-index: 10;
      cursor: grabbing;
      pointer-events: none !important;
    }
    .tier-maker-container {
      display: flex;
      height: 100vh;
      width: 100%;
    }
    .tier-maker-container.mobileView {
    }
    .tier-maker-container * {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .tier-maker-container *::-webkit-scrollbar {
      display: none;
    }
    .tier-maker-container.mobileView .tier-draw-area{
      margin-bottom: 140px;
    }
    .tier-draw-area {
      flex: 1;
      overflow: scroll;
      padding: 10px;
    }
    
    
    .box-manage {
      margin: 0.2em 0;
      font-size: 20px;
      line-height: 1em;
      display: flex;
    }
    .box-manage > * > img {
      height: 1em;
      vertical-align: middle;
    }
    .box-manage > * {
      background-color: var(--icon-bar);
      padding: 0.6em;
      cursor: pointer;
      color: var(--font-color);
    }
    .box-manage > *:first-child {
      border-radius: 10px 0 0 10px;
    }
    .box-manage > *:last-child {
      border-radius: 0 10px 10px 0;
    }
    .box-manage > .active {
      color: white;
      background-color: var(--search-border-color);
    }
    .new-tier-modal {
      display: flex;
      height: 400px;
      max-width: 1000px;
      text-align: center;
      padding: 10px;
    }
    .new-tier-modal > div {
      flex: 1;
      overflow: auto;
    }
    .new-tier-box {
      flex: 1;
      font-size: 22px;
      border-radius: 10px;
      border: dotted;
      margin: 10px 0;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .new-tier-box:hover {
      background-color: #00000044;
    }
    .tierlist-history > div {
      cursor: pointer;
      padding: 10px;
    }
    .tierlist-history > div:hover {
      background-color: #00000044;
    }
    .flex-option-delete {
      display: flex;
    }
    .flex-option-delete > span {
      flex: 1;
    }
    .tier-control-buttons {
      text-align: center;
    }
    .tier-control-buttons > button {
      margin: 5px 10px;
      padding: 5px 10px;
      font-size: 15px;
      background-color: var(--icon-bar-active);
      border: none;
      color: white;
      border-radius: 4px;
      min-width: 100px;
      cursor: pointer;
    }
    
    .tier-graph-xy {
      position: relative;
      height: 100%;
      width: 100%;
      /* border: solid thin; */
      background: linear-gradient(#fff,#fff), linear-gradient(#fff,#fff);
      background-position: center;
      background-size: 100% 2px,2px 100%;
      background-repeat: no-repeat;
    }
    .tier-graph-xy .dragPlaceholder {
      display: none !important;
    }
  `;
  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
})();
