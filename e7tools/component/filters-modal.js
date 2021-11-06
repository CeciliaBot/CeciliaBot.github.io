/*global Vue*/
Vue.component('filters-modal', {
  name: 'filters-modal',
  props: {
    options: {
      type: Object,
      required: false,
      default: function () {return {}}
    },
    res: {
      type: Object,
      required: false,
      default: function () {return {role: [], attribute: [], rarity: [], year: null, month: null}}
    },
    sorting: {
      type: Array,
      required: false,
      default: function () {return ['name',false]}
    },
    limit: {
      type: Number,
      required: false,
      default: 0
    },
    relative: {
      type: Boolean,
      required: false,
      default: false
    },
    hidesort: {
      type: Boolean,
      required: false,
      default: false
    },
    extrasort: {
      type: Array,
      required: false,
      default: function () {return []}
    }
  },
  data: function () {
    return {
      role: [{name: 'All', id: 'all'},{name: 'Knight', id: 'knight'}, {name: 'Thief', id: 'assassin'},{name: 'Warrior', id: 'warrior'}, {name: 'Ranger', id: 'ranger'}, {name: 'Mage', id: 'mage'}, {name: 'Soul-weaver', id: 'manauser'}],
      attribute: [{name: 'All', id: 'all'}, {name: 'Fire', id: 'fire'},{name: 'Ice', id: 'ice'},{name: 'Earth', id: 'wind'},{name: 'Light', id: 'light'},{name: 'Dark', id: 'dark'}],
      rarity: [{name: 'All', id: 'all'},{name: '5', id: 5},{name: '4', id: 4},{name: '3', id: 3}],
      sort: [{name: 'Name', id: 'name'}, {name: 'Grade', id:'rarity'}, {name: 'Attribute', id: 'attribute'}, {name: 'ID', id: 'id'}]
    }
  },
  computed: {
    mobile: function () {
      return this.$store.state.isMobile;
    },
  },
  created: function () {
    this.extrasort.forEach(option => { //add extra sorting options of needed
      this.sort.push(option);
    })
  },
  mounted: function () {
  },
  methods: {
    isActive: function (cat, id) {
      if (!this.res[cat].length && id==='all')
        return true;
      else if (this.res[cat].includes(id))
        return true;
      return false;
    },
    isActiveSorting: function (id) {
      return this.sorting[0] === id;
    },
    getRoleIcon: function (id) {
      return this.$store.getters.getRoleIcon(id);
    },
    getAttributeIcon: function (id) {
      return this.$store.getters.getAttributeIcon(id);
    },
    getRarityIcon: function (id) {
      return this.$store.getters.getRarityIcon(id);
    },
    updateFilter(cat, opt) {
      if (opt!='all')
        if (!this.res[cat].includes(opt))
          this.res[cat].push(opt);
        else 
          this.res[cat].splice(this.res[cat].indexOf(opt), 1);
      else 
        if (this.res[cat].length)
          this.res[cat] = [];
        else
          this[cat].forEach( item => {if (item.id==='all') return; this.res[cat].push(item.id) });
    },
    updateSorting: function (id) {
      var r = this.sorting[0] === id ? !this.sorting[1] : false;
      this.$set(this.sorting, 0, id);
      this.$set(this.sorting, 1, r);
    },
    outOfBounds: function (e) {
      if (e.target.className === 'filter-wrapper')
        //this.close();
        this.setFilters();
    },
    close: function () {
      this.$emit('close');
    },
    setFilters: function () {
      this.$emit('save', this.res, this.sorting);
    }
  },
  render: function (h) {
    return h('div',{staticClass: 'filter-wrapper', style: {position: this.relative ? 'relative':'fixed'}, on: { click: (e) => this.outOfBounds(e) } },[
      h('div',{staticClass: 'filter-modal', style: {'max-width': this.relative?'100%':'90%'}},[
        h('div', {staticClass: 'filter-columns'}, [
          [{list: this.attribute, cat: 'attribute', icon: 'getAttributeIcon'},{list: this.role, cat: 'role', icon: 'getRoleIcon'},{list: this.rarity, cat: 'rarity', icon: 'getRarityIcon'}].map( (filter,i) => {
            return h('div', filter.list.map( (option,index) => {
              return h('div', {staticClass: 'elements', class: {active: this.isActive(filter.cat, option.id)}, on: { click: () => this.updateFilter(filter.cat, option.id) } }, [
                h('label', {staticClass: 'custom-check', style: {margin: 0, 'pointer-events': 'none'}}, [
                  h('input', {attrs: {type: 'checkbox', checked: this.isActive(filter.cat, option.id) }}),
                  h('span', {staticClass: 'checkmark'}),
                  filter.cat==='rarity'&&index>0 ? h('span', option.id) : null,
                  h('img', {class: {'all-filter-label': index===0}, attrs: {src: this[filter.icon](option.id)} })
                ])
              ])
            }));
          }),
          h('div', {},
            this.sort.map(sorter => {
              return h('div', {staticClass: 'elements', class: {'active-sort': this.isActiveSorting(sorter.id)}, on: {click: () => this.updateSorting(sorter.id)}}, sorter.name)
            })
          )
        ]),
        this.$slots.default? h('div', {staticClass: 'filter-options'}, [
          this.$slots.default
        ]) : null
      ])
    ]);
  }
});


/* ADD extra css */
(function () {
  var styles = `
  .filter-wrapper {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
  }
  .filter-wrapper * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .filter-wrapper *::-webkit-scrollbar {
    display: none;
  }
  .filter-modal {
    /*width: 100%;*/
    max-width: 90%;
    /*height: 100%;*/
    overflow: scroll;
    max-height: 550px;
    background-color: black;
    margin: auto;
    border-radius: 10px;
    border: solid 2px #776048;
    z-index: 0;
    padding: 10px 0;
    font-size: 16px;
  }
  .filter-columns {
    display: flex;
    /*flex-wrap: wrap;*/
    font-size: 1.3em;
    overflow: scroll;
  }
  .filter-columns > div {
    /*flex: 1;*/
    padding: 0 10px;
  }
  .filter-columns > div:not(:last-child) {
    border-right: solid thin #776048;
  }
  .filter-columns .elements {
    padding: 0.1em 0.3em;
    border-radius: 0.4em;
    margin: 0.1em 0;
    white-space: nowrap;
    cursor: default;
  }
  .filter-columns .elements.active {
    background: #4CAF5066;
  }
  .filter-columns .elements.active-sort {
    background-color: #af804c66;
    color: white;
  }
  .filter-columns img {
    height: 1em;
    vertical-align: middle;
  }
  .filter-columns .all-filter-label {
    height: 1.5em;
  }
  .filter-modal .filter-options {
    margin: 10px;
    padding: 20px 10px 0;
    border-top: solid thin #776048;
  }
  
  
  .custom-check {
    position: relative;
    display: inline-block;
    color: var(--font-color);
    user-select: none;
    margin: 10px 0;
    padding-left: 1.8em;
  }
  .custom-check input[type="checkbox"] {
    display: none;
    position: absolute;
  }
  .checkmark {
    position: absolute;
    left: 0;
    transition: all ease-out 0.2s;
    white-space: nowrap;
    height: 1.2em;
    width: 1.2em;
    background-color: #1e2126;
    border-radius: .4em;
    border: solid .1em #1b1c1c;
    box-shadow: inset .2em .2em .2em #00000094, .2em .2em .2em #00000094;
    top: 50%;
    transform: translateY(-50%);
  }
  .custom-check .checkmark::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0.7em;
    border-bottom: 0.2em solid #4CAF50;
    border-left: 0.2em solid #4CAF50;
    /*top: 0;*/
    left: 50%;
    transform-origin: bottom left;
    transform: rotate(-45deg);
    opacity: 0;
    transition: all ease-out 0.2s;
  }
  .custom-check input:checked ~ .checkmark::after {
    opacity: 1;
    width: 1.2em;
  }
  `;
  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
})();