<template>
  <div>
    <q-header
      reveal
      elevated
      class="layout-padding-mobile bg-dark q-px-xl q-px-mobile-none"
    >
      <q-toolbar>
        <q-item
          exact
          to="/"
          @click="fetchJuegos()"
          clickable
          class="q-pl-mobile-none"
        >
          <q-avatar>
            <img
              style="width: 31px; height: 31px"
              :src="'/icons/favicon-32x32.png'"
            />
          </q-avatar>
        </q-item>
        <q-toolbar-title class="header-title-padding"
          ><span class="toolbar-mobile-none"
            >JAVI-CC JUEGOS API</span
          ></q-toolbar-title
        >

        <q-input
          v-on:keyup.enter="searchJuegos"
          dark
          dense
          standout
          rounded
          v-model="search"
          style="width: 180px"
          input-class="text-right"
          class="q-ml-md q-pr-md"
        >
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </q-input>
        <q-icon
          name="share"
          size="sm"
          color="positive"
          class="cursor-pointer q-pr-md q-pr-mobile-none"
          @click="shareViaWebShare"
        />
      </q-toolbar>
    </q-header>

    <q-footer elevated class="layout-padding-mobile bg-dark q-pl-xl q-pr-xl">
      <q-toolbar>
        <q-btn
          flat
          icon="fas fa-home"
          class="q-mr-none hemhem"
          @click="toTop"
          label="Inicio"
        />
        <q-space />
        <q-btn
          v-if="this.$store.state.juegos.login"
          flat
          icon="fas fa-door-open"
          class="q-mr-sm"
          label="Salir"
          @click="toLogout"
        />
        <q-btn
          v-else
          flat
          icon="fas fa-user-secret"
          to="/auth/login"
          class="q-mr-sm"
          label="Acceder"
        />
        <q-space />
        <q-btn
          flat
          icon="fas fa-plus"
          class="q-mr-sm"
          label="Crear"
          @click="toCreate"
        />
        <q-space />
        <q-btn
          flat
          icon="far fa-question-circle"
          class="q-mr-sm"
          @click="infoUrl"
          label="Ayuda"
        />
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      keyword: "",
      sfClose: true,
    };
  },
  methods: {
    toTop() {
      if (this.$route.fullPath === "/") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        this.$router.push({ name: "juegos" });
      }
    },
    toCreate() {
      if (this.$route.name != "add") {
        if (this.$route.name != "login") {
          if (this.$store.state.juegos.login === true) {
            this.$router.push({ name: "add" });
          } else {
            this.$router.push({ name: "login" });
          }
        }
      }
    },
    toLogout() {
      this._logout().then(() => {
        this.$q.notify({
          type: "dark",
          position: "top",
          icon: "lock",
          message: `Has cerrado sessión!`,
        });
        this.$router.push({ name: "juegos" });
      });
    },
    infoUrl() {
      window.open(
        "https://github.com/JAVI-CC/Quasar-Vuejs-API-client",
        "_blank"
      );
    },
    ...mapActions({
      _fetchJuegos: "juegos/fetchJuegos",
      _searchJuegos: "juegos/searchJuegos",
      _logout: "juegos/logout",
    }),
    fetchJuegos() {
      //this.$router.go()
      this.search = "";
      this._fetchJuegos();
    },
    searchJuegos() {
      if (this.search != "") {
        let search = {
          search: this.search,
          type: this.$store.getters["juegos/type"],
        };
        this._searchJuegos(search).then(() => {
          if (this.$route.fullPath != "/") {
            this.$router.push({
              name: "juegos-search",
              params: { search: this.search },
            });
          }
        });
      }
    },
    shareViaWebShare() {
      let url = "";
      if (this.$store.getters["juegos/desarrolladora"] != "") {
        url = "desarrolladora/" + this.$store.getters["juegos/desarrolladora"];
      } else if (this.$store.getters["juegos/genero"] != "") {
        url = "genero/" + this.$store.getters["juegos/genero"];
      } else if (this.$store.getters["juegos/search"] != "") {
        url = "search/" + this.$store.getters["juegos/search"];
      }

      navigator.share({
        title: "JAVI-CC JUEGOS API",
        text: "Vuejs client connected to laravel api server",
        url: url,
      });
    },
  },
};
</script>

<style lang="sass" scoped>
@import './src/assets/styles.sass'
</style>