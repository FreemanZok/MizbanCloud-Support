<template>
	<div class="HttpsSetting">
		<div class="mb-4 px-3 pt-3 pb-4 glass-back shadowcard my-curve-2">
			<div
				class="d-flex justify-content-between bg-white my-padd my-curve-2"
			>
				<div class="shape-wrap">
					<img
						src="/src/assets/general/images/root/ico_browser.svg"
						alt=""
					/>
				</div>
				<div class="shape-wrap">
					<img
						src="/src/assets/general/images/root/ico_browser.svg"
						alt=""
					/>
				</div>
				<div class="shape-wrap">
					<img
						src="/src/assets/general/images/root/ico_browser.svg"
						alt=""
					/>
				</div>
				<div class="shape-wrap">
					<img
						src="/src/assets/general/images/root/ico_browser.svg"
						alt=""
					/>
				</div>
				<div class="shape-wrap">
					<img
						src="/src/assets/general/images/root/ico_browser.svg"
						alt=""
					/>
				</div>
			</div>
		</div>
		<div class="px-3 pt-3 pb-4 glass-back shadowcard my-curve-2">
			<ContentWithTitleNew
				title="ارتباط مخاطب با سرورهای میزبان کلود"
				class="el-margin"
			>
				<div class="d-flex 3card">
					<div class="">
						<div class="shape-wrap">
							<img
								src="/src/assets/general/images/newpage/ico_green_slock.jpg"
								alt=""
							/>
						</div>
					</div>
				</div>
			</ContentWithTitleNew>
		</div>
	</div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from "vue";
import AutoTable from "@/components/global/AutoTable.vue";
import ContentWithTitleNew from "@/components/shared/ContentWithTitleNew.vue";
import { myMixin } from "@/mixins/mixin.js";
import * as apiCall from "@/api/index.js";
import { useRouter, useRoute } from "vue-router";
import newStore from "@/store/store.js";
</script>
<style lang="scss">
.my-padd {
	padding: 50px 30px !important;
}
</style>
