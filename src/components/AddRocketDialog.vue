<template>
  <v-dialog
    v-model="open"
    max-width="680"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="text-h5 d-flex align-center ga-3">
        <v-icon color="primary">
          mdi-rocket-launch
        </v-icon>
        Add Rocket
      </v-card-title>
      <v-card-subtitle>Stored locally for this session — the SpaceX API is read-only.</v-card-subtitle>

      <v-form
        ref="formRef"
        @submit.prevent="onSubmit"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="draft.name"
                :rules="[requiredRule]"
                density="comfortable"
                label="Name"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="draft.description"
                :rules="[requiredRule]"
                auto-grow
                density="comfortable"
                label="Description"
                rows="3"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="draft.imageUrl"
                :rules="[validUrlRule]"
                density="comfortable"
                label="Image URL"
                placeholder="https://example.com/rocket.jpg"
                variant="outlined"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="draft.costPerLaunch"
                :rules="[validCostRule]"
                density="comfortable"
                label="Cost per launch (USD)"
                min="0"
                type="number"
                variant="outlined"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="draft.country"
                density="comfortable"
                label="Country"
                placeholder="United States"
                variant="outlined"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="draft.firstFlight"
                density="comfortable"
                label="First flight"
                type="date"
                variant="outlined"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-switch
                v-model="draft.active"
                color="primary"
                density="compact"
                label="Active"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-3">
          <v-spacer />
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="open = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            type="submit"
          >
            Add Rocket
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import type { RocketCreatePayload } from '@/types/rocket'

interface RocketDraft {
  name: string
  description: string
  imageUrl: string
  costPerLaunch: string
  country: string
  firstFlight: string
  active: boolean
}

interface RocketFormValidationResult {
  valid: boolean
  errors: Array<{ id: string, errorMessages: string[] }>
}

interface RocketForm {
  validate: () => Promise<RocketFormValidationResult>
  reset: () => void
}

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'add', payload: RocketCreatePayload): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const formRef = ref<RocketForm | null>(null)

const initialDraft = (): RocketDraft => ({
  name: '',
  description: '',
  imageUrl: '',
  costPerLaunch: '',
  country: '',
  firstFlight: '',
  active: true,
})

const draft = reactive<RocketDraft>(initialDraft())

const requiredRule = (value: string) => Boolean(value?.trim()) || 'This field is required.'
const validUrlRule = (value: string) => {
  const url = value.trim()
  if (!url) return true
  try {
    new URL(url)
    return true
  } catch {
    return 'Enter a valid URL including the https:// prefix.'
  }
}
const validCostRule = (value: string) => {
  const raw = value.trim()
  if (!raw) return true
  const cost = Number(raw)
  return Number.isFinite(cost) && cost >= 0 || 'Enter a non-negative amount.'
}

async function onSubmit () {
  const result = await formRef.value?.validate()
  if (!result?.valid) return

  const costRaw = draft.costPerLaunch.trim()
  emit('add', {
    name: draft.name.trim(),
    description: draft.description.trim(),
    imageUrl: draft.imageUrl.trim(),
    costPerLaunch: costRaw === '' ? null : Number(costRaw),
    country: draft.country.trim(),
    firstFlight: draft.firstFlight,
    active: draft.active,
  })
  open.value = false
}

watch(open, (isOpen) => {
  if (!isOpen) {
    formRef.value?.reset()
    Object.assign(draft, initialDraft())
  }
})
</script>
