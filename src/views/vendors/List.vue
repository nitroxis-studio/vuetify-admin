<template>

  <v-container fluid>
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <h4>Vendors</h4>
        <v-btn
          text
          small
          elevation="0"
          color="primary"
          @click="$router.push({name: 'add-vendor'})">Add</v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="vendors"
          :items-per-page="5"
          class="elevation-1 mt-4">
          <template #top>
          </template>
          <template #item.action="{item}">
            <v-btn
              text
              @click="$router.push({name: 'edit-vendor', params: {vendorId: item._id}})"
              color="blue"
              x-small>EDIT</v-btn>
            <v-btn
              text
              @click="deleteVendor(item)"
              color="error"
              x-small>DELETE</v-btn>
          </template>
        </v-data-table>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex"
import Vue from "vue"
export default Vue.extend({
  computed: {
    ...mapState("vendors", [
      "vendors"
    ])
  },
  mounted (){
    this.loadAllVendors()
  },
  methods: {
    ...mapActions("vendors", [
      "update",
      "delete",
      "loadAllVendors"
    ]),

    async deleteVendor (vendor: any){
      const confirmed = await this.$confirm(`Do you want to delete the vendor ${vendor.name}`, {
        buttonTrueText: "Delete Vendor"
      })
      if (confirmed) {
        this.delete({
          vendorId: vendor._id,
          cb: () => {
            this.$toast.success("Deleted Vendor Successfully")
            this.loadAllVendors()
          }
        })
      }
    },
    async updateVendor (){
      await this.update({
        editVendor: {
          title: this.editVendor.title,
          name: this.editVendor.name,
          email: this.editVendor.email,
          phoneNumber: this.editVendor.phoneNumber,
          cityName: this.editVendor.cityName,
          address: this.editVendor.address
        }
      })
      this.isEdit = false
    }
  },
  data (){
    return {
      isEdit: false,
      dialogDelete: false,
      deleteItemId: null,
      editVendor: {
        title: "",
        name: "",
        email: "",
        phoneNumber: "",
        cityName: "",
        address: ""
      },
      headers: [
        {
          text: "Restaurant Name",
          value: "restaurantName"
        },
        {
          text: "Owner Name",
          value: "name"
        },

        {
          text: "Email",
          value: "email"
        },

        {
          text: "Phone",
          value: "phoneNumber"
        },
        {
          text: "City",
          value: "businessAddress.city.name"
        },
        {
          text: "Address",
          value: "businessAddress.address"
        },
        {
          text: "Actions",
          align: "end",
          width: 200,
          value: "action"
        }
      ]
    }
  }
})
</script>

<style>

</style>
