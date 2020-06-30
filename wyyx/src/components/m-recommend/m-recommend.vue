<template>
	<div class="recommend" ref="recommend">
		<scroll>
			<div>
				<div v-if="recommends.length"class="slide-wrapper">
					<swiper :options="swiperOption" ref="mySwiper">
						<swiper-slide>
							<router-link :to="{ name: 'Tbs'}" class="swiper-a">
								<img src="../../assets/img/1.jpg">
							</router-link>
						</swiper-slide>
						<swiper-slide>
							<router-link :to="{ name: 'Tbs'}" class="swiper-a">
								<img src="../../assets/img/2.jpg">
							</router-link>
						</swiper-slide>
						<swiper-slide>
							<router-link :to="{ name: 'Tbs'}" class="swiper-a">
								<img src="../../assets/img/3.jpg">
							</router-link>
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
				</div>
				<div class="recommend-list">
				</div>
			</div>
		</scroll>
	</div>
</template>
<script>
	import 'swiper/css/swiper.css'
	import {
		Swiper,
		SwiperSlide
	} from 'vue-awesome-swiper'
	import {
		getRecommend
	} from '@/api/recommend'
	import {
		ERR_OK
	} from '@/config/config'
	export default {
		components: {
			'scroll': ( ) => import( '@/base/scroll/scroll' ),
			Swiper,
			SwiperSlide
		},
		data( ) {
			return {
				swiperOption: {
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						//bulletClass: 'my-bullet', //需设置.my-bullet样式
						//bulletActiveClass: 'my-bullet-active',
					},
					loop: true, //开启轮播图前后循环模式
					autoplay: {
						delay: 3000, //3秒切换一次
						disableOnInteraction: false,
					},
				},
				recommends: [ ]
			}
		},
		created( ) {
			this._getRecommend( );
		},
		methods: {
			_getRecommend( ) {
				getRecommend( ).then( ( res ) => {
					console.log(res)
					if ( res.code === ERR_OK ) {
						this.recommends = res.data.slider
					}
				} ).catch( ( err ) => {
					console.log( err )
				} );
			}
		}
	}
</script>
<style lang="less" scoped>
	img {
		height: 150px;
		max-width: 100%;
	}
</style>
