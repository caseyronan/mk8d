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

body
  background-color: #f9f9f9

.section
  padding: 2rem 1rem

</style>
