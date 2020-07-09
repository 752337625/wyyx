<template>
	<div class="singer" ref="singer">
		<list-view :data="singers" @select="selectSinger" ref="list"></list-view>
		<router-view></router-view>
	</div>
</template>
<script>
	import {
		ERR_OK_code
	} from '@/config/config'
	import {
		getSingers
	} from '@/api/singer'
	import Singer from '@/util/Singer'
	import ListView from '@/base/listview/listview'
	const pinyin = require( 'pinyin' )
	const HOT_NAME = '热门'
	const HOT_SINGERS = 10
	export default {
		data( ) {
			return {
				singers: [ ]
			}
		},
		components: {
			'ListView': ( ) => import( '@/base/listview/listview' )
		},
		computed: {},
		created( ) {
			this._getSingers( )
		},
		methods: {
			_getSingers( ) {
				getSingers( ).then( ( res ) => {
					if ( res.code === ERR_OK_code ) {
						let s = res.artists
						s.map( ( item ) => {
							let py = pinyin( item.name[ 0 ], {
								style: pinyin.STYLE_FIRST_LETTER
							} )
							item.initial = py[ 0 ][ 0 ].toUpperCase( )
						} )
						this.singers = this._normalizeSinger( s )
					} else {
						console.error( "getSingers获取失败" )
					}
				} ).catch( ( err ) => {
					console.log( err )
				} )
			},
			_normalizeSinger( list ) {
				let map = {
					hot: {
						title: HOT_NAME,
						items: [ ]
					}
				}
				list.forEach( ( item, index ) => {
					if ( index < HOT_SINGERS ) {
						map.hot.items.push( new Singer( {
							id: item.id,
							name: item.name,
							avatar: item.img1v1Url,
							aliaName: item.alias.join( ' / ' )
						} ) )
					}
					const key = item.initial
					if ( !map[ key ] ) {
						map[ key ] = {
							title: key,
							items: [ ]
						}
					}
					map[ key ].items.push( new Singer( {
						id: item.id,
						name: item.name,
						avatar: item.img1v1Url,
						aliaName: item.alias[ 0 ]
					} ) )
				} )
				let hot = [ ]
				let ret = [ ]
				for ( const key in map ) {
					let val = map[ key ]
					if ( val.title.match( /[A-Z]/ ) ) {
						ret.push( val )
					} else if ( val.title === HOT_NAME ) {
						hot.push( val )
					}
				}
				ret.sort( ( a, b ) => {
					return a.title.charCodeAt( 0 ) - b.title.charCodeAt( 0 )
				} )
				return hot.concat( ret )
			},
			selectSinger( singer ) {
				 this.$router.push({
					path:`/singer/${singer.id}`
				}) 
			}
		}
	}
</script>
<style lang="less" scoped>
	.singer{
		position: fixed;
		top:88px;
		bottom: 0;
		width: 100%;
		z-index: 100;
	}
</style>
