<template>
  <div id="app">
        <div class="section">
          <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: function() {
    return {
      isActive: false
    }
  },
  methods: {
    toggleNav: function() {
      this.isActive = !this.isActive;
    }
  },

}
</script>

<style lang="sass">
@import '../node_modules/bulma/bulma.sass'
@import 'mq'

html
  height: 100%

body
  background-color: #f9f9f9
  min-height: 100%

.section
  padding: 2.5rem 1rem

</style>
