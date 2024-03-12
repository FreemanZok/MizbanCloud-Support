<template>
  <div
    class="tw-border tw-border-gray-200 tw-rounded-lg px-2 px-md-4 tw-relative tw-w-full ContentWithTitleNew"
    :class="[props.type == 'no_padding' ? '' : 'tw-py-4']"
  >
    <span
      class="tw-p-1 tw-bg-[#48B1E5] tw-text-white tw-text-xs tw-px-3 tw-rounded-xl tw-absolute tw-top-[-12px] tw-z-10 tw-right-6"
      :class="{ 'back-danger': props.type == 'danger' }"
      ><span class="rtl">
        {{ props.title }}
      </span>
      <span
        v-if="props.icon"
        :class="'icon-' + props.icon"
        class="tw-mr-2"
      ></span
    ></span>

    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps(["title", "type", "icon"]);
</script>

<style scoped lang="scss">
.ContentWithTitleNew {
  .back-danger {
    background: #ff7474 !important;
  }
}
</style>
