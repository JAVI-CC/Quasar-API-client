<template>
  <div class="q-pa-md q-px-xl q-pt-xl q-mt-xl q-pb-xl q-mx-md div-add-juego">
    <div class="q-ml-md div-add-margin-left-none">
      <div class="row div-add">
        <div class="col">
          <div class="text-h6 q-mb-md">Insertar juego</div>
          <ValidationObserver v-slot="{ handleSubmit, invalid }">
            <q-form class="q-gutter-md" @submit.prevent="submit">
              <ValidationProvider
                name="nombre"
                class="input-add-form input-icon-padding"
                rules="required|min:2|max:255"
                v-slot="v"
              >
                <q-input
                  validateOnInput
                  filled
                  clearable
                  label="Nombre"
                  name="nombre"
                  type="text"
                  v-model="nombre"
                  :error="v.errors.length > 0"
                  :error-message="v.errors[0]"
                  class="q-mb-lg q-ml-md inputs-add"
                >
                  <template v-slot:prepend>
                    <q-icon name="videogame_asset" />
                  </template>
                </q-input>
              </ValidationProvider>

              <ValidationProvider
                name="desarrolladora"
                class="input-add-form input-icon-padding"
                rules="required|min:2|max:255"
                v-slot="v"
              >
                <q-input
                  validateOnInput
                  filled
                  clearable
                  label="Desarrolladora"
                  name="desarrolladora"
                  type="text"
                  v-model="desarrolladora"
                  :error="v.errors.length > 0"
                  :error-message="v.errors[0]"
                  class="q-mb-lg q-ml-md inputs-add"
                >
                  <template v-slot:prepend>
                    <q-icon name="supervised_user_circle" />
                  </template>
                </q-input>
              </ValidationProvider>

              <ValidationProvider
                name="descripcion"
                class="input-add-form input-icon-padding"
                rules="required|min:10|max:800"
                v-slot="v"
              >
                <q-input
                  validateOnInput
                  filled
                  clearable
                  autogrow
                  label="Descripción"
                  name="descripcion"
                  type="text"
                  v-model="descripcion"
                  :error="v.errors.length > 0"
                  :error-message="v.errors[0]"
                  class="q-mb-lg q-ml-md input-textarea-descripcion inputs-add"
                >
                  <template v-slot:prepend>
                    <q-icon name="text_fields" />
                  </template>
                </q-input>
              </ValidationProvider>

              <ValidationProvider
                name="generos"
                class="input-add-form input-icon-padding"
                rules="required"
                v-slot="v"
              >
                <div class="div-selector-generos q-ml-md">
                  <q-select
                    class="add-select-generos-padding"
                    filled
                    v-model="selectGeneros"
                    use-input
                    use-chips
                    map-options
                    emit-value
                    option-value="slug"
                    option-label="nombre"
                    placeholder="Generos"
                    :error="v.errors.length > 0"
                    :error-message="v.errors[0]"
                    counter
                    max-values="5"
                    hint="Selecciona hasta 5 generos"
                    multiple
                    input-debounce="0"
                    :options="filterOptions"
                    @filter="filterFn"
                  >
                    <template v-slot:prepend>
                      <q-icon name="gamepad" />
                    </template>
                  </q-select>
                </div>
              </ValidationProvider>

              <ValidationProvider
                name="imagen"
                class="
                  input-add-form input-icon-padding input-add-validation-imagen
                "
                rules="required|mimes:['mage/jpg', 'image/jpeg', 'image/png']|size:4096"
                v-slot="v"
              >
                <q-file
                  v-model="imagen"
                  validateOnInput
                  filled
                  counter
                  clearable
                  label="Imagen"
                  name="imagen"
                  :error="v.errors.length > 0"
                  :error-message="v.errors[0]"
                  accept="image/jpg,image/jpeg,image/png"
                  @input="onImagenChange"
                  class="q-mb-lg q-ml-md input-add-imagen"
                >
                  <template v-slot:hint>Medida recomendada: 300x400</template>

                  <template v-slot:prepend>
                    <q-icon name="image" />
                  </template>
                </q-file>
              </ValidationProvider>

              <ValidationProvider
                name="fecha"
                class="
                  input-add-form input-icon-padding input-add-validation-fecha
                "
                rules="required|min:10|max:10"
                v-slot="v"
              >
                <q-input
                  class="q-mb-lg q-ml-md input-add-fecha"
                  filled
                  v-model="fecha"
                  mask="####-##-##"
                  validateOnInput
                  clearable
                  readonly
                  :error="v.errors.length > 0"
                  :error-message="v.errors[0]"
                  name="fecha"
                  label="Fecha"
                >
                  <template v-slot:hint
                    >Pulsa en el icono para desplegar el calendario</template
                  >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="fecha" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn
                              label="Establecer"
                              color="primary"
                              flat
                              v-close-popup
                            />
                            <q-btn
                              v-close-popup
                              label="Cerrar"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </ValidationProvider>
              <q-btn
                class="q-mt-lg q-mb-md q-ml-md button-add"
                style="display: block"
                rounded
                :disabled="!isComplete || invalid"
                @click="addJuego()"
                color="primary"
                icon="save"
                label="Insertar"
              />
            </q-form>
          </ValidationObserver>
        </div>

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
              El nombre del juego que has introducido ya existe!
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Ok" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <div class="col items-center div-vista-previa">
          <div class="text-h6 text-center q-mb-md">Vista previa</div>
          <form-add-child
            :nombre="nombre"
            :desarrolladora="desarrolladora"
            :descripcion="descripcion"
            :generos="selectGeneros"
            :fecha="fecha"
            :imagen="imageData"
          ></form-add-child>
        </div>
      </div>
    </div>
    <button-top></button-top>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormAddChild from "src/components/juegos/FormAddChild.vue";
import ButtonTop from "./ButtonTop.vue";
import MixinsApp from "src/mixins/App";
export default {
  components: {
    FormAddChild,
    ButtonTop,
  },
  mixins: [MixinsApp],
  data() {
    return {
      nombre: "",
      desarrolladora: "",
      descripcion: "",
      fecha: "",
      imagen: null,
      urlImagen: "",
      imageData: "",
      selectGeneros: null,
      alert: false,
      filterOptions: this.$store.getters["juegos/generos"],
    };
  },
  created() {
    this._fetchGeneros();
  },
  methods: {
    ...mapActions({
      _fetchGeneros: "juegos/fetchGeneros",
      _addJuego: "juegos/addJuego",
    }),
    filterFn(val, update) {
      update(() => {
        var options = this.$store.getters["juegos/generos"];
        var stringOptions = options.map(function (obj) {
          return obj.nombre;
        });

        if (val === "") {
          this.filterOptions = stringOptions;
        } else {
          const needle = val.toLowerCase();
          //let stringOptions = stringOptions.nombre
          this.filterOptions = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    onImagenChange() {
      if (this.imagen != null) {
        const files = this.imagen;
        this.FileImage = files;
        if (files && files) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageData = e.target.result;
          };
          reader.readAsDataURL(files);
          //this.$emit("input", files);
        }
      } else {
        this.imageData = "";
      }
    },
    addJuego() {
     
      for (var i = 0; i < this.selectGeneros.length; i++) {
        this.selectGeneros[i] = this.sanitizeTitle(this.selectGeneros[i]);
      }
      
      let juego = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        desarrolladora: this.desarrolladora,
        generos: this.selectGeneros,
        fecha: this.fecha,
        imagen: this.imageData,
      }

      this._addJuego(juego).then(() => {
        if (
          this.$store.state.juegos.add === false &&
          this.$store.state.juegos.errorAdd === true
        ) {
          this.alert = true;
          return true;
        } else if (this.$store.state.juegos.add === true) {
          this.$router.push({
            name: "juego-unique",
            params: { juego: this.sanitizeTitle(this.nombre) },
          });
          this.$q.notify({
            type: "positive",
            position: "top",
            icon: "check_circle",
            message: `El juego ${this.nombre} se ha creado correctamente!`,
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters("juegos", ["generos"]),
    isComplete() {
      return (
        this.nombre &&
        this.desarrolladora &&
        this.descripcion &&
        this.generos &&
        this.imagen &&
        this.fecha
      );
    },
  },
};
</script>

<style lang="sass" scoped>
@import './src/assets/styles.sass'
</style>