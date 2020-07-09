<template>
	<transition name="slide" mode="out-in">
		<div class="music-list">
			<div class="header" ref="header">
				<div class="back" @click="back"><i class="fa fa-angle-left"></i></div>
				<div class="text">
					<h1 class="title">{{headerTitle}}</h1>
				</div>
			</div>
			<scroll class="list" ref="list" @scroll="scroll" :bounce="bounce" :listenScroll="listenScroll" :probeType="probeType"
			 :data="listDetail">
				<div class="music-list-wrapper">
					<div class="bg-image" :style="bgStyle" ref="bgImage">
						<div class="filter"></div>
						<div class="text">
							<h2 class="list-title">{{title}}</h2>
							<p class="play-count" v-if="playCount">
								<i class="fa fa-headphones"></i>
								{{playCount}}
							</p>
						</div>
					</div>
					<div class="song-list-wrapper">
						<div class="sequence-play" v-show="listDetail.length" @click="sequence">
							<i class="iconfont icon-bofangicon"></i>
							<span class="text">播放全部</span>
							<span class="count">(共{{listDetail.length}}首)</span>
						</div>
						<song-list @select="selectItem" :songs="listDetail"></song-list>
					</div>
				</div>
			</scroll>
			<div v-show="!listDetail.length" class="loading-container">
				<loading></loading>
			</div>
		</div>
	</transition>
</template>
<script>
	import {
		getRecommendListDetail
	} from '@/api/recommend'
	import {
		ERR_OK_code,
		RESERVED_HEIGHT
	} from '@/config/config'
	import {
		createRecommendListSong
	} from '@/util/song'
	import {
		mapState,
		mapActions
	} from 'vuex'
	import scroll from '@/base/scroll/scroll'
	export default {
		data( ) {
			return {
				listDetail: [ ],
				headerTitle: '歌单',
				scrollY: 0,
				bounce: {
					top: false,
					bottom: true,
					left: false,
					right: false
				}
			}
		},
		components: {
			scroll,
			'song-list': ( ) => import( '@/base/song-list/song-list' ),
			'loading': ( ) => import( '@/base/loading/loading' )
		},
		created( ) {
			this._getRecommendListDetail( this.musicList.id )
			this.probeType = 3
			this.listenScroll = true
		},
		mounted( ) {
			this.imageHeight = this.$refs.bgImage.clientHeight
			this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
		},
		methods: {
			scroll( pos ) {
				this.scrollY = pos.y
			},
			_getRecommendListDetail( id ) {
				if ( !id ) {
					this.$router.push( '/recommend' )
					return
				}
				getRecommendListDetail( id ).then( ( res ) => {
					if ( res.code === ERR_OK_code ) {
						this.listDetail = res.result.tracks.map( ( item ) => {
							return createRecommendListSong( item )
						} )
					} else {
						console.error( 'getRecommendListDetail 获取失败！' )
					}
				} ).catch( ( err ) => {
					console.log( err )
				} )
			},
			sequence( ) {},
			selectItem( ) {
				
			},
			back( ) {
				this.$router.back( )
			},
			...mapActions({
				
			})
		},
		computed: { 
			...mapState( {
				'musicList': state => state.Recommend.musicList
			} ),
			title( ) {
				return this.musicList.name
			},
			bgStyle( ) {
				return `background-image: url(${this.musicList.picUrl})`
			},
			playCount( ) {
				if ( !this.musicList.playCount ) {
					return
				}
				if ( this.musicList.playCount < 1e5 ) {
					return Math.floor( this.musicList.playCount )
				} else {
					return Math.floor( this.musicList.playCount / 10000 ) + '万'
				}
			},
		},
		watch: {
			scrollY( newY ) {
				// let translateY = Math.max(this.minTranslateY, newY)
				const percent = Math.abs( newY / this.imageHeight )
				if ( newY < ( this.minTranslateY + RESERVED_HEIGHT - 20 ) ) {
					this.headerTitle = this.musicList.name
				} else {
					this.headerTitle = '歌单'
				}
				if ( newY < 0 ) {
					this.$refs.header.style.background = `rgba(212, 68, 57, ${percent})`
				} else {
					this.$refs.header.style.background = `rgba(212, 68, 57, 0)`
				}
				// console.log(this.minTranslateY + RESERVED_HEIGHT)
				// if (translateY )
				// console.log(translateY)
			}
		}
	}
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

	.loading-container {
		position: absolute;
		width: 100%;
		top: 70%;
		transform: translateY(-50%);
	}

	.music-list {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		background: @color-background-list;

		.header {
			position: fixed;
			top: 0;
			z-index: 100;
			width: 100%;
			height: 44px;
			color: #fff;

			.back {
				position: absolute;
				top: 0;
				left: 4px;
				line-height: 44px;

				.fa-angle-left {
					line-height: 30px;
					font-size: 30px;
					padding: 6px 10px !important;
				}
			}

			.text {
				position: absolute;
				left: 38px;
				padding: 12px 0;
				font-size: @font-size-medium-x;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}

		.list {
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			background: #f2f3f4;

			.music-list-wrapper {
				.bg-image {
					position: relative;
					width: 100%;
					height: 0;
					padding-top: 75%;
					transform-origin: top;
					background-size: cover;
					background-position: 0 30%;

					.filter {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: black;
						opacity: 0.2;
					}

					.text {
						position: absolute;
						width: 80%;
						height: 40px;
						bottom: 50px;
						left: 15px;
						color: #fff;

						.list-title {
							position: absolute;
							bottom: 0;
							font-size: @font-size-medium-x;
							line-height: 18px;
							font-weight: bold;
							letter-spacing: 1px;
						}

						.play-count {
							position: absolute;
							bottom: -16px;
							font-size: @font-size-small ;
						}
					}
				}
			}

			.song-list-wrapper {
				padding: 41px 0 20px 0;
				border-radius: 10px;
				position: relative;
				top: -20px;
				background: @color-background-list;

				.sequence-play {
					position: absolute;
					top: 0px;
					display: flex;
					align-items: center;
					width: 100%;
					height: 40px;
					padding-left: 16px;
					border-bottom: 1px solid rgb(228, 228, 228);

					.iconfont {
						font-size: @font-size-large ;
						color: @color-text-title;
						padding-right: 14px;
					}

					.text {
						font-size: @font-size-medium-x;
					}

					.count {
						font-size: @font-size-medium;
						color: @color-text-g;
					}
				}
			}
		}
	}
</style>
