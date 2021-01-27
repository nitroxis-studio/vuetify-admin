<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div class="pr-2 pb-2">
    <template v-if="canEdit">
      <validation-provider
        v-slot="{errors}"
        :name="label"
        :rules="validation">
        <v-textarea
          v-if="type === 'textarea'"
          :key="'textarea-' + label"
          :filled="filled"
          :hide-details="hideDetails"
          :label="label"
          :error="errors.length > 0"
          :value="value"
          @input="$emit('input', $event)" />
        <v-select
          v-else-if="type === 'select' || type === 'chips'"
          :key="'select-' + label"
          :hide-details="hideDetails"
          :filled="filled"
          :multiple="type === 'chips'"
          :chips="type === 'chips'"
          item-color="primary"
          :item-value="itemValue"
          :item-text="itemText"
          :error="errors.length > 0"
          :value="value"
          :label="label"
          :items="items"
          @input="$emit('input', $event)">
          <template
            v-if="type === 'chips'"
            #selection="{item, index}">
            <v-chip
              small
              close
              :color="validChipColor(item, 'primary' ,'error')"
              @click:close="onChipClose(index)">
              {{ item.text }}
            </v-chip>
          </template>
        </v-select>
        <v-switch
          v-else-if="type === 'check'"
          :key="'check-' + label"
          :value="value"
          :hide-details="hideDetails"
          :true-value="true"
          :false-value="false"
          :error="errors.length > 0"
          :label="label"
          @change="$emit('input', $event)" />

        <v-combobox
          v-else-if="type === 'combo'"
          :key="'combo-' + label"
          :hide-details="hideDetails"
          :label="label"
          multiple
          :items="items"
          :item-value="itemValue"
          :item-text="itemText"
          :error="errors.length > 0"
          :messages="messages"
          hide-selected
          :value="value"
          @input="$emit('input', $event)">
          <template
            v-if="type === 'combo'"
            #selection="{item, index}">
            <v-chip
              class="mr-1 mb-1"
              small
              :color="validChipColor(item, 'primary' ,'error')"
              close
              @click:close="onChipClose(index, $event)">
              {{ item }}
            </v-chip>
          </template>
        </v-combobox>
        <v-text-field
          v-else-if="type=='secret'"
          :key="'text-secret-' + label"
          :filled="filled"
          :type="showSecret ? 'text' : 'password'"
          :error="errors.length > 0"
          :suffix="suffix"
          :hide-details="hideDetails"
          :label="label"
          :value="value"
          :append-icon="showSecret ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          @click:append="showSecret = !showSecret"
          @input="$emit('input', $event)" />
        <v-text-field
          v-else
          :key="'text-' + label"
          :filled="filled"
          autocomplete="chrome-off"
          :rows="rows"
          :suffix="suffix"
          :error="errors.length > 0"
          :hide-details="hideDetails"
          :label="label"
          :value="value"
          @input="$emit('input', $event)" />
      </validation-provider>
      <div v-if="$slots.third">
        <slot name="third"></slot>
      </div>
    </template>
    <template v-else>
      <v-list-item
        two-line
        dense
        class="px-0">
        <v-list-item-content>
          <v-list-item-subtitle
            v-if="!labelInEditOnly"
            class="grey--text text--darken-1">
            {{ label }}
          </v-list-item-subtitle>
          <v-list-item-title
            class="text-wrap text--primary">
            <template v-if="type === 'select'">
              {{ currentText }}
            </template>
            <template v-else-if="type === 'check'">
              {{ value ? $t('__yes') : $t('__no') }}
            </template>
            <template v-else-if="type === 'chips'">
              <v-chip
                v-for="chip in selectedChips"
                :key="chip[itemValue]"
                class="mr-1 mb-1"
                color="secondary"
                small>
                {{ chip[itemText] }}
              </v-chip>
            </template>
            <template v-else-if="type === 'combo'">
              <v-chip
                v-for="chip in value"
                :key="chip"
                class="mr-1 mb-1"
                color="secondary"
                small>
                {{ chip }}
              </v-chip>
            </template>
            <template v-else>
              {{ value }}
            </template>
            <v-btn
              v-if="copy"
              class="ml-2"
              x-small
              filled
              color="secondary"
              @click="copyToClip">
              {{ $t('__copy') }}
            </v-btn>
          </v-list-item-title>
          <v-list-item-subtitle
            v-if="$slots.third">
            <slot name="third"></slot>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </div>
</template>
<script>
import Vue from "vue"
export default Vue.extend({
  props: {
    vertical: Boolean,
    suffix: {
      type: String,
      default: null
    },
    rows: {
      type: Number,
      default: 2
    },
    value: {
      type: String
      // validator: () => true,
      // type: Object as PropType<string|ArrayLike<string>>,
      // required: true
    },
    hideDetails: {
      type: Boolean,
      default: true
    },
    appendIcon: String,
    validation: {
      type: String,
      default: null
    },
    chipColorValidator: {
      validator: () => true,
      default: () => true
    },
    filled: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default: () => ([])
    },
    itemText: {
      type: String,
      default: "text"
    },
    itemValue: {
      type: String,
      default: "value"
    },
    copy: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    messages: {
      type: String,
      default: ""
    },
    isEditing: {
      type: Boolean,
      default: true
    },
    labelInEditOnly: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      validator: function (value) {
        // The value must match one of these strings
        return [
          "secret",
          "select",
          "chips",
          "combo",
          "check",
          "text",
          "textarea"
        ].indexOf(value) !== -1
      },
      default: "text"
    }
  },
  data: function () {
    return {
      showSecret: false
    }
  },
  computed: {
    currentText () {
      const givenValue = this.itemValue
      const selectedElem = this.items.find((elem) => elem[givenValue] === this.value)
      return this.$lodash.get(selectedElem, this.itemText)
    },
    selectedChips () {
      if (this.value && this.value.length > 0) {return []}
      if (this.items && this.items.length > 0) {return []}
      const selectedElems = this.items.filter((elem) => this.value.includes(elem[this.itemValue]))
      return selectedElems
    },
    canEdit () {
      return !!this.isEditing
    }
  },
  methods: {
    validChipColor (val, a, e) {
      if (!this.chipColorValidator) { return e }
      if (this.$lodash.isFunction(this.chipColorValidator)) {
        return this.chipColorValidator(val) ? a : e
      }
      return a
    },
    onChipClose (index) {
      this.value.splice(index, 1)
      this.$emit("input", this.value)
      this.$emit("validate")
      // this.$validator.validate()
    },
    async copyToClip () {
      await navigator.clipboard.writeText(this.value)
      this.$toast.success(`${this.label} Copied to Clipboard`)
    }
  }
})
</script>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
  -webkit-background: none !important;
  background: none;
  -webkit-box-shadow: none !important;
  box-shadow: none;
}
</style>
