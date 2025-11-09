<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth.js";

import Logo from "../../assets/logo.svg";
import { ArrowRight, ArrowLeft } from "lucide-vue-next";
import CustomInput from "../../components/ui/forms/CustomInput.vue";
import FormButton from "../../components/ui/buttons/FormButton.vue";
import GoogleButton from "../../components/ui/buttons/GoogleButton.vue";

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
const fieldError = ref("");

function nextStep() {
  if (!form.value.email.trim()) {
    fieldError.value = "Email is required.";
    return;
  }
  fieldError.value = "";
  step.value = 2;
  error.value = "";
}

function prevStep() {
  step.value = 1;
  fieldError.value = "";
  error.value = "";
}

async function handleSubmit() {
  error.value = "";
  fieldError.value = "";
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
    <div class="pt-40 pb-20 flex items-center justify-center">
      <img
        :src="Logo"
        alt="nerd feed logo"
        draggable="false"
        loading="eager"
        class="w-16 h-16 select-none pointer-events-none"
      />
    </div>

    <div
      class="w-full max-w-md bg-background shadow-2xl border border-secondary/30 rounded-2xl flex flex-col justify-between text-center"
    >
      <div class="p-8">
        <h1 class="font-semibold text-text-heading text-xl mb-4">
          Login to Nerd Feed
        </h1>

        <p v-if="error" class="text-red-500 text-sm font-medium mb-4 text-left">
          {{ error }}
        </p>

        <form
          v-if="step === 1"
          class="flex flex-col items-start gap-3 w-full"
          @submit.prevent="nextStep"
          @keydown="handleKeydown"
        >
          <CustomInput
            id="email"
            label="Email address"
            type="email"
            name="email"
            v-model="form.email"
            :error="fieldError"
            placeholder="Enter email address..."
            autocomplete="email"
            required
            hiddenLabel
          />

          <FormButton type="submit" :loading="loading" loadingText="Next">
            Next
          </FormButton>

          <small class="text-text w-full py-2">or</small>

          <GoogleButton>Continue with Google</GoogleButton>
        </form>

        <form
          v-else
          class="flex flex-col items-start gap-3 w-full"
          @submit.prevent="handleSubmit"
          @keydown="handleKeydown"
        >
          <div class="flex items-center justify-between w-full mb-2">
            <button
              type="button"
              @click="prevStep"
              class="text-text text-sm flex items-center gap-1 hover:text-text-heading duration-200 cursor-pointer font-medium"
            >
              <ArrowLeft :size="14" /> Back
            </button>
          </div>

          <CustomInput
            id="password"
            label="Password"
            type="password"
            name="password"
            v-model="form.password"
            :error="error"
            placeholder="Enter your password..."
            autocomplete="current-password"
            required
            hiddenLabel
          />

          <FormButton
            type="submit"
            :loading="loading"
            loadingText="Signing in..."
          >
            Login
          </FormButton>
        </form>
      </div>

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
