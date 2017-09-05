<template>
  <div class="home">

    <driver-chart></driver-chart>

    <!-- <hr> -->
    <!-- <body-chart></body-chart> -->

  </div>
</template>

<script>
import DriverChart from './DriverChart'
import BodyChart from './BodyChart'

export default {
  name: 'home',
	data () {
    return {
      total : 0
	  }
  },
  components: {
    'driver-chart' : DriverChart,
    'body-chart' : BodyChart,
  }
}
</script>

<style lang="sass" scoped>
@import '../mq'


</style>
