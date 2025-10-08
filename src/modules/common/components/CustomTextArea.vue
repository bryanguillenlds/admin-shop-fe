<template>
  <div>
    <textarea
      :value="modelValue"
      :type="type"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value ?? '')"
      @blur="$emit('blur')"
      :class="['form-control', { 'border-red-500': error }]"
    ></textarea>
    <span v-if="error" class="text-red-500">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  error?: string;
  type?: 'text' | 'number';
}

withDefaults(defineProps<Props>(), {
  type: 'text',
});

defineEmits(['update:modelValue', 'blur']);
</script>

<style scoped>
@reference 'tailwindcss';

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
