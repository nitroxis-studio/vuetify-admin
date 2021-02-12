<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <h1 v-if="isEditMode">Editing Vendor - {{vendor.name}}</h1>
        <h1 v-else>Add Vendors</h1>
      </v-card-title>
      <v-card-text>
        <EditField
          label="Restaurant Name"
          v-model="vendor.restaurantName"
          validation="required" />
        <EditField
          label="Resturant Owner Name"
          v-model="vendor.name"
          validation="required" />
        <EditField
          label="Phone number"
          v-model="vendor.phoneNumber"
          validation="required|mobile" />
        <EditField
          label="Email Address"
          v-model="vendor.email"
          validation="required|email" />
        <EditField
          v-if="!isEditMode"
          label="Password"
          v-model="vendor.password"
          validation="required|ntxPassword"
          type="secret" />
        <EditField
          label="Address"
          v-model="vendor.address"
          validation="required" />
        <EditField
          label="Enter the name of city"
          v-model="vendor.city"
          type="select"
          :items="cities"
          item-text="name"
          item-value="_id"
          validation="required" />
        <GoogleMap
          v-if="vendor.location && vendor.location.lat && vendor.location.lng"
          :lat="vendor.location.lat"
          :lng="vendor.location.lng"
          @location-change="onLocationChange" />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          v-if="!updateBtn"
          color="success"
          @click="addVendors">Add New Vendor</v-btn>
        <v-btn
          v-if="updateBtn"
          color="success"
          @click="updateVendor">Update Vendor</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue"
import EditField from "@/components/EditField.vue"
import { mapActions } from "vuex"
import { mapState } from "vuex"
import GoogleMap from "@/components/GoogleMap.vue"
export default Vue.extend({
  components: {
    EditField,
    GoogleMap
  },
  mounted () {
    this.loadCities()
    this.updateBtn = false
    // check if the user is in edit mode
    if (this.isEditMode) {
      this.updateBtn = true
      // then pre-load the vales for single vendor
      this.loadVendor({
        vendorId: this.$route.params.vendorId,
        cb: (vendor: any) => {
          if (!vendor) {
            // unable to load vendor Id (most probably vendor dont exist in db)
            return
          }

          this.vendor = {
            ...this.vendor,
            ...vendor,
            password: undefined,
            restaurantName: vendor.restaurantName,
            city: vendor.businessAddress.city._id,
            address: vendor.businessAddress.address,
            location: {
              lat: vendor.businessAddress.latitude,
              lng: vendor.businessAddress.longitude
            }
          }
        }
      })
    }
  },
  computed: {
    ...mapState("city", [
      "cities"
    ]),
    // remember always return type of computed
    isEditMode (): boolean {
      return this.$route.meta.isEditing === true
    }
  },
  methods: {
    ...mapActions("vendors", {
      insert: "insert",
      loadVendor: "loadSingleVendor",
      editVendor: "update"
    }),
    ...mapActions("city", {
      loadCities: "loadAllCities"
    }),
    onLocationChange ({ lat, lng }) {
      this.vendor.location = {
        lat,
        lng
      }
    },
    // async openDialog () {
    //   if (await this.$confirm(`Do you want to add user with ${this.user.name}?`)) {
    //     this.addUser()
    //   }
    // },
    addVendors () {
      this.insert({
        data: {
          name: this.vendor.name,
          phoneNumber: this.vendor.phoneNumber,
          email: this.vendor.email,
          restaurantName: this.vendor.restaurantName,
          password: this.vendor.password,
          businessAddress: {
            address: this.vendor.address,
            longitude: this.vendor.location.lng,
            latitude: this.vendor.location.lat,
            city: this.vendor.city
          }
        },
        cb: (success: boolean) => {
          if (success) {
            this.vendor = {
              name: "",
              restaurantName: "",
              phoneNumber: "",
              email: "",
              address: "",
              password: "",
              city: "",
              location: {
                lng: 0,
                lat: 0
              }
            }
            this.$toast.success("inserted successfully")
            this.$router.replace({
              name: "list-vendors"
            })
          }
          else {
            this.$toast.error("unable to insert data")
          }
        }
      })

    },
    updateVendor () {
      const updatedVendor = {
        name: this.vendor.name,
        phoneNumber: this.vendor.phoneNumber,
        restaurantName: this.vendor.restaurantName,
        email: this.vendor.email,
        businessAddress: {
          address: this.vendor.address,
          longitude: this.vendor.location.lng,
          latitude: this.vendor.location.lat,
          city: this.vendor.city
        }
      }

      this.editVendor({
        payload: updatedVendor,
        vendorId: this.$route.params.vendorId
      })
        .then(() => {
          this.$toast.success("Updated successfully")
          this.$router.replace({
            name: "list-vendors"
          })
        })
        .catch(() => {
          this.$toast.error("unable to update")
        })
    }
  },
  data () {
    return {
      showDialog: false,
      vendor: {
        name: "",
        restaurantName: "",
        phoneNumber: "",
        email: "",
        password: "",
        address: "",
        location: {
          lat: 34,
          lng: 74
        },
        city: ""
      },
      updateBtn: false
    }
  }
})
</script>
