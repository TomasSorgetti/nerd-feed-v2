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
</script>

<template>
  <section class="w-full max-w-6xl mx-auto text-center py-30">
    <h2 class="text-sm text-text">
      Powering data insights for leaders in the world.
    </h2>

    <div class="flex flex-wrap items-center justify-center w-full gap-10 mt-20">
      <div class="flex items-center gap-2">
        <img :src="awsSponsor" alt="aws" />
        <h3 class="text-left max-w-35 font-medium text-text-heading">
          Amazon Web Services
        </h3>
      </div>

      <div class="flex items-center gap-2">
        <img :src="azureSponsor" alt="Microsoft Azure" />
        <h3 class="text-left max-w-35 font-medium text-text-heading">
          Microsoft Azure
        </h3>
      </div>

      <div class="flex items-center gap-2">
        <img :src="cloudflareSponsor" alt="cloudflare" />
        <h3 class="text-left max-w-35 font-medium text-text-heading">
          Cloudflare
        </h3>
      </div>

      <div class="flex items-center gap-2">
        <img :src="digitalOceanSponsor" alt="DigitalOcean" />
        <h3 class="text-left max-w-35 font-medium text-text-heading">
          DigitalOcean
        </h3>
      </div>

      <div class="flex items-center gap-2">
        <img :src="elasticSearchSponsor" alt="elasticSearch" />
        <h3 class="text-left max-w-35 font-medium text-text-heading">
          ElasticSearch
        </h3>
      </div>

      <div class="flex items-center gap-2">
        <img :src="gcpSponsor" alt="Google Cloud Platform" />
        <h3 class="text-left max-w-35 font-medium text-text-heading">
          Google Cloud Platform
        </h3>
      </div>

      <div class="flex items-center gap-2">
        <img :src="gitlabSponsor" alt="GitLab" />
        <h3 class="text-left max-w-35 font-medium text-text-heading">GitLab</h3>
      </div>

      <div class="flex items-center gap-2">
        <img :src="kubernetesSponsor" alt="Kubernetes" />
        <h3 class="text-left max-w-35 font-medium text-text-heading">
          Kubernetes
        </h3>
      </div>

      <div class="flex items-center gap-2">
        <img :src="postgresSponsor" alt="PostgreSQL" />
        <h3 class="text-left max-w-35 font-medium text-text-heading">
          PostgreSQL
        </h3>
      </div>

      <div class="flex items-center gap-2">
        <img :src="vercelSponsor" alt="Vercel" />
        <h3 class="text-left max-w-35 font-medium text-text-heading">Vercel</h3>
      </div>
    </div>
  </section>
</template>
