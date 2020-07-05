/**
 * 为了和QQ音乐接口一致，配置一些公用的参数、options和err_num码
 */
export const commonParams = {
	g_tk: 5381,
	inCharset: 'utf-8',
	outCharset: 'utf-8',
	notice: 0,
	format: 'jsonp'
}

export const options = {
	param: 'jsonpCallback'
}

export const ERR_OK = 0;
export const ERR_OK_code = 200
export const HOST = 'http://localhost:8081'
export const RESERVED_HEIGHT = 44
