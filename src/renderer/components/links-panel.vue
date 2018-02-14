<template >
  <ul class="cpt-links-panel">
    <li class="link-item" v-for="link in links" :key="link.name">
      <div class="link-name">{{ link.name }}</div>
      <div class="link-content">
        <input class="copy-input" type="text" :value="link.value">
        <span class="copy-button" @click="copyLink(link.value)">复制</span>
      </div>
    </li>
  </ul>
</template>

<script>
import copy from '../util/copy'
export default {
  props: {
    url: String
  },

  computed: {
    links () {
      const { url } = this
      return [
        {
          name: 'Markdown',
          value: `![](${url})`
        },
        {
          name: '图片链接',
          value: url
        },
        {
          name: 'UBB',
          value: `[IMG]${url}[/IMG]`
        },
        {
          name: 'IMG',
          value: `<img src="${url}"/>`
        }
      ]
    }
  },

  methods: {
    copyLink (v) {
      copy(v, ok => {
        if (ok) {
          this.$swal({
            text: '复制成功',
            icon: 'success',
            buttons: false,
            timer: 1000
          })
        } else {
          this.$swal({
            text: '复制失败，请手动复制练级地址',
            icon: 'warning',
            buttons: false,
            timer: 1000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cpt-links-panel {
  list-style: none;
  font-size: 12px;
  text-align: left;

  .link-item {
    margin: 10px 0;
  }

  .link-name {
    color: #929aa3;
    padding: 4px 0;
  }

  .link-content {
    display: flex;
    align-items: center;

    .copy-input,
    .copy-button {
      padding: 4px 10px;
      border: 1px solid #eee;
      border-radius: 4px;
    }

    .copy-input {
      flex: 1;
      margin-right: 10px;
      color: #222;
      outline: none;
    }

    .copy-button {
      cursor: pointer;
    }
  }
}
</style>
