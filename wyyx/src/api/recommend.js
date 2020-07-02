import jsonp from '@/config/jsonp';
import axios from 'axios';
import {
	commonParams,
	options,
	HOST
} from '@/config/config'
export function getRecommend( ) {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	const data = Object.assign( {}, commonParams, {
		platfrom: 'h5',
		uin: 0,
		needNewCode: 1
	} )
	//console.log(url,data)
	return jsonp( url, data, options )
}
export function getDiscList( ) {
	//const url = HOST+'/personalized';
	const url = 'http://120.79.162.149:3000/personalized'
	return axios.get( url ).then( ( res ) => {
		return Promise.resolve( res.data )
	} ).catch( ( err ) => {
		return Promise.reject( err )
	} )
}
export function getRecommendMusic(){
	//const url = HOST+'/personalized/newsong';
	const url = 'http://120.79.162.149:3000/personalized/newsong'
	return axios.get( url ).then( ( res ) => {
		return Promise.resolve( res.data )
	} ).catch( ( err ) => {
		return Promise.reject( err )
	} )
	
	
}