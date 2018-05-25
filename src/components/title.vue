<template>
</template>

<script>
  export default {
    props: ['text'],
    mounted: function () {
      if(this.text){
        document.title = this.text
      }
    },
    watch: {
      text: {
        handler: function (newVal, oldVal) {
          // console.log("changed",oldVal,newVal)
          document.title = newVal
        },
        deep: true
      }
    }
  }
</script>
