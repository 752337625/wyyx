<template>
	<div class="recommend" ref="recommend">
		<scroll class="recommend-content" :data="discList" ref="scroll">
			<div class="recommend-item">
				<div class="decorate"></div>
				<div v-if="recommends.length" class="slide-wrapper">
					<swiper v-if="recommends.length" :options="swiperOption" ref="mySwiper">
						<swiper-slide v-for="(item,index) in recommends" :key="item.id" class="swiper-item">
							<a :href="item.linkUrl">
								<img :data-src="item.picUrl" class="swiper-lazy">
							</a>
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li v-for="(item, index) in discList" :key="index" class="item">
							<div class="icon" @click="selectItem(item)">
								<div class="gradients"></div>
								<img v-lazy="item.picUrl">
							</div>
							<p class="play-count">
								<i class="fa fa-headphones"></i>{{Math.floor(item.playCount /10000) }}万 </p>
							<div class="text">
								<p class="name">{{item.name}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="recommend-song">
					<h1 class="list-title">热门推荐歌曲</h1>
					<ul>
						<li class="item" v-for="item in recommendMusic" :key="item.id" @click="selectSong(item)">
							<div class="icon">
								<img v-lazy="item.picUrl">
							</div>
							<p class="text">{{item.name}}</p>
							<p class="singer">{{item.singer}}</p>
						</li>
					</ul>
				</div>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>
<script>
	import 'swiper/css/swiper.css';
	import {
		Swiper,
		SwiperSlide
	} from 'vue-awesome-swiper';
	import {
		getRecommend,
		getDiscList,
		getRecommendMusic
	} from '@/api/recommend';
	import {
		ERR_OK,
		ERR_OK_code
	} from '@/config/config';
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	export default {
		components: {
			'scroll': ( ) => import( '@/base/scroll/scroll' ),
			Swiper,
			SwiperSlide
		},
		data( ) {
			return {
				swiperOption: {
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						bulletClass: 'my-bullet', //需设置.my-bullet样式
						bulletActiveClass: 'my-bullet-active',
					},
					loop: true, //开启轮播图前后循环模式
					autoplay: {
						delay: 3000, //3秒切换一次
						disableOnInteraction: false,
					},
					lazy: {
						loadPrevNextAmount: 2,
						loadOnTransitionStart: true,
					},
				},
				recommends: [ ],
				discList: [ ],
				recommendMusic: [ ]
			}
		},
		created( ) {
			this._getRecommend( );
			this._getDiscList( );
			this._getRecommendMusic( )
		},
		methods: {
			_getRecommend( ) {
				getRecommend( ).then( ( res ) => {
					if ( res.code === ERR_OK_code ) {
						this.recommends = res.banners
					}
				} ).catch( ( err ) => {
					console.log( err )
				} );
			},
			_getDiscList( ) {
				getDiscList( ).then( ( res ) => {
					if ( res.code === ERR_OK_code ) {
						this.discList = res.result
					} else {
						console.error( 'getDiscList 获取失败' )
					}
				} ).catch( ( err ) => {
					console.log( err )
				} );
			},
			_getRecommendMusic( ) {
				getRecommendMusic( ).then( ( res ) => {
					if ( res.code === ERR_OK_code ) {
						/* let list = res.data.result.map((item) => {
						   return createRecommendSong(item)
						 })
						 list.splice(9) */
						this.recommendMusic = res.result
					} else {
						console.error( 'getRecommendMusic 获取失败' )
					}
				} ).catch( ( err ) => {
					console.log( err )
				} );
			},
			selectItem( item ) {
				this.$router.push( {
					path: `recommend/${item.id}`
				} )
				this.setMuiscList( item )
			},
			selectSong( item ) {
				console.log( item )
			},
			...mapMutations( {
				setMuiscList: 'SET_MUSIC_LIST',
				setFullScreen: 'SET_FULL_SCREEN'
			} ),
		},
		computed: { ...mapState( {} ),
		},
	}
</script>
<style lang="less" scoped>
	@import '../../assets/less/variable.less';

	.recommend {
		position: fixed;
		top: 88px;
		bottom: 0;
		width: 100%;
		z-index: 100;

		.recommend-content {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		.decorate {
			position: absolute;
			z-index: -10;
			top: -158px;
			width: 100%;
			height: 293px;
			background-color: @color-background;
		}

		.slide-wrapper {
			width: 96%;
			margin: 0 auto;
			overflow: hidden;
			border-radius: 5px;
			.swiper-item {
				img {
					width: 100%;
					display: block;
				}
			}
		}
	}

	.recommend-list,
	.recommend-song {
		.list-title {
			height: 65px;
			line-height: 65px;
			text-align: center;
			font-size: @font-size-medium;
			font-weight: 700;
			color: @color-text-title;
		}

		.item {
			display: inline-block;
			position: relative;
			box-sizing: border-box;
			width: 33%;
			padding: 0 1%;

			.icon {
				position: relative;
				display: inline-block;
				width: 100%;
				margin-bottom: 5px;

				.gradients {
					position: absolute;
					top: 0;
					width: 100%;
					height: 35px;
					border-radius: 3px;
					background: linear-gradient(hsla(0, 0%, 43%, .4), hsla(0, 0%, 100%, 0));
				}

				img {
					width: 100%;
					height: 100%;
					border-radius: 3px;
				}
			}

			.play-count {
				position: absolute;
				top: 5px;
				right: 8px;
				font-size: @font-size-small-s;
				color: @color-text-l;
			}

			.text {
				float: left;
				line-height: 16px;
				text-align: left;
				height: 50px;
				overflow: hidden;
				margin-bottom: 5px;
				font-size: @font-size-small;
			}

			.singer {
				line-height: 16px;
				margin-bottom: 10px;
				text-align: left;
				@include no-wrap();
				font-size: @font-size-small;
				color: @color-text-g;
			}
		}
	}
</style>
