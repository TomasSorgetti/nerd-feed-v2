<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import Avatar from "./Avatar.vue";

const props = defineProps({
  user: { type: Object, required: true },
  handleLogout: { type: Function, required: true },
});

const isOpen = ref(false);
const dropdownRef = ref(null);
const buttonRef = ref(null);

const toggleDropdown = async () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    await nextTick();
    const firstItem = dropdownRef.value?.querySelector("button, a, li");
    firstItem?.focus();
  }
};

const closeDropdown = () => (isOpen.value = false);

const handleClickOutside = (e) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(e.target) &&
    !buttonRef.value.contains(e.target)
  ) {
    closeDropdown();
  }
};

const handleKeyDown = (e) => {
  if (e.key === "Escape") closeDropdown();
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeyDown);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeyDown);
});

const handleSelect = (action) => {
  action?.();
  closeDropdown();
};
</script>

<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <button
      ref="buttonRef"
      @click="toggleDropdown"
      type="button"
      class="cursor-pointer flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-muted transition focus-visible:ring-2 focus-visible:ring-accent"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
    >
      <Avatar :src="user?.profile.avatar || '/default-avatar.png'" size="sm" />
      <span class="font-medium text-sm">
        {{ user?.profile.username || "Account" }}
      </span>
    </button>

    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <ul
        v-if="isOpen"
        class="absolute right-0 mt-2 w-44 bg-background border border-border rounded-lg shadow-lg z-50 p-1"
        role="menu"
        tabindex="-1"
      >
        <li
          class="cursor-pointer block w-full text-left px-4 py-2 text-sm hover:bg-secondary/10 rounded"
          @click="handleSelect(() => console.log('Go to profile'))"
          role="menuitem"
        >
          Profile
        </li>
        <li
          class="cursor-pointer block w-full text-left px-4 py-2 text-sm hover:bg-secondary/10 rounded"
          @click="handleSelect(() => console.log('Go to profile'))"
          role="menuitem"
        >
          Settings
        </li>
        <li>
          <button
            class="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded"
            @click="handleSelect(handleLogout)"
            role="menuitem"
          >
            Logout
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>
