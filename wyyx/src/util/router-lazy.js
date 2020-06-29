const routerLazy=function(url){
	return ()=>import(url)
}


export {routerLazy}