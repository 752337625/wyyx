<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	export default {
		props: {
			/*
			1 滚动的时候会派发scroll事件，会截流。
			2 滚动的时候实时派发scroll事件，不会截流。
			3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件     
			*/
			probeType: {
				type: Number,
				default: 1
			},
			//点击列表是否派发click事件
			click: {
				type: Boolean,
				default: true
			},
			momentum: {
				type: Boolean,
				default: true
			},
			//是否开启横向滚动
			scrollX: {
				type: Boolean,
				default: false
			},
			//是否开启纵向滚动
			scrollY: {
				type: Boolean,
				default: true
			},
			bounce: {
				type: Object,
				default: function() {
					return {
						top: true,
						bottom: true,
						left: false,
						right: false
					}
				},

			},
			data: {
				type: Array,
				default: null
			},
			//是否派发滚动事件
			listenScroll: {
				type: Boolean,
				default: false
			},
			//是否派发滚动到底部的事件，用于上拉加载 
			pullup: {
				type: Boolean,
				default: false
			},
			//是否派发顶部下拉的事件，用于下拉刷新 
			pulldown: {
				type: Boolean,
				default: false
			},
			//是否派发列表滚动开始的事件 
			beforeScroll: {
				type: Boolean,
				default: false
			},
			//当数据更新后，刷新scroll的延时。
			refreshDelay: {
				type: Number,
				default: 20
			}
		},
		mounted() {
			this.$nextTick(() => {
				this._initScroll()
			})
		},
		methods: {
			_initScroll() {
				if (!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click,
					scrollX: this.scrollX,
					scrollY:this.scrollY,
					bounce: this.bounce,
					momentum:this.momentum

				})

				if (this.listenScroll) {
					let _this = this
					this.scroll.on('scroll', (pos) => {
						_this.$emit('scroll', pos)
					})
				}
				// 是否派发滚动到底部事件，用于上拉加载
				if (this.pullup) {
					this.scroll.on('scrollEnd', () => {
						if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
							this.$emit('scrollToEnd')
						}
					})
				}
				// 是否派发顶部下拉事件，用于下拉刷新
				if (this.pulldown) {
					this.scroll.on('touchend', (pos) => { // 下拉动作
						if (pos.y > 50) {
							this.$emit('pulldown')
						}
					})
				}
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			disable() {
				this.scroll && this.scroll.disable()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			}
		},
		watch: {
			data() {
				setTimeout(() => {
					this.refresh()
				}, this.refreshDelay)
			}
		}
	}
</script>


<style lang="less" scoped>
</style>
