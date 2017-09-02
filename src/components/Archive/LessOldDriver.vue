<template>
  <div class="Driver">
      <!-- Driver slider -->
      <driver-size-slider
            v-model="dr_size"
            event-type="auto"
            width="100%"
            :height="12"
            :dot-size="24"
            :min="1"
            :max="16"
            :interval="1"
            :show="true"
            :speed="0.5"
            :disabled="false"
            :piecewise="false"
            :piecewise-label="true"
            :piecewise-style="null"
            :tooltip='"always"'
            tooltip-dir="top"
            :reverse="false"
            :data="null"
            :clickable="true"
            :real-time="false"
            :lazy="false"
            :formatter="null"
            :bg-style='{backgroundColor:"#D5D5D5"}'
            :slider-style="null"
            :process-style='{backgroundColor:"#FFDB4A"}'
            :piecewise-active-style="null"
            :tooltip-style="null"
            :label-style='{marginTop:"5px"}'
            :label-active-style="null"
          >
            <template slot="label" scope="label">
              <div style="marginTop: 25px; fontSize: 12px">
                <span v-if="label.label < 7" class="lightLabelDriver">{{ label.label }}</span>
                <span v-if="label.label >= 7 && label.label < 12" class="mediumLabelDriver">{{ label.label }}</span>
                <span v-if="label.label >= 12" class="heavyLabelDriver">{{ label.label }}</span>
              </div>
            </template>

            <template slot="tooltip" scope="tooltip">
              <div style="fontSize: 14px">
                <span v-if="tooltip.value < 7" class="lightToolTipDriver toolTipDriver">{{tooltip.value}}</span>
                <span v-if="tooltip.value >= 7 && tooltip.value < 12" class="mediumToolTipDriver toolTipDriver">{{tooltip.value}}</span>
                <span v-if="tooltip.value >= 12" class="heavyToolTipDriver toolTipDriver">{{tooltip.value}}</span>
               </div>
            </template>
          </driver-size-slider>

          <br>

      <!-- Driver buttons -->
      <template>
        <!-- <a class="button is-small is-warning" @click="allDrivers">All</a> -->
        <a class="button is-small is-info" @click="lightDrivers">Light</a>
        <a class="button is-small is-primary" @click="mediumDrivers">Medium</a>
        <a class="button is-small is-danger" @click="heavyDrivers">Heavy</a>
        <span> | </span>
        <a class="button is-small" v-bind:class="{ activeSortDriver:drInfo == 'speedGround' }"@click="drSortSpeed">Speed</a>
        <a class="button is-small" v-bind:class="{ activeSortDriver:drInfo == 'acceleration' }"@click="drSortAccel">Acceleration</a>
        <a class="button is-small" v-bind:class="{ activeSortDriver:drInfo == 'weight' }"@click="drSortWeight">Weight</a>
        <a class="button is-small" v-bind:class="{ activeSortDriver:drInfo == 'handlingGround' }"@click="drSortHandling">Handling</a>
        <a class="button is-small" v-bind:class="{ activeSortDriver:drInfo == 'traction' }"@click="drSortTraction">Traction</a>
      </template>

      <hr>

      <template v-for="obj in groupedDriverList">
        <template v-if="obj[0].speedGround >= 0">
          <template v-for="o in obj">
            <img :src="o.image" :title="o.name" class="driver-img">
          <!--
            <a v-if="o.size=='Light'" class="driver-btn button is-medium dr-lbl-light">
              <img :src="o.image" :title="o.name">
              <span>{{ o.name }}</span>
            </a>

            <a v-if="o.size=='Medium'" class="driver-btn button is-medium dr-lbl-medium">
              <img :src="o.image" :title="o.name">
              <span>{{ o.name }}</span>
            </a>

            <a v-if="o.size=='Heavy'" class="driver-btn button is-medium dr-lbl-heavy">
              <img :src="o.image" :title="o.name">
              <span>{{ o.name }}</span>
            </a>
          -->
          </template>
          <progress-bar
          :type="'success'"
          :size="'small'"
          :value="obj[0].speedGround"
          :max="5"
          :show-label="true">
          </progress-bar>
        </template>
      </template>
    </div>
</template>

<script>
class Driver {
  constructor(size, weightClass, name, image, speedGround, speedWater, speedAir, speedAntiGravity, acceleration, weight, handlingGround, handlingWater, handlingAir, handlingAntiGravity, traction, miniTurbo){
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

import vueSlider from 'vue-slider-component';
import ProgressBar from 'vue-bulma-progress-bar'

export default {
  name: 'Driver',
  components: {
    'driver-size-slider' : vueSlider,
    'progress-bar': ProgressBar,
	},
	data () {
    return {
      drInfo: 'speedGround',
      dr_size: [1, 16],
      drivers: [
        new Driver ("Light", 1, "Baby Peach", "https://www.mariowiki.com/images/thumb/3/3d/MK8_BabyPeach_Icon.png/32px-MK8_BabyPeach_Icon.png", 2.25, 2.5, 2.75, 2, 4, 2, 5, 4.5, 5, 5, 4.25, 4),
        new Driver ("Light", 1, "Baby Daisy", "https://www.mariowiki.com/images/thumb/4/43/MK8_BabyDaisy_Icon.png/32px-MK8_BabyDaisy_Icon.png", 2.25, 2.5, 2.75, 2, 4, 2, 5, 4.5, 5, 5, 4.25, 4),
        new Driver ("Light", 2, "Baby Rosalina", "https://www.mariowiki.com/images/thumb/0/09/MK8_BabyRosalina_Icon.png/32px-MK8_BabyRosalina_Icon.png", 2.25, 2.5, 2.75, 2, 4.25, 2, 4.75, 4.25, 4.75, 4.75, 3.75, 4),
        new Driver ("Light", 2, "Lemmy", "https://www.mariowiki.com/images/thumb/f/fc/MK8_Lemmy_Icon.png/32px-MK8_Lemmy_Icon.png", 2.25, 2.5, 2.75, 2, 4.25, 2, 4.75, 4.25, 4.75, 4.75, 3.75, 4),
        new Driver ("Light", 3, "Baby Mario", "https://www.mariowiki.com/images/thumb/5/51/MK8DX_Baby_Mario_Icon.png/32px-MK8DX_Baby_Mario_Icon.png", 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
        new Driver ("Light", 3, "Baby Luigi", "https://www.mariowiki.com/images/thumb/7/75/MK8DX_Baby_Luigi_Icon.png/31px-MK8DX_Baby_Luigi_Icon.png", 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
        new Driver ("Light", 3, "Dry Bones", "https://www.mariowiki.com/images/thumb/3/3f/MK8DX_Dry_Bones_Icon.png/30px-MK8DX_Dry_Bones_Icon.png", 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
        new Driver ("Light", 3, "Mii (light)", "https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png", 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
        new Driver ("Light", 4, "Koopa Troopa", "https://www.mariowiki.com/images/thumb/2/24/MK8DX_Koopa_Troopa_Icon.png/32px-MK8DX_Koopa_Troopa_Icon.png", 2.75, 3, 3.25, 2.5, 4, 2.5, 4.5, 4, 4.5, 4.5, 4.25, 3.75),
        new Driver ("Light", 4, "Lakitu", "https://www.mariowiki.com/images/thumb/6/6f/MK8DX_Lakitu_Icon.png/26px-MK8DX_Lakitu_Icon.png", 2.75, 3, 3.25, 2.5, 4, 2.5, 4.5, 4, 4.5, 4.5, 4.25, 3.75),
        new Driver ("Light", 4, "Bowser Jr.", "https://www.mariowiki.com/images/thumb/2/26/MK8_Bowser_Jr_Icon.png/31px-MK8_Bowser_Jr_Icon.png", 2.75, 3, 3.25, 2.5, 4, 2.5, 4.5, 4, 4.5, 4.5, 4.25, 3.75),
        new Driver ("Light", 5, "Toadette", "https://www.mariowiki.com/images/thumb/8/8c/MK8DX_Toadette_Icon.png/32px-MK8DX_Toadette_Icon.png", 2.75, 3, 3.25, 2.5, 4.25, 2.5, 4.25, 3.75, 4.25, 4.25, 3.5, 3.75),
        new Driver ("Light", 5, "Wendy", "https://www.mariowiki.com/images/thumb/2/2c/MK8DX_Wendy_Icon.png/32px-MK8DX_Wendy_Icon.png", 2.75, 3, 3.25, 2.5, 4.25, 2.5, 4.25, 3.75, 4.25, 4.25, 3.5, 3.75),
        new Driver ("Light", 5, "Isabelle", "https://www.mariowiki.com/images/thumb/5/59/MK8DX_Isabelle_Icon.png/30px-MK8DX_Isabelle_Icon.png", 2.75, 3, 3.25, 2.5, 4.25, 2.5, 4.25, 3.75, 4.25, 4.25, 3.5, 3.75),
        new Driver ("Light", 6, "Toad", "https://www.mariowiki.com/images/thumb/8/89/MK8DX_Toad_Icon.png/31px-MK8DX_Toad_Icon.png", 3, 3.25, 3.5, 2.75, 4, 2.75, 4.25, 3.75, 4.25, 4.25, 4, 3.5),
        new Driver ("Light", 6, "Shy Guy", "https://www.mariowiki.com/images/thumb/4/43/MK8DX_Shy_Guy_Icon.png/32px-MK8DX_Shy_Guy_Icon.png", 3, 3.25, 3.5, 2.75, 4, 2.75, 4.25, 3.75, 4.25, 4.25, 4, 3.5),
        new Driver ("Light", 6, "Larry", "https://www.mariowiki.com/images/thumb/c/c2/MK8_Larry_Icon.png/32px-MK8_Larry_Icon.png", 3, 3.25, 3.5, 2.75, 4, 2.75, 4.25, 3.75, 4.25, 4.25, 4, 3.5),
        new Driver ("Medium", 7, "Cat Peach", "https://www.mariowiki.com/images/thumb/f/fc/MK8DX_Cat_Peach_Icon.png/28px-MK8DX_Cat_Peach_Icon.png", 3.25, 3.5, 3.75, 3, 4, 2.75, 4, 3.5, 4, 4, 3.75, 3.5),
        new Driver ("Medium", 7, "Inkling Girl", "https://www.mariowiki.com/images/thumb/b/b9/MK8DX_Female_Inkling_Icon.png/32px-MK8DX_Female_Inkling_Icon.png",3.25, 3.5, 3.75, 3, 4, 2.75, 4, 3.5, 4, 4, 3.75, 3.5),
        new Driver ("Medium", 7, "Villager (female)", "https://www.mariowiki.com/images/thumb/0/00/MK8DX_Female_Villager_Icon.png/32px-MK8DX_Female_Villager_Icon.png", 3.25, 3.5, 3.75, 3, 4, 2.75, 4, 3.5, 4, 4, 3.75, 3.5),
        new Driver ("Medium", 8, "Peach", "https://www.mariowiki.com/images/thumb/1/1f/MK8DX_Peach_Icon.png/32px-MK8DX_Peach_Icon.png", 3.5, 3.75, 4, 3.25, 3.75, 3, 3.75, 3.25, 3.75, 3.75, 3.75, 3.5),
        new Driver ("Medium", 8, "Daisy", "https://www.mariowiki.com/images/thumb/6/6e/MK8DX_Daisy_Icon.png/29px-MK8DX_Daisy_Icon.png", 3.5, 3.75, 4, 3.25, 3.75, 3, 3.75, 3.25, 3.75, 3.75, 3.75, 3.5),
        new Driver ("Medium", 8, "Yoshi", "https://www.mariowiki.com/images/thumb/3/38/MK8DX_Yoshi_Icon.png/32px-MK8DX_Yoshi_Icon.png", 3.5, 3.75, 4, 3.25, 3.75, 3, 3.75, 3.25, 3.75, 3.75, 3.75, 3.5),
        new Driver ("Medium", 9, "Tanooki Mario", "https://www.mariowiki.com/images/thumb/f/f7/MK8DX_Tanooki_Mario_Icon.png/31px-MK8DX_Tanooki_Mario_Icon.png", 3.5, 3.75, 4, 3.25, 3.75, 3.25, 3.75, 3.25, 3.75, 3.75, 3.25, 3.5),
        new Driver ("Medium", 9, "Inkling Boy", "https://www.mariowiki.com/images/thumb/3/3c/MK8DX_Male_Inkling_Icon.png/32px-MK8DX_Male_Inkling_Icon.png", 3.5, 3.75, 4, 3.25, 3.75, 3.25, 3.75, 3.25, 3.75, 3.75, 3.25, 3.5),
        new Driver ("Medium", 9, "Villager (male)", "https://www.mariowiki.com/images/thumb/d/d9/MK8DX_Male_Villager_Icon.png/32px-MK8DX_Male_Villager_Icon.png", 3.5, 3.75, 4, 3.25, 3.75, 3.25, 3.75, 3.25, 3.75, 3.75, 3.25, 3.5),
        new Driver ("Medium", 10, "Luigi", "https://www.mariowiki.com/images/thumb/6/69/MK8DX_Luigi_Icon.png/28px-MK8DX_Luigi_Icon.png", 3.75, 4, 4.25, 3.5, 3.5, 3.5, 3.75, 3.25, 3.75, 3.75, 3.25, 3.25),
        new Driver ("Medium", 10, "Iggy", "https://www.mariowiki.com/images/thumb/d/d7/MK8DX_Iggy_Icon.png/30px-MK8DX_Iggy_Icon.png", 3.75, 4, 4.25, 3.5, 3.5, 3.5, 3.75, 3.25, 3.75, 3.75, 3.25, 3.25),
        new Driver ("Medium", 11, "Mario", "https://www.mariowiki.com/images/thumb/4/4f/MK8DX_Mario_Icon.png/32px-MK8DX_Mario_Icon.png", 3.75, 4, 4.25, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 3.5, 3.25),
        new Driver ("Medium", 11, "Ludwig", "https://www.mariowiki.com/images/thumb/7/7c/MK8DX_Ludwig_Icon.png/32px-MK8DX_Ludwig_Icon.png", 3.75, 4, 4.25, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 3.5, 3.25),
        new Driver ("Medium", 11, "Mii (medium)", "https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png", 3.75, 4, 4.25, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 3.5, 3.25),
        new Driver ("Heavy", 12, "Rosalina", "https://www.mariowiki.com/images/thumb/4/4b/MK8DX_Rosalina_Icon.png/28px-MK8DX_Rosalina_Icon.png", 4, 4.25, 4.5, 3.75, 3.25, 3.75, 3.25, 2.75, 3.25, 3.25, 3.75, 3.25),
        new Driver ("Heavy", 12, "King Boo", "https://www.mariowiki.com/images/thumb/1/1d/MK8DX_King_Boo_Icon.png/30px-MK8DX_King_Boo_Icon.png", 4, 4.25, 4.5, 3.75, 3.25, 3.75, 3.25, 2.75, 3.25, 3.25, 3.75, 3.25),
        new Driver ("Heavy", 12, "Link", "https://www.mariowiki.com/images/thumb/c/ce/MK8DX_Link_Icon.png/32px-MK8DX_Link_Icon.png", 4, 4.25, 4.5, 3.75, 3.25, 3.75, 3.25, 2.75, 3.25, 3.25, 3.75, 3.25),
        new Driver ("Heavy", 13, "Waluigi", "https://www.mariowiki.com/images/thumb/5/51/MK8DX_Waluigi_Icon.png/27px-MK8DX_Waluigi_Icon.png", 4.5, 4.75, 5, 4.25, 3.25, 4, 3, 2.5, 3, 3, 3, 3),
        new Driver ("Heavy", 13, "Donkey Kong", "https://www.mariowiki.com/images/thumb/9/9b/MK8DX_DK_Icon.png/25px-MK8DX_DK_Icon.png", 4.5, 4.75, 5, 4.25, 3.25, 4, 3, 2.5, 3, 3, 3, 3),
        new Driver ("Heavy", 13, "Roy", "https://www.mariowiki.com/images/thumb/3/36/MK8DX_Roy_Icon.png/32px-MK8DX_Roy_Icon.png", 4.5, 4.75, 5, 4.25, 3.25, 4, 3, 2.5, 3, 3, 3, 3),
        new Driver ("Heavy", 14, "Wario", "https://www.mariowiki.com/images/thumb/c/cd/MK8DX_Wario_Icon.png/32px-MK8DX_Wario_Icon.png", 4.75, 5, 5.25, 4.5, 3, 4.25, 2.75, 2.25, 2.75, 2.75, 3.25, 2.75),
        new Driver ("Heavy", 14, "Dry Bowser", "https://www.mariowiki.com/images/thumb/3/38/MK8DX_Dry_Bowser_Icon.png/32px-MK8DX_Dry_Bowser_Icon.png", 4.75, 5, 5.25, 4.5, 3, 4.25, 2.75, 2.25, 2.75, 2.75, 3.25, 2.75),
        new Driver ("Heavy", 15, "Metal Mario", "https://www.mariowiki.com/images/thumb/e/eb/MK8DX_Metal_Mario_Icon.png/31px-MK8DX_Metal_Mario_Icon.png", 4.25, 4.5, 4.75, 4, 3.25, 4.5, 3.25, 2.75, 3.25, 3.25, 3.25, 3),
        new Driver ("Heavy", 15, "Pink Gold Peach", "https://www.mariowiki.com/images/thumb/2/2b/MK8DX_Pink_Gold_Peach_Icon.png/31px-MK8DX_Pink_Gold_Peach_Icon.png", 4.25, 4.5, 4.75, 4, 3.25, 4.5, 3.25, 2.75, 3.25, 3.25, 3.25, 3),
        new Driver ("Heavy", 16, "Bowser", "https://www.mariowiki.com/images/thumb/d/d9/MK8DX_Bowser_Icon.png/32px-MK8DX_Bowser_Icon.png", 4.75, 5, 5.25, 4.5, 3, 4.5, 2.5, 2, 2.5, 2.5, 3, 2.75),
        new Driver ("Heavy", 16, "Morton", "https://www.mariowiki.com/images/thumb/4/47/MK8DX_Morton_Icon.png/30px-MK8DX_Morton_Icon.png", 4.75, 5, 5.25, 4.5, 3, 4.5, 2.5, 2, 2.5, 2.5, 3, 2.75),
        new Driver ("Heavy", 16, "Mii (heavy)", "https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png", 4.75, 5, 5.25, 4.5, 3, 4.5, 2.5, 2, 2.5, 2.5, 3, 2.75),
      ],
	  }
  },
  methods : {
    allDrivers() {
      this.dr_size = [1, 16]
    },
    lightDrivers(){
      this.dr_size = [1, 6]
    },
    mediumDrivers() {
      this.dr_size = [7, 11]
    },
    heavyDrivers() {
      this.dr_size = [12, 16]
    },
    driverInfo(dr) {
      switch (this.drInfo) {
        case 'weightClass':
          return dr.weightClass
        case 'speedGround':
          return dr.speedGround
        case 'acceleration':
          return dr.acceleration
        case 'weight':
          return dr.weight
        case 'handlingGround':
          return dr.handlingGround
        case 'traction':
          return dr.traction
      }
    },
    drSortSpeed() {
      this.drInfo = 'speedGround'
    },
    drSortAccel() {
      this.drInfo = 'acceleration'
    },
    drSortWeight() {
      this.drInfo = 'weight'
    },
    drSortHandling() {
      this.drInfo = 'handlingGround'
    },
    drSortTraction() {
      this.drInfo = 'traction'
    },
  },
  computed : {
    driverList() {
      return this.drivers.filter((driver) => {
        return driver.weightClass >= this.dr_size[0] && driver.weightClass <= this.dr_size[1]
      })
    },
    sortedDriverList() {
      switch (this.drInfo) {
        case 'weightClass':
          return this.driverList.sort(function(a, b) {
            return a.weightClass - b.weightClass
          })
        case 'speedGround':
          return this.driverList.sort(function(a, b) {
            return b.speedGround - a.speedGround
          })
        case 'acceleration':
          return this.driverList.sort(function(a, b) {
            return b.acceleration - a.acceleration
          })
        case 'weight':
          return this.driverList.sort(function(a, b) {
            return b.weight - a.weight
          })
        case 'handlingGround':
          return this.driverList.sort(function(a, b) {
            return b.handlingGround - a.handlingGround
          })
        case 'traction':
          return this.driverList.sort(function(a, b) {
            return b.traction - a.traction
          })
      }
    },
    groupedDriverList() {
      let arr = [];
      for (var i = 0; i < this.driverList.length; i++) {
        if (arr.indexOf(this.driverList[i].speedGround) == -1) {
          arr.push("'" + this.driverList[i].speedGround + "'") // unordered keys fix
        }
      }
      arr.sort().reverse();

      let obj = {};
      let temp = [];

      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          var k = "'" + this.driverList[j].speedGround + "'"; // as above
          if (k === arr[i]) {
            temp.push(this.driverList[j])
          }
        }
        obj[arr[i]] = temp;
        temp = [];
      }
      return obj;
    },
  },
}
</script>

<style lang="sass" scoped>
@import '../mq'

.activeSortDriver
  font-weight: bold
  border: 2px solid #FFDB4A

.driver-img
  margin-right: 5px

.toolTipDriver
  color: #fff
  padding: 4px 8px 4px 8px
  border-radius: 2px

.lightToolTipDriver
  background-color: $light

.mediumToolTipDriver
  background-color: $medium

.heavyToolTipDriver
  background-color: $heavy

.lightLabelDriver
  color: $light
  font-size: 14px

.mediumLabelDriver
  color: $medium
  font-size: 14px

.heavyLabelDriver
  color: $heavy
  font-size: 14px

</style>
