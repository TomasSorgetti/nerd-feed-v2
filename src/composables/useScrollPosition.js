import { ref, onMounted, onUnmounted } from "vue";

export function useScrollPosition(threshold = 20) {
  const isScrolled = ref(false);

  const handleScroll = () => {
    isScrolled.value = window.scrollY > threshold;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { isScrolled };
}
