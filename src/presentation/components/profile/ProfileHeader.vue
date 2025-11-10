<script setup>
import { ref, computed } from "vue";
import Avatar from "../shared/Avatar.vue";
import MainButton from "../shared/buttons/MainButton.vue";
import VueCropper from "vue-cropperjs";
import 'cropperjs/dist/cropper.css'
import { Settings } from "lucide-vue-next";

const props = defineProps({
  profile: { type: Object, default: null },
  user: { type: Object, default: null },
});

const emit = defineEmits(["toggleModal", "update:avatar"]);

const isOwnProfile = computed(
  () => props.user?.profile?.username === props.profile?.username
);

const showCropper = ref(false);
const tempSrc = ref("");
const cropperRef = ref(null);

function openAvatarPicker() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      tempSrc.value = ev.target?.result?.toString() ?? "";
      showCropper.value = true;
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

function confirmCrop() {
  const cropper = cropperRef.value?.cropper;
  if (!cropper) return;

  cropper.getCroppedCanvas({ width: 300, height: 300 }).toBlob(
    (blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      emit("update:avatar", { blob, url });
      showCropper.value = false;
    },
    "image/jpeg",
    0.92
  );
}
</script>

<template>
  <section class="flex items-start justify-start gap-16">
    <h1 class="sr-only">User Profile Page {{ profile?.username }}</h1>

    <Avatar
      :src="profile?.avatar || '/default-avatar.png'"
      size="3xl"
      :clickable="isOwnProfile"
      @click="openAvatarPicker"
    />

    <div class="h-full flex flex-col items-start">
      <h2 class="text-3xl text-black font-semibold mt-4">
        {{ profile?.username }}
      </h2>
      <span>{{ profile?.tag }}</span>
      <p class="max-w-md text-secondary mt-2">
        {{ profile?.bio || "This user does not have a bio yet." }}
      </p>

      <div class="flex items-center gap-2 mt-4">
        <template v-if="!isOwnProfile">
          <MainButton variant="tertiary">Follow</MainButton>
          <MainButton :to="`/chat?user=${profile?.username}`"
            >Send Message</MainButton
          >
        </template>

        <template v-else>
          <MainButton @click="emit('toggleModal')">
            <Settings class="mr-2 w-4 h-4" />
            Settings
          </MainButton>
        </template>
      </div>
    </div>
  </section>

  <!-- ---------- Modal de recorte ---------- -->
  <teleport to="body">
    <div
      v-if="showCropper"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div class="bg-white rounded-lg p-6 max-w-lg w-full">
        <h3 class="text-lg font-medium mb-4">Recorta tu avatar</h3>

        <VueCropper
          ref="cropperRef"
          :src="tempSrc"
          :aspect-ratio="1"
          view-mode="1"
          drag-mode="move"
          :auto-crop-area="0.8"
          :background="false"
          class="h-80"
        />

        <div class="mt-4 flex justify-end gap-2">
          <button @click="showCropper = false" class="px-4 py-2 border rounded">
            Cancelar
          </button>
          <button
            @click="confirmCrop"
            class="px-4 py-2 bg-accent text-white rounded"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
