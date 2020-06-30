import jsonp from '@/config/jsonp'
import {commonParams,options} from '@/config/config'




export function getRecommend(){
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	
	const data = Object.assign({}, commonParams, {
	    platfrom: 'h5',
	    uin: 0,
	    needNewCode: 1
	})
	//console.log(url,data)
	return jsonp(url, data, options)

}