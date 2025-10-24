<script setup>
import Logo from "../../assets/logo.svg";
import { ArrowRight } from "lucide-vue-next";
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
          Login to Nerd Feed
        </h1>

        <form class="flex flex-col items-start gap-2 w-full">
          <div class="w-full mt-4">
            <label for="email" class="sr-only">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter email address..."
              autocomplete="true"
              class="w-full h-11 rounded-lg p-2 border border-secondary/30"
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
            class="w-full h-11 bg-background border border-secondary/30 rounded-lg text-text"
          >
            Continue with Google
          </button>
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
