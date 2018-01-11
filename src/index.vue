<template src="./template.html"></template>
<style scoped>
    .more,
    .end {
        width: 100%;
        font-size: 24px;
        overflow: hidden;
        position: relative;
        display: flex;
        height: 60px;
        line-height: 60px;
        justify-content: center;
        align-items: center;
    }

    .text {
        margin-left: 10px;
        position: relative;
        display: inline-block;
    }

</style>
<script>
	import { getScrollElement, debounce } from './utils'

	let flag = false
	export default {
		props: {
			text: {
				type: String,
				default: '已加载到最新数据'
			},
			distance: {
				type: Number,
				default: 30
			},
			end: {
				type: Boolean,
				default: false
			}
		},
		data(){
			return {
				load: this.loading
			}
		},
		computed: {
			ended: {
				get () {
					return this.end
				}
			}
		},
		mounted() {
			if(!flag) {
				const el = getScrollElement(this.$refs.scroll)
				if(typeof el.addEventListener === 'function') {
					el.addEventListener('scroll', debounce(this.pageScroll.bind(this, el), 400))
				}

			}
		},
		methods: {
			pageScroll(el) {
				if(this.ended) return

				this.load = el.scrollHeight - el.clientHeight - el.scrollTop < this.distance

				if(this.load) {
					// 调用异步读取接口
					this.$emit('next', () => this.load = false)
				}
			}
		}
	}

</script>