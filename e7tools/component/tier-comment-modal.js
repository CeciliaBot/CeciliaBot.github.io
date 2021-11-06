export default {
  name: 'tier-comment-modal',
  props: {
    name: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
  },
  created: function () {
  },
  data: function () {
    return {
    }
  },
  computed: {
  },
  methods: {
    close: function (e) {
      if (e.target.className !== 'center-modal') return;
      this.$emit('close', this.$refs['item-comment-textarea'].value);
    }
  },
  render: function (h) {
    return h('div', {staticClass: 'center-modal', on: {click: (e) => this.close(e)}}, [
      h('div', {staticClass: 'flat-modal', style: {height: '100%', 'max-height': '600px'}}, [
        h('h1', {staticClass: 'm-window-title'}, 'Comments - ' + this.name),
        h('div', {style: {'text-align': 'center', margin: '30px 10px'}}, [
          h('h3', 'Comment:'),
          h('textarea', {ref: 'item-comment-textarea', domProps: {value: `${this.comment}`.replace(/\<br\>/gi, '\n')}, style: {resize: 'none', 'width': '100%', 'max-width': '800px', height: '450px', 'font-size': '16px'}})
        ])
      ])
    ])
  }
};