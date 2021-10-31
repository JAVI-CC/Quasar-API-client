<template>
  <div>
    <div
      v-if="juegos.length"
      class="q-px-xl q-pt-md"
      :class="juegos.length >= 4 ? 'div-juego-list' : 'div-juego-list-ord'"
    >
      <q-infinite-scroll @load="onLoad" class="infinite-scroll" :offset="250">
        <juego-item
          v-for="(juego, index) in juegos"
          :key="juego.slug"
          :juego="juego"
        ></juego-item>
        <q-spinner-dots
          v-show="this.$store.state.juegos.paginateactive"
          class="float-left q-mt-md q-mb-lg"
          color="primary"
          style="width: 100%"
        />
      </q-infinite-scroll>
    </div>
    <div v-else>
      <juego-not-found></juego-not-found>
    </div>
    <button-top></button-top>
  </div>
</template>

<script>
import JuegoItem from "./JuegoItem.vue";
import JuegoNotFound from "./JuegoNotFound.vue";
import ButtonTop from "./ButtonTop.vue";
import { mapActions } from "vuex";

export default {
  components: {
    JuegoItem,
    JuegoNotFound,
    ButtonTop
  },
  data() {
    return {
      confirm: true,
    };
  },
  props: {
    juegos: {
      //type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      _fetchJuegosPage: "juegos/fetchJuegosPage",
      _fetchJuegosPageOrder: "juegos/fetchJuegosPageOrder",
    }),
    async onLoad(index, done) {
      
        if (this.$store.state.juegos.paginateactive != false) {
          if (this.$store.state.juegos.order === "") {
            await this._fetchJuegosPage(this.$store.state.juegos.paginate);
          } else {
            let paginate = {
              paginate: this.$store.state.juegos.paginate,
              order: this.$store.state.juegos.order,
            };
             await this._fetchJuegosPageOrder(paginate);
          }
          done();
        } else {
          //done(true) para eliminar el icono de cargando
          done();
        }
   
    },
  },
};
</script>

<style lang="sass" scoped>
@import './src/assets/styles.sass'
</style>