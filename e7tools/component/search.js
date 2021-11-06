console.log('search downloaded');
/*global Vue*/
// memory leak https://github.com/vuejs/vue/pull/10085
Vue.component('search-bar', {
  name: 'search-bar',
  props: {
    render: {
      type: Boolean,
      required: false,
      default: true
    },
    events: {
      type: Array,
      required: false,
      default: () => {return []}
    },
    renderBox: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data: function () {
    return {
      current: 0,
      results: [],
      hideResultsBox: false,
      keys: ['title','name','role','attribute']
    }
  },
  computed: {
    mobile: function () {
      return this.$store.state.isMobile;
    },
  },
  beforeDestroy: function () {
    this.$root.$off('focus');
  },
  mounted: function () {
    this.$nextTick(() => {
    })
    this.$on('focus', () => {
      this.focusInput();
      this.selectInputContent();
    });
    this.focusInput();
    console.log(this.events);
  },
  methods: {
    focusInput: function () {
      Vue.nextTick(()=>{this.$refs['input-search-box'].focus()})
    },
    selectInputContent: function () {
      Vue.nextTick(()=>{this.$refs['input-search-box'].select()})
    },
    searchEvent: function (e) {
      var t = e.target.value;
      if (!t) return this.results=[];
      if (isNaN(t)) t=t.toLowerCase();
      this.results = this.events.filter(item=>{
        if (!item.title) return false;
        return item.title.toLowerCase().indexOf(t.toLowerCase())!=-1? true:false;
      }).reverse();
      //return res;
      /*if(res.length>0) this.goToSearchEvent(0);*/
    },
    goToSearchEvent: function (n) {
      if (!this.results.length) return;
      this.current=n;
      if (this.current<0) this.current=this.results.length-1;
      if (this.current>this.results.length-1) this.current=0;
      this.clickEvent(this.results[this.current]);
    },
    clickEvent: function (event,date) {
      this.$emit('eventClick', event);
    },
    closeSearchBar: function () {
      this.$emit('close');
    }
  },
  render: function (h) {
    return this.render ?
      h('div',{staticClass: 'search-box-pos'}, [
        h('div', {staticClass: 'ch-search-box'},[
          h('input',{ref:'input-search-box', on:{ input: (e) => this.searchEvent(e), keydown: (e)=> {e.key === 'enter'||e.keyCode === 13?this.goToSearchEvent(this.current+1):0} }}),
          h('div',{}, Math.min(this.current+1,this.results.length)+'/'+this.results.length),
          h('span',{staticClass: 'fas fa-angle-up', on: {click: ()=>this.goToSearchEvent(this.current+1)}, class: {disabled: this.results.length===0}}),
          h('span',{staticClass: 'fas fa-angle-down', on: {click: ()=>this.goToSearchEvent(this.current-1)}, class: {disabled: this.results.length===0}}),
          this.mobile?h('span',{staticClass: 'fas fa-bars', on: {click: ()=>this.renderBox=!this.renderBox}}) : null,
          h('span',{staticClass: 'fas fa-times', on: {click: ()=>this.closeSearchBar()}})
        ]),
        this.renderBox?h('div', {staticClass: 'search-results-box', class: {hidebox: this.hideResultsBox}}, this.results.map((x,i)=>{return h('div', {staticClass: 'item', class: {active: i===this.current}, on : {click: () => this.goToSearchEvent(i)}}, x.start +' - '+ x.title)})):null
      ])
    :null;
  }
});