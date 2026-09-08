<template>
  <footer class="app-footer">
    <span>Built by Teuku Vaickal Rizki Irdian (IcalUwU)</span>
    <span class="app-footer__dot">·</span>
    <a
      href="https://icaluwu.site"
      target="_blank"
      rel="noopener noreferrer"
      class="app-footer__link"
    >
      icaluwu.site
    </a>
  </footer>
</template>

<style lang="scss" scoped>
  .app-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 40px 16px 28px;
    font-size: 0.85rem;
    color: #64748b;

    &__dot {
      color: #334155;
    }

    &__link {
      color: #ffb454;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: #ffd9a0;
        text-decoration: underline;
      }
    }
  }
</style>
