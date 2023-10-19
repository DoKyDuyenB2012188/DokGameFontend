<template>
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li class="nav-item">
        <router-link :to="{name: 'store'}" class="nav-link">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </router-link>
      </li>
      <li class="nav-heading">Top</li>

      <li class="nav-item">
        <a id="high_score" class="nav-link collapsed">
          <i class="fas fa-trophy"></i>
          <span>Game high score</span>
        </a>
      </li>
      <!-- End Dashboard Nav -->
      <li class="nav-heading">GENRES</li>
      <li class="nav-item">
        <a
          id="Action"
          @click="handleClick"
          class="form-check d-flex justify-content-between nav-link collapsed genres"
        >
          <div>
            <img
              style="width: 25px; margin-right: 5px"
              src="data:image/png;base64,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"
            />
            <span>Action</span>
          </div>
          <i v-if="genres == 'Action'" id="action" class="fas fa-check"></i>
        </a>
      </li>
      <!-- End Profile Page Nav -->
      <li class="nav-item">
        <a
          id="Adventure"
          @click="handleClick"
          class="form-check d-flex justify-content-between nav-link collapsed genres"
        >
          <div>
            <img
              style="width: 25px; margin-right: 5px"
              src="data:image/png;base64,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"
            />
            <span>Adventure</span>
          </div>
          <i v-if="genres == 'Adventure'" id="adventure" class="fas fa-check"></i>
        </a>
      </li>
      <!-- End Profile Page Nav -->
      <li class="nav-item">
        <a
          id="Racing"
          @click="handleClick"
          class="form-check d-flex justify-content-between nav-link collapsed genres"
        >
          <div>
            <img
              style="width: 25px; margin-right: 5px"
              src="data:image/png;base64,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"
            />
            <span>Racing</span>
          </div>
          <i v-if="genres == 'Racing'" id="racing" class="fas fa-check"></i>
        </a>
      </li>
      <!-- End Profile Page Nav -->
      <li class="nav-item">
        <a
          id="Simulation"
          @click="handleClick"
          class="form-check d-flex justify-content-between nav-link collapsed genres"
        >
          <div>
            <img
              style="width: 25px; margin-right: 5px"
              src="data:image/png;base64,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"
            />
            <span>Simulation</span>
          </div>
          <i v-if="genres == 'Simulation'" id="simulation" class="fas fa-check"></i>
        </a>
      </li>
      <!-- End Profile Page Nav -->
      <li class="nav-item">
        <a
          id="Sports"
          @click="handleClick"
          class="form-check d-flex justify-content-between nav-link collapsed genres"
        >
          <div>
            <img style="width: 25px; margin-right: 5px" src="data:image/png;base64,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" />
            <span>Sports</span>
          </div>
          <i v-if="genres == 'Sports'" id="sports" class="fas fa-check"></i>
        </a>
      </li>
      <!-- End Profile Page Nav -->
      <li class="nav-item">
        <a
          id="Strategy"
          @click="handleClick"
          class="form-check d-flex justify-content-between nav-link collapsed genres"
        >
          <div>
            <img
              style="width: 25px; margin-right: 5px"
              src="data:image/png;base64,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"
            />
            <span>Strategy</span>
          </div>
          <i v-if="genres == 'Strategy'" id="strategy" class="fas fa-check"></i>
        </a>
      </li>
      <!-- End Profile Page Nav -->
      <li class="nav-heading">Platforms</li>
      <li class="nav-item">
        <a
          id="windows"
          @click="handleClick"
          class="form-check d-flex justify-content-between nav-link collapsed platform"
        >
          <div>
            <i class="fab fa-windows"></i>
            <span>Windows</span>
          </div>
          <i v-if="platform == 'windows'" id="window" class="fas fa-check"></i>
        </a>
      </li>
      <!-- End Profile Page Nav -->
      <li class="nav-item">
        <a
          id="linux"
          @click="handleClick"
          class="form-check d-flex justify-content-between nav-link collapsed platform"
        >
          <div>
            <i class="fab fa-linux"></i>
            <span>Linux</span>
          </div>
          <i v-if="platform == 'linux'" id="Linux" class="fas fa-check"></i>
        </a>
      </li>
      <!-- End Profile Page Nav -->
      <li class="nav-item">
        <a
          id="mac"
          @click="handleClick"
          class="form-check d-flex justify-content-between nav-link collapsed platform"
        >
          <div>
            <i class="fab fa-apple"></i>
            <span>Mac</span>
          </div>
          <i v-if="platform == 'mac'" id="Mac" class="fas fa-check"></i>
        </a>
      </li>
      <!-- End Profile Page Nav -->
      <li>Release date</li>
      <li>
        <select
          class="form-select nav-link collapsed release_date"
          aria-label="Default select example"
          id="release"
          @change="handleChange"
        >
          <option class="nav-link collapsed" selected>
            <span>Select a year</span>
          </option>
          <option class="nav-link collapsed" value="2020-2022">
            2020-2022
          </option>
          <option class="nav-link collapsed" value="2010-2019">
            2010-2019
          </option>
          <option class="nav-link collapsed" value="2000-2009">
            2000-2009
          </option>
          <option class="nav-link collapsed" value="1990-1999">
            1990-1999
          </option>
          <option class="nav-link collapsed" value="1980-1989">
            1980-1989
          </option>
          <option class="nav-link collapsed" value="1970-1979">
            1970-1979
          </option>
        </select>
      </li>
    </ul>
  </aside>
  <!-- End Sidebar-->
</template>
<script>
import $ from 'jquery';
export default {
  data() {
    return {
      baseURL: "",
      genres: "",
      platform: "",
      release: "",
    };
  },
  watch: {
    genres(){
      this.changeBase();
    },
    platform(){
      this.changeBase();
    },
    release(){
      this.changeBase();
    }
  },
  methods: {
    changeBase(){
      let baseArr = [];
      let base = "";
      if(this.genres != ""){
        baseArr.push({label: "genres", value: this.genres});
      }
      if(this.platform != ""){
        baseArr.push({label: "platform", value: this.platform});
      }
      if(this.release != ""){
        baseArr.push({label: "release", value: this.release});
      }
      if(baseArr.length == 1){
        base += baseArr[0].label+"="+baseArr[0].value;
      }
      else if(baseArr.length > 1){
        for(let i=0;i< baseArr.length-1; i++){
          base += baseArr[i].label+"="+baseArr[i].value+'&';
        }
        base += baseArr[baseArr.length-1].label+"="+baseArr[baseArr.length-1].value;
      }
      if(base != ""){
        this.$router.push({ name: 'filter', params: { filter: base } });
      }
      else{
        this.$router.push({ name: 'store'});
      }
    },
    handleClick(e) {
      //genres=action&platform=windows&release=2000-2009
      if($(`#${e.target.id}`).hasClass('genres')){
        this.genres = e.target.id;
      }
      if($(`#${e.target.id}`).hasClass('platform')){
        this.platform = e.target.id;
      }
    },
    handleChange(e) {
      this.release = e.target.value;
    },
  },
  created() {
    this.changeBase();
  },
};
</script>
