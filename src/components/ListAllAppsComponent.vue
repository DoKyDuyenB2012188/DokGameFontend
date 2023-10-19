<template>
  <header>
    <main id="main" class="main">
      <div class="container py-5">
        <div class="row">
          <div
            class="col-lg-4 col-md-6 mb-4"
            v-for="app in apps"
            :key="app._id"
          >
            <CardComponent :app="app" />
          </div>
        </div>
      </div>
    </main>
  </header>
</template>
<script>
import CardComponent from "@/components/CardComponent.vue";
import ServiceStore from "@/services/service.store";

// import list from '@/shared/data.json';
export default {
  components: {
    CardComponent,
  },
  data() {
    return {
      apps: [],
    };
  },
  methods: {
    async getAllApps() {
      try {
        const response = await ServiceStore.getAllApps();
        if (response.success) {
          this.apps = await response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getAllApps();
  },
};
</script>
