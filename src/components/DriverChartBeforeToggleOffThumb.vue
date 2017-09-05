<template>
<div class="driver">

  <bar-chart class="dr-chart" v-if="this.chartType==='bar'" :height="250" :chart-data="DrawChart[0]" :options="DrawChart[1]">
  </bar-chart>

  <line-chart class="dr-chart" v-if="this.chartType==='line'" :height="250" :chart-data="DrawChart[0]" :options="DrawChart[1]">
  </line-chart>

  <stacked-chart class="dr-chart" v-if="this.chartType==='stacked'" :height="250" :chart-data="DrawChart[0]" :options="DrawChart[1]">
  </stacked-chart>

  <div class="driver-stats">

    <template v-if="this.showStatSpeed">
      <a class="button stat-btn is-small" style="padding:2px; margin:2px; border: 2px solid Gold" v-bind:class="{ hidden:this.hideSpeed }" @click="ToggleData(1)">Speed</a>
    </template>

    <template v-if="this.showStatAcceleration">
      <a class="button stat-btn is-small" style="padding:2px; margin:2px; border: 2px solid DeepSkyBlue" v-bind:class="{ hidden:this.hideAcceleration }" @click="ToggleData(2)">Acceleration</a>
    </template>

    <template v-if="this.showStatWeight">
      <a class="button stat-btn is-small" style="padding:2px; margin:2px; border: 2px solid DeepPink" v-bind:class="{ hidden:this.hideWeight }" @click="ToggleData(3)">Weight</a>
    </template>

    <template v-if="this.showStatHandling">
      <a class="button stat-btn is-small" style="padding:2px; margin:2px; border: 2px solid SlateBlue" v-bind:class="{ hidden:this.hideHandling }" @click="ToggleData(4)">Handling</a>
    </template>

    <template v-if="this.showStatTraction">
      <a class="button stat-btn is-small" style="padding:2px; margin:2px; border: 2px solid LimeGreen" v-bind:class="{ hidden:this.hideTraction }" @click="ToggleData(5)">Traction</a>
    </template>

    <!-- <a class="button stat-btn is-small" style="padding:2px; margin:2px; border: 2px solid Gold" v-bind:class="{ hidden:this.hideSpeed }" @click="ToggleData(1)">Speed</a> -->
    <!-- <a class="button stat-btn is-small" style="padding:2px; margin:2px; border: 2px solid DeepSkyBlue" v-bind:class="{ hidden:this.hideAcceleration }" @click="ToggleData(2)">Accel.</a> -->
    <!-- <a class="button stat-btn is-small" style="padding:2px; margin:2px; border: 2px solid DeepPink" v-bind:class="{ hidden:this.hideWeight }" @click="ToggleData(3)">Weight</a> -->
    <!-- <a class="button stat-btn is-small" style="padding:2px; margin:2px; border: 2px solid SlateBlue" v-bind:class="{ hidden:this.hideHandling }" @click="ToggleData(4)">Handling</a> -->
    <!-- <a class="button stat-btn is-small" style="padding:2px; margin:2px; border: 2px solid LimeGreen" v-bind:class="{ hidden:this.hideTraction }" @click="ToggleData(5)">Traction</a> -->
  </div>

  <driver-slider ref="slider" id="driver-slider" v-model="drSizeFilter" :real-time="true" :height="14" :dot-size="26" :min="1" :max="16" :piecewise-label="true" :bg-style='{backgroundColor:"#D5D5D5"}' :process-style='{backgroundColor:"#FFDB4A"}'>
    <template slot="label" scope="label">
      <div class="driver-slider-label has-text-centered">
        <span v-if="label.label < 7" class="lightLabelDriver">{{ label.label }}</span>
        <span v-if="label.label >= 7 && label.label < 12" class="mediumLabelDriver">{{ label.label }}</span>
        <span v-if="label.label >= 12" class="heavyLabelDriver">{{ label.label }}</span>
      </div>
    </template>
    <template slot="tooltip" scope="tooltip">
      <div class="has-text-centered">
        <span v-if="tooltip.value < 7" class="is-light-bg toolTipDriver">{{tooltip.value}}</span>
        <span v-if="tooltip.value >= 7 && tooltip.value < 12" class="is-medium-bg toolTipDriver">{{tooltip.value}}</span>
        <span v-if="tooltip.value >= 12" class="is-heavy-bg toolTipDriver">{{tooltip.value}}</span>
       </div>
    </template>
    <br>
  </driver-slider>


  <div class="driver-thumbs">
    <div class="driver-thumbs-row">
      <a class="thumbVisible" @click="selectSize(1)" v-bind:class="{ thumbHidden: 1 < drSizeFilter[0] || 1 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/3/3d/MK8_BabyPeach_Icon.png/32px-MK8_BabyPeach_Icon.png" title= "Baby Peach">
      </a>
      <a class="thumbVisible" @click="selectSize(2)" v-bind:class="{ thumbHidden: 2 < drSizeFilter[0] || 2 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/0/09/MK8_BabyRosalina_Icon.png/32px-MK8_BabyRosalina_Icon.png" title="Baby Rosalina">
      </a>
      <a class="thumbVisible" @click="selectSize(3) " v-bind:class="{ thumbHidden: 3 < drSizeFilter[0] || 3 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/5/51/MK8DX_Baby_Mario_Icon.png/32px-MK8DX_Baby_Mario_Icon.png" title="Baby Mario">
      </a>
      <a class="thumbVisible" @click="selectSize(4)" v-bind:class="{ thumbHidden: 4 < drSizeFilter[0] || 4 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/2/24/MK8DX_Koopa_Troopa_Icon.png/32px-MK8DX_Koopa_Troopa_Icon.png" title="Koopa Troopa">
      </a>
      <a class="thumbVisible" @click="selectSize(5)" v-bind:class="{ thumbHidden: 5 < drSizeFilter[0] || 5 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/8/8c/MK8DX_Toadette_Icon.png/32px-MK8DX_Toadette_Icon.png" title="Toadette">
      </a>
      <a class="thumbVisible" @click="selectSize(6)" v-bind:class="{ thumbHidden: 6 < drSizeFilter[0] || 6 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/8/89/MK8DX_Toad_Icon.png/31px-MK8DX_Toad_Icon.png" title="Toad">
      </a>
      <a class="thumbVisible" @click="selectSize(7)" v-bind:class="{ thumbHidden: 7 < drSizeFilter[0] || 7 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/f/fc/MK8DX_Cat_Peach_Icon.png/28px-MK8DX_Cat_Peach_Icon.png" title="Cat Peach">
      </a>
      <a class="thumbVisible" @click="selectSize(8)" v-bind:class="{ thumbHidden: 8 < drSizeFilter[0] || 8 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/1/1f/MK8DX_Peach_Icon.png/32px-MK8DX_Peach_Icon.png" title="Peach">
      </a>
      <a class="thumbVisible" @click="selectSize(9)" v-bind:class="{ thumbHidden: 9 < drSizeFilter[0] || 9 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/f/f7/MK8DX_Tanooki_Mario_Icon.png/31px-MK8DX_Tanooki_Mario_Icon.png" title="Tanooki Mario">
      </a>
      <a class="thumbVisible" @click="selectSize(10)" v-bind:class="{ thumbHidden: 10 < drSizeFilter[0] || 10 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/6/69/MK8DX_Luigi_Icon.png/28px-MK8DX_Luigi_Icon.png" title="Luigi">
      </a>
      <a class="thumbVisible" @click="selectSize(11)" v-bind:class="{ thumbHidden: 11 < drSizeFilter[0] || 11 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/4/4f/MK8DX_Mario_Icon.png/32px-MK8DX_Mario_Icon.png" title="Mario">
      </a>
      <a class="thumbVisible" @click="selectSize(12)" v-bind:class="{ thumbHidden: 12 < drSizeFilter[0] || 12 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/4/4b/MK8DX_Rosalina_Icon.png/28px-MK8DX_Rosalina_Icon.png" title="Rosalina">
      </a>
      <a class="thumbVisible" @click="selectSize(13)" v-bind:class="{ thumbHidden: 13 < drSizeFilter[0] || 13 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/5/51/MK8DX_Waluigi_Icon.png/27px-MK8DX_Waluigi_Icon.png" title="Waluigi">
      </a>
      <a class="thumbVisible" @click="selectSize(14)" v-bind:class="{ thumbHidden: 14 < drSizeFilter[0] || 14 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/c/cd/MK8DX_Wario_Icon.png/32px-MK8DX_Wario_Icon.png" title="Wario">
      </a>
      <a class="thumbVisible" @click="selectSize(15)" v-bind:class="{ thumbHidden: 15 < drSizeFilter[0] || 15 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/e/eb/MK8DX_Metal_Mario_Icon.png/31px-MK8DX_Metal_Mario_Icon.png" title="Metal Mario">
      </a>
      <a class="thumbVisible" @click="selectSize(16)" v-bind:class="{ thumbHidden: 16 < drSizeFilter[0] || 16 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/d/d9/MK8DX_Bowser_Icon.png/32px-MK8DX_Bowser_Icon.png" title="Bowser">
      </a>
    </div>
    <div class="driver-thumbs-row">
      <a class="thumbVisible" @click="selectSize(1)" v-bind:class="{ thumbHidden: 1 < drSizeFilter[0] || 1 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/4/43/MK8_BabyDaisy_Icon.png/32px-MK8_BabyDaisy_Icon.png" title="Baby Daisy">
      </a>
      <a class="thumbVisible" @click="selectSize(2)" v-bind:class="{ thumbHidden: 2 < drSizeFilter[0] || 2 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/f/fc/MK8_Lemmy_Icon.png/32px-MK8_Lemmy_Icon.png" title="Lemmy">
      </a>
      <a class="thumbVisible" @click="selectSize(3)" v-bind:class="{ thumbHidden: 3 < drSizeFilter[0] || 3 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/7/75/MK8DX_Baby_Luigi_Icon.png/31px-MK8DX_Baby_Luigi_Icon.png" title="Baby Luigi">
      </a>
      <a class="thumbVisible" @click="selectSize(4)" v-bind:class="{ thumbHidden: 4 < drSizeFilter[0] || 4 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/6/6f/MK8DX_Lakitu_Icon.png/26px-MK8DX_Lakitu_Icon.png" title="Lakitu">
      </a>
      <a class="thumbVisible" @click="selectSize(5)" v-bind:class="{ thumbHidden: 5 < drSizeFilter[0] || 5 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/2/2c/MK8DX_Wendy_Icon.png/32px-MK8DX_Wendy_Icon.png" title="Wendy">
      </a>
      <a class="thumbVisible" @click="selectSize(6)" v-bind:class="{ thumbHidden: 6 < drSizeFilter[0] || 6 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/4/43/MK8DX_Shy_Guy_Icon.png/32px-MK8DX_Shy_Guy_Icon.png" title="Shy Guy">
      </a>
      <a class="thumbVisible" @click="selectSize(7)" v-bind:class="{ thumbHidden: 7 < drSizeFilter[0] || 7 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/b/b9/MK8DX_Female_Inkling_Icon.png/32px-MK8DX_Female_Inkling_Icon.png" title="Inkling Girl">
      </a>
      <a class="thumbVisible" @click="selectSize(8)" v-bind:class="{ thumbHidden: 8 < drSizeFilter[0] || 8 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/6/6e/MK8DX_Daisy_Icon.png/29px-MK8DX_Daisy_Icon.png" title="Daisy">
      </a>
      <a class="thumbVisible" @click="selectSize(9)" v-bind:class="{ thumbHidden: 9 < drSizeFilter[0] || 9 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/3/3c/MK8DX_Male_Inkling_Icon.png/32px-MK8DX_Male_Inkling_Icon.png" title="Inkling Boy">
      </a>
      <a class="thumbVisible" @click="selectSize(10)" v-bind:class="{ thumbHidden: 10 < drSizeFilter[0] || 10 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/d/d7/MK8DX_Iggy_Icon.png/30px-MK8DX_Iggy_Icon.png" title="Iggy">
      </a>
      <a class="thumbVisible" @click="selectSize(11)" v-bind:class="{ thumbHidden: 11 < drSizeFilter[0] || 11 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/7/7c/MK8DX_Ludwig_Icon.png/32px-MK8DX_Ludwig_Icon.png" title="Ludwig">
      </a>
      <a class="thumbVisible" @click="selectSize(12)" v-bind:class="{ thumbHidden: 12 < drSizeFilter[0] || 12 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/1/1d/MK8DX_King_Boo_Icon.png/30px-MK8DX_King_Boo_Icon.png" title="King Boo">
      </a>
      <a class="thumbVisible" @click="selectSize(13)" v-bind:class="{ thumbHidden: 13 < drSizeFilter[0] || 13 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/9/9b/MK8DX_DK_Icon.png/25px-MK8DX_DK_Icon.png" title="Donkey Kong">
      </a>
      <a class="thumbVisible" @click="selectSize(14)" v-bind:class="{ thumbHidden: 14 < drSizeFilter[0] || 14 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/3/38/MK8DX_Dry_Bowser_Icon.png/32px-MK8DX_Dry_Bowser_Icon.png" title="Dry Bowser">
      </a>
      <a class="thumbVisible" @click="selectSize(15)" v-bind:class="{ thumbHidden: 15 < drSizeFilter[0] || 15 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/2/2b/MK8DX_Pink_Gold_Peach_Icon.png/31px-MK8DX_Pink_Gold_Peach_Icon.png" title="Pink Gold Peach">
      </a>
      <a class="thumbVisible" @click="selectSize(16)" v-bind:class="{ thumbHidden: 16 < drSizeFilter[0] || 16 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/4/47/MK8DX_Morton_Icon.png/30px-MK8DX_Morton_Icon.png" title="Morton">
      </a>
    </div>
    <div class="driver-thumbs-row">
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="thumbVisible" @click="selectSize(3)" v-bind:class="{ thumbHidden: 3 < drSizeFilter[0] || 3 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/3/3f/MK8DX_Dry_Bones_Icon.png/30px-MK8DX_Dry_Bones_Icon.png" title="Dry Bones">
      </a>
      <a class="thumbVisible" @click="selectSize(4)" v-bind:class="{ thumbHidden: 4 < drSizeFilter[0] || 4 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/2/26/MK8_Bowser_Jr_Icon.png/31px-MK8_Bowser_Jr_Icon.png" title="Bowser Jr.">
      </a>
      <a class="thumbVisible" @click="selectSize(5)" v-bind:class="{ thumbHidden: 5 < drSizeFilter[0] || 5 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/5/59/MK8DX_Isabelle_Icon.png/30px-MK8DX_Isabelle_Icon.png" title="Isabelle">
      </a>
      <a class="thumbVisible" @click="selectSize(6)" v-bind:class="{ thumbHidden: 6 < drSizeFilter[0] || 6 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/c/c2/MK8_Larry_Icon.png/32px-MK8_Larry_Icon.png" title="Larry">
      </a>
      <a class="thumbVisible" @click="selectSize(7)" v-bind:class="{ thumbHidden: 7 < drSizeFilter[0] || 7 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/0/00/MK8DX_Female_Villager_Icon.png/32px-MK8DX_Female_Villager_Icon.png" title="Villager (female)">
      </a>
      <a class="thumbVisible" @click="selectSize(8)" v-bind:class="{ thumbHidden: 8 < drSizeFilter[0] || 8 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/3/38/MK8DX_Yoshi_Icon.png/32px-MK8DX_Yoshi_Icon.png" title="Yoshi">
      </a>
      <a class="thumbVisible" @click="selectSize(9)" v-bind:class="{ thumbHidden: 9 < drSizeFilter[0] || 9 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/d/d9/MK8DX_Male_Villager_Icon.png/32px-MK8DX_Male_Villager_Icon.png" title="Villager (male)">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="thumbVisible" @click="selectSize(11)" v-bind:class="{ thumbHidden: 11 < drSizeFilter[0] || 11 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png" title="Mii (medium)">
      </a>
      <a class="thumbVisible" @click="selectSize(12)" v-bind:class="{ thumbHidden: 12 < drSizeFilter[0] || 12 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/c/ce/MK8DX_Link_Icon.png/32px-MK8DX_Link_Icon.png" title="Link">
      </a>
      <a class="thumbVisible" @click="selectSize(13)" v-bind:class="{ thumbHidden: 13 < drSizeFilter[0] || 13 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/3/36/MK8DX_Roy_Icon.png/32px-MK8DX_Roy_Icon.png" title="Roy">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="thumbVisible" @click="selectSize(16)" v-bind:class="{ thumbHidden: 16 < drSizeFilter[0] || 16 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png" title="Mii (heavy)">
      </a>
    </div>
    <div class="driver-thumbs-row">
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="placeholder">
        <img src="../assets/blank32x32.png">
      </a>
      <a class="thumbVisible" @click="selectSize(3)" v-bind:class="{ thumbHidden: 3 < drSizeFilter[0] || 3 > drSizeFilter[1]  }">
        <img src="https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png" title="Mii (light)">
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

  <!-- Driver buttons -->
  <div>

    <a class="button is-small" style="padding:12.5px" @click="changeChartType()">
      <span class="icon"><i class="fa fa-line-chart" aria-hidden="true"></i></span>
    </a>

    <div @click="toggleDriverDropdown" v-bind:class="{ 'is-active' : showDriverDropdown }" class="dropdown">
      <div class="dropdown-trigger">

        <a class="button is-small" style="padding:12.5px" aria-haspopup="true" aria-controls="dropdown-menu">
        <span class="icon"><i class="fa fa-plus" aria-hidden="true"></i></span>
      </a>

      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content" style="width: 120px">

          <a class="dropdown-item" v-bind:class="{ 'is-active' : this.showStatSpeed }" @click="ToggleStat(1)">
          Speed
        </a>

          <a class="dropdown-item" v-bind:class="{ 'is-active' : this.showStatAcceleration }" @click="ToggleStat(2)">
          Acceleration
        </a>

          <a class="dropdown-item" v-bind:class="{ 'is-active' : this.showStatWeight }" @click="ToggleStat(3)">
          Weight
        </a>

          <a class="dropdown-item" v-bind:class="{ 'is-active' : this.showStatHandling }" @click="ToggleStat(4)">
          Handling
        </a>

          <a class="dropdown-item" v-bind:class="{ 'is-active' : this.showStatTraction }" @click="ToggleStat(5)">
          Traction
        </a>





          <!--
          <a href="#" class="dropdown-item">
            Dropdown item
          </a>
          <a class="dropdown-item">
            Other dropdown item
          </a>
          <a href="#" class="dropdown-item">
            Other dropdown item
          </a>
          <hr class="dropdown-divider">
          <a href="#" class="dropdown-item">
            With a divider
          </a> -->


        </div>
      </div>
    </div>







    <!-- <a class="button is-small is-warning" @click="this.showDriverDropdown = !this.showDriverDropdown">ShowDrivers</a> -->
    <a class="button is-small driver-weight is-success" @click="allDrivers">All</a>
    <a class="button is-small driver-weight is-info" @click="lightDrivers">Light</a>
    <a class="button is-small driver-weight is-primary" @click="mediumDrivers">Medium</a>
    <a class="button is-small driver-weight is-danger" @click="heavyDrivers">Heavy</a>
  </div>


</div>
</template>

<script>
import BarChart from './BarChart.js'
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
      showDriverDropdown: false,
      chartType: 'bar',
      isStacked: false,
      ticksMax: 5,
      stepSize: 1,
      drSizeFilter: [0, 6],
      showStatSpeed: true,
      showStatAcceleration: true,
      showStatWeight: true,
      showStatHandling: true,
      showStatTraction: false,
      hideSpeed: false,
      hideAcceleration: false,
      hideWeight: false,
      hideHandling: true,
      hideTraction: true,
      drivers: [
        new Driver("Light", 1, "Baby Peach", "https://www.mariowiki.com/images/thumb/3/3d/MK8_BabyPeach_Icon.png/32px-MK8_BabyPeach_Icon.png", 2.25, 2.5, 2.75, 2, 4, 2, 5, 4.5, 5, 5, 4.25, 4),
        new Driver("Light", 1, "Baby Daisy", "https://www.mariowiki.com/images/thumb/4/43/MK8_BabyDaisy_Icon.png/32px-MK8_BabyDaisy_Icon.png", 2.25, 2.5, 2.75, 2, 4, 2, 5, 4.5, 5, 5, 4.25, 4),
        new Driver("Light", 2, "Baby Rosalina", "https://www.mariowiki.com/images/thumb/0/09/MK8_BabyRosalina_Icon.png/32px-MK8_BabyRosalina_Icon.png", 2.25, 2.5, 2.75, 2, 4.25, 2, 4.75, 4.25, 4.75, 4.75, 3.75, 4),
        new Driver("Light", 2, "Lemmy", "https://www.mariowiki.com/images/thumb/f/fc/MK8_Lemmy_Icon.png/32px-MK8_Lemmy_Icon.png", 2.25, 2.5, 2.75, 2, 4.25, 2, 4.75, 4.25, 4.75, 4.75, 3.75, 4),
        new Driver("Light", 3, "Baby Mario", "https://www.mariowiki.com/images/thumb/5/51/MK8DX_Baby_Mario_Icon.png/32px-MK8DX_Baby_Mario_Icon.png", 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
        new Driver("Light", 3, "Baby Luigi", "https://www.mariowiki.com/images/thumb/7/75/MK8DX_Baby_Luigi_Icon.png/31px-MK8DX_Baby_Luigi_Icon.png", 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
        new Driver("Light", 3, "Dry Bones", "https://www.mariowiki.com/images/thumb/3/3f/MK8DX_Dry_Bones_Icon.png/30px-MK8DX_Dry_Bones_Icon.png", 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
        new Driver("Light", 3, "Mii (light)", "https://www.mariowiki.com/images/thumb/9/96/MK8DX_Mii_Icon.png/32px-MK8DX_Mii_Icon.png", 2.5, 2.75, 3, 2.25, 4.25, 2.25, 4.5, 4, 4.5, 4.5, 4, 3.75),
        new Driver("Light", 4, "Koopa Troopa", "https://www.mariowiki.com/images/thumb/2/24/MK8DX_Koopa_Troopa_Icon.png/32px-MK8DX_Koopa_Troopa_Icon.png", 2.75, 3, 3.25, 2.5, 4, 2.5, 4.5, 4, 4.5, 4.5, 4.25, 3.75),
        new Driver("Light", 4, "Lakitu", "https://www.mariowiki.com/images/thumb/6/6f/MK8DX_Lakitu_Icon.png/26px-MK8DX_Lakitu_Icon.png", 2.75, 3, 3.25, 2.5, 4, 2.5, 4.5, 4, 4.5, 4.5, 4.25, 3.75),
        new Driver("Light", 4, "Bowser Jr.", "https://www.mariowiki.com/images/thumb/2/26/MK8_Bowser_Jr_Icon.png/31px-MK8_Bowser_Jr_Icon.png", 2.75, 3, 3.25, 2.5, 4, 2.5, 4.5, 4, 4.5, 4.5, 4.25, 3.75),
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
        new Driver("Heavy", 12, "Rosalina", "https://www.mariowiki.com/images/thumb/4/4b/MK8DX_Rosalina_Icon.png/28px-MK8DX_Rosalina_Icon.png", 4, 4.25, 4.5, 3.75, 3.25, 3.75, 3.25, 2.75, 3.25, 3.25, 3.75, 3.25),
        new Driver("Heavy", 12, "King Boo", "https://www.mariowiki.com/images/thumb/1/1d/MK8DX_King_Boo_Icon.png/30px-MK8DX_King_Boo_Icon.png", 4, 4.25, 4.5, 3.75, 3.25, 3.75, 3.25, 2.75, 3.25, 3.25, 3.75, 3.25),
        new Driver("Heavy", 12, "Link", "https://www.mariowiki.com/images/thumb/c/ce/MK8DX_Link_Icon.png/32px-MK8DX_Link_Icon.png", 4, 4.25, 4.5, 3.75, 3.25, 3.75, 3.25, 2.75, 3.25, 3.25, 3.75, 3.25),
        new Driver("Heavy", 13, "Waluigi", "https://www.mariowiki.com/images/thumb/5/51/MK8DX_Waluigi_Icon.png/27px-MK8DX_Waluigi_Icon.png", 4.5, 4.75, 5, 4.25, 3.25, 4, 3, 2.5, 3, 3, 3, 3),
        new Driver("Heavy", 13, "Donkey Kong", "https://www.mariowiki.com/images/thumb/9/9b/MK8DX_DK_Icon.png/25px-MK8DX_DK_Icon.png", 4.5, 4.75, 5, 4.25, 3.25, 4, 3, 2.5, 3, 3, 3, 3),
        new Driver("Heavy", 13, "Roy", "https://www.mariowiki.com/images/thumb/3/36/MK8DX_Roy_Icon.png/32px-MK8DX_Roy_Icon.png", 4.5, 4.75, 5, 4.25, 3.25, 4, 3, 2.5, 3, 3, 3, 3),
        new Driver("Heavy", 14, "Wario", "https://www.mariowiki.com/images/thumb/c/cd/MK8DX_Wario_Icon.png/32px-MK8DX_Wario_Icon.png", 4.75, 5, 5.25, 4.5, 3, 4.25, 2.75, 2.25, 2.75, 2.75, 3.25, 2.75),
        new Driver("Heavy", 14, "Dry Bowser", "https://www.mariowiki.com/images/thumb/3/38/MK8DX_Dry_Bowser_Icon.png/32px-MK8DX_Dry_Bowser_Icon.png", 4.75, 5, 5.25, 4.5, 3, 4.25, 2.75, 2.25, 2.75, 2.75, 3.25, 2.75),
        new Driver("Heavy", 15, "Metal Mario", "https://www.mariowiki.com/images/thumb/e/eb/MK8DX_Metal_Mario_Icon.png/31px-MK8DX_Metal_Mario_Icon.png", 4.25, 4.5, 4.75, 4, 3.25, 4.5, 3.25, 2.75, 3.25, 3.25, 3.25, 3),
        new Driver("Heavy", 15, "Pink Gold Peach", "https://www.mariowiki.com/images/thumb/2/2b/MK8DX_Pink_Gold_Peach_Icon.png/31px-MK8DX_Pink_Gold_Peach_Icon.png", 4.25, 4.5, 4.75, 4, 3.25, 4.5, 3.25, 2.75, 3.25, 3.25, 3.25, 3),
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

      //Init
      this.getWidthChange()
      this.getOrientationChange()
    })

  },

  methods: {

    clickMe() {
      console.log('ouch!')
      console.log(this.showDriverDropdown)
      this.showDriverDropdown = false;

    },

    toggleDriverDropdown() {
      this.showDriverDropdown = !this.showDriverDropdown
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
        this.ticksMax = 20;
        this.stepSize = 2;
      } else if (this.chartType === 'stacked') {
        this.chartType = 'bar';
        this.isStacked = false;
        this.ticksMax = 5;
        this.stepSize = 1;
      }
    },
    selectSize(num) {
      this.drSizeFilter = [num, num]
    },
    allDrivers() {
      this.drSizeFilter = [1, 16]
    },
    lightDrivers() {
      this.drSizeFilter = [1, 6]
    },
    mediumDrivers() {
      this.drSizeFilter = [7, 11]
    },
    heavyDrivers() {
      this.drSizeFilter = [12, 16]
    },
    ToggleData(num) {
      switch (num) {
        case 1:
          this.hideSpeed = !this.hideSpeed;
          break;
        case 2:
          this.hideAcceleration = !this.hideAcceleration;
          break;
        case 3:
          this.hideWeight = !this.hideWeight;
          break;
        case 4:
          this.hideHandling = !this.hideHandling;
          break;
        case 5:
          this.hideTraction = !this.hideTraction;
          break;
      }
    },
    ToggleStat(num) {
      switch (num) {
        case 1:
          this.showStatSpeed = !this.showStatSpeed;
          if (this.showStatSpeed)
            this.hideSpeed = false
          else
            this.hideSpeed = true
          break;
        case 2:
          this.showStatAcceleration = !this.showStatAcceleration;
          if (this.showStatAcceleration)
            this.hideAcceleration = false
          else
            this.hideAcceleration = true
          break;
        case 3:
          this.showStatWeight = !this.showStatWeight;
          if (this.showStatWeight)
            this.hideWeight = false
          else
            this.hideWeight = true
          break;
        case 4:
          this.showStatHandling = !this.showStatHandling;
          if (this.showStatHandling)
            this.hideHandling = false
          else
            this.hideHandling = true
          break;
        case 5:
          this.showStatTraction = !this.showStatTraction;
          if (this.showStatTraction)
            this.hideTraction = false
          else
            this.hideTraction = true
          break;
      }
      this.showDriverDropdown = false;
    },
  },
  computed: {
    DrawChart() {
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
              color: ['rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.03)'],
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
          weightClasses.push(i)
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
      var dat = {
        labels: weightClasses,
        datasets: [{
            label: 'Speed', // todo: ref same as btn text
            backgroundColor: 'rgb(255,215,0)', // Gold
            borderColor: 'rgb(255,215,0)',
            data: dataSet1,
            hidden: this.hideSpeed,
            fill: false,
          },
          {
            label: 'Acceleration',
            backgroundColor: 'rgb(0,191,255)', // DeepSkyBlue
            borderColor: 'rgb(0,191,255)',
            data: dataSet2,
            hidden: this.hideAcceleration,
            fill: false,
          },
          {
            label: 'Weight',
            backgroundColor: 'rgb(255,20,147)', // DeepPink
            borderColor: 'rgb(255,20,147)',
            data: dataSet3,
            hidden: this.hideWeight,
            fill: false,
          },
          {
            label: 'Handling',
            backgroundColor: 'rgb(106,90,205)', // SlateBlue
            borderColor: 'rgb(106,90,205)',
            data: dataSet4,
            hidden: this.hideHandling,
            fill: false,
          },
          {
            label: 'Traction',
            backgroundColor: 'rgb(50,205,50)', // LimeGreen
            borderColor: 'rgb(50,205,50)',
            data: dataSet5,
            hidden: this.hideTraction,
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
  user-select:none
  margin-top: 40px

.dr-chart
  user-select: none

.driver-stats
  display: flex
  justify-content: center

.driver-thumbs
  margin-top: 30px
  margin-bottom: 10px
  user-select: none

.driver-thumbs-row
  display: flex
  justify-content: space-between
  padding: 0
  margin: 0

.thumbVisible
  opacity: 1
  transition: opacity .25s ease-in-out

.thumbHidden
  opacity: 0.2
  transition: opacity .25s ease-in-out

.placeholder
  visibility: hidden

.driver-buttons
  margin-top: 0px
  margin-bottom: 50px

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

.driver-weight
  padding-left: 8px
  padding-right: 8px

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

.stat-btn
  border-radius: 2px

.hidden
  border: 2px solid #f9f9f9 !important
  background-color: #f9f9f9
  color: #b3b3b3

.dropdown-item
  user-select: none
  &.is-active
    background-color: #00C4A7
    color: #fff
    font-weight: bold
    margin-top: 2px

</style>
