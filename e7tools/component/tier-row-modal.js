export default {
  name: 'tier-row-modal',
  props: {
    tier: {
      type: Object,
      required: true
    },
    tiers: {
      type: Array,
      required: true
    },
    colors: {
      type: Array,
      required: false,
      default: function () {return []}
    }
  },
  created: function () {
    //this.tierCopy = JSON.parse(JSON.stringify(this.tier));
  },
  data: function () {
    return {
    }
  },
  computed: {
    tierPosition: function () {
      for (var i in this.tiers) {
        if (this.tiers[i] === this.tier)
          return Number(i);
      };
      return null;
    }
  },
  methods: {
    updateTierName: function (val) {
      this.$set(this.tier, 'name', val);
    },
    deleteRow: function () {
      this.$emit('delete', this.tier, this.tiers);
    },
    clearRow: function () {
      this.$emit('clear', this.tier, this.tiers);
    },
    moveTier: function (n) {
      var old_index = this.tierPosition;
      var index = old_index+n;
      if (index>this.tiers.length) return;
      if (index<0) return;
      this.tiers.splice(index, 0, this.tiers.splice(old_index, 1)[0]);
    },
    close: function (e) {
      if (e.target.className !== 'center-modal') return;
      this.$emit('close');
    }
  },
  render: function (h) {
    return h('div', {staticClass: 'center-modal', on: {click: (e) => this.close(e)}}, [
      h('div', {staticClass: 'flat-modal'}, [
        h('h1', {staticClass: 'm-window-title'}, 'Tier editor - ' + this.tier.name),
        h('div', {style: {'text-align': 'center', margin: '30px 10px'}}, [
          h('div', {style: {'max-width': '470px', display: 'inline-block'}}, [
            h('h3', 'Label background color:'),
            h('span', {staticClass: 'color-circle', style: {'background-color': 'white'}, class: {'selected-color': this.tier.color===null}, on: {click: () => this.$set(this.tier, 'color', null)} }, 'A'),
            this.colors.map(color => {
              return h('span', {staticClass: 'color-circle', key: color, style: {'background-color': color}, class: {'selected-color': this.tier.color===color}, on: {click: () => this.tier.color=color} })
            }),
            h('div', 'Selected: ' + ( this.tier.color || 'Automatic'))
          ]),
          h('div', {style: {}}, [
            h('h3', 'Label text:'),
            h('textarea', {domProps: {innerHTML: this.tier.name}, style: {resize: 'none', 'width': '100%', 'max-width': '470px', height: '70px', 'font-size': '16px'}, on: {blur: (e) => this.updateTierName(e.target.value)}})
          ]),
          h('div', {style: {}}, [
            h('button', {staticClass: 'flat-button', on: {click: () => this.deleteRow()}}, 'Delete tier'),
            h('button', {staticClass: 'flat-button', on: {click: () => this.clearRow()}}, 'Remove Elements'),
            h('br'),
            h('button', {staticClass: 'flat-button', on: {click: () => this.moveTier(-1)}}, 'Move up'),
            h('button', {staticClass: 'flat-button', on: {click: () => this.moveTier(1)}}, 'Move down')
          ])
        ])
      ])
    ])
  }
};

/* ADD extra css */
(function () {
  const styles = `
    .color-circle {
      display: inline-block;
      height: 30px;
      width: 30px;
      border-radius: 100%;
      margin: 5px;
      vertical-align: middle;
      font-size: 19px;
      text-align: center;
      cursor: pointer;
    }
    .color-circle.selected-color {
      border: solid 2px;
    }
    .flat-button {
      border: none;
      padding: 10px;
      min-width: 40%;
      font-size: 17px;
      margin: 10px;
      cursor: pointer;
    }
  `;
  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
})();