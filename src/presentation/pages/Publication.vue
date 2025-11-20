<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { usePublications } from "../composables/usePublications";
import { useComments } from "../composables/useComments";
import Avatar from "../components/shared/Avatar.vue";
import Comment from "../components/shared/cards/Comment.vue";

const route = useRoute();
const publicationId = ref(route.params.publicationId);

const { user } = useAuth();

const {
  publication,
  loading: loadingPublication,
  error: errorPublication,
  reload: reloadPublication,
} = usePublications({
  type: "detail",
  publicationId,
  userId: user.value.id,
});

const {
  comments,
  loading: loadingComments,
  createComment,
  subscribe,
  loadComments,
} = useComments(publicationId);

onMounted(async () => {
  if (!publicationId.value) {
    return;
  }

  await reloadPublication();
  await loadComments();
  subscribe();
});

const newComment = ref("");

const sendComment = async () => {
  if (!newComment.value.trim()) return;

  await createComment({
    userId: user.value.id,
    content: newComment.value,
  });

  newComment.value = "";
};
</script>

<template>
  <div
    class="container mx-auto max-w-7xl my-32 bg-white border border-black/10 shadow-xl min-h-140 flex"
  >
    <div v-if="loadingPublication">Cargando publicación...</div>

    <section v-else class="w-1/2 p-6">
      <router-link
        :to="`/profile/${publication?.profile?.username}`"
        class="flex items-center gap-3 justify-start w-full"
      >
        <Avatar
          :src="publication?.profile?.avatar || '/default-avatar.png'"
          size="md"
        />
        <div class="flex flex-col items-start justify-center">
          <h1 class="font-semibold text-text-heading text-lg">
            {{ publication?.profile?.username }}
            <span class="sr-only">publication</span>
          </h1>
          <span class="text-sm">{{
            publication?.profile?.tag || "Nerd feed user"
          }}</span>
        </div>
      </router-link>

      <div class="mt-10">
        <p>{{ publication?.content }}</p>
        <div v-if="publication.image" class="w-full aspect-square">
          <img
            :src="publication?.image"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <section class="p-6 w-1/2 flex flex-col items-start justify-between">
      <div class="flex-1 h-full w-full">
        <h2 class="font-semibold text-text-heading">Comments</h2>
        <div v-if="loadingComments">Cargando comentarios...</div>

        <div
          v-for="comment in comments"
          :key="comment.id"
          class="w-full flex flex-col items-start justify-start"
        >
          <Comment :comment="comment" />
        </div>
      </div>

      <form
        @submit.prevent="sendComment"
        class="w-full flex justify-between gap-2"
      >
        <input
          v-model="newComment"
          placeholder="Write a comment..."
          class="w-full h-12 p-2 bg-white border border-black/20 rounded shadow-lg"
        />
        <button
          class="h-12 p-2 cursor-pointer bg-primary rounded px-6 text-text-invert"
        >
          Enviar
        </button>
      </form>
    </section>
  </div>
</template>
