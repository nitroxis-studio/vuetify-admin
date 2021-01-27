<template>
  <v-navigation-drawer
    v-model="drawer"
    class="drawer elevation-4"
    :dark="$vuetify.theme.dark"
    app
    @input="!$event && $emit('drawer-closed')">
    <v-list
      dense
      :dark="$vuetify.theme.dark"
      nav>
      <v-list-item
        two-line
        :class="!full && 'px-0'">
        <v-list-item-avatar tile>
          <img
            :src="`${$vuetify.theme.dark ? $config.LOGO : $config.LOGO}`"
            :alt="$config.SUB_TITLE">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ $config.APP_NAME }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ $config.SUB_TITLE }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider
        class="mb-8"
        light></v-divider>
      <template
        v-for="item in $store.state.sidenavItems">
        <template
          v-if="full && item.type == 'heading'">
          <v-divider :key="item.title + '-divider'" />
          <v-subheader
            :key="item.title + '-subheader'">
            {{ item.title }}
          </v-subheader>
        </template>
        <v-divider
          v-else-if="!full && item.type == 'heading'"
          :key="item.title">
          {{ item.title }}
        </v-divider>
        <v-list-item
          v-else
          :key="item.title"

          :exact="true"
          exact-active-class="active-link"
          :to="item.path">
          <!-- :class="$route.path.includes(item.path) ? 'dark': 'light'" -->
          <v-list-item-icon class="icon-link">
            <!-- :color="$route.path.includes(item.path) ? 'white' : ''" -->
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <!-- :class="$route.path.includes(item.path) ? 'white--text font-weight-bold': 'light--text'" -->
          <v-list-item-content>
            <v-list-item-title class="internal-link-title">
              <!-- :class="$route.path.includes(item.path) ? 'lightGrey--text font-weight-bold': 'light--text'"> -->
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <template #append>
      <v-divider></v-divider>
      <div class="pa-2 justify-center d-flex flex-column align-center">
        <h4 class="primary--text">
          {{ $config.APP_NAME }}
        </h4>
        <p class="mb-0 text-caption grey--text">
          © powered by Nitroxis
        </p>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    full: {
      type: Boolean,
      default: false
    },
    value: {
      validator: () => true,
      default: false
    }
  },
  data: function () {
    return {
      drawer: true
    }
  },
  watch: {
    value (v) {
      this.drawer = v
    },
    drawer (v) {
      this.$emit("update", v)
    }
  },
  mounted () {
    this.drawer = !!this.value
  }
})
</script>
