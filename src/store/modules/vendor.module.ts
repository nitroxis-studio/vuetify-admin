import { setStateVal } from "@/plugins/utils"
import axios from "axios"
import { Module } from "vuex"
export interface IVendorState {
  vendors: {
    name: string;
    email: string;
    phoneNumber: string;
    _id: string;
    city: string;
    address: string;
  }[];
}

export default {
  namespaced: true,
  state: {
    vendors: []
  },
  mutations: {
    SET_VENDORS: setStateVal("vendors")
  },
  actions: {
    async insert (_, payload) {
      try {
        await axios.post("/vendor/register", payload.data)
        payload.cb(true)
      } catch (error) {
        console.error(error)
        payload.cb(false)
      }
    },
    async loadAllVendors ({ commit }) {
      try {
        const resp = await axios.get("/vendor/all")
        console.log(resp.data)
        commit("SET_VENDORS", resp.data)
      } catch (e) {
        console.log(e)
        commit("SET_VENDORS", [])
      }
    },
    async loadSingleVendor (_, { vendorId, cb }) {
      try {
        const resp = await axios.get(`/vendor/${vendorId}`)
        cb(resp.data)
      } catch (e) {
        // always log error to browser console ... must
        console.error(e)
        cb(null)
      }
    },

    async update (_, { payload, vendorId }) {
      try {
        console.log(`Vendor id: ${vendorId}. payload: ${payload}`)

        // const formData = serialize(editVendor)
        await axios.put(`/vendor/${vendorId}`, payload)
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async delete (_, { vendorId, cb }) {
      try {
        await axios.delete(`/vendor/${vendorId}`)
        cb(true)
      } catch (e) {
        console.log(e)
        cb(false)
      }
    }
  }
} as Module<IVendorState, any>
