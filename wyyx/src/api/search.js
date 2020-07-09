import axios from 'axios'
import {
	HOST
} from '@/config/config'
export function getSearchHot( ) {
	const url = `http://120.79.162.149:3000/search/hot`
	return axios.get( url ).then( ( res ) => {
		return Promise.resolve( res.data )
	} ).catch( ( err ) => {
		return Promise.reject( err )
	} )
}
export function getSongDetail( id ) {
	const url = `http://120.79.162.149:3000/song/detail?ids=${id}`
	return axios.get( url ).then( ( res ) => {
		return Promise.resolve( res.data )
	} ).catch( ( err ) => {
		return Promise.reject(err)
	} )
}
