<template>
	<transition name="slide" mode="out-in">
		<div class="music-list"> 5555 </div>
	</transition>
</template>
<script>
	export default {}
</script>
<style lang="less" scoped>
	@import '../../assets/less/variable.less';
	.slide-enter-active,
	.slide-leave-active {
		transition: all 0.2s
	}

	.slide-enter,
	.slide-leave-to {
		transform: translate3d(30%, 0, 0);
		opacity: 0;
	}

	.music-list {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
	  background: @color-background-list;
	}
</style>
