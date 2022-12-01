<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <router-link
        :to="{ name: 'store' }"
        class="logo d-flex align-items-center"
      >
        <i class="d-none d-lg-block fas fa-dragon"></i>
        <span class="d-none d-lg-block">DokGame</span>
      </router-link>
      <i @click="toggleBar()" class="fas fa-bars toggle-sidebar-btn"></i>
    </div>
    <!-- End Logo -->

    <div class="search-bar">
      <form
        class="search-form d-flex align-items-center"
        method="POST"
        action="#"
      >
        <input
          type="text"
          name="query"
          placeholder="Search"
          title="Enter search keyword"
        />
        <button type="submit" title="Search">
          <i class="fas fa-search"></i>
        </button>
      </form>
    </div>
    <!-- End Search Bar -->

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">
        <li class="nav-item d-block d-lg-none">
          <a
            @click="toggleSearch()"
            class="nav-link nav-icon search-bar-toggle"
            href="#"
          >
            <i class="fas fa-search"></i>
          </a>
        </li>
        <!-- End Search Icon-->
        <li v-if="login == false" class="nav-item" style="margin-right: 15px">
          <router-link
            :to="{ name: 'login' }"
            class="nav-link nav-profile"
            href="#"
          >
            <span>LOG IN</span> </router-link
          ><!-- End Messages Icon -->
        </li>
        <!-- End Cart Nav -->
        <li v-if="login == false" class="nav-item" style="margin-right: 15px">
          <router-link
            :to="{ name: 'register' }"
            class="nav-link nav-profile"
            href="#"
          >
            <span>SIGN UP</span> </router-link
          ><!-- End Messages Icon -->
        </li>
        <!-- End Cart Nav -->

        <li v-if="login == true" class="nav-item">
          <router-link
            :to="{ name: 'cart' }"
            class="nav-link nav-icon"
            href="#"
          >
            <i class="fas fa-shopping-cart"></i>
            <span class="badge bg-success badge-number">3</span> </router-link
          ><!-- End Messages Icon -->
        </li>
        <!-- End Cart Nav -->
        <li v-if="login == true" class="nav-item dropdown pe-3">
          <a
            class="nav-link nav-profile d-flex align-items-center pe-0"
            href="#"
            data-bs-toggle="dropdown"
          >
            <i class="fas fa-user"></i>
            <span class="d-none d-md-block dropdown-toggle ps-2"
              >{{this.username}}</span
            > </a
          ><!-- End Profile Iamge Icon -->

          <ul
            class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
          >
            <li class="dropdown-header"></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                href="users-profile.html"
              >
                <i class="bi bi-person"></i>
                <span>My Profile</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>

            <li>
              <router-link :to="{name: 'update'}"
                class="dropdown-item d-flex align-items-center"
              >
                <i class="bi bi-gear"></i>
                <span>Account Settings</span>
              </router-link>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>

            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                href="pages-faq.html"
              >
                <i class="bi bi-question-circle"></i>
                <span>Need Help?</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>

            <li>
              <a @click="handleOut" class="dropdown-item d-flex align-items-center" href="#">
                <i class="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>
          </ul>
          <!-- End Profile Dropdown Items -->
        </li>
        <!-- End Profile Nav -->
      </ul>
    </nav>
    <!-- End Icons Navigation -->
  </header>
</template>

<script>
import $ from "jquery";
import ServiceAuth from "@/services/service.auth";
export default {
  data() {
    return {
      login: false,
      username: "",
    };
  },
  methods: {
    toggleBar() {
      if ($("#main_content").hasClass("toggle-sidebar")) {
        $("#main_content").removeClass("toggle-sidebar");
      } else {
        $("#main_content").addClass("toggle-sidebar");
      }
    },
    toggleSearch() {
      if ($(".search-bar").hasClass("search-bar-show")) {
        $(".search-bar").removeClass("search-bar-show");
      } else {
        $(".search-bar").addClass("search-bar-show");
      }
    },
    async handleOut(){
      const response = await ServiceAuth.logout();
      console.log(response.message);
      window.localStorage.clear();
      window.location.reload();
    },
    async checkUserValid() {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken) {
          const result = await (
            await fetch("http://localhost:3000/api/auth/protected", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
              },
            })
          ).json();
          if(result.success){
            this.username = window.localStorage.getItem('user');
            this.login = true;
          }//else{
          //   const response = await ServiceAuth.refresh_token();
          //   if(response.accessToken){
          //     window.localStorage.setItem('accessToken', response.accessToken);
          //     this.$router.push("/");
          //   }
          // }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.checkUserValid();
  },
};
</script>
