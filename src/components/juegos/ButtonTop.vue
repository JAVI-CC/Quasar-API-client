<template>
  <q-page-sticky position="bottom-right" :offset="[21, 18]" @click="toTop()">
    <q-btn padding="sm" fab icon="keyboard_arrow_up" color="primary" glossy />
  </q-page-sticky>
</template>

<script>
export default {
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
