<template>
  <div ref="display"></div>
</template>
<script>
export default {
  props: {
    code: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      html: "",
      js: "",
      css: ""
    };
  },
  methods: {
    // 根据类型获取相应字符串
    getSource(source, type) {
      let reg = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(reg);
      if (!opendingTag) {
        return "";
      } else {
        openingTag = openingTag[0];
        return source.slice(
          source.indexOf(openingTag) + openingTag.length,
          source.indexOf(`</${type}>`)
        );
      }
    },
    // 分割代码片段
    splitCode() {
      const template = '<div id="app">' + this.getSource(this.code, "template") + "</div>";  // 包裹div的作用：容错，防止使用者传递的 code 可能会外层没有根节点。
      const script = this.getSource(this.code, "script").replace(/export default/, "return ");
      const style = this.getSource(this.code, "style");

      this.html = template;
      this.js = script;
      this.css = style;
    }
  }
};
</script>
<style lang='less' scoped>
</style>
