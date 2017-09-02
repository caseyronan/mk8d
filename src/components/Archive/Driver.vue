<template>
  <div class="Driver">
      <!-- Driver slider -->
      <driver-size-slider style="margin-bottom:30px"
            v-model="drSizeFilter"
            :height="12"
            :dot-size="24"
            :min="1"
            :max="16"
            :piecewise-label="true"
            :bg-style='{backgroundColor:"#D5D5D5"}'
            :process-style='{backgroundColor:"#FFDB4A"}'
          >
            <template slot="label" scope="label">
              <div class="driver-slider-label">
                <span v-if="label.label < 7" class="lightLabelDriver">{{ label.label }}</span>
                <span v-if="label.label >= 7 && label.label < 12" class="mediumLabelDriver">{{ label.label }}</span>
                <span v-if="label.label >= 12" class="heavyLabelDriver">{{ label.label }}</span>
              </div>
            </template>

            <template slot="tooltip" scope="tooltip">
              <div style="fontSize: 14px">
                <span v-if="tooltip.value < 7" class="is-light-bg toolTipDriver">{{tooltip.value}}</span>
                <span v-if="tooltip.value >= 7 && tooltip.value < 12" class="is-medium-bg toolTipDriver">{{tooltip.value}}</span>
                <span v-if="tooltip.value >= 12" class="is-heavy-bg toolTipDriver">{{tooltip.value}}</span>
               </div>
            </template>
          </driver-size-slider>

      <!-- Driver buttons -->
      <template>
        <a class="button is-small is-success" @click="allDrivers">All</a>
        <a class="button is-small is-info" @click="lightDrivers">Light</a>
        <a class="button is-small is-primary" @click="mediumDrivers">Medium</a>
        <a class="button is-small is-danger" @click="heavyDrivers">Heavy</a>
      </template>

      <hr>





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
    'driver-speed-slider' : vueSlider,
	},
	data () {
    return {
      drSortBy: 'weightClass',
      drSizeFilter: [1, 16],
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
      this.drSizeFilter = [1, 16]
    },
    lightDrivers(){
      this.drSizeFilter = [1, 6]
    },
    mediumDrivers() {
      this.drSizeFilter = [7, 11]
    },
    heavyDrivers() {
      this.drSizeFilter = [12, 16]
    },

  },
  computed : {
    driverList() {
      return this.drivers.filter((driver) => {
        return driver.weightClass >= this.drSizeFilter[0] && driver.weightClass <= this.drSizeFilter[1]
      })
    },
    driverGroupList() {
      let arr = [];
      let obj = {};
      let temp = [];
      for (var i = 0; i < this.driverList.length; i++) {
        if (arr.indexOf(this.driverList[i].weightClass) == -1) {
          arr.push("'" + this.driverList[i].weightClass + "'") // unordered keys fix
        }
      }
      arr.sort().reverse();
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < this.driverList.length; j++) {
          var k = "'" + this.driverList[j].weightClass + "'"; // as above
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

.toolTipDriver
  color: #fff
  padding: 4px 8px 4px 8px
  border-radius: 2px
  font-size: 14px

.is-light-bg
  background-color: $light

.is-medium-bg
  background-color: $medium

.is-heavy-bg
  background-color: $heavy

.driver-slider-label
  margin-top: 25px
  font-size: 12px



</style>
