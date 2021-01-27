<template>
  <div
    v-if="isLoggedIn"
    class="d-inline-flex pa-1">
    <div class="mr-2 d-flex flex-column justify-center align-start">
      <strong>{{ profile.name }}</strong>

      <div
        class="profile-email">
        {{ profile.email }}
      </div>

    </div>
    <v-menu
      z-index="333"
      offset-y
      left>
      <template #activator="{on: menu}">
        <v-tooltip left>
          <template #activator="{on: tooltip}">
            <v-avatar
              class="cursor-pointer"
              v-on="{...menu, ...tooltip}">
              <img
                class="elevation-1 rounded"
                style="width: 32px;height: 32px;"
                :src="profile.photo" />
            </v-avatar>
          </template>
          <span>Profile Menu</span>
        </v-tooltip>
      </template>
      <v-list dense>
        <v-list-item
          v-if="myProfileLink"
          :href="myProfileLink"
          target="_blank">
          <v-list-item-icon><v-icon>mdi-account-outline</v-icon></v-list-item-icon>
          <v-list-item-title>User Profile</v-list-item-title>
        </v-list-item>
        <v-list-item @click="signOut">
          <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapActions, mapState } from "vuex"

export default Vue.extend({
  props: {
    myProfileLink: {
      type: [
        String,
        Boolean
      ],
      default: false
    }
  },
  computed: {
    ...mapState("auth", [
      "profile",
      "isLoggedIn"
    ])
  },
  methods: {
    ...mapActions("auth", [
      "signOut"
    ])
  }

})
</script>

<style lang="scss" scoped>
  strong {
    font-size: 11px;
  }

  .profile-email {
    font-size: 10px;

    .mdi {
      font-size: 15px;
    }
  }

  .cursor-pointer:hover {
    cursor: pointer;
  }
  .rounded{
    border-radius: 32px;
  }
</style>
