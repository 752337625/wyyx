<template>
	<div class="rank" ref="rank">
		<scroll  :bounce="bounce" class="toplist" ref="scroll" >
			<ul>
				<li class="item" v-for="(item,index) in yunTopList" :key="index">
					<div class="icon">
						<img v-lazy="item.coverImgUrl" />
					</div>
					<ul class="songlist">
						<li class="song" v-for="(song, index) in item.top" :key="index">
							<span>{{index + 1}}.</span>
							<span>{{song.name}} - {{song.ar[0].name}}</span>
						</li>
					</ul>
				</li>
			</ul>
		</scroll>
	</div>
</template>
<script>
	import {
		getrank
	} from '@/api/rank'
	import {
		ERR_OK_code
	} from '@/config/config'
	const YUNMUSIC_TOP = [ 0, 1, 2, 3, 4, 17, 22, 23 ]
	export default {
		components: {
			'scroll': ( ) => import( '@/base/scroll/scroll' ),
		},
		data( ) {
			return {
				yunTopList: [ ],
				bounce: {
					top: false,
					bottom: true,
					left: false,
					right: false
				}
			}
		},
		created( ) {
			this._getrank( )
		},
		methods: {
			_getrank( ) {
				for ( let i = 0; i < YUNMUSIC_TOP.length; i++ ) {
					getrank( YUNMUSIC_TOP[ i ] ).then( ( res ) => {
						console.log( res )
						if ( res.code === ERR_OK_code ) {
							let list = res.playlist
							list.top = res.playlist.tracks.splice( 0, 3 )
							this.yunTopList.push( list )
						} else {
							console.log( `_getrank获取第${YUNMUSIC_TOP[i]}失败` )
						}
					} ).catch( ( err ) => {
						console.log( err )
					} )
				}
			}
		},
	}
</script>
<style lang="less" scoped>
	.rank {
		position: fixed;
		top: 88px;
		bottom: 0;
		left: 0;
		right: 0;

		.toplist {
			height: 100%;
			overflow: hidden;
			padding-top: 5px;

			.item {
				display: flex;
				margin: 0 10px;
				padding: 3px 0;
				border-bottom: 1px solid #e4e4e4;

				.icon {
					width: 100px;
					height: 100px;

					img {
						width: 100px;
						height: 100px;
						overflow: hidden;
						border-radius: 3px;
					}
				}

				.songlist {
					display: flex;
					flex: 1;
					justify-content: center;
					flex-direction: column;
					padding: 0 20px;
					height: 100px;
					overflow: hidden;
					font-size: 12px;
					color: #2e3030;

					.song {
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						line-height: 30px;
					}
				}
			}
		}
	}
</style>
