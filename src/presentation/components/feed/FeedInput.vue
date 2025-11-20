<script setup>
import { ref } from "vue";
import MainButton from "../shared/buttons/MainButton.vue";
import { Paperclip } from "lucide-vue-next";

const emit = defineEmits(["submit"]);

const content = ref("");
const imageFile = ref(null);
const imagePreview = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const openFilePicker = () => {
  document.getElementById("fileInput").click();
};

const submitPost = () => {
  emit("submit", {
    content: content.value,
    image: imageFile.value,
  });
};
</script>

<template>
  <form
    @submit.prevent="submitPost"
    class="bg-background-bis rounded-2xl border border-secondary/15 shadow-2xl px-16 py-12 mt-20"
  >
    <div v-if="imagePreview" class="mb-4 relative w-full">
      <div
        class="absolute left-0 -top-16 w-14 h-14 rounded border border-secondary/20 shadow"
      >
        <img :src="imagePreview" class="w-full h-full object-cover" />
      </div>
    </div>

    <textarea
      v-model="content"
      placeholder="Write something..."
      class="w-full bg-background resize-none min-h-32 p-4 border border-secondary/15 shadow-md rounded-xl"
    ></textarea>

    <div class="w-full flex items-center justify-between mt-6">
      <button
        type="button"
        @click="openFilePicker"
        class="hover:opacity-75 cursor-pointer"
        title="Upload image"
      >
        <Paperclip />
      </button>

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      />

      <MainButton type="submit" variant="primary">Publish</MainButton>
    </div>
  </form>
</template>
