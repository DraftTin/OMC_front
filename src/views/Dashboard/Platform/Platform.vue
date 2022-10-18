<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
	<div v-if="route.name === '平台管理'">
		<h1>平台管理</h1>
	</div>
	<router-view v-else />
</template>
<style scoped></style>
