<template>
  <div>
    <div class="card mb-3">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <div>
              <img
                :src="app.appId.header_image"
                class="img-fluid rounded-3"
                alt="Shopping item"
                style="width: 65px"
              />
            </div>
            <div class="ms-3">
              <h5>{{ app.appId.name }}</h5>
              <p
                v-for="genre in app.appId.genres"
                :key="genre._id"
                class="small mb-0"
              >
                {{ genre.description }}&#160;
              </p>
            </div>
          </div>
          <div class="d-flex flex-row align-items-center">
            <div style="width: 80px">
              <h5 class="mb-0">
                {{ app.appId.price_overview.final_formatted }}
              </h5>
            </div>
            <a @click="removeApp" style="color: #cecece"
              ><i class="fas fa-trash-alt"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async removeApp() {
      console.log("click");
      const accessToken = window.localStorage.getItem("accessToken");
      try {
        const response = await (
          await fetch("http://localhost:3000/api/user/removeCart", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              appId: this.app.appId._id,
            }),
          })
        ).json();
        console.log(response);
        alert(response.message);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
  props: {
    app: { type: Object, required: true },
  },
};
</script>
