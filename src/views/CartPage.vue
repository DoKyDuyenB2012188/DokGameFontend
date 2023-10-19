<template>
  <main id="main" class="main">
    <div class="container">
      <section
        class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
      >
        <div class="container">
          <div class="row justify-content-center">
            <div
              class="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center"
            >
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <div>
                  <p class="mb-0">
                    You have {{ cart.length }} items in your cart
                  </p>
                </div>
              </div>
              <div v-for="app in cart" :key="app.appId._id">
                <CardInCartVue
                  :cart="cart"
                  @cart-updated="handleDataUpdated"
                  :app="app"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  <!-- End #main -->
</template>
<script>
import CardInCartVue from "@/components/CardInCart.vue";
export default {
  components: {
    CardInCartVue,
  },
  data() {
    return {
      cart: [],
    };
  },
  methods: {
    handleDataUpdated(updatedData) {
      this.cart = updatedData
    },
    async showCart() {
      const accessToken = window.localStorage.getItem("accessToken");
      try {
        const response = await (
          await fetch("http://localhost:3000/api/user/cart", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          })
        ).json();
        if (response.success) {
          this.cart = response.apps;
          console.log(response.apps);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.showCart();
  },
};
</script>
