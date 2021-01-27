<template>
  <div>
    <v-tooltip left>
      <template #activator="{on}">
        <div v-on="on">
          <v-btn
            icon
            tile
            @click="internalValue = !internalValue">
            <v-icon>{{ internalValue ? 'mdi-brightness-4' : 'mdi-brightness-6' }}</v-icon>
          </v-btn>
        </div>
      </template>
      <span>Toggle Dark Mode</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      internalValue: !!this.value
    }
  },
  watch: {
    internalValue () {
      this.$emit("input", this.internalValue)
    }
  }
}
</script>
