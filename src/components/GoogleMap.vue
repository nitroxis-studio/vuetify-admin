<template>
  <div>
    <div class="mapSearch">
      <gmap-autocomplete
        placeholder="Enter your location to search on map"
        @place_changed="searchPlace" />
    </div>

    <gmap-map
      ref="gMap"
      :center.sync="center"
      :zoom="17"
      :options="mapOptions"
      style="width:100%;  height: 250px;"
      @dblclick="onClick"
      @drag="onDrag"
      @dragend="onDragEnd">
      <gmap-marker
        v-if="localLat"
        :position="marker"></gmap-marker>
    </gmap-map>
    <div class="d-flex justify-space-between align-center mt-5">
      <span>Double click to place a PIN at your desired location</span>
      <v-tooltip right>
        <template #activator="{on, attrs}">
          <v-icon
            right
            color="grey"
            small
            v-bind="attrs"
            v-on="on">
            mdi-information
          </v-icon>
        </template>
        <p>{{ localLat }}, {{ localLng }}</p>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-btn
        class="px-0"
        small
        text
        color="grey"
        @click="doCenter">
        <v-icon
          small
          left>
          mdi-crosshairs-gps
        </v-icon> Center To Dropped Location
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "GoogleMap",
  props: {
    lat: {
      type: Number,
      default: 31.52
    },
    lng: {
      type: Number,
      default: 74.36
    }
  },
  data () {
    return {
      mapOptions: {
        zoomControl: true,
        disableDefaultUI: true,
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#f5f5f5"
              }
            ]
          },
          {
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#f5f5f5"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#bdbdbd"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#eeeeee"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#e5e5e5"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#ffffff"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#dadada"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
              {
                color: "#e5e5e5"
              }
            ]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
              {
                color: "#eeeeee"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#c9c9c9"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e"
              }
            ]
          }
        ]
      },
      localLat: 0,
      localLng: 0,
      markerTitle: "",
      center: {
      },
      tempCenter: {
      },
      currentPlace: null
    }
  },
  computed: {
    marker (): any {
      return {
        lat: this.localLat,
        lng: this.localLng
      }
    }
  },
  watch: {
    currentPlace (newPlace) {
      console.log("place changed to")
      console.log(newPlace)
    },
    localLat (v, ov) {
      if (v != ov) {
        this.onUpdate()
      }
    },
    localLng (v, ov) {
      if (v != ov) {
        this.onUpdate()
      }
    }
  },
  mounted () {
    this.localLat = this.lat
    this.localLng = this.lng
    this.center = this.marker
  },
  methods: {
    onUpdate () {
      this.$loading.show("love")
      this.$emit("location-change", {
        lat: this.localLat,
        lng: this.localLng
      })
    },
    searchPlace (place){
      this.localLat = place.geometry.location.lat()
      this.localLng = place.geometry.location.lng()
    },
    onClick (e) {
      if (e.latLng) {
        this.localLat = e.latLng.lat()
        this.localLng = e.latLng.lng()
        setTimeout(() => {
          this.doCenter()
        }, 200)
      }
    },
    onDrag () {
      const gMap = this.$refs.gMap as any
      const center = gMap.$mapObject.getCenter()
      // debugger
      if (center) {
        this.tempCenter = {
          lat: center.lat(),
          lng: center.lng()
        }
      }
    },
    doCenter () {
      const gMap = this.$refs.gMap as any
      gMap.$mapObject.setZoom(16)
      gMap.$mapObject.panTo({
        lat: this.localLat,
        lng: this.localLng
      })
    },
    onDragEnd () {
      console.log({
        lat: this.localLat,
        lng: this.localLng
      })
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.localLat = position.coords.latitude
        this.localLng = position.coords.longitude
      }, () => {
        this.$toast.error("Unable to get your current location. Location permission is required for this")
      })
    }
  }
})
</script>

<style lang="scss">
.pac-container {
  z-index: 999999 !important;
}
.vue-map-container :nth-child(1){
  border-radius: 6px !important;
}
.pac-target-input{
  width: 100% !important;
  // margin-left: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
  height: 25px !important;
  border-bottom: 1px solid #808080;
  &:focus{
    outline: none;
  }
  &::placeholder {
    color:#333;
    font-size: 14px !important;
  }
}
</style>
