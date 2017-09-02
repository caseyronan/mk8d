<template>
  <div class="small">
    <bar-chart
    :height="200"
    :chart-data="datacollection"
    ></bar-chart>
    <button @click="fillData()">Randomize</button>
    <button @click="toggleHide1()">Toggle Hide 1</button>
    <button @click="toggleHide2()">Toggle Hide 2</button>
    <button @click="toggleHideAll()">Toggle Hide All</button>
  </div>
</template>

<script>
  import BarChart from './BarChart.js'

  export default {
    components: {
      BarChart
    },
    data () {
      return {
        datacollection: null,
        isHidden1: false,
        isHidden2: false,
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: 'rgba(255,0,0,0.5)',
              data: [this.getRandomInt(), this.getRandomInt()],
              hidden: this.isHidden1
            }, {
              label: 'Data One',
              backgroundColor: 'rgba(0,255,0,0.5)',
              data: [this.getRandomInt(), this.getRandomInt()],
              hidden: this.isHidden2
            }
          ]
        }
      },
      toggleHide1 () {
        this.isHidden1 = !this.isHidden1;
        this.fillData();
      },
      toggleHide2 () {
        this.isHidden2 = !this.isHidden2;
        this.fillData();
      },
      toggleHideAll () {
        this.isHidden1 = !this.isHidden1;
        this.isHidden2 = !this.isHidden2;
        this.fillData();
      },
      getRandomInt () {
        return Math.floor(Math.random() * (20 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  50px auto;
  }
</style>
