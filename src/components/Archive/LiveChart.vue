<template>
  <div class="small">
    <bar-chart
    :chart-data="datacollection"
    ></bar-chart>

    <button @click="fillData()">Randomize Data</button>
    <button @click="hideDataSet()">Change Option</button>
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
        options: null,
      }
    },
    mounted () {
      this.fillData()
      this.setOptions()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()],

            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      setOptions(){
        this.options = {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            labels:{
              fontSize: 10,
              boxWidth: 10,
            },
          },
          scales: {
            yAxes: [{
              stacked: false,
              display: true,
              gridLines: {
                display : true,
                color : ['rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)'],
                lineWidth: 3,
                zeroLineWidth: 0,
                drawBorder: false,
              },
              ticks: {
                beginAtZero: false,
                max: 69,
                min: 0,
                stepSize: 10,
                fontSize: 12,
                padding: 10,
                callback: function(value, index, values) {
                  if (value === parseInt(value,10))
                    return value
                  else {
                    return ''
                  }
                },
              },
            }],
            xAxes: [{
              stacked: false,
              categoryPercentage: 0.6,
              barPercentage: 0.7,
              display: true,
              lineWidth: 2,
              gridLines: {
                display : false,
                color : 'rgba(0,0,0,0.1)',
                lineWidth: 5,
                zeroLineWidth: 0,
                drawBorder: false,
              },
              ticks: {
                fontSize: 12,
              }
            }]
          },
          title: {
            display: false,
            text: name
          },
          tooltips: {
            mode: 'false',
          },
          hover: {
            mode: 'true',
            intersect: true
          },
        }

      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
    hideDataSet(){
      console.log(this.options.legend.display)
      this.options.legend.display = false
      console.log(this.options.legend.display)
    //  this.renderChart(this.datacollection, this.options);

    },
  }
}
</script>

<style>
  .small {
    max-width: 200px;
    margin:  150px auto;
  }
</style>
