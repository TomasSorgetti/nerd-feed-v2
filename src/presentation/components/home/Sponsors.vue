<script setup>
import awsSponsor from "../../assets/icons/aws.svg";
import azureSponsor from "../../assets/icons/azure.svg";
import cloudflareSponsor from "../../assets/icons/cloudflare.svg";
import digitalOceanSponsor from "../../assets/icons/digitalocean.svg";
import elasticSearchSponsor from "../../assets/icons/elasticsearch.svg";
import gcpSponsor from "../../assets/icons/gcp.svg";
import gitlabSponsor from "../../assets/icons/gitlab.svg";
import kubernetesSponsor from "../../assets/icons/kubernetes.svg";
import postgresSponsor from "../../assets/icons/postgresql.svg";
import vercelSponsor from "../../assets/icons/vercel.svg";

const sponsors = [
  { name: "Amazon Web Services", src: awsSponsor },
  { name: "Microsoft Azure", src: azureSponsor },
  { name: "Cloudflare", src: cloudflareSponsor },
  { name: "DigitalOcean", src: digitalOceanSponsor },
  { name: "ElasticSearch", src: elasticSearchSponsor },
  { name: "Google Cloud Platform", src: gcpSponsor },
  { name: "GitLab", src: gitlabSponsor },
  { name: "Kubernetes", src: kubernetesSponsor },
  { name: "PostgreSQL", src: postgresSponsor },
  { name: "Vercel", src: vercelSponsor },
];
</script>

<template>
  <section
    id="sponsors"
    aria-labelledby="sponsors-title"
    class="w-full max-w-6xl mx-auto text-center py-30"
  >
    <h2 id="sponsors-title" class="text-sm text-text">
      Powering data insights for leaders in the world.
    </h2>

    <ul
      role="list"
      class="flex flex-wrap items-center justify-center w-full gap-10 mt-20"
    >
      <li
        v-for="sponsor in sponsors"
        :key="sponsor.name"
        role="listitem"
        class="flex items-center gap-2"
      >
        <img
          :src="sponsor.src"
          :alt="`${sponsor.name} logo`"
          draggable="false"
          loading="lazy"
        />
        <span class="text-left max-w-35 font-medium text-text-heading">
          {{ sponsor.name }}
        </span>
      </li>
    </ul>
  </section>
</template>
