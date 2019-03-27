export default {
  data() {
    return {
      is_show: true
    };
  },
  render(h) {
    let childNode;
    if(this.is_show) {
      childNode = h('p', '1111111111')
    }else {
      childNode = h('p', '2222222222')
    }

    return h('div', {
      attrs: {
        id: 'main'
      },
      style: {
        color: 'red',
        fontSize: '14px'
      },
      class: {
        container: true
      }
    }, [childNode])
  },
  components: {},
  methods: {}
};