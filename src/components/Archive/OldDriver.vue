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
        <!-- <a class="button is-small" @click="allDrivers">Reset</a> -->
        <a class="button is-small is-info" @click="lightDrivers">Light</a>
        <a class="button is-small is-primary" @click="mediumDrivers">Medium</a>
        <a class="button is-small is-danger" @click="heavyDrivers">Heavy</a>
        <span>|</span>
        <a class="button is-small" v-bind:class="{ activeSortDriver:drInfo=='name' }" @click="drInfo='name'">Name</a>
        <a class="button is-small" v-bind:class="{ activeSortDriver:drInfo=='speedGround' }"@click="drInfo='speedGround'">Speed</a>
        <a class="button is-small" v-bind:class="{ activeSortDriver:drInfo=='acceleration' }"@click="drInfo='acceleration'">Acceleration</a>
        <a class="button is-small" v-bind:class="{ activeSortDriver:drInfo=='weight' }"@click="drInfo='weight'">Weight</a>
        <a class="button is-small" v-bind:class="{ activeSortDriver:drInfo=='handlingGround' }"@click="drInfo='handlingGround'">Handling</a>
        <a class="button is-small" v-bind:class="{ activeSortDriver:drInfo=='traction' }"@click="drInfo='traction'">Traction</a>
      </template>

    <hr>

      <!-- Drivers (filtered) -->
      <template class="columns" v-for="driver in driverList">

        <template v-for="(image, index) in driver.image">

          <a v-if="driver.size=='Light'" class="driver-btn button is-medium dr-lbl-light">
            <figure class="image is 32x32">
              <img :src="image">
            </figure>
            <span class="driver-label">{{ driverInfo(driver, index) }}</span>
          </a>

          <a v-if="driver.size=='Medium'" class="driver-btn button is-medium dr-lbl-medium">
            <figure class="image is-32x32">
              <img :src="image">
            </figure>
            <span class="driver-label">{{ driverInfo(driver, index) }}</span>
          </a>

          <a v-if="driver.size=='Heavy'" class="driver-btn button is-medium dr-lbl-heavy">
            <figure class="image is-32x32">
              <img :src="image">
            </figure>
            <span class="driver-label">{{ driverInfo(driver, index) }}</span>
          </a>

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

export default {
  name: 'Driver',
  components: {
    'driver-size-slider' : vueSlider,
	},
	data () {
    return {
      drInfo: 'name',
      dr_size: [1, 16],
      drivers: [
          new Driver ("Light", 1, ["Baby Peach", "Baby Daisy"], ["https://www.mariowiki.com/images/thumb/3/3d/MK8_BabyPeach_Icon.png/32px-MK8_BabyPeach_Icon.png", "https://www.mariowiki.com/images/thumb/4/43/MK8_BabyDaisy_Icon.png/32px-MK8_BabyDaisy_Icon.png"], 2.25, 2.5, 2.75, 2, 4, 2, 5, 4.5, 5, 5, 4.25, 4),
          new Driver ("Light", 2, ["Baby Rosalina", "Lemmy"], ["https://www.mariowiki.com/images/thumb/0/09/MK8_BabyRosalina_Icon.png/32px-MK8_BabyRosalina_Icon.png","https://www.mariowiki.com/images/thumb/f/fc/MK8_Lemmy_Icon.png/32px-MK8_Lemmy_Icon.png"], 2.25, 2.5, 2.75, 2, 4.25, 2, 4.75, 4.25, 4.75, 4.75, 3.75, 4),
          new Driver ("Light", 3, ["Baby Mario", "Baby Luigi", "Dry Bones", "Mii (light)"], ["https://www.mariowiki.com/images/thumb/5/51/MK8DX_Baby_Mario_Icon.png/32px-MK8DX_Baby_Mario_Icon.png", "https://www.mariowiki.com/images/thumb/7/75/MK8DX_Baby_Luigi_Icon.png/31px-MK8DX_Baby_Luigi_Icon.png", "https://www.mariowiki.com/images/thumb/3/3f/MK8DX_Dry_Bones_Icon.png/30px-MK8DX_Dry_Bones_Icon.png", "https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png"], 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
          new Driver ("Light", 4, ["Koopa Troopa", "Lakitu", "Bowser Jr."], ["https://www.mariowiki.com/images/thumb/2/24/MK8DX_Koopa_Troopa_Icon.png/32px-MK8DX_Koopa_Troopa_Icon.png", "https://www.mariowiki.com/images/thumb/6/6f/MK8DX_Lakitu_Icon.png/26px-MK8DX_Lakitu_Icon.png", "https://www.mariowiki.com/images/thumb/2/26/MK8_Bowser_Jr_Icon.png/31px-MK8_Bowser_Jr_Icon.png"], 2.75, 3, 3.25, 2.5, 4, 2.5, 4.5, 4, 4.5, 4.5, 4.25, 3.75),
          new Driver ("Light", 5, ["Toadette", "Wendy", "Isabelle"], ["https://www.mariowiki.com/images/thumb/8/8c/MK8DX_Toadette_Icon.png/32px-MK8DX_Toadette_Icon.png", "https://www.mariowiki.com/images/thumb/2/2c/MK8DX_Wendy_Icon.png/32px-MK8DX_Wendy_Icon.png", "https://www.mariowiki.com/images/thumb/5/59/MK8DX_Isabelle_Icon.png/30px-MK8DX_Isabelle_Icon.png"], 2.75, 3, 3.25, 2.5, 4.25, 2.5, 4.25, 3.75, 4.25, 4.25, 3.5, 3.75),
          new Driver ("Light", 6, ["Toad", "Shy Guy", "Larry"], ["https://www.mariowiki.com/images/thumb/8/89/MK8DX_Toad_Icon.png/31px-MK8DX_Toad_Icon.png", "https://www.mariowiki.com/images/thumb/4/43/MK8DX_Shy_Guy_Icon.png/32px-MK8DX_Shy_Guy_Icon.png", "https://www.mariowiki.com/images/thumb/c/c2/MK8_Larry_Icon.png/32px-MK8_Larry_Icon.png"], 3, 3.25, 3.5, 2.75, 4, 2.75, 4.25, 3.75, 4.25, 4.25, 4, 3.5),
          new Driver ("Medium", 7, ["Cat Peach", "Inkling Girl", "Villager (female)"], ["https://www.mariowiki.com/images/thumb/f/fc/MK8DX_Cat_Peach_Icon.png/28px-MK8DX_Cat_Peach_Icon.png", "https://www.mariowiki.com/images/thumb/b/b9/MK8DX_Female_Inkling_Icon.png/32px-MK8DX_Female_Inkling_Icon.png", "https://www.mariowiki.com/images/thumb/0/00/MK8DX_Female_Villager_Icon.png/32px-MK8DX_Female_Villager_Icon.png"], 3.25, 3.5, 3.75, 3, 4, 2.75, 4, 3.5, 4, 4, 3.75, 3.5),
          new Driver ("Medium", 8, ["Peach", "Daisy", "Yoshi"], ["https://www.mariowiki.com/images/thumb/1/1f/MK8DX_Peach_Icon.png/32px-MK8DX_Peach_Icon.png", "https://www.mariowiki.com/images/thumb/6/6e/MK8DX_Daisy_Icon.png/29px-MK8DX_Daisy_Icon.png", "https://www.mariowiki.com/images/thumb/3/38/MK8DX_Yoshi_Icon.png/32px-MK8DX_Yoshi_Icon.png"], 3.5, 3.75, 4, 3.25, 3.75, 3, 3.75, 3.25, 3.75, 3.75, 3.75, 3.5),
          new Driver ("Medium", 9, ["Tanooki Mario", "Inkling Boy", "Villager (male)"], ["https://www.mariowiki.com/images/thumb/f/f7/MK8DX_Tanooki_Mario_Icon.png/31px-MK8DX_Tanooki_Mario_Icon.png", "https://www.mariowiki.com/images/thumb/3/3c/MK8DX_Male_Inkling_Icon.png/32px-MK8DX_Male_Inkling_Icon.png", "https://www.mariowiki.com/images/thumb/d/d9/MK8DX_Male_Villager_Icon.png/32px-MK8DX_Male_Villager_Icon.png"], 3.5, 3.75, 4, 3.25, 3.75, 3.25, 3.75, 3.25, 3.75, 3.75, 3.25, 3.5),
          new Driver ("Medium", 10, ["Luigi", "Iggy"], ["https://www.mariowiki.com/images/thumb/6/69/MK8DX_Luigi_Icon.png/28px-MK8DX_Luigi_Icon.png", "https://www.mariowiki.com/images/thumb/d/d7/MK8DX_Iggy_Icon.png/30px-MK8DX_Iggy_Icon.png"], 3.75, 4, 4.25, 3.5, 3.5, 3.5, 3.75, 3.25, 3.75, 3.75, 3.25, 3.25),
          new Driver ("Medium", 11, ["Mario", "Ludwig", "Mii (medium)"], ["https://www.mariowiki.com/images/thumb/4/4f/MK8DX_Mario_Icon.png/32px-MK8DX_Mario_Icon.png", "https://www.mariowiki.com/images/thumb/7/7c/MK8DX_Ludwig_Icon.png/32px-MK8DX_Ludwig_Icon.png", "https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png",], 3.75, 4, 4.25, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 3.5, 3.25),
          new Driver ("Heavy", 12, ["Rosalina", "King Boo", "Link"], ["https://www.mariowiki.com/images/thumb/4/4b/MK8DX_Rosalina_Icon.png/28px-MK8DX_Rosalina_Icon.png", "https://www.mariowiki.com/images/thumb/1/1d/MK8DX_King_Boo_Icon.png/30px-MK8DX_King_Boo_Icon.png", "https://www.mariowiki.com/images/thumb/c/ce/MK8DX_Link_Icon.png/32px-MK8DX_Link_Icon.png",], 4, 4.25, 4.5, 3.75, 3.25, 3.75, 3.25, 2.75, 3.25, 3.25, 3.75, 3.25),
          new Driver ("Heavy", 13, ["Waluigi", "Donkey Kong", "Roy"], ["https://www.mariowiki.com/images/thumb/5/51/MK8DX_Waluigi_Icon.png/27px-MK8DX_Waluigi_Icon.png", "https://www.mariowiki.com/images/thumb/9/9b/MK8DX_DK_Icon.png/25px-MK8DX_DK_Icon.png", "https://www.mariowiki.com/images/thumb/3/36/MK8DX_Roy_Icon.png/32px-MK8DX_Roy_Icon.png",], 4.5, 4.75, 5, 4.25, 3.25, 4, 3, 2.5, 3, 3, 3, 3),
          new Driver ("Heavy", 14, ["Wario", "Dry Bowser"], ["https://www.mariowiki.com/images/thumb/c/cd/MK8DX_Wario_Icon.png/32px-MK8DX_Wario_Icon.png", "https://www.mariowiki.com/images/thumb/3/38/MK8DX_Dry_Bowser_Icon.png/32px-MK8DX_Dry_Bowser_Icon.png"], 4.75, 5, 5.25, 4.5, 3, 4.25, 2.75, 2.25, 2.75, 2.75, 3.25, 2.75),
          new Driver ("Heavy", 15, ["Metal Mario", "Pink Gold Peach"], ["https://www.mariowiki.com/images/thumb/e/eb/MK8DX_Metal_Mario_Icon.png/31px-MK8DX_Metal_Mario_Icon.png", "https://www.mariowiki.com/images/thumb/2/2b/MK8DX_Pink_Gold_Peach_Icon.png/31px-MK8DX_Pink_Gold_Peach_Icon.png"], 4.25, 4.5, 4.75, 4, 3.25, 4.5, 3.25, 2.75, 3.25, 3.25, 3.25, 3),
          new Driver ("Heavy", 16, ["Bowser", "Morton", "Mii (heavy)"], ["https://www.mariowiki.com/images/thumb/d/d9/MK8DX_Bowser_Icon.png/32px-MK8DX_Bowser_Icon.png", "https://www.mariowiki.com/images/thumb/4/47/MK8DX_Morton_Icon.png/30px-MK8DX_Morton_Icon.png", "https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png",], 4.75, 5, 5.25, 4.5, 3, 4.5, 2.5, 2, 2.5, 2.5, 3, 2.75),

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
    driverInfo(dr, i) {
      switch (this.drInfo) {
        case 'name':
          return dr.name[i]
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
  },
  computed : {
    driverList() {
      return this.drivers.filter((driver) => {
        return driver.weightClass >= this.dr_size[0] && driver.weightClass <= this.dr_size[1]
      })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '../mq'

.activeSortDriver
  font-weight: bold
  border: 2px solid #FFDB4A

.driver-btn
  margin-top: 5px
  margin-right: 5px

.driver-label
  font-size: 12px

.dr-lbl-light
  border: 1px solid $light
  background-color: #d6e3f8

.dr-lbl-medium
  border: 1px solid $medium
  background-color: #ccf5ef

.dr-lbl-heavy
  border: 1px solid $heavy
  background-color: #ffd7df

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

.mediumLabelDriver
  color: $medium

.heavyLabelDriver
  color: $heavy

</style>
