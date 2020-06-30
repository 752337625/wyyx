<template>
	<div class="m-tab">
		<router-link tag="div" to="/recommend" class="tab-item" exact>
			  <span class="tab-link">推荐</span>
		</router-link>
		<router-link tag="div" to="/to" class="tab-item" exact>
			  <span class="tab-link">歌手</span>
		</router-link>
		<router-link tag="div" to="/from" class="tab-item">
			  <span class="tab-link">排行</span>
		</router-link>
		<router-link tag="div" to="/link" class="tab-item">
			  <span class="tab-link">搜索</span>
		</router-link>
	</div>
</template>

<script>
</script>

<style lang="less" scoped="scoped">
	@import "../../assets/less/variable.less";
	.m-tab{
	    display: flex;
	    height: 44px;
	    line-height: 44px;
	    font-size: @font-size-medium;
			.tab-item{
				flex: 1;
				text-align: center;
				.tab-link{
					padding-bottom: 5px;
					color: hsla(0,0%,100%,.5);
				}
				&.router-link-active{
					.tab-link{
						color: @color-theme;
						border-bottom: 2px solid @color-theme;
						transition: all .3s;
					}
				}
			}
	}
</style>
