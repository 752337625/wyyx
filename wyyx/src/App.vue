<template>
	<div id="app">
		<m-header></m-header>
		<tab></tab>
		<keep-alive>
		    <router-view></router-view>
		</keep-alive> 
	</div>
</template>
<script>
	export default {
		mounted() {
			console.log(this)
		},
		components: {
			'MHeader':()=>import('@/components/m-header/m-header'),
			'tab':()=>import('@/components/m-tab/m-tab')
		},
	}
</script>
<style lang="less" scoped="scoped">
</style>
