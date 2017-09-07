<template>
<div class="BodyChart">

  <vue-slider id="sld" v-model="bodySpeed" event-type="auto" :height="20" :dot-size="24" :min="-1" :max="1" :interval="0.25" :show="true" :speed="0.5" :disabled="false" :piecewise="false" :piecewise-label="true" :piecewise-style="null" :tooltip='"always"'
    tooltip-dir="top" :reverse="false" :data="null" :clickable="true" :real-time="true" :lazy="false" :formatter="null" :bg-style='{backgroundColor:"#D5D5D5"}' :slider-style="null" :process-style='{backgroundColor:"#FFDB4A"}' :piecewise-active-style="null"
    :tooltip-style="null" :label-style='{marginTop:"5px"}' :label-active-style="null">
  </vue-slider>

  <!--
 <vue-slider ref="slider" v-bind="groundSpeedOptions" v-model="groundSpeedOptions.value"
 ></vue-slider>

 Window width: {{ windowWidth }}
 <br> Window height: {{ windowHeight }}
-->

  <template class="" v-for="body in bodiesList">
      <a v-if="body.bodyType==0" class="button is-small is-primary" style="margin:5px">{{ body.name }}</a>
      <a v-if="body.bodyType==1" class="button is-small is-info" style="margin:5px">{{ body.name }}<span v-if="body.driftsIn">*</span></a>
      <a v-if="body.bodyType==2" class="button is-small is-danger" style="margin:5px">{{ body.name }}
      </a>
  </template>

</div>
</template>



<script>
class Body {
  constructor(bodyType, driftsIn, name, speedGround, speedWater, speedAir, speedAntiGravity, acceleration, weight, handlingGround, handlingWater, handlingAir, handlingAntiGravity, traction, miniTurbo) {
    this.bodyType = bodyType,
      this.driftsIn = driftsIn,
      this.name = name,
      this.speedGround = speedGround,
      this.speedWater = speedWater,
      this.speedAir = speedAir,
      this.speedAntiGravity = speedAntiGravity,
      this.acceleration = acceleration,
      this.weight = weight,
      this.handlingGround = handlingGround,
      this.handlingWater = handlingWater,
      this.handlingAir = handlingAir,
      this.handlingAntiGravity = handlingAntiGravity,
      this.traction = traction,
      this.miniTurbo = miniTurbo;
  }
};


import vueSlider from 'vue-slider-component';

export default {
  name: 'BodyChart',
  components: {
    'vue-slider': vueSlider,
  },
  data() {
    return {
      groundSpeedOptions: {
        value: 100,
        width: "100%",
        height: 18,
        dotSize: 36,
        min: 0,
        max: 500,
        disabled: false,
        show: true,
        tooltip: "always",
        formatter: "¥{value}",
        sliderStyle: {
          "backgroundColor": "gold"
        },
        bgStyle: {
          "backgroundColor": "#ddd",
          "boxShadow": "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
        },
        tooltipStyle: {
          "backgroundColor": "#666",
          "borderColor": "#666"
        },
        processStyle: {
          "backgroundImage": "-webkit-linear-gradient(left, gold, red)"
        },
      },
      windowWidth: 0,
      windowHeight: 0,
      wClass: [1, 16],
      bodySpeed: [-1, 1],
      bodyAcceleration: [-1, 1],
      bodyWeight: [-1, 1],
      bodyHandling: [-1, 1],
      bodyTraction: [-1, 1],
      bodies: [
        new Body(0, false, "Standard Kart", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        new Body(0, false, "Pipe Frame", -0.5, 0, -0.5, -0.5, 0.5, -0.25, 0.5, 0.5, -0.25, 0.25, 0.25, 0.5),
        new Body(0, false, "Mach 8", 0, 0, 0.25, 0.5, -0.25, 0.25, -0.25, 0, -0.25, 0.25, 0.25, 0),
        new Body(0, false, "Steel Driver", 0.25, 0.5, -0.75, -0.25, -0.75, 0.5, -0.5, 0.75, -0.5, -0.5, 0, -0.5),
        new Body(0, false, "Cat Cruiser", -0.25, -0.25, 0.25, 0, 0.25, 0, 0.25, 0, 0.25, 0, 0, 0.25),
        new Body(0, false, "Circuit Special", 0.5, -0.5, -0.25, 0.25, -0.75, 0.25, -0.5, -0.25, -0.75, -0.25, -0.5, -0.75),
        new Body(0, false, "Tri-Speeder", 0.25, 0.5, -0.75, -0.25, -0.75, 0.5, -0.5, 0.75, -0.5, -0.5, 0, -0.5),
        new Body(0, false, "Badwagon", 0.5, -0.25, -0.5, 0, -1, 0.5, -0.75, -0.25, -0.75, -0.5, 0.5, -1),
        new Body(0, false, "Prancer", 0.25, 0, 0, 0, -0.5, -0.25, 0, 0.25, 0, -0.25, -0.25, -0.25),
        new Body(0, false, "Biddybuggy", -0.75, -0.5, -0.5, -0.25, 0.75, -0.5, 0.5, 0.5, 0.25, 0.5, 0.25, 0.75),
        new Body(0, false, "Landship", -0.5, 0.5, -0.25, -0.75, 0.5, -0.5, 0.25, 0.75, 0, -0.25, 0.75, 0.5),
        new Body(0, false, "Sneeker", 0.25, -0.25, 0, 0, -0.5, 0, 0, 0, -0.25, 0, -0.75, -0.25),
        new Body(0, false, "Sports Coupe", 0, 0, 0.25, 0.5, -0.25, 0.25, -0.25, 0, -0.25, 0.25, 0.25, 0),
        new Body(0, false, "Gold Standard", 0.25, -0.25, 0, 0, -0.5, 0, 0, 0, -0.25, 0, -0.75, -0.25),
        new Body(0, false, "GLA", 0.5, -0.25, -0.5, 0, -1, 0.5, -0.75, -0.25, -0.75, -0.5, 0.5, -1),
        new Body(0, false, "W 25 Silver Arrow", -0.25, -0.25, 0, 0.25, 0.25, -0.25, 0.25, 0.25, 0, 0.25, 0.5, 0.25),
        new Body(0, false, "300 SL Roadster", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        new Body(0, false, "Blue Falcon", 0.25, -0.25, 0, 0.25, -0.25, -0.5, -0.25, 0.25, -0.5, 0.5, 0, -0.25),
        new Body(0, false, "Tanooki Kart", -0.25, 0.25, 0, 0, -0.5, 0.25, 0.25, 0.5, 0, 0, 1, -0.25),
        new Body(0, false, "B Dasher", 0.5, -0.5, -0.25, 0.25, -0.75, 0.25, -0.5, -0.25, -0.75, -0.25, -0.5, -0.75),
        new Body(0, false, "Streetle", -0.5, 0.5, -0.25, -0.75, 0.5, -0.5, 0.25, 0.75, 0, -0.25, 0.75, 0.5),
        new Body(0, false, "P-Wing", 0.5, -0.5, -0.25, 0.25, -0.75, 0.25, -0.5, -0.25, -0.75, -0.25, -0.5, -0.75),
        new Body(0, false, "Koopa Clown", -0.25, 0.25, 0, 0, -0.5, 0.25, 0.25, 0.5, 0, 0, 1, -0.25),

        new Body(1, false, "Standard Bike", -0.25, -0.25, 0, 0.25, 0.25, -0.25, 0.25, 0.25, 0, 0.25, 0.5, 0.25),
        new Body(1, false, "Comet", -0.25, -0.25, 0.25, 0, 0.25, 0, 0.25, 0, 0.25, 0, 0, 0.25),
        new Body(1, true, "Sports Bike", 0.25, 0, 0, 0, -0.5, -0.25, 0, 0.25, 0, -0.25, -0.25, -0.25),
        new Body(1, false, "The Duke", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        new Body(1, false, "Flame Rider", -0.25, -0.25, 0, 0.25, 0.25, -0.25, 0.25, 0.25, 0, 0.25, 0.5, 0.25),
        new Body(1, false, "Varmint", -0.5, 0, -0.5, -0.5, 0.5, -0.25, 0.5, 0.5, -0.25, 0.25, 0.25, 0.5),
        new Body(1, false, "Mr. Scooty", -0.75, -0.5, -0.5, -0.25, 0.75, -0.5, 0.5, 0.5, 0.25, 0.5, 0.25, 0.75),
        new Body(1, true, "Jet Bike", 0.25, 0, 0, 0, -0.5, -0.25, 0, 0.25, 0, -0.25, -0.25, -0.25),
        new Body(1, true, "Yoshi Bike", -0.25, -0.25, 0.25, 0, 0.25, 0, 0.25, 0, 0.25, 0, 0, 0.25),
        new Body(1, true, "Master Cycle", 0.25, -0.25, 0, 0, -0.5, 0, 0, 0, -0.25, 0, -0.75, -0.25),
        new Body(1, false, "City Triper", -0.5, 0, -0.5, -0.5, 0.5, -0.25, 0.5, 0.5, -0.25, 0.25, 0.25, 0.5),

        new Body(2, false, "Standard ATV", 0.5, -0.25, -0.5, 0, -1, 0.5, -0.75, -0.25, -0.75, -0.5, 0.5, -1),
        new Body(2, false, "Wild Wiggler", -0.25, -0.25, 0, 0.25, 0.25, -0.25, 0.25, 0.25, 0, 0.25, 0.5, 0.25),
        new Body(2, false, "Teddy Buggy", -0.25, -0.25, 0.25, 0, 0.25, 0, 0.25, 0, 0.25, 0, 0, 0.25),
        new Body(2, false, "Bone Rattler", 0.25, 0.5, -0.75, -0.25, -0.75, 0.5, -0.5, 0.75, -0.5, -0.5, 0, -0.5),
        new Body(2, false, "Splat Buggy", 0.25, -0.25, 0, 0.25, -0.25, -0.5, -0.25, 0.25, -0.5, 0.5, 0, -0.25),
        new Body(2, false, "Inkstriker", 0, 0, 0.25, 0.5, -0.25, 0.25, -0.25, 0, -0.25, 0.25, 0.25, 0),
      ],
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);

      //Init
      this.getWindowWidth()
      this.getWindowHeight()
    })

  },
  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
      this.$refs.slider.refresh();
    },

    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
      this.$refs.slider.refresh();
    },

    doStuff() {
      // console.log(this.$refs.slider.getValue()[0])

    },
    resetBodies() {
      this.bodySpeed = [-1, 1];
      this.bodyAcceleration = [-1, 1];
      this.bodyWeight = [-1, 1];
      this.bodyHandling = [-1, 1];
      this.bodyTraction = [-1, 1];

    },
    beforeDestroy() {
      window.removeEventListener('resize', this.getWindowWidth);
      window.removeEventListener('resize', this.getWindowHeight);
    },
  },
  computed: {


    bodiesList() {
      return this.bodies.filter((body) => {
        return body.speedGround >= this.bodySpeed[0] && body.speedGround <= this.bodySpeed[1] &&
          body.acceleration >= this.bodyAcceleration[0] && body.acceleration <= this.bodyAcceleration[1] &&
          body.weight >= this.bodyWeight[0] && body.weight <= this.bodyWeight[1] &&
          body.handlingGround >= this.bodyHandling[0] && body.handlingGround <= this.bodyHandling[1] &&
          body.traction >= this.bodyTraction[0] && body.traction <= this.bodyTraction[1];
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '../mq'

.tt
  display: inline-block
  font-size: 12px
  margin: 0
  padding: 0

.toolTipDriver
  color: #fff
  padding: 4px 8px 4px 8px
  border-radius: 2px

.lightToolTip
  background-color: $light

.mediumToolTip
  background-color: $medium

.heavyToolTip
  background-color: $heavy

.lightLabelDriver
  color: $light

.mediumLabelDriver
  color: $medium

.heavyLabelDriver
  color: $heavy

</style>
