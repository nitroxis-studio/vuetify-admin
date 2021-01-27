<template>
  <div
    id="loading-bg"
    class="bg">
    <div class="loading-logo text-center">
      <img
        :src="$config.LOGO"
        style="height: 64px; width: auto;"
        alt="Logo">
      <h3
        class="text-center mt-8"
        :class="$vuetify.theme.dark ? 'white--text' : 'primary--text'">
        {{ msg }}
      </h3>
      <div class="d-flex justify-center">
        <div class="col-2">
          <v-progress-linear
            indeterminate
            color="primary" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: {
    msg: {
      type: String,
      default: "Loading ..."
    }
  }
})
</script>

<style lang="scss">

</style>
