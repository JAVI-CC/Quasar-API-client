<template>
  <div class="q-pb-xl">
    <q-layout view="lHh lpr lFf">
      <juego-order></juego-order>
      <juego-list v-if="this.$store.state.juegos.showcomponent" :juegos="all"></juego-list>
      <layout></layout>
    </q-layout>
  </div>
</template>

<script>
import JuegoList from "src/components/juegos/JuegoList.vue";
import Layout from "src/layouts/Layout.vue";
import JuegoOrder from "src/components/juegos/JuegoOrder.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    JuegoList,
    Layout,
    JuegoOrder,
  },
  data() {
    return {};
  },

  created() {
    if (this.$route.name === "juegos-genero") {
      this._fetchJuegosGenero(this.$route.params.genero);
    } else if (this.$route.name === "juegos-desarrolladora") {
      this._fetchJuegosDesarrolladora(this.$route.params.desarrolladora);
    } else if (this.$route.name === "juegos-search"){
      //
    } else {
      this._fetchJuegos(); //Llama al method con el nombre fetchJuegos
    }
  },

  methods: {
    ...mapActions({
      _fetchJuegos: "juegos/fetchJuegos",
      _fetchJuegosDesarrolladora: "juegos/fetchJuegosDesarrolladora",
      _fetchJuegosGenero: "juegos/fetchJuegosGenero",
      _searchJuegos: "juegos/searchJuegos",
    }),
  },
  computed: {
    ...mapGetters("juegos", ["all"]),
  },
};
</script>
