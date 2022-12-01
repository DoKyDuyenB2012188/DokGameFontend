<template>
  <div :id="this.app._id" class="card">
    <div
      :id="'game_slide_' + this.app._id"
      class="carousel slide card-img-top"
      data-bs-touch="false"
      data-bs-interval="false"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          :data-bs-target="'#game_slide_' + this.app._id"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          :data-bs-target="'#game_slide_' + this.app._id"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          :data-bs-target="'#game_slide_' + this.app._id"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          :data-bs-target="'#game_slide_' + this.app._id"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          :data-bs-target="'#game_slide_' + this.app._id"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            :src="this.app.header_image"
            class="d-block w-100"
            alt="..."
            style="border-radius: 0.23rem 0.23rem 0px 0px"
          />
        </div>
        <div
          v-if="this.app.movies.length != 0"
          class="carousel-item"
          style="position: relative"
        >
          <video
            style="width: 100%; border-radius: 0.23rem 0.23rem 0px 0px"
            :id="'hover_to_play_' + this.app._id"
            muted="muted"
            :src="
              this.app.movies.length == 0 ? '' : this.app.movies[0]['webm'].max
            "
          ></video>
          <div
            :id="'content_load_' + this.app._id"
            class="content_load"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            style="position: absolute"
          >
            <div
              :id="'player_' + this.app._id"
              class="player"
              @mouseover="hover = true"
              @mouseleave="hover = false"
            >
              <span>Play</span>
            </div>
          </div>
        </div>

        <div
          class="carousel-item"
          v-for="screenshot in this.app.movies.length != 0
            ? this.app.screenshots.slice(0, 3)
            : this.app.screenshots.slice(0, 4)"
          :key="screenshot._id"
        >
          <img
            :src="screenshot.path_thumbnail"
            class="d-block w-100"
            alt="..."
            style="border-radius: 0.23rem 0.23rem 0px 0px"
          />
        </div>

        <button
          class="carousel-control-prev"
          type="button"
          :data-bs-target="'#game_slide_' + this.app._id"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          :data-bs-target="'#game_slide_' + this.app._id"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="card-body">
      <div>
        <i
          v-if="app.platforms.windows"
          style="margin-right: 5px"
          class="fab fa-windows"
        ></i>
        <i
          v-if="app.platforms.linux"
          style="margin-right: 5px"
          class="fab fa-linux"
        ></i>
        <i
          v-if="app.platforms.mac"
          style="margin-right: 5px"
          class="fab fa-apple"
        ></i>
        <i v-else class="fas fa-laptop"></i>
      </div>
      <a href="" class="text-reset" style="text-decoration: none">
        <h5 class="card-title mb-2">{{ app.name }}</h5>
      </a>
      <div>
        <p v-for="genre in app.genres" :key="genre._id" class="m-0 d-inline">
          {{ genre.description }}&#160;
        </p>
      </div>
      <div class="d-flex justify-content-between">
        <p class="m-0">Recomments:</p>
        <p class="text-dark m-0">{{ app.recommendations.total }}</p>
      </div>
      <div class="d-flex justify-content-between">
        <p class="m-0">Release date:</p>
        <p class="text-dark m-0">{{ app.release_date.date }}</p>
      </div>
      <button
        @click="handleClick"
        class="button-48"
        role="button"
      >
        <span class="text">Add cart</span>
      </button>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { addCart } from "../services/service.user";
export default {
  props: {
    app: { type: Object, required: true },
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    async handleClick(e) {
      console.log(this.app._id);
      const accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) {
        const check = await (
          await fetch("http://localhost:3000/api/auth/protected", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          })
        ).json();
        if (check.success) {
          const result = await (
            await fetch("http://localhost:3000/api/user/addCart", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                appId: this.app._id,
              }),
            })
          ).json();
          alert(result.message);
        } else {
          alert("You must logged");
        }
      } else {
        alert("You must logged");
      }
    },
  },
  watch: {
    async hover(newHover) {
      let id = await this.app._id;
      if (newHover) {
        $(`#hover_to_play_${id}`).trigger("play");
        $(`#player_${id}`).addClass("d-none");
      } else {
        $(`#hover_to_play_${id}`).trigger("pause");
        $(`#player_${id}`).removeClass("d-none");
      }
    },
  },
};
</script>
<style scoped>
body {
  background: #000;
}

.player {
  background: none;
  width: 50px;
  height: 50px;
  border: solid 5px #fff;
  border-radius: 100%;
  position: relative;
  text-indent: -9999px;
  box-shadow: 1px 1px 3px #999999;
}

.player span {
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-left: 20px solid #fff;
  border-bottom: 15px solid transparent;
  position: absolute;
  top: 13%;
  left: 36%;
}
.content_load {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
}
.card {
  border: none;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

/* CSS */
.button-48 {
  appearance: none;
  background-color: #ffffff;
  border-width: 0;
  box-sizing: border-box;
  color: #000000;
  cursor: pointer;
  display: inline-block;
  font-family: Clarkson, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1em;
  margin: 0;
  opacity: 1;
  outline: 0;
  padding: 1.5em 2.2em;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-rendering: geometricprecision;
  text-transform: uppercase;
  transition: opacity 300ms cubic-bezier(0.694, 0, 0.335, 1),
    background-color 100ms cubic-bezier(0.694, 0, 0.335, 1),
    color 100ms cubic-bezier(0.694, 0, 0.335, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.button-48:before {
  animation: opacityFallbackOut 0.5s step-end forwards;
  backface-visibility: hidden;
  background-color: #ebebeb;
  clip-path: polygon(-1% 0, 0 0, -25% 100%, -1% 100%);
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: translateZ(0);
  transition: clip-path 0.5s cubic-bezier(0.165, 0.84, 0.44, 1),
    -webkit-clip-path 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 100%;
}

.button-48:hover:before {
  animation: opacityFallbackIn 0s step-start forwards;
  clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
}

.button-48:after {
  background-color: #ffffff;
}

.button-48 span {
  z-index: 1;
  position: relative;
}
</style>
