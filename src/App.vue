<template>
  <div id="app">

    <!-- <div class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">mk8d</a>
        </div>

        <span class="nav-toggle" v-on:click="toggleNav" v-bind:class="{ 'is-active': isActive }">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div class="nav-right nav-menu" v-bind:class="{ 'is-active': isActive }">

            <router-link to="/" class="nav-item r-item">Home</router-link>
            <router-link to="faq" class="nav-item r-item">FAQ</router-link>

        </div>
      </div>
    </div> -->

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
  // background-color: #fcfcfc
//  background-image: url("./assets/cream_dust.png")

.nav
  // background-image: url("./assets/cream_dust.png")
  // background-color: #fafafa

.section
  padding: 2rem 1.2rem

.nav-left a
  color: #fff
  font-weight: bold

a.r-item
  color:#C1C1C1
  padding: 0.5rem 1.75rem
  +mobile
    color: gray
    &:hover
      background-color: #F1F1F1

.nav-toggle span
  background-color: #C1C1C1

footer
  background-color: $primary !important
  color: #fff
  .icon
    color: #fff
    margin-left: 20px

</style>
