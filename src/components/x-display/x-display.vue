<template>
  <div ref="display"></div>
</template>
<script>
import Vue from "vue";
import randomStr from "../../utils/random_str.js";

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
      css: "",
      component: null,
      id: randomStr()
    };
  },
  watch: {
    code() {
      this.destroyCode();
      this.renderCode();
    }
  },
  methods: {
    // 根据类型获取相应字符串
    getSource(source, type) {
      let reg = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(reg);
      if (!openingTag) {
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
      const template =
        '<div id="app">' + this.getSource(this.code, "template") + "</div>"; // 包裹div的作用：容错，防止使用者传递的 code 可能会外层没有根节点。
      const script = this.getSource(this.code, "script").replace(
        /export default/,
        "return "
      );
      const style = this.getSource(this.code, "style");

      this.html = template;
      this.js = script;
      this.css = style;
    },
    // 渲染代码片段
    renderCode() {
      this.splitCode();

      if (this.html !== "" && this.js !== "") {
        console.log(new Function(this.js));

        let parseStrToFunc = new Function(this.js)();
        console.log(parseStrToFunc);

        parseStrToFunc.template = this.html;
        console.log(parseStrToFunc);

        const Component = Vue.extend(parseStrToFunc);
        this.component = new Component().$mount();

        this.$refs.display.appendChild(this.component.$el);

        if (this.css !== "") {
          const style = document.createElement("style");
          style.type = "text/css";
          style.id = this.id;
          style.innerHTML = this.css;
          document.getElementsByTagName("head").appendChild(style);
        }
      }
    },
    // 当 Display 组件销毁时，也要手动销毁 extend 创建的实例以及上面的 css：
    destroyCode() {
      
      const $target = document.getElementById(this.id);
      if ($target) {
        $target.parentNode.removeChild($target);
      }
      if (this.component) {
        this.$refs.display.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    }
  },
  mounted() {
    this.renderCode();
  },
  beforeDestroy() {
    this.destroyCode();
  }
};
</script>
<style lang='less' scoped>
</style>
