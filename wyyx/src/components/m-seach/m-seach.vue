<template>
	<transition name="search">
		<div class="m-search">
			<div class="search-box-wrapper">
				<i class="fa fa-angle-left" @click="back"></i>
				<search-box ref="searchBox" @query="newQuery"></search-box>
			</div>
			<scroll class="search-scroll-wrapper" ref="scroll" :bounce="bounce">
				<div class="search-hots">
					<p class="title">热门搜索</p>
					<span class="search-hots-item" v-for="(item,index ) in hots" :key="index" @click="addQuery(item.first)">
						{{item.first}}
					</span>
				</div>
				<!-- <div class="shortcut-wrapper" >
				  <div class="search-history" v-show="searchHistory.length">
				    <h1 class="title">
				      <span class="text">搜索历史</span>
				      <span class="clear" @click="showConfirm">
				        <i class="icon-clear" ></i>
				      </span>
				    </h1>
				    <search-list @select=addQuery @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
				  </div>
				</div> -->
				<div class="search-result">
					<suggest></suggest>
				</div>
			</scroll>
			<div class="confirm"></div>
		</div>
	</transition>
</template>
<script>
	import {
		debounce
	} from 'lodash'
	import scroll from '@/base/scroll/scroll'
	import {
		getSearchHot
	} from '@/api/search'
	import {
		ERR_OK_code
	} from '@/config/config'
	export default {
		data( ) {
			return {
				bounce: {
					top: true,
					bottom: true,
					left: false,
					right: false
				},
				hots: [ ]
			}
		},
		created( ) {
			this._getSearchHot( );
		},
		methods: {
			_getSearchHot( ) {
				getSearchHot( ).then( ( res ) => {
					if ( res.code === ERR_OK_code ) {
						this.hots = res.result.hots
					} else {
						console.log( "getSearchHot获取失败" )
					}
				} ).catch( ( err ) => {
					console.log( err )
				} )
			},
			back( ) {
				this.$router.back( )
				this.$refs.searchBox.clear( )
			},
			addQuery( first ) {},
			newQuery( query ) {
				this.query = query
			}
		},
		components: {
			scroll,
			'searchBox': ( ) => import( '@/base/search-box/search-box' ),
			'suggest': ( ) => import( '@/base/suggest/suggest' )
		},
	}
</script>
<style lang="less" scoped>
	.m-search {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		background: #f2f3f4;

		.search-box-wrapper {
			padding: 10px 40px 10px 43px;
			background: #d44439;

			.fa-angle-left {
				position: absolute;
				left: 5px;
				top: 3px;
				padding: 3px 10px;
				font-size: 30px;
				color: #fff;
			}
		}

		.search-scroll-wrapper {
			height: 100%;
			overflow: hidden;
			position: relative;

			.search-hots {
				margin: 0 20px;

				p {
					padding: 15px 5px 10px;
					font-size: 12px;
					color: #757575;
				}

				span {
					display: inline-block;
					padding: 3px 5px;
					margin: 4px;
					border: .8px solid #c7c7c7;
					border-radius: 5px;
					line-height: 20px;
					color: #2e3030;
					font-size: 14px;
				}
			}
			.search-result {
				position: absolute;
				top: 10px;
				right: 0;
				left: 0;
				bottom: 0;
				background: #f2f3f4;
			}
		}

		.confirm {
			display: none;
		}
	}

	&.search-enter-active,
	&.search-leave-active {
		transition: all 0.2s;
	}

	&.search-enter,
	&.search-leave-to {
		transform: translate3d(50%, 0, 0);
		opacity: 0;
	}
</style>
