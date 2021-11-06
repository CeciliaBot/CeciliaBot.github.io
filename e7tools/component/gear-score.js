import * as gearUtils from '../js/gear-utils.js'; 

/*global Vue*/
Vue.component('multiselect', window.VueMultiselect.default)
var css = document.createElement( "link" );
css.href = "https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css";
css.type = "text/css";
css.rel = "stylesheet";
css.media = "screen,print";
document.getElementsByTagName( "head" )[0].appendChild( css );


var subs = [
  {
    name: 'Speed',
    type: 'spd'
  },
  {
    name: 'Attack',
    type: 'atk'
  },
  {
    name: 'Attack %',
    type: 'atkRate'
  },
  {
    name: 'Defense',
    type: 'def'
  },
  {
    name: 'Defense %',
    type: 'defRate'
  },
  {
    name: 'HP',
    type: 'hp'
  },
  {
    name: 'HP %',
    type: 'hpRate'
  },
  {
    name: 'Crit Chance',
    type: 'cr'
  },
  {
    name: 'Crit Damage',
    type: 'cd'
  },
  {
    name: 'Effectivness',
    type: 'eff'
  },
  {
    name: 'Effect Resistance',
    type: 'efr'
  },
];

export default {
  name: 'gear-score',
  data: function () {
    return {
      userStats: [{},{},{},{}]
    }
  },
  computed: {
    notSelected: function () {
      return subs.filter(sub=> {return !this.userStats.some(u=> u.type===sub.type)});
    },
    score: function () {
      return gearUtils.score(this.userStats);
    }
  },
  methods: {
    setGearSub: function (i, key, val) {
      this.$set(this.userStats[i], key, val);
    }
  },
  beforeDestroy: function () {
    this.refs['val'].forEach( el => {
      el.$off('keyup');
    });
    console.log('Score destroyed!');
  },
  render: function (h) {
    return h('div', {style: {color: 'var(--font-color)', width: '100%', 'max-width': '600px', margin: 'auto', 'padding-top': '20px'}}, [
      h('floating-menu',{props: {options: [{title: 'Home', class: 'fa fa-home', click: 'home'}]}, on: {home: ()=>this.$store.commit('toggleMainMenu')} }),
      [0,1,2,3].map( i => {
        return h('div', {style: {margin: '5px', display: 'flex'}}, [
          h('multiselect', {on: {select: (option,id) => {this.setGearSub(i,'type',option.type),this.setGearSub(i,'name',option.name)} }, attrs: {value: this.userStats[i].name?this.userStats[i] : undefined}, props: {'deselect-label': 'Can\'t remove', selectLabel: '', 'track-by': 'type', label: 'name', placeholder: 'Select substat', options: this.notSelected, searchable: false, 'allow-empty':false}, style: {display: 'inline-block', flex: '1.3'}}, [
            h('template', {props: {slot:'singleLabel', 'slot-scope': 'slot'}}, [
              h('img', {staticClass: 'option__image'})
            ])
          ]),
          h('input', {ref: 'input_val', attrs: {type: 'number', placeholder: 0}, on: {keyup: (e) => {console.log(e), this.setGearSub(i,'value',e.target.value||0)}}, style: {'font-size': '16px', height: '40px', 'border-radius': '8px', border: 'none', padding: '5px 10px', 'vertical-align': 'bottom', flex: 0.7 } })
        ])
      }),
      h('div', {style: {'text-align': 'center', margin: '30px 0', color: 'white'}}, [
        h('span', {style: {'background-color': 'var(--icon-bar-active)', height: '60px', display: 'inline-block', width: '100px', 'font-size': '32px', 'line-height': '60px', 'border-radius': '15px'}}, Math.round(this.score.score)),
      ]),
      h('div',{style: {display: 'flex', 'justify-content': 'space-around'}}, [
        h('span', 'DPS Score: '+Math.round(this.score.dScore)),
        h('span', 'Support Score: '+Math.round(this.score.sScore)),
        h('span', 'Combat Score: '+Math.round(this.score.cScore)),
      ]),
      h('div', {style: {'text-align': 'center', position: 'absolute', bottom: 0}}, [
        h('i', 'For consistency across the community this page uses the same values as Fribbels Gear Optimizer')
      ])
    ]);
  }
};