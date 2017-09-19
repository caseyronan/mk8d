<template>
<div class="driver">

  <!-- Three chart types -->
  <bar-chart class="dr-chart" v-if="this.chartType==='bar'" :height="this.chartHeight" :chart-data="drawChart[0]" :options="drawChart[1]">
  </bar-chart>
  <line-chart class="dr-chart" v-if="this.chartType==='line'" :height="this.chartHeight" :chart-data="drawChart[0]" :options="drawChart[1]">
  </line-chart>
  <stacked-chart class="dr-chart" v-if="this.chartType==='stacked'" :height="this.chartHeight" :chart-data="drawChart[0]" :options="drawChart[1]">
  </stacked-chart>

  <!-- Basic driver stats -->
  <div class="driver-stats">
    <a class="button stat-btn is-small" v-bind:style="{ borderColor: this.SPEED_COLOR }" v-bind:class="{ hidden:this.hideSpeedGround }" @click="toggleData(1)">Speed</a>
    <a class="button stat-btn is-small" v-bind:style="{ borderColor: this.ACCELERATION_COLOR }" v-bind:class="{ hidden:this.hideAcceleration }" @click="toggleData(2)">Acceleration</a>
    <a class="button stat-btn is-small" v-bind:style="{ borderColor: this.WEIGHT_COLOR }" v-bind:class="{ hidden:this.hideWeight }" @click="toggleData(3)">Weight</a>
    <a class="button stat-btn is-small" v-bind:style="{ borderColor: this.HANDLING_COLOR }" v-bind:class="{ hidden:this.hideHandlingGround }" @click="toggleData(4)">Handling</a>
    <a class="button stat-btn is-small" v-bind:style="{ borderColor: this.TRACTION_COLOR }" v-bind:class="{ hidden:this.hideTraction }" @click="toggleData(5)">Traction</a>
    <a class="stat-btn is-small" style="border:0; color:#b3b3b3; background-color: #f9f9f9; padding:0 2px 0 2px; box-shadow:none;" @click="toggleDetailedStats()">
      <span v-if="this.showDetailedStats" class="icon"><i class="fa fa-search-minus" aria-hidden="true"></i></span>
      <span v-else class="icon"><i class="fa fa-search-plus" aria-hidden="true"></i></span>
    </a>
  </div>

  <!-- Detailed driver stats with a snazzy transition effect -->
  <transition name="slide-fade">
    <div class="driver-stats-detailed" v-if="this.showDetailedStats">
      <div class="stat-box">
        <a class="button stat-btn is-small" v-bind:style="{ borderColor: this.WATER_SPEED_COLOR }" v-bind:class="{ hidden:this.hideSpeedWater }" @click="toggleData(6)">Water Speed</a>
        <a class="button stat-btn is-small" v-bind:style="{ borderColor: this.AIR_SPEED_COLOR }" v-bind:class="{ hidden:this.hideSpeedAir }" @click="toggleData(7)">Air Speed</a>
        <a class="button stat-btn is-small" v-bind:style="{ borderColor: this.ANTI_GRAVITY_SPEED_COLOR }" v-bind:class="{ hidden:this.hideSpeedAntiGravity }" @click="toggleData(8)">Anti-Gravity Speed</a>
        <a class="button stat-btn is-small" v-bind:style="{ borderColor: this.WATER_HANDLING_COLOR }" v-bind:class="{ hidden:this.hideHandlingWater }" @click="toggleData(9)">Water Handling</a>
        <a class="button stat-btn is-small" v-bind:style="{ borderColor: this.AIR_HANDLING_COLOR }" v-bind:class="{ hidden:this.hideHandlingAir }" @click="toggleData(10)">Air Handling</a>
        <a class="button stat-btn is-small" v-bind:style="{ borderColor: this.ANTI_GRAVITY_HANDLING_COLOR }" v-bind:class="{ hidden:this.hideHandlingAntiGravity }" @click="toggleData(11)">Anti-Gravity Handling</a>
        <a class="button stat-btn is-small" v-bind:style="{ borderColor: this.MINI_TURBO_COLOR }" v-bind:class="{ hidden:this.hideMiniTurbo }" @click="toggleData(12)">Mini-Turbo</a>
      </div>
    </div>
  </transition>

  <!-- Slider for easy filtering -->
  <driver-slider ref="slider" id="driver-slider" v-model="drSizeFilter" v-bind="options">
    <template slot="label" scope="label"> <!-- Custom color coded labels -->
        <div class="driver-slider-label has-text-centered">
          <span v-if="!isFilteredOut(label.label)">
            <span v-if="label.label < 7" class="lightLabelDriver">{{ label.label }}</span>
            <span v-if="label.label >= 7 && label.label < 13" class="mediumLabelDriver">{{ label.label }}</span>
            <span v-if="label.label >= 13" class="heavyLabelDriver">{{ label.label }}</span>
          </span>
          <span v-else style="color:#e0e0e0">{{ label.label }}</span>
        </div>
      </template>
    <template slot="tooltip" scope="tooltip"> <!-- Custom color coded tooltips -->
      <div class="has-text-centered">
        <span v-if="tooltip.value < 7" class="is-light-bg toolTipDriver">{{tooltip.value}}</span>
        <span v-if="tooltip.value >= 7 && tooltip.value < 13" class="is-medium-bg toolTipDriver">{{tooltip.value}}</span>
        <span v-if="tooltip.value >= 13" class="is-heavy-bg toolTipDriver">{{tooltip.value}}</span>
     </div>
    </template>
    <br>
  </driver-slider>

  <!-- Hard coded to get flex working, sorry all you DRY peeps -->
  <div class="driver-thumbs">
    <div class="driver-thumbs-row">  <!-- 1st (top) row -->
      <a class="thumbVisible" @click="selectDriver(1)" v-bind:class="{ thumbHidden: filterDriver(1) }">
        <img :src="this.drivers[0].image" v-bind:title="this.drivers[0].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(2)" v-bind:class="{ thumbHidden: filterDriver(2) }">
        <img :src="this.drivers[2].image" v-bind:title="this.drivers[2].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(3) " v-bind:class="{ thumbHidden: filterDriver(3) }">
        <img :src="this.drivers[4].image" v-bind:title="this.drivers[4].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(4)" v-bind:class="{ thumbHidden: filterDriver(4) }">
        <img :src="this.drivers[8].image" v-bind:title="this.drivers[8].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(5)" v-bind:class="{ thumbHidden: filterDriver(5) }">
        <img :src="this.drivers[11].image" v-bind:title="this.drivers[11].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(6)" v-bind:class="{ thumbHidden: filterDriver(6) }">
        <img :src="this.drivers[14].image" v-bind:title="this.drivers[14].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(7)" v-bind:class="{ thumbHidden: filterDriver(7) }">
        <img :src="this.drivers[17].image" v-bind:title="this.drivers[17].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(8)" v-bind:class="{ thumbHidden: filterDriver(8) }">
        <img :src="this.drivers[20].image" v-bind:title="this.drivers[20].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(9)" v-bind:class="{ thumbHidden: filterDriver(9) }">
        <img :src="this.drivers[23].image" v-bind:title="this.drivers[23].name">
        </a>
      <a class="thumbVisible" @click="selectDriver(10)" v-bind:class="{ thumbHidden: filterDriver(10) }">
        <img :src="this.drivers[26].image" v-bind:title="this.drivers[26].name">
        </a>
      <a class="thumbVisible" @click="selectDriver(11)" v-bind:class="{ thumbHidden: filterDriver(11) }">
        <img :src="this.drivers[28].image" v-bind:title="this.drivers[28].name">
        </a>
      <a class="thumbVisible" @click="selectDriver(12)" v-bind:class="{ thumbHidden: filterDriver(12) }">
        <img :src="this.drivers[31].image" v-bind:title="this.drivers[31].name">
        </a>
      <a class="thumbVisible" @click="selectDriver(13)" v-bind:class="{ thumbHidden: filterDriver(13) }">
        <img :src="this.drivers[33].image" v-bind:title="this.drivers[33].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(14)" v-bind:class="{ thumbHidden: filterDriver(14) }">
        <img :src="this.drivers[36].image" v-bind:title="this.drivers[36].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(15)" v-bind:class="{ thumbHidden: filterDriver(15) }">
        <img :src="this.drivers[39].image" v-bind:title="this.drivers[39].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(16)" v-bind:class="{ thumbHidden: filterDriver(16) }">
        <img :src="this.drivers[41].image" v-bind:title="this.drivers[41].name">
      </a>
    </div>
    <div class="driver-thumbs-row"> <!-- 2nd row -->
      <a class="thumbVisible" @click="selectDriver(1)" v-bind:class="{ thumbHidden: filterDriver(1) }">
        <img :src="this.drivers[1].image" v-bind:title="this.drivers[1].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(2)" v-bind:class="{ thumbHidden: filterDriver(2) }">
        <img :src="this.drivers[3].image" v-bind:title="this.drivers[3].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(3)" v-bind:class="{ thumbHidden: filterDriver(3) }">
        <img :src="this.drivers[5].image" v-bind:title="this.drivers[5].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(4)" v-bind:class="{ thumbHidden: filterDriver(4) }">
        <img :src="this.drivers[9].image" v-bind:title="this.drivers[9].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(5)" v-bind:class="{ thumbHidden: filterDriver(5) }">
        <img :src="this.drivers[12].image" v-bind:title="this.drivers[12].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(6)" v-bind:class="{ thumbHidden: filterDriver(6) }">
        <img :src="this.drivers[15].image" v-bind:title="this.drivers[15].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(7)" v-bind:class="{ thumbHidden: filterDriver(7) }">
        <img :src="this.drivers[18].image" v-bind:title="this.drivers[18].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(8)" v-bind:class="{ thumbHidden: filterDriver(8) }">
        <img :src="this.drivers[21].image" v-bind:title="this.drivers[21].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(9)" v-bind:class="{ thumbHidden: filterDriver(9) }">
        <img :src="this.drivers[24].image" v-bind:title="this.drivers[24].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(10)" v-bind:class="{ thumbHidden: filterDriver(10) }">
        <img :src="this.drivers[27].image" v-bind:title="this.drivers[27].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(11)" v-bind:class="{ thumbHidden: filterDriver(11) }">
        <img :src="this.drivers[29].image" v-bind:title="this.drivers[29].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(12)" v-bind:class="{ thumbHidden: filterDriver(12) }">
        <img :src="this.drivers[32].image" v-bind:title="this.drivers[32].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(13)" v-bind:class="{ thumbHidden: filterDriver(13) }">
        <img :src="this.drivers[34].image" v-bind:title="this.drivers[34].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(14)" v-bind:class="{ thumbHidden: filterDriver(14) }">
        <img :src="this.drivers[37].image" v-bind:title="this.drivers[37].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(15)" v-bind:class="{ thumbHidden: filterDriver(15) }">
        <img :src="this.drivers[40].image" v-bind:title="this.drivers[40].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(16)" v-bind:class="{ thumbHidden: filterDriver(16) }">
        <img :src="this.drivers[42].image" v-bind:title="this.drivers[42].name">
      </a>
    </div>
    <div class="driver-thumbs-row"> <!-- 3rd row -->
      <a class="placeholder">
        <img src="../assets/blank32x32.png"> <!-- Display:none trickery due to jagged wightclass lengths (keeps drivers in correct position) -->
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="thumbVisible" @click="selectDriver(3)" v-bind:class="{ thumbHidden: filterDriver(3) }">
        <img :src="this.drivers[6].image" v-bind:title="this.drivers[6].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(4)" v-bind:class="{ thumbHidden: filterDriver(4) }">
        <img :src="this.drivers[10].image" v-bind:title="this.drivers[10].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(5)" v-bind:class="{ thumbHidden: filterDriver(5) }">
        <img :src="this.drivers[13].image" v-bind:title="this.drivers[13].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(6)" v-bind:class="{ thumbHidden: filterDriver(6) }">
        <img :src="this.drivers[16].image" v-bind:title="this.drivers[16].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(7)" v-bind:class="{ thumbHidden: filterDriver(7) }">
        <img :src="this.drivers[19].image" v-bind:title="this.drivers[19].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(8)" v-bind:class="{ thumbHidden: filterDriver(8) }">
        <img :src="this.drivers[22].image" v-bind:title="this.drivers[22].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(9)" v-bind:class="{ thumbHidden: filterDriver(9) }">
        <img :src="this.drivers[25].image" v-bind:title="this.drivers[25].name">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="thumbVisible" @click="selectDriver(11)" v-bind:class="{ thumbHidden: filterDriver(11) }">
        <img :src="this.drivers[30].image" v-bind:title="this.drivers[30].name">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="thumbVisible" @click="selectDriver(13)" v-bind:class="{ thumbHidden: filterDriver(13) }">
        <img :src="this.drivers[35].image" v-bind:title="this.drivers[35].name">
      </a>
      <a class="thumbVisible" @click="selectDriver(14)" v-bind:class="{ thumbHidden: filterDriver(14) }">
        <img :src="this.drivers[38].image" v-bind:title="this.drivers[38].name">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="thumbVisible" @click="selectDriver(16)" v-bind:class="{ thumbHidden: filterDriver(16) }">
        <img :src="this.drivers[43].image" v-bind:title="this.drivers[43].name">
      </a>
    </div>
    <div class="driver-thumbs-row"> <!-- 4th and final (bottom) row -->
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="thumbVisible" @click="selectDriver(3)" v-bind:class="{ thumbHidden: filterDriver(3) }">
        <img :src="this.drivers[7].image" v-bind:title="this.drivers[7].name">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
    </div>
  </div>

  <!-- Driver chart buttons -->
  <div>
    <a class="button dr-size-btn is-small is-info" @click="lightDrivers">Light</a>
    <a class="button dr-size-btn is-small is-primary" @click="mediumDrivers">Medium</a>
    <a class="button dr-size-btn is-small is-danger" @click="heavyDrivers">Heavy</a>
    <span>|</span>
    <a class="button dr-size-btn is-small" style="backgroundColor:#e0e0e0" @click="changeChartType()">View</a>
    <a class="button dr-size-btn is-small" style="backgroundColor:#e0e0e0" @click="toggleFilterType()">Mode</a>
    <a class="button dr-size-btn is-small is-warning" v-if="this.filteredOut.length > 0 && !this.pointFilter" @click="resetFilteredOut()">Reset</a>
  </div>

</div>
</template>

<script>
import BarChart from './BarChart.js' // Stack chart extends Bar
import LineChart from './LineChart.js'
import vueSlider from 'vue-slider-component'
import * as firebase from "firebase"

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBEYQ1HTm719W8jkIuT6Tbo9Bb5KuQodMQ",
  authDomain: "mk8d-test.firebaseapp.com",
  databaseURL: "https://mk8d-test.firebaseio.com",
  projectId: "mk8d-test",
  storageBucket: "",
  messagingSenderId: "319080956445"
};

firebase.initializeApp(config);

class Driver {
  constructor(size, weightClass, name, image, speedGround, speedWater, speedAir, speedAntiGravity, acceleration, weight, handlingGround, handlingWater, handlingAir, handlingAntiGravity, traction, miniTurbo) {
    this.size = size,
      this.weightClass = weightClass,
      this.name = name,
      this.image = image,
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

export default {
  name: 'DriverChart',

  components: {
    'BarChart': BarChart,
    'LineChart': LineChart,
    'StackedChart': BarChart,
    'driver-slider': vueSlider,
  },

  data() {
    return {
      SPEED_COLOR: 'rgb(255, 215, 0)',
      ACCELERATION_COLOR: 'rgb(0, 191, 255)',
      WEIGHT_COLOR: 'rgb(255, 20, 147)',
      HANDLING_COLOR: 'rgb(106, 90, 205)',
      TRACTION_COLOR: 'rgb(50, 205, 50)',
      WATER_SPEED_COLOR: 'rgb(129, 210, 199)',
      AIR_SPEED_COLOR: 'rgb(244, 96, 54)',
      ANTI_GRAVITY_SPEED_COLOR: 'rgb(189, 147, 145)',
      WATER_HANDLING_COLOR: 'rgb(92, 111, 104)',
      AIR_HANDLING_COLOR: 'rgb(187, 219, 155)',
      ANTI_GRAVITY_HANDLING_COLOR: 'rgb(223, 204, 116)',
      MINI_TURBO_COLOR: 'rgb(255, 26, 47)',
      chartHeight: 250,
      pointFilter: false, // Mode selector
      options: [{ // Slider component
        height: 14,
        dotSize: 26,
        min: 1,
        max: 16,
        speed: 0.5,
        realTime: true,
        tooltip: "always",
        piecewiseLabel: true,
        processStyle: {
          'backgroundColor': '#FFDB4A'
        },
        sliderStyle: {
          'backgroundColor': '#fff'
        },
        bgStyle: {
          'backgroundColor': '#e0e0e0'
        },
      }],
      pointFilterSliderColor: '#e0e0e0',
      rangeFilterSliderColor: '#FFDB4A',
      showDetailedStats: false,
      filteredOut: [],
      showDriverDropdown: false,
      chartType: 'bar', // defaults to unstacked bar chart
      isStacked: false,
      ticksMax: 5,
      stepSize: 1,
      drSizeFilter: [1, 6],
      hideSpeedGround: false,
      hideSpeedWater: true,
      hideSpeedAir: true,
      hideSpeedAntiGravity: true,
      hideAcceleration: false,
      hideWeight: false,
      hideHandlingGround: true,
      hideHandlingWater: true,
      hideHandlingAir: true,
      hideHandlingAntiGravity: true,
      hideTraction: true,
      hideMiniTurbo: true,
      drivers: [ // Stats taken from https://www.mariowiki.com/
        new Driver("Light", 1, "Baby Peach", "https://www.mariowiki.com/images/thumb/3/3d/MK8_BabyPeach_Icon.png/32px-MK8_BabyPeach_Icon.png", 2.25, 2.5, 2.75, 2, 4, 2, 5, 4.5, 5, 5, 4.25, 4),
        new Driver("Light", 1, "Baby Daisy", "https://www.mariowiki.com/images/thumb/4/43/MK8_BabyDaisy_Icon.png/32px-MK8_BabyDaisy_Icon.png", 2.25, 2.5, 2.75, 2, 4, 2, 5, 4.5, 5, 5, 4.25, 4),
        new Driver("Light", 2, "Baby Rosalina", "https://www.mariowiki.com/images/thumb/0/09/MK8_BabyRosalina_Icon.png/32px-MK8_BabyRosalina_Icon.png", 2.25, 2.5, 2.75, 2, 4.25, 2, 4.75, 4.25, 4.75, 4.75, 3.75, 4),
        new Driver("Light", 2, "Lemmy", "https://www.mariowiki.com/images/thumb/f/fc/MK8_Lemmy_Icon.png/32px-MK8_Lemmy_Icon.png", 2.25, 2.5, 2.75, 2, 4.25, 2, 4.75, 4.25, 4.75, 4.75, 3.75, 4),
        new Driver("Light", 3, "Baby Mario", "https://www.mariowiki.com/images/thumb/5/51/MK8DX_Baby_Mario_Icon.png/32px-MK8DX_Baby_Mario_Icon.png", 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
        new Driver("Light", 3, "Baby Luigi", "https://www.mariowiki.com/images/thumb/7/75/MK8DX_Baby_Luigi_Icon.png/31px-MK8DX_Baby_Luigi_Icon.png", 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
        new Driver("Light", 3, "Dry Bones", "https://www.mariowiki.com/images/thumb/3/3f/MK8DX_Dry_Bones_Icon.png/32px-MK8DX_Dry_Bones_Icon.png", 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
        new Driver("Light", 3, "Mii (light)", "https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png", 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
        new Driver("Light", 4, "Koopa Troopa", "https://www.mariowiki.com/images/thumb/2/24/MK8DX_Koopa_Troopa_Icon.png/32px-MK8DX_Koopa_Troopa_Icon.png", 2.75, 3, 3.25, 2.5, 4, 2.5, 4.5, 4, 4.5, 4.5, 4.25, 3.75),
        new Driver("Light", 4, "Lakitu", "https://www.mariowiki.com/images/thumb/6/6f/MK8DX_Lakitu_Icon.png/26px-MK8DX_Lakitu_Icon.png", 2.75, 3, 3.25, 2.5, 4, 2.5, 4.5, 4, 4.5, 4.5, 4.25, 3.75),
        new Driver("Light", 4, "Bowser Jr.", "https://www.mariowiki.com/images/thumb/2/26/MK8_Bowser_Jr_Icon.png/32px-MK8_Bowser_Jr_Icon.png", 2.75, 3, 3.25, 2.5, 4, 2.5, 4.5, 4, 4.5, 4.5, 4.25, 3.75),
        new Driver("Light", 5, "Toadette", "https://www.mariowiki.com/images/thumb/8/8c/MK8DX_Toadette_Icon.png/32px-MK8DX_Toadette_Icon.png", 2.75, 3, 3.25, 2.5, 4.25, 2.5, 4.25, 3.75, 4.25, 4.25, 3.5, 3.75),
        new Driver("Light", 5, "Wendy", "https://www.mariowiki.com/images/thumb/2/2c/MK8DX_Wendy_Icon.png/32px-MK8DX_Wendy_Icon.png", 2.75, 3, 3.25, 2.5, 4.25, 2.5, 4.25, 3.75, 4.25, 4.25, 3.5, 3.75),
        new Driver("Light", 5, "Isabelle", "https://www.mariowiki.com/images/thumb/5/59/MK8DX_Isabelle_Icon.png/30px-MK8DX_Isabelle_Icon.png", 2.75, 3, 3.25, 2.5, 4.25, 2.5, 4.25, 3.75, 4.25, 4.25, 3.5, 3.75),
        new Driver("Light", 6, "Toad", "https://www.mariowiki.com/images/thumb/8/89/MK8DX_Toad_Icon.png/31px-MK8DX_Toad_Icon.png", 3, 3.25, 3.5, 2.75, 4, 2.75, 4.25, 3.75, 4.25, 4.25, 4, 3.5),
        new Driver("Light", 6, "Shy Guy", "https://www.mariowiki.com/images/thumb/4/43/MK8DX_Shy_Guy_Icon.png/32px-MK8DX_Shy_Guy_Icon.png", 3, 3.25, 3.5, 2.75, 4, 2.75, 4.25, 3.75, 4.25, 4.25, 4, 3.5),
        new Driver("Light", 6, "Larry", "https://www.mariowiki.com/images/thumb/c/c2/MK8_Larry_Icon.png/32px-MK8_Larry_Icon.png", 3, 3.25, 3.5, 2.75, 4, 2.75, 4.25, 3.75, 4.25, 4.25, 4, 3.5),
        new Driver("Medium", 7, "Cat Peach", "https://www.mariowiki.com/images/thumb/f/fc/MK8DX_Cat_Peach_Icon.png/28px-MK8DX_Cat_Peach_Icon.png", 3.25, 3.5, 3.75, 3, 4, 2.75, 4, 3.5, 4, 4, 3.75, 3.5),
        new Driver("Medium", 7, "Inkling Girl", "https://www.mariowiki.com/images/thumb/b/b9/MK8DX_Female_Inkling_Icon.png/32px-MK8DX_Female_Inkling_Icon.png", 3.25, 3.5, 3.75, 3, 4, 2.75, 4, 3.5, 4, 4, 3.75, 3.5),
        new Driver("Medium", 7, "Villager (female)", "https://www.mariowiki.com/images/thumb/0/00/MK8DX_Female_Villager_Icon.png/32px-MK8DX_Female_Villager_Icon.png", 3.25, 3.5, 3.75, 3, 4, 2.75, 4, 3.5, 4, 4, 3.75, 3.5),
        new Driver("Medium", 8, "Peach", "https://www.mariowiki.com/images/thumb/1/1f/MK8DX_Peach_Icon.png/32px-MK8DX_Peach_Icon.png", 3.5, 3.75, 4, 3.25, 3.75, 3, 3.75, 3.25, 3.75, 3.75, 3.75, 3.5),
        new Driver("Medium", 8, "Daisy", "https://www.mariowiki.com/images/thumb/6/6e/MK8DX_Daisy_Icon.png/29px-MK8DX_Daisy_Icon.png", 3.5, 3.75, 4, 3.25, 3.75, 3, 3.75, 3.25, 3.75, 3.75, 3.75, 3.5),
        new Driver("Medium", 8, "Yoshi", "https://www.mariowiki.com/images/thumb/3/38/MK8DX_Yoshi_Icon.png/32px-MK8DX_Yoshi_Icon.png", 3.5, 3.75, 4, 3.25, 3.75, 3, 3.75, 3.25, 3.75, 3.75, 3.75, 3.5),
        new Driver("Medium", 9, "Tanooki Mario", "https://www.mariowiki.com/images/thumb/f/f7/MK8DX_Tanooki_Mario_Icon.png/31px-MK8DX_Tanooki_Mario_Icon.png", 3.5, 3.75, 4, 3.25, 3.75, 3.25, 3.75, 3.25, 3.75, 3.75, 3.25, 3.5),
        new Driver("Medium", 9, "Inkling Boy", "https://www.mariowiki.com/images/thumb/3/3c/MK8DX_Male_Inkling_Icon.png/32px-MK8DX_Male_Inkling_Icon.png", 3.5, 3.75, 4, 3.25, 3.75, 3.25, 3.75, 3.25, 3.75, 3.75, 3.25, 3.5),
        new Driver("Medium", 9, "Villager (male)", "https://www.mariowiki.com/images/thumb/d/d9/MK8DX_Male_Villager_Icon.png/32px-MK8DX_Male_Villager_Icon.png", 3.5, 3.75, 4, 3.25, 3.75, 3.25, 3.75, 3.25, 3.75, 3.75, 3.25, 3.5),
        new Driver("Medium", 10, "Luigi", "https://www.mariowiki.com/images/thumb/6/69/MK8DX_Luigi_Icon.png/28px-MK8DX_Luigi_Icon.png", 3.75, 4, 4.25, 3.5, 3.5, 3.5, 3.75, 3.25, 3.75, 3.75, 3.25, 3.25),
        new Driver("Medium", 10, "Iggy", "https://www.mariowiki.com/images/thumb/d/d7/MK8DX_Iggy_Icon.png/30px-MK8DX_Iggy_Icon.png", 3.75, 4, 4.25, 3.5, 3.5, 3.5, 3.75, 3.25, 3.75, 3.75, 3.25, 3.25),

        new Driver("Medium", 11, "Mario", "https://www.mariowiki.com/images/thumb/4/4f/MK8DX_Mario_Icon.png/32px-MK8DX_Mario_Icon.png", 3.75, 4, 4.25, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 3.5, 3.25),
        new Driver("Medium", 11, "Ludwig", "https://www.mariowiki.com/images/thumb/7/7c/MK8DX_Ludwig_Icon.png/32px-MK8DX_Ludwig_Icon.png", 3.75, 4, 4.25, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 3.5, 3.25),
        new Driver("Medium", 11, "Mii (medium)", "https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png", 3.75, 4, 4.25, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 3.5, 3.25),

        new Driver("Medium", 12, "Metal Mario", "https://www.mariowiki.com/images/thumb/e/eb/MK8DX_Metal_Mario_Icon.png/31px-MK8DX_Metal_Mario_Icon.png", 4.25, 4.5, 4.75, 4, 3.25, 4.5, 3.25, 2.75, 3.25, 3.25, 3.25, 3),
        new Driver("Medium", 12, "Pink Gold Peach", "https://www.mariowiki.com/images/thumb/2/2b/MK8DX_Pink_Gold_Peach_Icon.png/31px-MK8DX_Pink_Gold_Peach_Icon.png", 4.25, 4.5, 4.75, 4, 3.25, 4.5, 3.25, 2.75, 3.25, 3.25, 3.25, 3),
        new Driver("Heavy", 13, "Rosalina", "https://www.mariowiki.com/images/thumb/4/4b/MK8DX_Rosalina_Icon.png/28px-MK8DX_Rosalina_Icon.png", 4, 4.25, 4.5, 3.75, 3.25, 3.75, 3.25, 2.75, 3.25, 3.25, 3.75, 3.25),
        new Driver("Heavy", 13, "King Boo", "https://www.mariowiki.com/images/thumb/1/1d/MK8DX_King_Boo_Icon.png/32px-MK8DX_King_Boo_Icon.png", 4, 4.25, 4.5, 3.75, 3.25, 3.75, 3.25, 2.75, 3.25, 3.25, 3.75, 3.25),
        new Driver("Heavy", 13, "Link", "https://www.mariowiki.com/images/thumb/c/ce/MK8DX_Link_Icon.png/32px-MK8DX_Link_Icon.png", 4, 4.25, 4.5, 3.75, 3.25, 3.75, 3.25, 2.75, 3.25, 3.25, 3.75, 3.25),
        new Driver("Heavy", 14, "Waluigi", "https://www.mariowiki.com/images/thumb/5/51/MK8DX_Waluigi_Icon.png/27px-MK8DX_Waluigi_Icon.png", 4.5, 4.75, 5, 4.25, 3.25, 4, 3, 2.5, 3, 3, 3, 3),
        new Driver("Heavy", 14, "Donkey Kong", "https://www.mariowiki.com/images/thumb/9/9b/MK8DX_DK_Icon.png/25px-MK8DX_DK_Icon.png", 4.5, 4.75, 5, 4.25, 3.25, 4, 3, 2.5, 3, 3, 3, 3),
        new Driver("Heavy", 14, "Roy", "https://www.mariowiki.com/images/thumb/3/36/MK8DX_Roy_Icon.png/32px-MK8DX_Roy_Icon.png", 4.5, 4.75, 5, 4.25, 3.25, 4, 3, 2.5, 3, 3, 3, 3),
        new Driver("Heavy", 15, "Wario", "https://www.mariowiki.com/images/thumb/c/cd/MK8DX_Wario_Icon.png/32px-MK8DX_Wario_Icon.png", 4.75, 5, 5.25, 4.5, 3, 4.25, 2.75, 2.25, 2.75, 2.75, 3.25, 2.75),
        new Driver("Heavy", 15, "Dry Bowser", "https://www.mariowiki.com/images/thumb/3/38/MK8DX_Dry_Bowser_Icon.png/32px-MK8DX_Dry_Bowser_Icon.png", 4.75, 5, 5.25, 4.5, 3, 4.25, 2.75, 2.25, 2.75, 2.75, 3.25, 2.75),
        new Driver("Heavy", 16, "Bowser", "https://www.mariowiki.com/images/thumb/d/d9/MK8DX_Bowser_Icon.png/32px-MK8DX_Bowser_Icon.png", 4.75, 5, 5.25, 4.5, 3, 4.5, 2.5, 2, 2.5, 2.5, 3, 2.75),
        new Driver("Heavy", 16, "Morton", "https://www.mariowiki.com/images/thumb/4/47/MK8DX_Morton_Icon.png/30px-MK8DX_Morton_Icon.png", 4.75, 5, 5.25, 4.5, 3, 4.5, 2.5, 2, 2.5, 2.5, 3, 2.75),
        new Driver("Heavy", 16, "Mii (heavy)", "https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png", 4.75, 5, 5.25, 4.5, 3, 4.5, 2.5, 2, 2.5, 2.5, 3, 2.75),
      ],
    }
  },

  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWidthChange);
      window.addEventListener('orientationchange', this.getOrientationChange);

      // Needed for mobile users to resize slider component
      this.getWidthChange()
      this.getOrientationChange()
    })

  },

  methods: {

    toggleDetailedStats() {
      this.showDetailedStats = !this.showDetailedStats
      if (!this.showDetailedStats) {
        this.hideSpeedWater = true
        this.hideSpeedAir = true
        this.hideSpeedAntiGravity = true
        this.hideHandlingWater = true
        this.hideHandlingAir = true
        this.hideHandlingAntiGravity = true
        this.hideMiniTurbo = true
      }
    },

    isFilteredOut(num) {
      if (!this.pointFilter) {
        if (this.filteredOut.includes(num)) {
          return true
        }
      } else {
        return false
      }
    },

    getOrientationChange(event) {
      this.$refs.slider.refresh()
    },

    getWidthChange(event) {
      this.$refs.slider.refresh()
    },

    changeChartType() {
      if (this.chartType === 'bar') {
        this.chartType = 'line';
      } else if (this.chartType === 'line') {
        this.chartType = 'stacked';
        this.isStacked = true
        this.ticksMax = 50;
        this.stepSize = 5;
      } else if (this.chartType === 'stacked') {
        this.chartType = 'bar';
        this.isStacked = false;
        this.ticksMax = 5;
        this.stepSize = 1;
      }
    },

    selectDriver(num) {
      if (!this.pointFilter) {
        if (!this.filteredOut.includes(num)) {
          this.filteredOut.push(num)
          this.filteredOut.sort(function(a, b) {
            return (a - b)
          })
        } else {
          var i = this.filteredOut.indexOf(num)
          this.filteredOut.splice(i, 1)
        }
      } else {
        var dist_0 = Math.abs(this.drSizeFilter[0] - num);
        var dist_1 = Math.abs(this.drSizeFilter[1] - num);
        var ran = Math.round(Math.random()); // Random 0 or 1
        if (dist_0 < dist_1) { // Move to pos 1
          this.drSizeFilter = [num, this.drSizeFilter[1]]
        } else if (dist_0 > dist_1) { // Move to pos 0
          this.drSizeFilter = [this.drSizeFilter[0], num]
        } else if (dist_0 === dist_1) { // Move to pos 0 or pos 1
          if (ran === 0) {
            this.drSizeFilter = [num, this.drSizeFilter[1]]
          } else {
            this.drSizeFilter = [this.drSizeFilter[0], num]
          }
        }
      }
    },

    resetFilteredOut() {
      this.filteredOut = [];
    },

    toggleFilterType() {
      this.pointFilter = !this.pointFilter;
      if (this.pointFilter) {
        this.options[0].processStyle.backgroundColor = this.pointFilterSliderColor;
        this.options[0].sliderStyle.backgroundColor = this.rangeFilterSliderColor;
      } else {
        this.options[0].processStyle.backgroundColor = this.rangeFilterSliderColor;
        this.options[0].sliderStyle.backgroundColor = '#fff';
      }
      this.$refs.slider.refresh()
    },

    lightDrivers() {
      this.drSizeFilter = [1, 6]
    },

    mediumDrivers() {
      this.drSizeFilter = [7, 12]
    },

    heavyDrivers() {
      this.drSizeFilter = [13, 16]
    },

    toggleData(num) {
      switch (num) {
        case 1:
          this.hideSpeedGround = !this.hideSpeedGround;
          break;
        case 2:
          this.hideAcceleration = !this.hideAcceleration;
          break;
        case 3:
          this.hideWeight = !this.hideWeight;
          break;
        case 4:
          this.hideHandlingGround = !this.hideHandlingGround;
          break;
        case 5:
          this.hideTraction = !this.hideTraction;
          break;
        case 6:
          this.hideSpeedWater = !this.hideSpeedWater;
          break;
        case 7:
          this.hideSpeedAir = !this.hideSpeedAir;
          break;
        case 8:
          this.hideSpeedAntiGravity = !this.hideSpeedAntiGravity;
          break;
        case 9:
          this.hideHandlingWater = !this.hideHandlingWater;
          break;
        case 10:
          this.hideHandlingAir = !this.hideHandlingAir;
          break;
        case 11:
          this.hideHandlingAntiGravity = !this.hideHandlingAntiGravity;
          break;
        case 12:
          this.hideMiniTurbo = !this.hideMiniTurbo;
          break;
      }
    },

    filterDriver(num) {
      if (this.pointFilter) {
        if (this.drSizeFilter.includes(num))
          return false;
        else {
          return true;
        }
      } else {
        if (num < this.drSizeFilter[0] || num > this.drSizeFilter[1] || this.filteredOut.includes(num)) {
          return true;
        } else {
          return false;
        }
      }
    },
  },

  computed: {

    drawChart() {
      var opt = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            stacked: this.isStacked,
            display: true,
            gridLines: {
              display: true,
              color: ['rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)',
                'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)'
              ],
              lineWidth: 3,
              zeroLineWidth: 0,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              min: 0,
              stepSize: this.stepSize,
              fontSize: 10,
              padding: 10,
            },
          }],
          xAxes: [{
            stacked: this.isStacked,
            categoryPercentage: 0.6,
            barPercentage: 0.7,
            display: true,
            lineWidth: 2,
            gridLines: {
              display: false,
              color: 'rgba(0,0,0,0.1)',
              lineWidth: 5,
              zeroLineWidth: 0,
              drawBorder: false,
            },
            ticks: {
              fontSize: 10,
            }
          }]
        },
        tooltips: {
          enabled: true,
          mode: 'nearest',
          callbacks: {
            title: function(tooltipItems, data) {
              return 'Class ' + tooltipItems[0].xLabel
            },
            labelColor: function(tooltipItem, chart) {
              return {
                borderColor: '#fff',
                backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].backgroundColor
              }
            }
          }
        },
        hover: {
          mode: 'null',
        },

      };

      var weightClasses = []
      for (var i = this.drSizeFilter[0]; i <= this.drSizeFilter[1]; i++) {
        // if (!this.filteredOut.includes(i)) {
        if (this.pointFilter) {
          if (this.drSizeFilter.includes(i)) {
            weightClasses.push(i)
          }
        } else {
          if (!this.filteredOut.includes(i)) {
            weightClasses.push(i)
          }
        }
      }

      let dataSet1 = []
      for (var i = 0; i <= weightClasses.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          if (this.driverList[j].weightClass === weightClasses[i]) {
            dataSet1.push(this.driverList[j].speedGround);
            break;
          }
        }
      }
      let dataSet2 = []
      for (var i = 0; i <= weightClasses.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          if (this.driverList[j].weightClass === weightClasses[i]) {
            dataSet2.push(this.driverList[j].acceleration);
            break;
          }
        }
      }
      let dataSet3 = []
      for (var i = 0; i <= weightClasses.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          if (this.driverList[j].weightClass === weightClasses[i]) {
            dataSet3.push(this.driverList[j].weight);
            break;
          }
        }
      }
      let dataSet4 = []
      for (var i = 0; i <= weightClasses.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          if (this.driverList[j].weightClass === weightClasses[i]) {
            dataSet4.push(this.driverList[j].handlingGround);
            break;
          }
        }
      }
      let dataSet5 = []
      for (var i = 0; i <= weightClasses.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          if (this.driverList[j].weightClass === weightClasses[i]) {
            dataSet5.push(this.driverList[j].traction);
            break;
          }
        }
      }
      let dataSet6 = []
      for (var i = 0; i <= weightClasses.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          if (this.driverList[j].weightClass === weightClasses[i]) {
            dataSet6.push(this.driverList[j].speedWater);
            break;
          }
        }
      }
      let dataSet7 = []
      for (var i = 0; i <= weightClasses.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          if (this.driverList[j].weightClass === weightClasses[i]) {
            dataSet7.push(this.driverList[j].speedAir);
            break;
          }
        }
      }
      let dataSet8 = []
      for (var i = 0; i <= weightClasses.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          if (this.driverList[j].weightClass === weightClasses[i]) {
            dataSet8.push(this.driverList[j].speedAntiGravity);
            break;
          }
        }
      }
      let dataSet9 = []
      for (var i = 0; i <= weightClasses.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          if (this.driverList[j].weightClass === weightClasses[i]) {
            dataSet9.push(this.driverList[j].handlingWater);
            break;
          }
        }
      }
      let dataSet10 = []
      for (var i = 0; i <= weightClasses.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          if (this.driverList[j].weightClass === weightClasses[i]) {
            dataSet10.push(this.driverList[j].handlingAir);
            break;
          }
        }
      }
      let dataSet11 = []
      for (var i = 0; i <= weightClasses.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          if (this.driverList[j].weightClass === weightClasses[i]) {
            dataSet11.push(this.driverList[j].handlingAntiGravity);
            break;
          }
        }
      }
      let dataSet12 = []
      for (var i = 0; i <= weightClasses.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          if (this.driverList[j].weightClass === weightClasses[i]) {
            dataSet12.push(this.driverList[j].miniTurbo);
            break;
          }
        }
      }

      var dat = {
        labels: weightClasses,
        datasets: [{
            label: 'Speed',
            backgroundColor: this.SPEED_COLOR,
            borderColor: this.SPEED_COLOR,
            data: dataSet1,
            hidden: this.hideSpeedGround,
            fill: false,
          },
          {
            label: 'Acceleration',
            backgroundColor: this.ACCELERATION_COLOR,
            borderColor: this.ACCELERATION_COLOR,
            data: dataSet2,
            hidden: this.hideAcceleration,
            fill: false,
          },
          {
            label: 'Weight',
            backgroundColor: this.WEIGHT_COLOR,
            borderColor: this.WEIGHT_COLOR,
            data: dataSet3,
            hidden: this.hideWeight,
            fill: false,
          },
          {
            label: 'Handling',
            backgroundColor: this.HANDLING_COLOR,
            borderColor: this.HANDLING_COLOR,
            data: dataSet4,
            hidden: this.hideHandlingGround,
            fill: false,
          },
          {
            label: 'Traction',
            backgroundColor: this.TRACTION_COLOR,
            borderColor: this.TRACTION_COLOR,
            data: dataSet5,
            hidden: this.hideTraction,
            fill: false,
          },
          {
            label: 'Water Speed',
            backgroundColor: this.WATER_SPEED_COLOR,
            borderColor: this.WATER_SPEED_COLOR,
            data: dataSet6,
            hidden: this.hideSpeedWater,
            fill: false,
          },
          {
            label: 'Air Speed',
            backgroundColor: this.AIR_SPEED_COLOR,
            borderColor: this.AIR_SPEED_COLOR,
            data: dataSet7,
            hidden: this.hideSpeedAir,
            fill: false,
          },
          {
            label: 'Anti-Gravity Speed',
            backgroundColor: this.ANTI_GRAVITY_SPEED_COLOR,
            borderColor: this.ANTI_GRAVITY_SPEED_COLOR,
            data: dataSet8,
            hidden: this.hideSpeedAntiGravity,
            fill: false,
          },
          {
            label: 'Water Handling',
            backgroundColor: this.WATER_HANDLING_COLOR,
            borderColor: this.WATER_HANDLING_COLOR,
            data: dataSet9,
            hidden: this.hideHandlingWater,
            fill: false,
          },
          {
            label: 'Air Handling',
            backgroundColor: this.AIR_HANDLING_COLOR,
            borderColor: this.AIR_HANDLING_COLOR,
            data: dataSet10,
            hidden: this.hideHandlingAir,
            fill: false,
          },
          {
            label: 'Anti-Gravity Handling',
            backgroundColor: this.ANTI_GRAVITY_HANDLING_COLOR,
            borderColor: this.ANTI_GRAVITY_HANDLING_COLOR,
            data: dataSet11,
            hidden: this.hideHandlingAntiGravity,
            fill: false,
          },
          {
            label: 'Mini-Turbo',
            backgroundColor: this.MINI_TURBO_COLOR,
            borderColor: this.MINI_TURBO_COLOR,
            data: dataSet12,
            hidden: this.hideMiniTurbo,
            fill: false,
          },
        ],
      };

      return [dat, opt];
    },

    driverList() {
      return this.drivers.filter((driver) => {
        return driver.weightClass >= this.drSizeFilter[0] && driver.weightClass <= this.drSizeFilter[1]
      })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '../mq'

#driver-slider
  user-select: none
  margin-top: 30px

.dr-chart
  user-select: none

.driver-stats
  display: flex
  justify-content: center
  padding: 0
  margin: 0

.stat-box
  min-width: min-content
  display: flex
  justify-content: center
  padding: 0
  margin: 0

.driver-stats-detailed
  width: auto
  height: 40px
  overflow-x: auto
  overflow-y: none
  white-space: wrap
  padding: 0
  margin: 0

.driver-stats-detailed::-webkit-scrollbar-track
	border-radius: 10px
	background-color: #e0e0e0

.driver-stats-detailed::-webkit-scrollbar
	height: 6px
	background-color: #f9f9f9

.driver-stats-detailed::-webkit-scrollbar-thumb
	border-radius: 10px
	background-color: #aeaeae

.hidden
  border: 2px solid #f9f9f9 !important
  background-color: #f9f9f9
  color: #b3b3b3
  box-shadow: 0 0 0 !important
  transform: translateY(2px)

.stat-btn
  font-size: 0.7rem
  padding: 2px
  margin: 2px
  border-radius: 2px
  border: 2px solid
  box-shadow: 0px 2px 5px rgba(0,0,0,0.2)

.driver-thumbs
  margin-top: 30px
  margin-bottom: 10px

.driver-thumbs-row
  display: flex
  justify-content: space-between
  padding: 0
  margin: 0

.thumbVisible
  opacity: 1
  transition: all .15s ease-in-out
  user-select: none

.thumbHidden
  opacity: 0.25
  transition: all .15s ease-in-out
  transform: scale(0.8)

.placeholder
  visibility: hidden

.driver-buttons
  margin-top: 0px
  margin-bottom: 50px

.dr-chart-btn
  font-size: 0.8rem
  padding: 18px
  color: #aeaeae
  background-color: #f9f9f9
  border: 2px solid

.dr-size-btn
  font-size: 0.66rem
  padding-left: 6px
  padding-right: 6px

.toolTipDriver
  color: #fff
  padding: 2px 6px 2px 6px
  border-radius: 2px
  font-size: 12px

.is-light-bg
  background-color: $light

.is-medium-bg
  background-color: $medium

.is-heavy-bg
  background-color: $heavy

.driver-slider-label
  margin-top: 25px
  font-size: 12px

.lightLabelDriver
  color: $light
  padding: 0px

.mediumLabelDriver
  color: $medium
  padding: 0px

.heavyLabelDriver
  color: $heavy
  padding: 0px

.slide-fade-enter-active
  transition: all .25s ease-in-out

.slide-fade-leave-active
  transition: all .25s ease-in-out

.slide-fade-enter, .slide-fade-leave-to
  transform: translateX(200px)
  opacity: 0

</style>
