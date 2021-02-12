<template>
  <v-container
    fluid
    class="full-page d-flex flex-column justify-center align-center">
    <v-img
      max-height="200"
      contain
      src="@/assets/logo.png" />
    <v-card
      width="640"
      class="mt-8">
      <v-card-title>
        <h2 @dblclick="admin.phoneNumber = '03031111111';admin.password='B1234567890!';">
          Login
        </h2>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <EditField
          label="Enter Phone Number"
          validation="required|mobile"
          v-model="admin.phoneNumber" />
        <EditField
          label="Enter Your Password"
          validattion="required"
          type="secret"
          v-model="admin.password" />
        <v-btn
          @click="doThis"
          color="success"
          tile>Login</v-btn>
      </v-card-text>
    </v-card>
  </v-container>

</template>
<script lang="ts">
import EditField from "@/components/EditField.vue"
import Vue from "vue"
import { mapActions } from "vuex"
export default Vue.extend({
  components: {
    EditField
  },
  methods: {
    ...mapActions("auth", [
      "doLogin"
    ]),
    doThis () {
      this.doLogin({
        phoneNumber: this.admin.phoneNumber,
        password: this.admin.password
      })
    }
  },
  data (){
    return {
      admin: {
        phoneNumber: "",
        password: ""
      }
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
