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
import { onMounted } from "vue";
// import list from '@/shared/data.json';
export default {
  props: {
    filter: { typed: String, required: true },
  },
  components: {
    CardComponent,
  },
  data () {
    return {
      apps: [],
    }
  },
  watch: {
    filter(){
      console.log(this.filter);
      this.getFilterApp();
    }
  },
  methods: {
    async getFilterApp(){
      try {
        const response =  await ServiceStore.getFilter(this.filter);
        if(response.success){
          this.apps = await response.data;
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  created(){
    this.getFilterApp();
  },
};
</script>
