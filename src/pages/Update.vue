<template>
  <div>
    <q-layout view="lHh lpr lFf">
      <layout></layout>
      <form-update
        v-if="this.$store.state.juegos.showcomponent"
        :juegos="juego"
      ></form-update>
    </q-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Layout from "src/layouts/Layout.vue";
import FormUpdate from "src/components/juegos/FormUpdate.vue";

export default {
  components: {
    Layout,
    FormUpdate,
  },
  data() {
    return {
      juegos: "",
    };
  },
  methods: {
    ...mapActions({
      _getJuego: "juegos/getJuego",
    }),
  },
  mounted() {
    if (this.$store.getters["juegos/juego"].length <= 0) {
      this._getJuego(this.$route.params.slug).then(() => {
        this.juegos = this.$store.getters["juegos/juego"]
        if (this.$store.state.juegos.login === false) {
          this.$router.push({ name: "forbidden" });
        } else if (this.juegos.error === 'Juego no encontrado' || this.juegos === "" || this.juegos === null) {
          this.$router.push({ name: "not-found" });
        }
      });
    }


  },
  computed: {
    ...mapGetters("juegos", ["juego"]),
  },
};
</script>
