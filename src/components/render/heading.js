var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    console.log(node);

    return node.children ?
      getChildrenTextContent(node.children) :
      node.text
  }).join('')
}

export default {
  data() {
    return {

    }
  },
  props: {
    level: {
      type: [Number, String],
      required: true
    }
  },
  render(h) {
    var nodeId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/(^-|-$)/g, '');

    return h('h' + this.level, {
      class: {
        heading: true
      }
    }, [h('a', {
      attrs: {
        name: nodeId,
        href: '#'+nodeId
      }
    }, this.$slots.default)])
  },
}