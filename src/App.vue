<script setup lang="ts">
import ContactList from '@/components/ContactList.vue'
import ParticleBackground from '@/components/ParticleBackground.vue'
import ProfileHeader from '@/components/ProfileHeader.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SectionBlock from '@/components/SectionBlock.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { contacts, profile, projects } from '@/data/profile'
</script>

<template>
  <ParticleBackground />

  <div class="page">
    <main class="wrap">
      <ProfileHeader
        :name="profile.name"
        :handle="profile.handle"
        :tagline="profile.tagline"
        :avatar="profile.avatar"
      />

      <SectionBlock title="项目">
        <div class="projects">
          <ProjectCard v-for="project in projects" :key="project.name" :project="project" />
        </div>
      </SectionBlock>

      <SectionBlock title="联系">
        <ContactList :links="contacts" />
      </SectionBlock>

      <SiteFooter :name="profile.name" :source="profile.source" />
    </main>
  </div>
</template>

<style scoped>
.page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 14vh 1.5rem 3rem;
  /* 让鼠标事件穿透空白区域，粒子在整页都能响应 */
  pointer-events: none;
}

.wrap {
  width: 100%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  pointer-events: auto;
}

.projects {
  display: grid;
  gap: 0.875rem;
}

@media (max-width: 480px) {
  .page {
    padding-top: 8vh;
  }

  .wrap {
    gap: 3rem;
  }
}
</style>
