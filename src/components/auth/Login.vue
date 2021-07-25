<template>
  <div
    class="
      q-pa-md q-px-xl q-pt-xl q-mt-xl q-pb-xl q-mx-md
      div-padding-login-mobile div-margin-login-mobile
    "
  >
    <div class="q-ml-md">
      <div class="text-h4">Iniciar sesión</div>
      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <q-form
          class="q-gutter-md q-pt-lg q-pl-md q-pr-lg"
          @submit.prevent="submit"
        >
          <ValidationProvider name="email" rules="required|email" v-slot="v">
            <q-input
              validateOnInput
              class="input-desktop-login input-login-email input-icon-padding"
              dark
              clearable
              color="white"
              name="email"
              :error="v.errors.length > 0"
              :error-message="v.errors[0]"
              v-model="email"
              label="Email"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
          </ValidationProvider>

          <ValidationProvider
            name="contraseña"
            rules="required|min:8|max:100"
            v-slot="v"
          >
            <q-input
              validateOnInput
              class="
                input-desktop-login input-login-password input-icon-padding
              "
              color="white"
              name="contraseña"
              v-model="contraseña"
              :error="v.errors.length > 0"
              :error-message="v.errors[0]"
              clearable
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña"
            >
              <template v-slot:prepend>
                <q-icon name="password" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </ValidationProvider>

          <q-btn
            class="q-mt-lg q-mb-md q-ml-none"
            style="display: block"
            :disabled="!isComplete || invalid"
            color="primary"
            icon-right="send"
            label="Acceder"
            @click="Login()"
          />
        </q-form>
      </ValidationObserver>

      <q-dialog v-model="alert" persistent>
        <q-card>
          <q-toolbar>
            <q-avatar>
              <img
                style="width: 38px; height: 38px"
                :src="'/icons/favicon-38x38.png'"
              />
            </q-avatar>

            <q-toolbar-title
              ><span class="text-weight-bold">JAVI-CC</span> JUEGOS
              API</q-toolbar-title
            >
          </q-toolbar>

          <q-card-section>
            Las creedenciales que has introducido no son correctas!
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Ok" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      contraseña: "",
      isPwd: true,
      alert: false,
    };
  },
  methods: {
    ...mapActions({
      _login: "juegos/login",
    }),
    Login() {
      let credentials = {
        email: this.email,
        password: this.contraseña,
      };

      this._login(credentials).then(() => {
        if (
          this.$store.state.juegos.login === false &&
          this.$store.state.juegos.errorLogin === true
        ) {
          this.alert = true;
          return true;
        } else if (this.$store.state.juegos.login === true) {
          this.$q.notify({
            type: "positive",
            position: "top",
            icon: "lock_open",
            message: `Has iniciado sessión!`,
          });
          this.$router.push({ name: "juegos" });
        }
      });
    },
  },
  computed: {
    isComplete() {
      return this.contraseña && this.email;
    },
  },
};
</script>

<style lang="sass" scoped>
@import './src/assets/styles.sass'
</style>