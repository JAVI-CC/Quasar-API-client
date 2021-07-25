<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <transition name="q-transition--scale">
      <q-card class="my-card" flat bordered>
        <q-img
          width="300px"
          height="400px"
          class="border-bottom"
          v-bind:src="`${juego.imagen}&t=${dateTime}`"
        />

        <q-card-section>
          <div class="row div-titulo-juego">
            <div class="col-11 q-mt-sm q-mb-xs q-pr-xs">
              <q-btn
                align="left"
                class="text-h6 q-btn-juego"
                flat
                no-caps
                :label="`${juego.nombre}`"
                :to="{
                  name: 'juego-unique',
                  params: { juego: juego.slug },
                }"
              />
            </div>
            <div class="col-1">
              <q-icon
                name="share"
                size="sm"
                color="positive"
                class="cursor-pointer q-pr-md q-pr-mobile-none"
                @click="shareViaWebShare"
              />
            </div>
          </div>
          <q-btn
            class="q-btn-desarrolladora div-juego-desktop text-overline"
            flat
            no-caps
            :color="
              juego.desarrolladora.slug == DesarrolladoraSelectedColour
                ? 'orange-6'
                : 'white'
            "
            :label="`${juego.desarrolladora.nombre}`"
            :to="{
              name: 'juegos-desarrolladora',
              params: { desarrolladora: juego.desarrolladora.slug },
            }"
            @click="fetchJuegosDesarrolladora(juego.desarrolladora.slug)"
          />
          <div class="div-juego-desktop text-caption text-grey">
            {{ juego.descripcion | truncate(115) }}
          </div>

          <div class="div-juego-desktop q-mt-sm q-mb-xs">
            <q-btn
              class="q-mt-sm q-mr-sm q-mb-sm"
              v-for="genero in juego.generos"
              :key="`${genero.slug}`"
              rounded
              :color="
                genero.slug == GeneroSelectedColour ? 'orange-6' : 'primary'
              "
              :size="`sm`"
              :label="`${genero.nombre}`"
              :to="{ name: 'juegos-genero', params: { genero: genero.slug } }"
              @click="fetchJuegosGenero(genero.slug)"
            />
          </div>
        </q-card-section>
        <div class="div-juego-desktop absolute-bottom border-top">
          <q-icon
            class="float-left q-ml-md q-mt-sm q-mb-sm"
            name="event"
            style="font-size: 21px"
          />
          <div class="float-left text-subtitle2 q-ml-md q-mt-sm row flex-start">
            {{ juego.fecha }}
          </div>
          <div
            v-if="this.$store.state.juegos.login"
            class="float-right flex-end q-mt-sm q-mr-md"
          >
            <q-btn
              unelevated
              padding="xs"
              color="yellow-9"
              icon="edit"
              class="q-mr-sm"
              style="font-size: 8px"
              @click="fetchEditJuego(juego.slug)"
            />
            <q-btn
              unelevated
              padding="xs"
              color="red-9"
              icon="delete"
              style="font-size: 8px"
              @click="deleteJuego = true"
            />
          </div>
        </div>

        <q-card-actions class="div-juego-mobile border-bottom">
          <div class="text-body2 q-ml-sm q-pt-none">{{ expandedText }}</div>

          <q-space />

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="
              expanded = !expanded;
              toggleView();
            "
          />
        </q-card-actions>

        <q-slide-transition class="div-juego-mobile">
          <div v-show="expanded">
            <q-separator />
            <div class="q-pt-md q-pl-md q-pr-md q-pb-sm">
              <q-btn
                class="
                  q-btn-desarrolladora
                  display-inline-flex
                  div-juego-mobile
                  text-overline
                "
                flat
                no-caps
                :color="
                  juego.desarrolladora.slug == DesarrolladoraSelectedColour
                    ? 'orange-6'
                    : 'white'
                "
                :label="`${juego.desarrolladora.nombre}`"
                :to="{
                  name: 'juegos-desarrolladora',
                  params: { desarrolladora: juego.desarrolladora.slug },
                }"
                @click="fetchJuegosDesarrolladora(juego.desarrolladora.slug)"
              />
              <div class="text-caption text-grey">
                {{ juego.descripcion }}
              </div>
              <div class="q-mt-sm q-mb-xs">
                <q-btn
                  class="q-mt-sm q-mr-sm q-mb-sm"
                  v-for="genero in juego.generos"
                  :key="`${genero.slug}`"
                  rounded
                  :color="
                    genero.slug == GeneroSelectedColour ? 'orange-6' : 'primary'
                  "
                  :size="`sm`"
                  :label="`${genero.nombre}`"
                  :to="{
                    name: 'juegos-genero',
                    params: { genero: genero.slug },
                  }"
                  @click="fetchJuegosGenero(genero.slug)"
                />
              </div>
              <div class="q-mt-lg border-top">
                <div class="q-mt-sm float-left">
                  <q-icon
                    class="float-left"
                    name="event"
                    style="font-size: 21px"
                  />
                  <div class="text-subtitle2 float-left q-ml-md flex-start">
                    {{ juego.fecha }}
                  </div>
                </div>
                <div v-if="this.$store.state.juegos.login" class="float-right flex-end q-mt-sm">
                  <q-btn
                    unelevated
                    padding="xs"
                    color="yellow-9"
                    icon="edit"
                    class="q-mr-sm"
                    style="font-size: 8px"
                    @click="fetchEditJuego(juego.slug)"
                  />
                  <q-btn
                    unelevated
                    padding="xs"
                    color="red-9"
                    icon="delete"
                    style="font-size: 8px"
                    @click="deleteJuego = true"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-slide-transition>
      </q-card>
    </transition>
     <q-dialog v-model="deleteJuego" persistent>
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
           ¿ Estás seguro de eliminar el juego <b>{{ juego.nombre }}</b> ?
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn flat label="Sí" @click="fetchDeleteJuego(juego.slug)" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      expanded: false,
      expandedText: "Mostrar información",
      //inView: Array.apply(null, Array(50)).map((_) => false),
      deleteJuego: false,
      dateTime: new Date().getTime(),
    };
  },
  props: {
    juego: {
      type: Object,
      required: true,
    },
  },
  filters: {
    truncate: function (data, num) {
      const reqdString = data.split("").slice(0, num).join("");
      return reqdString + "...";
    },
  },
  methods: {
    ...mapActions({
      _fetchJuegos: "juegos/fetchJuegos",
      _fetchJuegosGenero: "juegos/fetchJuegosGenero",
      _fetchJuegosDesarrolladora: "juegos/fetchJuegosDesarrolladora",
      _getJuego: "juegos/getJuego",
      _deleteJuego: "juegos/deleteJuego",
    }),

    toggleView() {
      this.expandedText = this.expanded
        ? "Ocultar información"
        : "Mostrar infromación";
    },
    fetchJuegosDesarrolladora() {
      this._fetchJuegosDesarrolladora();
    },
    fetchJuegosGenero(genero) {
      this._fetchJuegosGenero(genero);
    },
    fetchJuegosDesarrolladora(desarrolladora) {
      this._fetchJuegosDesarrolladora(desarrolladora);
    },
    fetchEditJuego(slug) {
      this._getJuego(slug).then(() => {
        this.$router.push({ name: "update", params: { slug: slug } });
      });
    },
    fetchDeleteJuego(slug) {
      this._deleteJuego(slug).then(() => {
        if (
          this.$store.state.juegos.delete === false &&
          this.$store.state.juegos.errorDelete === true
        ) {
          this.$q.notify({
            type: "negative",
            position: "top",
            icon: "warning",
            message: `No se ha podido eliminar el juego. Por favor intentelo más tarde`,
          });
        } else if (this.$store.state.juegos.delete === true) {
          this.$q.notify({
            type: "positive",
            position: "top",
            icon: "check_circle",
            message: `El juego ${this.juego.nombre} se ha eliminado correctamente!`,
          });
        }
        this._fetchJuegos()
      });
    },
    shareViaWebShare() {
      navigator.share({
        title: this.juego.nombre,
        text: this.juego.descripcion,
        url: this.juego.slug,
      });
    },
  },

  computed: {
    GeneroSelectedColour() {
      //window.scrollTo({ top: 0 });
      return this.$store.getters["juegos/genero"];
    },
    DesarrolladoraSelectedColour() {
      //window.scrollTo({ top: 0 });
      return this.$store.getters["juegos/desarrolladora"];
    },
  },
};
</script>

<style lang="sass" scoped>
@import './src/assets/styles.sass'
</style>

