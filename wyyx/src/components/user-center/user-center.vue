<template>
	<transition name="slide">
		<div class="user-center">
			<div class="back" @click="back">
				<i class="icon-back"></i>
			</div>
			<div class="switches-wrapper">
				<switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
			</div>
			<div ref="playBtn" class="play-btn" @click="random">
				<i class="icon-play"></i>
				<span class="text">随机播放全部</span>
			</div>
		</div>
	</transition>
</template>
<script>
	/* import Switches from '@/base/switches/switches'
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'
import NoResult from '@/base/no-result/no-result'
import {mapGetters, mapActions} from 'vuex'
import Song from '@/common/js/song'
import {playlistMixin} from '@/common/js/mixin' */
	export default {
		components: {
			'Switches': ( ) => import( '@/base/switches/switches' )
		},
		data( ) {
			return {
				currentIndex: 0,
				switches: [ {
					name: '我喜欢的'
				}, {
					name: '最近听的'
				} ]
			}
		},
		methods: {
			back( ) {
				this.$router.back( );
			},
			switchItem( index ) {
				this.currentIndex = index
			},
			random( ) {}
		},
	}
</script>
<style lang="less" scoped>
	@import '../../assets/less/variable.less';

	.user-center {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 100;
		background-color: @color-background;

		&.slide-enter-active,
		&.slide-leave-active {
			transition: all 0.2s;
		}

		&.slide-enter,
		&.slide-leave-to {
			transform: translate3d(-50%, 0, 0);
			opacity: 0;
		}

		.back {
			position: absolute;
			top: 0;
			left: 6px;
			z-index: 50;

			.icon-back {
				display: block;
				padding: 10px;
				padding-top: 18px;
				font-size: 22px;
				color: #ffcd32;
			}
		}

		.switches-wrapper {
			margin: 10px 0 30px 0;
		}

		.play-btn {
			box-sizig: border-box;
			width: 135px;
			padding: 7px 0;
			margin: 0 auto;
			text-align: center;
			border: 1px solid @color-text-l;
			color: @color-text-l;
			border-radius: 100px;
			font-size: 0;
		}

		.icon-play {
			display: inline-block;
			vertical-align: middle;
			margin-right: 6px;
			font-size: @font-size-medium-x;
		}

		.text {
			display: inline-block;
			vertical-align: middle;
			font-size: @font-size-small;
		}
	}
</style>
