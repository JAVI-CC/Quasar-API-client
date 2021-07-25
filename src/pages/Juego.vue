<template>
  <div>
    <q-layout view="lHh lpr lFf">
      <layout></layout>
      <juego v-if="this.$store.state.juegos.showcomponent" :juegos="juegos"></juego>
    </q-layout>
  </div>
</template>

<script>
import Layout from "src/layouts/Layout.vue";
import Juego from "src/components/juegos/Juego.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Layout,
    Juego,
  },
  data() {
    return {
      juegos: '',
    };
  },

  created() {
    this._getJuego(this.$route.params.juego).then(() => {
      this.juegos = this.$store.getters["juegos/juego"]
    });
  },

  methods: {
    ...mapActions({
      _getJuego: "juegos/getJuego",
    }),
  },
  // computed: {
  //   ...mapGetters("juegos", ["juego"]),
  // },
};
</script>
