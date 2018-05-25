
<style scoped>
  button { min-width: 60px; height: 32px; line-height: 32px; box-sizing: border-box; padding: 0 10px; margin: 0 10px 10px 0; border: 1px solid #000; text-align: center; background: #fff; color: #858585; font-size: 14px; }
  .disabled { border-style: dashed; } 
  .selected { height: 34px; line-height: 34px; background: #000; color: #fff; border: 0; }
  .dis-selected { background: #858585; }
</style>
<template>
  <button :class="{'disabled': disabled, 'selected': selected, 'dis-selected': disabled&&selected}" @click="clickHandler(skuProp.propRank,skuProp.rank)">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'el-button',
    data () {
      return {
        status:1,
      }
    },
    props: ['disabled', 'selected', 'skuProp', 'callback'],
    computed: {
      
    },
    created () {
    },
    mounted () {
      
    },
    methods: {
      clickHandler (pRank, rank) {
        this.callback(pRank, rank)
      }
    }
  }
</script>

