<template>
  <div class="home">

    <driver-chart></driver-chart>

  </div>
</template>

<script>
import DriverChart from './DriverChart';

export default {
  name: 'home',
	data () {
    return {
      total : 0
	  }
  },
  components: {
    'driver-chart' : DriverChart,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '../mq'


</style>
