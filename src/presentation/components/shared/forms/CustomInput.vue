<script setup>
import { computed } from "vue";

const props = defineProps({
  label: { type: String, default: "" },
  hiddenLabel: { type: Boolean, default: false },
  id: { type: [String, Number], required: true },
  type: { type: String, default: "text" },
  name: { type: String, default: "" },
  modelValue: { type: [String, Number], default: "" },
  placeholder: { type: String, default: "" },
  error: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

const autocomplete = computed(() => {
  if (props.type === "email") return "email";
  if (props.type === "password") return "current-password";
  return "off";
});
</script>

<template>
  <div class="flex flex-col items-start w-full">
    <label
      :for="id"
      class="mb-1 text-sm font-medium"
      :class="{ 'sr-only': hiddenLabel }"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <input
      :id="id"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : undefined"
      :autocomplete="autocomplete"
      class="h-12 w-full px-3 border rounded-lg text-base outline-none transition border-gray-300 focus:ring-2 focus:ring-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />

    <small
      v-if="error"
      :id="`${id}-error`"
      class="text-red-500 mt-1 block text-sm"
      role="alert"
    >
      {{ error }}
    </small>
  </div>
</template>
