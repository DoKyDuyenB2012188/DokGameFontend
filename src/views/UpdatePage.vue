<template>
  <main id="main" class="main">
    <div class="container">
      <section
        class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
      >
        <div class="container">
          <div class="row justify-content-center">
            <div
              class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center"
            >
              <div class="mb-3">
                <div>
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">
                      Update an Account
                    </h5>
                    <p class="text-center small">
                      Enter your username and new pass
                    </p>
                  </div>

                  <Form
                    class="row g-3 needs-validation"
                    @submit="handleSubmit"
                    :validation-schema="contactFormSchema"
                    novalidate
                  >
                    <div class="col-12">
                      <label for="yourUsername" class="form-label"
                        >Username</label
                      >
                      <Field
                        v-model="account.username"
                        type="text"
                        name="username"
                        class="form-control"
                        id="yourUsername"
                      />
                      <ErrorMessage
                        name="username"
                        class="error-feedback small"
                        style="color: red"
                      />
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label"
                        >New password</label
                      >
                      <Field
                        v-model="account.password"
                        type="password"
                        name="password"
                        class="form-control"
                        id="yourPassword"
                      />
                      <ErrorMessage
                        name="password"
                        class="error-feedback small"
                        style="color: red"
                      />
                    </div>

                    <div class="col-12">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="remember"
                          value="true"
                          id="rememberMe"
                        />
                        <label class="form-check-label" for="rememberMe"
                          >Accept all our terms</label
                        >
                      </div>
                    </div>
                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit">
                        Create
                      </button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">
                        Detailed terms
                        <a href="pages-register.html">Privacy Policy</a>
                      </p>
                    </div>
                  </Form>
                </div>
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
import ServiceAuth from "@/services/service.auth";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { getCurrentInstance } from "vue";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const contactFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Username must has value")
        .min(2, "Username's minlength is 2 character ")
        .max(50, "Username's maxlength is 50 character"),
      password: yup
        .string()
        .required("Password must has value")
        .max(8, "Password's maxlength is 8 character"),
    });
    return {
      account: "",
      contactFormSchema,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const response = await (await fetch(
          "http://localhost:3000/api/user",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              newpass: this.account.password,
            }),
          }
        )).json();
        const { success, message } = await response;
        alert(message);
        if (success) {
          this.$router.push("/");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.account = {
      username: "",
      password: "",
    };
    this.message = "";
  },
};
</script>
