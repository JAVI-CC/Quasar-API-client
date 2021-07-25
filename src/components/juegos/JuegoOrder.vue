<template>
  <div class="q-mt-xl q-pl-xl item-order-mobile-juegoorder item-order-juegoorder">
    <div class="q-gutter-md q-pl-md q-pl-33-order">
      <!-- <q-badge color="secondary" multi-line> Model: "{{ selected }}" </q-badge> -->

      <q-select
        filled
        v-model="selected"
        :options="options"
        label="(BETA) Ordenar por..."
        color="orange-6"
        clearable
        class="q-pt-xl"
        @input="onChange($event)"
        options-selected-class="text-orange-6"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>


<script>
import { mapMutations, mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      selected: null,
      options: [
        {
          label: "Nombre (A-Z)",
          value: "1",
          icon: "fas fa-sort-alpha-down",
        },
        {
          label: "Nombre (Z-A)",
          value: "2",
          icon: "fas fa-sort-alpha-down-alt",
        },
        {
          label: "Fecha Ascendente",
          value: "3",
          icon: "fas fa-calendar-week",
        },
        {
          label: "Fecha Descendente",
          value: "4",
          icon: "fas fa-calendar-alt",
        },
      ],
    };
  },
  methods: {
    onChange(event) {
      event === null ? (event = 0) : (event = event.value);

      let search = {
        search: this.$store.getters["juegos/search"],
        type: event,
      };
      this._searchJuegos(search);
    },
    ...mapActions({
      _searchJuegos: "juegos/searchJuegos",
    }),
  },
};
</script>

<style lang="sass" scoped>
.item-order-juegoorder
  max-width: 300px
.q-pl-33-order
  padding-left: 33px

@media (max-width: 764px)
  .item-order-juegoorder
    max-width: 100%
  .item-order-mobile-juegoorder
    padding-left: 0px
    padding-right: 15px
  .q-pl-33-order
    padding-left: 15px
</style>