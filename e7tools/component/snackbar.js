/*global Vue*/
Vue.component('snackbar', {
  name: 'snackbar',
  props: {
  },
  data: function () {
    return {
      ev: {},
      id: 0
    }
  },
  computed: {
    mobile: function () {
      return this.$store.state.isMobile;
    },
  },
  mounted: function () {
    this.$root.$on('snackbar', (event) => {
      this.id++;
      let id="N"+this.id;
      event.id=id;
      this.$set(this.ev, id,event);
      if (event.manual) { /* manually remove notification on click */
        return;
      };
      if (this.mobile) { /* only one notification on mobile and has to be manually dismissed*/
        //this.$delete(this.ev, 'N'+(this.id-1))
        //return;
      };
      setTimeout(() => {
          this.$delete(this.ev, id)
      }, 3000);
    });
  },
  methods: {
  },
  render: function (h) {
    return h('div', {class: 'noselect', style: {zIndex: 1000, position: 'fixed', top: 0, right: 0, height: 0,'text-align': 'center'}}, [
      h('transition-group', {attrs: {name:'bounce'}},
          Object.values(this.ev).map( (item,i) => {
            return h('div', {key: 'snack'+item.id,staticClass: 'snackbar snack-'+item.type, on: {click:()=>this.$delete(this.ev, item.id)}}, [
                h('div', {staticClass: 'content'}, [
                  h('i', {staticClass: 'fa', class: {'fa-times-circle': item.type==='error', 'fa-check-circle': item.type==='success', 'fas fa-exclamation-circle': item.type==="info", icon: true}}),
                  h('h3', {staticClass: 'title'}, item.title),
                  h('p', {staticClass: 'description',domProps:{innerHTML:item.description}})
                ])
            ]);
          })
        )
    ]);
  }
});