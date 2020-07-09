import axios from 'axios'
import {
	HOST
} from '@/config/config'
export function getrank(idx){
	const url = `http://120.79.162.149:3000/top/list?idx=${idx}`
	return axios.get( url ).then( ( res ) => {
		return Promise.resolve( res.data )
	} ).catch( ( err ) => {
		return Promise.reject( err )
	} )
	
}