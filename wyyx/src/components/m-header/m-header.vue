<template>
	<div class="m-header">
		<div class="icon"></div>
		<h1 class="text">Chicken Music</h1>
    <router-link to="/user" class="mine" tag="div">
            <i class="icon-mine"></i>
    </router-link>
	</div>
</template>
<script>
	export default {}
</script>
<style lang="less" scoped>
	@import "../../assets/less/variable.less";
	@import "../../assets/less/mixin.less";

	.m-header {
		position: relative;
		height: 44px;
		text-align: center;
		color: @color-theme;
	  font-size: 0;
		.icon {
			display: inline-block;
			vertical-align: top;
			margin-top: 6px;
			width: 32px;
			height: 32px;
			margin-right: 7px;
			.bg-image();
			background-repeat: no-repeat;
			background-size: 32px 30px;
		}
		.text{
			display: inline-block;
			vertical-align: top;
			font-size:@font-size-large;
			line-height: 44px;
		}
		.mine{
			position: absolute;
			top: 0;
			right: 0;
			.icon-mine{
				display: block;
				vertical-align: top;
				padding: 12px;
				font-size: @font-size-large-x;
				color: #ffcd32;
			}
		}
	}
</style>
