<template>
  <component :is="Profile" v-if="Profile"/>
</template>

<script>
export default {
  data() {
    return {
      Profile: null,
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    getProfile ()  {
      var table = this.$storage.get("sessionTable");
      this.Profile = () => import(`./${table}_profile.vue`)
    }
  }
};
</script>

<style>
/* 自定义样式 */
</style>