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