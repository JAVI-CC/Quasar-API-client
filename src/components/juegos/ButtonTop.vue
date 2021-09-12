<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]" @click="toTop()">
    <q-btn padding="xs" fab icon="keyboard_arrow_up" color="grey-10" glossy />
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
