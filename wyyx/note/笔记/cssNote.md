### pointer-events: auto;
~~~
在做移动端的页面时，经常会遇到点击（touch）一个弹出的层，在上面触发点击（touch）事件，当弹出层关闭之后点击（touch）事件会穿透到下面的层，这时候如果下一层的某个元素也绑定了点击（touch）事件，就会也一起被触发，如何解决这所谓的bug？解决这一问题需要用到css3的新属性，pointer-events。

pointer-events属性有很多值，但是对于浏览器来说，适用于HTML元素的只有三个值，其它的几个值都是针对SVG元素的（本身这个属性就来自于SVG技术，是一个SVG属性，并未在任何CSS规范中定义）。

说明：适用于HTML元素的三个值

auto：默认值，表示指针事件已启用；此时元素会响应指针事件，阻止这些事件在其下面的元素上触发。

none：表示在元素上禁用指针事件；此时该元素将不响应指针事件，但它下面的元素可以响应指针事件，就像元素不存在于它们之上一样。

inherit：表示该元素将从其父级继承其pointer-events值。

pointer-events属性的兼容性：

CSS pointer-events属性（只适用于HTML）

此CSS属性设置为“none”时，允许元素不接收悬停/单击事件，而事件将发生在其后面的任何内容上。
~~~
