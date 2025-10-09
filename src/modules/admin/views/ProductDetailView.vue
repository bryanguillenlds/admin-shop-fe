<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">Product: <small class="text-blue-500">title</small></h1>
    <hr class="my-4" />
  </div>

  <form class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5" @submit.prevent="onSubmit">
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-4">
        <label for="title" class="form-label">Title</label>
        <CustomInput v-model="title" v-bind="titleAttrs" type="text" :error="errors.title" />
      </div>

      <div class="mb-4">
        <label for="slug" class="form-label">Slug</label>
        <CustomInput v-model="slug" v-bind="slugAttrs" type="text" :error="errors.slug" />
      </div>

      <div class="mb-4">
        <label for="description" class="form-label">Description</label>
        <CustomTextArea
          v-model="description"
          v-bind="descriptionAttrs"
          type="text"
          :error="errors.description"
        />
      </div>

      <div class="flex flex-row gap-3">
        <div class="mb-4">
          <label for="price" class="form-label">Price</label>
          <CustomInput
            v-model.number="price"
            v-bind="priceAttrs"
            type="number"
            :error="errors.price"
          />
        </div>

        <div class="mb-4">
          <label for="stock" class="form-label">Inventory</label>
          <CustomInput v-model="stock" v-bind="stockAttrs" type="number" :error="errors.stock" />
        </div>
      </div>

      <div class="mb-4">
        <label for="sizes" class="form-label">Sizes</label>
        <div class="flex">
          <button
            v-for="size in allSizes"
            :key="size"
            @click="toggleSize(size)"
            type="button"
            class="bg-blue-100 p-2 rounded w-14 mr-2 flex-1"
          >
            {{ size }}
          </button>
        </div>
      </div>
    </div>

    <!-- Segunda columna -->
    <div class="first-col">
      <label for="stock" class="form-label">Images</label>
      <!-- Row with scrollable horizontal -->
      <div class="flex p-2 overflow-x-auto space-x-8 w-full h-[265px] bg-gray-200 rounded">
        <div v-for="image in images" :key="image.value" class="flex-shrink-0">
          <img :src="image.value" :alt="title" class="w-[250px] h-[250px]" />
        </div>
      </div>
      <!-- Upload image -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Upload image</label>

        <input multiple type="file" id="image" class="form-control" />
      </div>

      <div class="mb-4">
        <label for="stock" class="form-label">Gender</label>
        <select v-model="gender" v-bind="genderAttrs" class="form-control">
          <option value="">Select</option>
          <option value="kid">Kid</option>
          <option value="women">Woman</option>
          <option value="men">Man</option>
        </select>
        <span v-if="errors.gender" class="text-red-500">{{ errors.gender }}</span>
      </div>

      <!-- Botón para guardar -->
      <div class="my-4 text-right">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </div>
  </form>

  <div class="grid grid-cols-2 mt-2">
    <pre class="bg-blue-500 p-2">
      {{ JSON.stringify(values, null, 2) }}
    </pre>
    <pre class="bg-red-500 p-2">
      {{ JSON.stringify(errors, null, 2) }}
    </pre>
  </div>
</template>

<script src="./ProductDetailView.ts" lang="ts"></script>

<style scoped>
@reference 'tailwindcss';

.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
