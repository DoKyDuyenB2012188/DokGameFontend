<template>
  <div id="main_content">
    <HeaderComponentVue v-model="accessToken" />
    <MenuComponentVue/>
    <!-- <ListCardComponentVue :filter="filter"/> -->
    <router-view />
  </div>
</template>
<script>
import HeaderComponentVue from "@/components/HeaderComponent.vue";
import MenuComponentVue from "@/components/MenuComponent.vue";
import ListCardComponentVue from "@/components/ListCardComponent.vue";
export default {
  data () {
    return {
      accessToken: "",
    }
  },
  components: {
    HeaderComponentVue,
    MenuComponentVue,
    ListCardComponentVue,
  },
};
</script>
<style>
@import "./assets/style.css";
</style>
