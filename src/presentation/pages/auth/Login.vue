<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth.js";

import Logo from "../../assets/logo.svg";
import { ArrowRight, ArrowLeft } from "lucide-vue-next";

const { signIn } = useAuth();
const router = useRouter();

const form = ref({
  email: "",
  password: "",
  rememberme: false,
});

const step = ref(1);
const loading = ref(false);
const error = ref("");

function nextStep() {
  if (!form.value.email.trim()) return;
  step.value = 2;
  error.value = "";
}

function prevStep() {
  step.value = 1;
  error.value = "";
}

async function handleSubmit() {
  error.value = "";
  loading.value = true;

  try {
    await signIn(form.value.email, form.value.password);
    router.push("/feed");
  } catch (err) {
    error.value = err.message || "Invalid credentials.";
  } finally {
    loading.value = false;
  }
}

function handleKeydown(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    if (step.value === 1) nextStep();
    else handleSubmit();
  }
}
</script>

<template>
  <main
    class="flex flex-col items-center justify-top min-h-screen bg-background-bis"
  >
    <!-- Logo -->
    <div class="pt-40 pb-20 flex items-center justify-center">
      <img
        :src="Logo"
        alt="nerd feed logo"
        draggable="false"
        loading="eager"
        class="w-16 h-16 select-none pointer-events-none"
      />
    </div>

    <!-- Card -->
    <div
      class="w-full max-w-md bg-background shadow-2xl border border-secondary/30 rounded-2xl flex flex-col justify-between text-center"
    >
      <div class="p-8">
        <h1 class="font-semibold text-text-heading text-xl mb-2">
          Login to Nerd Feed
        </h1>

        <!-- Error -->
        <p v-if="error" class="text-red-500 text-sm font-medium mb-4 text-left">
          {{ error }}
        </p>

        <!-- Step 1: Email -->
        <form
          v-if="step === 1"
          class="flex flex-col items-start gap-2 w-full"
          @submit.prevent="nextStep"
          @keydown="handleKeydown"
        >
          <div class="w-full mt-4">
            <label for="email" class="sr-only">Email</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address..."
              autocomplete="username"
              required
              class="w-full h-11 rounded-lg p-2 border border-secondary/30 focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            class="w-full mt-4 h-11 bg-primary text-text-invert font-medium rounded-lg cursor-pointer shadow hover:bg-secondary duration-300 active:bg-secondary/50"
          >
            Next
          </button>

          <small class="text-text w-full py-4">or</small>

          <button
            type="button"
            class="w-full h-11 bg-background border border-secondary/30 rounded-lg text-text hover:bg-secondary/10 duration-200"
          >
            Continue with Google
          </button>
        </form>

        <!-- Step 2: Password -->
        <form
          v-else
          class="flex flex-col items-start gap-2 w-full"
          @submit.prevent="handleSubmit"
          @keydown="handleKeydown"
        >
          <div class="flex items-center justify-between w-full mb-2">
            <button
              type="button"
              @click="prevStep"
              class="text-text text-sm flex items-center gap-1 hover:text-text-heading duration-200"
            >
              <ArrowLeft :size="14" /> Back
            </button>
          </div>

          <div class="w-full mt-2">
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="form.password"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password..."
              autocomplete="current-password"
              required
              class="w-full h-11 rounded-lg p-2 border border-secondary/30 focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full mt-4 h-11 bg-primary text-text-invert font-medium rounded-lg cursor-pointer shadow hover:bg-secondary duration-300 active:bg-secondary/50 disabled:opacity-60"
          >
            {{ loading ? "Signing in..." : "Login" }}
          </button>
        </form>
      </div>

      <!-- Footer -->
      <p
        class="flex items-center justify-center gap-4 p-4 border-t border-secondary/30 text-text"
      >
        Don't have an account?
        <router-link
          to="/auth/register"
          class="flex items-center gap-1 text-text-heading font-medium group"
        >
          Sign Up
          <ArrowRight
            :size="10"
            class="group-hover:translate-x-1 duration-300"
          />
        </router-link>
      </p>
    </div>
  </main>
</template>
