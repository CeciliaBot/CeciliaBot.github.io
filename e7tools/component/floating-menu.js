/*global Vue*/
Vue.component('floating-menu', {
  name: 'floating-menu',
  props: {
    options: {
      type: Array,
      required: false,
      default: function () {return []}
    }
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    mobile: function () {
      return this.$store.state.isMobile;
    },
  },
  mounted: function () {
  },
  methods: {
    clickEvent: function (event,date) {
      this.closeMenu();
      this.$emit(event.click, event);
    },
    closeMenu: function () {
      this.open=false;
    }
  },
  render: function (h) {
    return h('div', {style: {zIndex: 10, position: 'absolute'}}, this.options.length >0 [
      this.options.length ===1
      ?
        h('div', {staticClass: 'mobile-menu ' + this.options[0].class, on: {click: ()=> this.clickEvent(this.options[0])} })
      : [
        h('div', {staticClass: 'mobile-menu-items', class: {closed: !this.open}}, 
          this.options.map(o=>{
            return [
              h('div', {staticClass: o.class, on: {click: ()=> this.clickEvent(o)}}),
              h('span', o.title)
            ]
          })
        ),
        h('div', {staticClass: 'fa mobile-menu', class: {'fa-bars': !this.open,'fa-times': this.open, open: this.open}, on: {click: ()=> this.open=!this.open} })
      ]
    ] : null);
  }
});
