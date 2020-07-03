#路由懒加载原理

##路由懒加载的原理?
然后通过Webpack编译打包后，会把每个路由组件的代码分割成一一个js文件，初始化时不会加载这些js文件，只当激活路由组件才会去加载对应的js文件。

##路由懒加载常用方式?
常用的懒加载方式有两种：即使用vue异步组件 和 ES中的import
~~~
component: resolve=>(require(["@/components/HelloWorld"],resolve))
const HelloWorld = ()=>import("@/components/HelloWorld")  //使用import不要添加大括号包含住import

~~~

##路由懒加载常用地方?
~~~
1.路由index.js中使用。
2.父组件中使用自组件使用。
~~~

#路由对象
##$route
##$Router 
router.app:配置了 router 的 Vue 根实例。
router.mode:路由使用的模式。
router.currentRoute:当前路由对应的路由信息对象。
###Router 实例方法
router.beforeEach
router.beforeResolve
router.afterEach
router.push
~~~
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
注意：如果提供了 path，params 会被忽略。上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
同样的规则也适用于 router-link 组件的 to 属性。
~~~
router.replace
router.go
router.back
router.forward



