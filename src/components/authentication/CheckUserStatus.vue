<template>
	<div class="d-none"></div>
</template>

<script>
export default {
	name: "CheckUserStatus",
	data() {
		return {
			loading: false,
		};
	},
	created() {
		this.checkStatus();
		setTimeout(this.checkStatus, 5 * 60 * 1000);
	},
	methods: {
		checkStatus() {
			if (!this.loading) {
				this.loading = true;
				this.$requests
					.checkUserState()
					.then((res) => {
						if (res?.success) {
							this.$store.commit("setUserData", res.userData);
						} else {
							this.$helpers.showAlert(
								res.message || "اطلاعات لاگین کاربر یافت نشد.",
								"خطا!",
								"error",
								{ bodyClass: ["bg-warning", "text-dark"] }
							);
							this.$store.commit("setUserData");
							this.$router.push("/login");
						}
					})
					.then((res) => {
						this.loading = false;
					});
			}
		},
	},
};
</script>

<style scoped></style>
