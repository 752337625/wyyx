<template>
	<div class="suggest">
		<div class="search-suggest">
			<p class="title">最佳匹配</p>
			<div class="search-suggest-item">
				<img width="50" height="50"/>
				<span>歌手：绯儿</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {}
</script>
<style lang="less" scoped>
	.suggest {
		height: 100%;
		overflow: hidden;

		.search-suggest {
			.title {
				padding-left: 20px;
				padding-bottom: 10px;
				color: #d44439;
				font-size: 11px;
			}
		}
	}
</style>
