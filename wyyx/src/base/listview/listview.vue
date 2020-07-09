<template>
	<scroll class="listview" ref="listview" :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll">
		<ul>
			<li v-for="group in data" class="list-group" :key="group.id" ref="listGroup">
				<h2 class="list-group-title">{{ group.title }}</h2>
				<ul>
					<li class="list-group-item" v-for="item in group.items" :key="item.id" @click="selectItem(item)">
						<img class="avatar" v-lazy="item.avatar">
						<span class="name">{{ item.name }}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut" @touchstart="onShortcutStart" @touchmove.stop.prevent="onShortcutMove">
			<ul>
				<li v-for="(item, index) in shortcutList" class="item" :data-index="index" :key="item.id" :class="{'current': currentIndex === index}">
					{{ item }}
				</li>
			</ul>
		</div>
	</scroll>
</template>
<script>
	import scroll from '@/base/scroll/scroll'
	import {
		getData
	} from '@/config/dom'
	const ANCHOR_HEIGHT = 20
	export default {
		props: {
			data: {
				type: Array,
			}
		},
		components: {
			scroll
		},
		data( ) {
			return {
				scrollY: -1,
				currentIndex: 0
			}
		},
		created( ) {
			this.touch = {}
			this.listenScroll = true
			this.listHeight = [ ]
			this.probeType = 3
		},
		methods: {
			selectItem( singer ) {
				this.$emit( "select", singer )
			},
			scroll( pos ) {
				this.scrollY = pos.y
			},
			onShortcutStart( e ) {
				let anchorIndex = getData( e.target, 'index' )
				let firstTouch = e.touches[ 0 ]
				this.touch.y1 = firstTouch.pageY
				this.touch.anchorIndex = anchorIndex
				this._scrollTo( anchorIndex )
			},
			onShortcutMove( e ) {
				let firshTouch = e.touches[ 0 ]
				this.touch.y2 = firshTouch.pageY
				let delta = ( this.touch.y2 - this.touch.y1 ) / ANCHOR_HEIGHT | 0
				let anchorIndex = parseInt( this.touch.anchorIndex ) + delta
				this._scrollTo( anchorIndex )
			},
			_scrollTo( index ) {
				if ( !index && index !== 0 ) {
					return
				}
				if ( index < 0 ) {
					index = 0
				} else if ( index > this.listHeight.length - 2 ) {
					index = this.listHeight.length - 2
				}
				this.scrollY = -this.listHeight[ index ]
				this.$refs.listview.scrollToElement( this.$refs.listGroup[ index ], 0 )
			},
			_calculateHeight( ) {
				this.listHeight = [ ]
				const list = this.$refs.listGroup
				let height = 0
				this.listHeight.push( height )
				for ( let i = 0; i < list.length; i++ ) {
					let item = list[ i ]
					height += item.clientHeight
					this.listHeight.push( height )
				}
			}
		},
		watch: {
			data( ) {
				setTimeout( ( ) => {
					this._calculateHeight( )
				}, 20 )
			},
			scrollY( newY ) {
				// console.log(newY)
				const listHeight = this.listHeight
				if ( newY > 0 ) {
					this.currentIndex = 0
					return
				}
				for ( let i = 0; i < listHeight.length - 1; i++ ) {
					let height1 = listHeight[ i ]
					let height2 = listHeight[ i + 1 ]
					if ( -newY >= height1 && -newY < height2 ) {
						this.currentIndex = i
						return
					}
				}
				this.currentIndex = listHeight.length - 2
			}
		},
		computed: {
			shortcutList( ) {
				return this.data.map( ( group ) => {
					return group.title.substr( 0, 1 )
				} )
			},
			fixedTitle( ) {
				if ( this.scrollY > 0 ) {
					return ''
				}
				return this.data[ this.currentIndex ] ? this.data[ this.currentIndex ].title : ''
			}
		},
	}
</script>
<style lang="less" scoped>
	@import '../../assets/less/variable.less';

	.listview {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;
		background: #f2f3f4;

		.list-group {
			.list-group-title {
				height: 25px;
				line-height: 25px;
				padding-left: 12px;
				margin-bottom: 10px;
				font-size: @font-size-small;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.1);
			}

			.list-group-item {
				display: flex;
				align-items: center;
				padding: 5px 0;
				margin: 0 5px;
				border-bottom: 1px solid rgb(228, 228, 228);

				.avatar {
					width: 50px;
					height: 50px;
					border-radius: 3px;
				}

				.name {
					margin-left: 20px;
					color: @color-text-title;
					font-size: @font-size-medium ;
				}
			}
		}

		.list-shortcut {
			position: absolute;
			z-index: 30;
			right: 3px;
			top: 50%;
			transform: translateY(-50%);
			width: 20px;
			padding: 200px 0;
			border-radius: 3px;
			text-align: center;
			font-family: Helvetica;

			.item {
				padding: 5px 5px;
				line-height: 1;
				color: @color-text-g;
				font-size: @font-size-small;
				font-weight: bold;

				&.current {
					color: #d44439;
				}
			}
		}

		.list-fixed {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.fixed-title {
				height: 20px;
				line-height: 20px;
				padding-left: 20px;
				font-size: @font-size-small;
				color: @color-text-l;
				background: rgba(0, 0, 0, 0.1);
			}
		}
	}
</style>
