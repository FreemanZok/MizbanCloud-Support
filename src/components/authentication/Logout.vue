<template></template>

<script>
export default {
	name: "Logout",
	created() {
		// this.$store.commit("setUserData");

		// localStorage.removeItem("token");
		localStorage.setItem("token", "");
		this.$router.push("/login");
	},
};
</script>

<style scoped></style>
