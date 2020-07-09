<template>
	<div class="search-box">
		<input :placeholder="placeholder" v-model="query" type="text" class="box">
		<i v-show="query" class="icon-delete" @click="clear"></i>
	</div>
</template>
<script>
	import {debounce} from 'lodash'
	export default {
		data( ) {
			return {
				query: '',
				placeholder: '搜索歌曲、歌手'
			}
		},
		created( ) {
			this.$watch('query', debounce((newQuery) => {
			  this.$emit('query', newQuery)
			}, 500))
		},
		methods: {
			clear( ) {
				this.query = ''
			}
		},
	}
</script>
<style lang="less" scoped>
	.search-box {
		display: flex;
		align-items: center;
		width: 100%;
		height: 25px;

		.box {
			flex: 1;
			height: 25px;
			line-height: 25px;
			background: #d44439;
			color: #fff;
			font-size: 14px;

			&::placeholder {
				color: rgba(255, 255, 255, 0.6);
			}
		}

		.icon-delete {
			position: absolute;
			right: 12px;
			font-size: 14px;
			color: hsla(0, 0%, 100%, .8);
			border: none;
		}
	}
</style>
