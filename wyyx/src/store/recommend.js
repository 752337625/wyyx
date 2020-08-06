import * as types from './mutation-types'
const Recommend = {
  state: ( ) => ( {
		musicList:{}
		
	} ),
	mutations: {
		[types.SET_MUSIC_LIST] (state, musicList) {
		  state.musicList = musicList
		},
	},
	actions: {
		insertSong({commit,state},song){
			console.log(state,song)
		}
		
	},
	modules: {},
	getters: {} 
}


export  default Recommend