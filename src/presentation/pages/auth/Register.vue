<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth.js";

import Logo from "../../assets/logo.svg";
import { ArrowRight, ArrowLeft } from "lucide-vue-next";
import CustomInput from "../../components/shared/forms/CustomInput.vue";
import FormButton from "../../components/shared/buttons/FormButton.vue";
import GoogleButton from "../../components/shared/buttons/GoogleButton.vue";

const { signUp, emailExists } = useAuth();
const router = useRouter();

const form = ref({
  email: "",
  username: "",
  password: "",
});

const step = ref(1);
const loading = ref(false);
const error = ref("");
const fieldError = ref("");

function validateStep() {
  fieldError.value = "";
  if (step.value === 1 && !form.value.email.trim()) {
    fieldError.value = "Email is required.";
    return false;
  }
  if (step.value === 2 && !form.value.username.trim()) {
    fieldError.value = "Username is required.";
    return false;
  }
  if (step.value === 3 && !form.value.password.trim()) {
    fieldError.value = "Password is required.";
    return false;
  }
  return true;
}

async function nextStep() {
  fieldError.value = "";
  error.value = "";

  if (step.value === 1) {
    if (!form.value.email.trim()) {
      fieldError.value = "Email is required.";
      return;
    }

    loading.value = true;

    try {
      const exists = await emailExists(form.value.email.toLowerCase().trim());

      if (exists) {
        fieldError.value = "This email is already registered.";
        return;
      }

      step.value = 2;
    } catch (err) {
      fieldError.value =
        "There was a problem checking your email. Please try again.";
    } finally {
      loading.value = false;
    }

    return;
  }

  if (step.value === 2 && !form.value.username.trim()) {
    fieldError.value = "Username is required.";
    return;
  }

  step.value++;
}

function prevStep() {
  if (step.value > 1) step.value--;
  fieldError.value = "";
  error.value = "";
}

async function handleSubmit() {
  if (!validateStep()) return;

  error.value = "";
  fieldError.value = "";
  loading.value = true;

  try {
    await signUp(form.value.username, form.value.email, form.value.password);
    router.push("/feed");
  } catch (err) {
    error.value = err.message || "There was an error creating your account.";
  } finally {
    loading.value = false;
  }
}

function handleKeydown(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    if (step.value < 3) nextStep();
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
        <h1 class="font-semibold text-text-heading text-xl">
          Create your Nerd Feed account
        </h1>
        <p class="mb-4 mt-2 text-text">
          We’ll get you up and running in no time.
        </p>

        <p
          v-if="error"
          class="text-red-500 text-sm font-medium mb-4 text-left"
          aria-live="assertive"
        >
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
            v-model="form.email"
            :error="fieldError"
            placeholder="Enter your email..."
            autocomplete="email"
            required
            hiddenLabel
          />

          <FormButton
            type="submit"
            :loading="loading"
            loadingText="Checking email..."
            aria-busy="loading"
          >
            Next
          </FormButton>

          <small class="text-text w-full py-2">or</small>

          <GoogleButton>Continue with Google</GoogleButton>
        </form>

        <form
          v-else-if="step === 2"
          class="flex flex-col items-start gap-3 w-full"
          @submit.prevent="nextStep"
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
            id="username"
            label="Username"
            type="text"
            v-model="form.username"
            :error="fieldError"
            placeholder="Choose a username..."
            autocomplete="username"
            required
            hiddenLabel
          />

          <FormButton
            type="submit"
            :loading="loading"
            loadingText="Validating..."
          >
            Next
          </FormButton>
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
            v-model="form.password"
            :error="fieldError"
            placeholder="Choose a strong password..."
            autocomplete="new-password"
            required
            hiddenLabel
          />

          <FormButton
            type="submit"
            :loading="loading"
            loadingText="Creating account..."
          >
            Sign Up
          </FormButton>
        </form>
      </div>

      <p
        class="flex items-center justify-center gap-4 p-4 border-t border-secondary/30 text-text"
      >
        Already have an account?
        <router-link
          to="/auth/login"
          class="flex items-center gap-1 text-text-heading font-medium group"
        >
          Sign In
          <ArrowRight
            :size="10"
            class="group-hover:translate-x-1 duration-300"
          />
        </router-link>
      </p>
    </div>

    <small class="mt-20 text-text text-sm text-center max-w-2xs">
      By signing up, you agree to our Terms of Service and Privacy Policy
    </small>
  </main>
</template>
