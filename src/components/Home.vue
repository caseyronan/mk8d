<template>
  <div class="home">

    <driver-chart></driver-chart>

  </div>
</template>

<script>
import DriverChart from './DriverChart'

export default {
  name: 'home',
	data () {
    return {
      value : 0
	  }
  },
  components: {
    DriverChart,
  }
}
</script>

<style lang="sass" scoped>
@import '../mq'


</style>
