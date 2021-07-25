<template>
  <div class="q-pa-md q-px-xl q-pt-xl q-mt-xl q-pb-xl q-mx-md div-add-juego">
    <div class="q-ml-md div-add-margin-left-none">
      <div class="row div-add">
        <div class="col">
          <div class="text-h6 q-mb-md">Actualizar juego</div>
          <ValidationObserver v-slot="{ handleSubmit, invalid }">
            <q-form class="q-gutter-md" @submit.prevent="submit">
              <ValidationProvider
                name="nombre"
                class="input-add-form input-icon-padding"
                rules="min:2|max:255"
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
                rules="min:2|max:255"
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
                rules="min:10|max:800"
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
                rules=""
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
                rules="mimes:['mage/jpg', 'image/jpeg', 'image/png']|size:4096"
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
                rules="min:10|max:10"
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
                :disabled="invalid"
                @click="editJuego()"
                color="warning"
                icon="update"
                label="Actualizar"
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
          <form-update-child
            :nombre="nombre"
            :desarrolladora="desarrolladora"
            :descripcion="descripcion"
            :generos="selectGeneros"
            :fecha="fecha"
            :imagen="imageData"
            :imagenDefault="imagenDefault"
          ></form-update-child>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormUpdateChild from "src/components/juegos/FormUpdateChild.vue";
//const stringOptions = this.$store.getters["juegos/generos"];
//const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
export default {
  components: {
    FormUpdateChild,
  },
  data() {
    return {
      nombre: this.juegos.nombre,
      desarrolladora: this.juegos.desarrolladora.nombre,
      descripcion: this.juegos.descripcion,
      fecha: this.juegos.fecha,
      imagen: null,
      imagenDefault: this.juegos.imagen,
      imageData: this.juegos.imagen,
      selectGeneros: this.juegos.generos,
      alert: false,
      filterOptions: this.$store.getters["juegos/generos"],
    };
  },
  created() {
    this._fetchGeneros();
    this.selectGeneros = this.selectGeneros.map(function (obj) {
      return obj.nombre;
    });
  },
  props: {
    juegos: {
      //type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      _fetchGeneros: "juegos/fetchGeneros",
      _getJuego: "juegos/getJuego",
      _updateJuegoWithImage: "juegos/updateJuegoWithImage",
      _updateJuegoWithoutImage: "juegos/updateJuegoWithoutImage",
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
    editJuego() {
      if (this.imagen != null) {
        let juego = new FormData();
        juego.append("imagen", this.imagen);
        juego.append("slug", this.juegos.slug);
        if (this.nombre != null) {
          juego.append("nombre", this.nombre);
        }
        if (this.desarrolladora != null) {
          juego.append("desarrolladora", this.desarrolladora);
        }
        if (this.descripcion != null) {
          juego.append("descripcion", this.descripcion);
        }
        if (this.selectGeneros != null) {
          for (var i = 0; i < this.selectGeneros.length; i++) {
            juego.append(
              "generos[]",
              this.sanitizeTitle(this.selectGeneros[i])
            );
          }
        }
        if (this.fecha != null && this.fecha != "") {
          juego.append("fecha", this.fecha);
        }

        this._updateJuegoWithImage(juego).then(() => {
          if (
            this.$store.state.juegos.edit === false &&
            this.$store.state.juegos.errorEdit === true
          ) {
            this.alert = true;
            return true;
          } else if (this.$store.state.juegos.edit === true) {
            this.$q.notify({
              type: "positive",
              position: "top",
              icon: "check_circle",
              message: `El juego se ha actualizado correctamente!`,
            });
            this._getJuego(this.$store.state.juegos.editSlug).then(() => {
              this.$router.push({
                name: "juego-unique",
                params: { juego: this.$store.state.juegos.editSlug },
              });
            });
          }
        });
      } else {
        let juegoObj = {};
        juegoObj.slug = this.juegos.slug;
        if (this.nombre != null) {
          juegoObj.nombre = this.nombre;
        }
        if (this.desarrolladora != null) {
          juegoObj.desarrolladora = this.desarrolladora;
        }
        if (this.descripcion != null) {
          juegoObj.descripcion = this.descripcion;
        }
        if (this.selectGeneros != null && this.selectGeneros.length > 0) {
          let generoArr = [];
          for (var i = 0; i < this.selectGeneros.length; i++) {
            generoArr.push(this.sanitizeTitle(this.selectGeneros[i]));
          }
          juegoObj.generos = generoArr
        }
        if (this.fecha != null  && this.fecha != "") {
          juegoObj.fecha = this.fecha;
        }
        this._updateJuegoWithoutImage(juegoObj).then(() => {
          if (
            this.$store.state.juegos.edit === false &&
            this.$store.state.juegos.errorEdit === true
          ) {
            this.alert = true;
            return true;
          } else if (this.$store.state.juegos.edit === true) {
            this.$q.notify({
              type: "positive",
              position: "top",
              icon: "check_circle",
              message: `El juego se ha actualizado correctamente!`,
            });
            this._getJuego(this.$store.state.juegos.editSlug).then(() => {
              this.$router.push({
                name: "juego-unique",
                params: { juego: this.$store.state.juegos.editSlug },
              });
            });
          }
        });
      }
    },
    sanitizeTitle: function (title) {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e");
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
      // Letter "d"
      slug = slug.replace(/đ/gi, "d");
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, "");
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, "-");

      return slug;
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