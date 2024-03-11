<template>
	<div class="onlineStatus">
		<img class="img-bullet" style="width: 10px;" src="@/assets/general/images/root/table/active.svg" alt="" v-c-tooltip="'ارتباط با اینترنت برقرار است'" v-if="online">
		<img class="img-bullet" style="width: 10px;" src="@/assets/general/images/root/table/deactive.svg" alt="" v-c-tooltip="'ارتباط اینترنت خود را بررسی کنید'" v-else>
	</div>
</template>

<script>
import { useOnline } from '@vueuse/core'

export default {
	name: 'CheckOnlineStatus',
	data() {
		return {
			online: useOnline(),
		}
	},
}
</script>

<style scoped>
.onlineStatus {
	display: inline-block;
}
</style>