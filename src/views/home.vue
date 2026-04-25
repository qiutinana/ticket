<template>
	<div class="home-content">
		<!-- title -->
		<div id="home-title" class="home-title animate__animated">
			<div class="titles">
				<span>欢迎使用</span>
				{{ this.$project.projectName }}
			</div>
		</div>
		<!-- statis -->
		<div id="news-box" class="news-box animate__animated">
			<div class="news-title">
				系统公告
			</div>
			<div class="news-list">
				<div class="news-item" v-for="(item, index) in newsList" :index="index" @click="newsDetailClick(item)">
					<div class="news-text">
						{{ item.biaoti }}
					</div>
					<div class="news-time">
						{{ item.addtime }}
					</div>
				</div>
			</div>
		</div>
		<el-dialog :visible.sync="newsVisible" title="系统公告" :append-to-body="true" width="60%">
			<div
				style="width: 100%;text-align: center;font-size: 20px;color: #000;padding: 0 0 20px;font-weight: bold;">
				{{ newsDetail.biaoti }}</div>
			<div style="width: 100%;text-align: right;margin-right: 60px;">
				<el-tag :color="'#' + tags[newsDetail.biaoqian]" effect="dark">{{ newsDetail.biaoqian }}</el-tag>
			</div>
			<div style="width: 100%;">
				<div class="ql-snow ql-editor" v-html="newsDetail.gonggaoneirong"></div>
			</div>
			<div style="width: 100%;text-align: right;margin-right: 60px;">
				发布于：{{ newsDetail.addtime }}
			</div>
		</el-dialog>
	</div>
</template>
<script>
import 'animate.css'
//4
import router from '@/router/router-static'
import * as echarts from 'echarts'
export default {
	data() {
		return {
			qiuyuanshujuCount: 0,
			qiuduishujuCount: 0,
			line: { "backgroundColor": "transparent", "yAxis": { "axisLabel": { "borderType": "solid", "rotate": 0, "padding": 0, "shadowOffsetX": 0, "margin": 15, "backgroundColor": "transparent", "borderColor": "#000", "shadowOffsetY": 0, "color": "#333", "shadowBlur": 0, "show": true, "inside": false, "ellipsis": "...", "overflow": "none", "borderRadius": 0, "borderWidth": 0, "width": "", "fontSize": 12, "lineHeight": 24, "shadowColor": "transparent", "fontWeight": "normal", "height": "" }, "axisTick": { "show": true, "length": 5, "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "cap": "butt", "color": "#333", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "rgba(0,0,0,.5)" }, "inside": false }, "splitLine": { "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "cap": "butt", "color": "#666", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "rgba(0,0,0,.5)" }, "show": true }, "axisLine": { "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "cap": "butt", "color": "#333", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "rgba(0,0,0,.5)" }, "show": true }, "splitArea": { "show": false, "areaStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "color": "rgba(25,25,25,0.3)", "opacity": 1, "shadowBlur": 10, "shadowColor": "rgba(0,0,0,.5)" } } }, "xAxis": { "axisLabel": { "borderType": "solid", "rotate": 0, "padding": 0, "shadowOffsetX": 0, "margin": 4, "backgroundColor": "transparent", "borderColor": "#000", "shadowOffsetY": 0, "color": "#333", "shadowBlur": 0, "show": true, "inside": false, "ellipsis": "...", "overflow": "none", "borderRadius": 0, "borderWidth": 0, "width": "", "fontSize": 12, "lineHeight": 24, "shadowColor": "transparent", "fontWeight": "normal", "height": "" }, "axisTick": { "show": true, "length": 5, "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "cap": "butt", "color": "#333", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "rgba(0,0,0,.5)" }, "inside": false }, "splitLine": { "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "cap": "butt", "color": "#333", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "rgba(0,0,0,.5)" }, "show": false }, "axisLine": { "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "cap": "butt", "color": "#333", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "rgba(0,0,0,.5)" }, "show": true }, "splitArea": { "show": false, "areaStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "color": "rgba(25,25,25,.3)", "opacity": 1, "shadowBlur": 10, "shadowColor": "rgba(0,0,0,.5)" } } }, "color": ["#ff9227", "#efc398", "#ffba59", "#fed424", "#bde5cd", "#77c15f", "#e6e0b4", "#a8b4d8"], "legend": { "padding": 0, "itemGap": 10, "shadowOffsetX": 0, "backgroundColor": "transparent", "borderColor": "#666", "shadowOffsetY": 0, "orient": "horizontal", "shadowBlur": 0, "bottom": "auto", "itemHeight": 14, "show": true, "icon": "roundRect", "itemStyle": { "borderType": "solid", "shadowOffsetX": 0, "borderColor": "inherit", "shadowOffsetY": 0, "color": "#333", "shadowBlur": 0, "borderWidth": 0, "opacity": 1, "shadowColor": "transparent" }, "right": "auto", "top": "auto", "borderRadius": 0, "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "color": "inherit", "shadowBlur": 0, "width": "auto", "type": "inherit", "opacity": 1, "shadowColor": "transparent" }, "left": "right", "borderWidth": 0, "width": "80%", "itemWidth": 20, "textStyle": { "textBorderWidth": 0, "color": "#333", "textShadowColor": "transparent", "ellipsis": "...", "overflow": "none", "fontSize": 12, "lineHeight": 24, "textShadowOffsetX": 0, "textShadowOffsetY": 0, "textBorderType": "solid", "fontWeight": 500, "textBorderColor": "transparent", "textShadowBlur": 0 }, "shadowColor": "rgba(0,0,0,.3)", "height": "auto" }, "series": { "showSymbol": true, "symbol": "emptyCircle", "symbolSize": 4 }, "tooltip": { "backgroundColor": "#123", "textStyle": { "color": "#fff" } }, "title": { "borderType": "solid", "padding": 0, "shadowOffsetX": 0, "backgroundColor": "transparent", "borderColor": "#666", "shadowOffsetY": 0, "shadowBlur": 0, "bottom": "auto", "show": true, "right": "auto", "top": "auto", "borderRadius": 0, "left": "left", "borderWidth": 0, "textStyle": { "textBorderWidth": 0, "color": "#333", "textShadowColor": "transparent", "fontSize": 14, "lineHeight": 24, "textShadowOffsetX": 0, "textShadowOffsetY": 0, "textBorderType": "solid", "fontWeight": 600, "textBorderColor": "#666", "textShadowBlur": 0 }, "shadowColor": "transparent" } },
			bar: { "backgroundColor": "transparent", "yAxis": { "axisLabel": { "borderType": "solid", "rotate": 0, "padding": 0, "shadowOffsetX": 0, "margin": 12, "backgroundColor": "transparent", "borderColor": "#666", "shadowOffsetY": 0, "color": "#333", "shadowBlur": 0, "show": true, "inside": false, "ellipsis": "...", "overflow": "none", "borderRadius": 0, "borderWidth": 0, "width": "", "fontSize": 12, "lineHeight": 24, "shadowColor": "transparent", "fontWeight": "normal", "height": "" }, "axisTick": { "show": true, "length": 5, "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "cap": "butt", "color": "#333", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "rgba(0,0,0,.5)" }, "inside": false }, "splitLine": { "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "cap": "butt", "color": "#666", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "rgba(0,0,0,.5)" }, "show": true }, "axisLine": { "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "cap": "butt", "color": "#333", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "rgba(0,0,0,.5)" }, "show": true }, "splitArea": { "show": false, "areaStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "color": "rgba(25,25,25,0.3)", "opacity": 1, "shadowBlur": 10, "shadowColor": "rgba(0,0,0,.5)" } } }, "xAxis": { "axisLabel": { "borderType": "solid", "rotate": 0, "padding": 0, "shadowOffsetX": 0, "margin": 4, "backgroundColor": "transparent", "borderColor": "#000", "shadowOffsetY": 0, "color": "#333", "shadowBlur": 0, "show": true, "inside": false, "ellipsis": "...", "overflow": "none", "borderRadius": 0, "borderWidth": 0, "width": "", "fontSize": 12, "lineHeight": 24, "shadowColor": "transparent", "fontWeight": "normal", "height": "" }, "axisTick": { "show": true, "length": 5, "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "cap": "butt", "color": "#333", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "rgba(0,0,0,.5)" }, "inside": false }, "splitLine": { "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "cap": "butt", "color": "#333", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "rgba(0,0,0,.5)" }, "show": false }, "axisLine": { "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "cap": "butt", "color": "#333", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "rgba(0,0,0,.5)" }, "show": true }, "splitArea": { "show": false, "areaStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "color": "rgba(25,25,25,.3)", "opacity": 1, "shadowBlur": 10, "shadowColor": "rgba(0,0,0,.5)" } } }, "color": ["#ff9227", "#efc398", "#ffba59", "#fed424", "#bde5cd", "#77c15f", "#e6e0b4", "#a8b4d8"], "legend": { "padding": 0, "itemGap": 10, "shadowOffsetX": 0, "backgroundColor": "transparent", "borderColor": "#666", "shadowOffsetY": 0, "orient": "horizontal", "shadowBlur": 0, "bottom": "auto", "itemHeight": 14, "show": true, "icon": "roundRect", "itemStyle": { "borderType": "solid", "shadowOffsetX": 0, "borderColor": "inherit", "shadowOffsetY": 0, "color": "#333", "shadowBlur": 0, "borderWidth": 0, "opacity": 1, "shadowColor": "transparent" }, "right": "auto", "top": "auto", "borderRadius": 0, "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "color": "inherit", "shadowBlur": 0, "width": "auto", "type": "inherit", "opacity": 1, "shadowColor": "transparent" }, "left": "right", "borderWidth": 0, "width": "80%", "itemWidth": 20, "textStyle": { "textBorderWidth": 0, "color": "inherit", "textShadowColor": "transparent", "ellipsis": "...", "overflow": "none", "fontSize": 12, "lineHeight": 12, "textShadowOffsetX": 0, "textShadowOffsetY": 0, "textBorderType": "solid", "fontWeight": 500, "textBorderColor": "transparent", "textShadowBlur": 0 }, "shadowColor": "rgba(0,0,0,.3)", "height": "auto" }, "grid": { "x": "20%", "y": "12%", "y2": "12%", "x2": "5%" }, "series": { "barWidth": "auto", "itemStyle": { "borderType": "solid", "shadowOffsetX": 0, "borderColor": "#666", "shadowOffsetY": 0, "color": "", "shadowBlur": 0, "borderWidth": 0, "opacity": 1, "shadowColor": "#000" }, "colorBy": "data", "barCategoryGap": "20%" }, "tooltip": { "backgroundColor": "#123", "textStyle": { "color": "#fff" } }, "title": { "borderType": "solid", "padding": 0, "shadowOffsetX": 0, "backgroundColor": "transparent", "borderColor": "#666", "shadowOffsetY": 0, "shadowBlur": 0, "bottom": "auto", "show": true, "right": "auto", "top": "auto", "borderRadius": 0, "left": "left", "borderWidth": 0, "textStyle": { "textBorderWidth": 0, "color": "#333", "textShadowColor": "transparent", "fontSize": 14, "lineHeight": 24, "textShadowOffsetX": 0, "textShadowOffsetY": 0, "textBorderType": "solid", "fontWeight": 600, "textBorderColor": "#666", "textShadowBlur": 0 }, "shadowColor": "transparent" }, "base": { "animate": false, "interval": 2000 } },
			pie: { "tooltip": { "backgroundColor": "#123", "textStyle": { "color": "#fff" } }, "backgroundColor": "transparent", "color": ["#ff9227", "#efc398", "#ffba59", "#fed424", "#bde5cd", "#77c15f", "#e6e0b4", "#a8b4d8"], "title": { "borderType": "solid", "padding": [5, 0, 0, 0], "shadowOffsetX": 0, "backgroundColor": "transparent", "borderColor": "#666", "shadowOffsetY": 0, "shadowBlur": 0, "bottom": "auto", "show": true, "right": "auto", "top": "auto", "borderRadius": 0, "left": "left", "borderWidth": 0, "textStyle": { "textBorderWidth": 0, "color": "#333", "textShadowColor": "transparent", "fontSize": 14, "lineHeight": 14, "textShadowOffsetX": 0, "textShadowOffsetY": 0, "textBorderType": "solid", "fontWeight": 600, "textBorderColor": "#666", "textShadowBlur": 0 }, "shadowColor": "transparent" }, "legend": { "padding": [5, 0, 0, 0], "itemGap": 10, "shadowOffsetX": 0, "backgroundColor": "transparent", "borderColor": "#666", "shadowOffsetY": 0, "orient": "horizontal", "shadowBlur": 0, "bottom": "auto", "itemHeight": 2, "show": true, "icon": "roundRect", "itemStyle": { "borderType": "solid", "shadowOffsetX": 0, "borderColor": "inherit", "shadowOffsetY": 0, "color": "inherit", "shadowBlur": 0, "borderWidth": 0, "opacity": 1, "shadowColor": "transparent" }, "right": 0, "top": "auto", "borderRadius": 0, "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "color": "inherit", "shadowBlur": 0, "width": "auto", "type": "inherit", "opacity": 1, "shadowColor": "transparent" }, "left": "right", "borderWidth": 0, "width": "80%", "itemWidth": 2, "textStyle": { "textBorderWidth": 0, "color": "inherit", "textShadowColor": "transparent", "ellipsis": "...", "overflow": "none", "fontSize": 12, "lineHeight": 12, "textShadowOffsetX": 0, "textShadowOffsetY": 0, "textBorderType": "solid", "fontWeight": 500, "textBorderColor": "transparent", "textShadowBlur": 0 }, "shadowColor": "rgba(0,0,0,.3)", "height": "auto" }, "series": { "itemStyle": { "borderType": "solid", "shadowOffsetX": 0, "borderColor": "#666", "shadowOffsetY": 0, "color": "", "shadowBlur": 0, "borderWidth": 0, "opacity": 1, "shadowColor": "#000" }, "label": { "borderType": "solid", "rotate": 0, "padding": 0, "textBorderWidth": 0, "backgroundColor": "transparent", "borderColor": "#666", "color": "inherit", "show": true, "textShadowColor": "transparent", "distanceToLabelLine": 5, "ellipsis": "...", "overflow": "none", "borderRadius": 0, "borderWidth": 0, "fontSize": 12, "lineHeight": 18, "textShadowOffsetX": 0, "position": "outside", "textShadowOffsetY": 0, "textBorderType": "solid", "textBorderColor": "#666", "textShadowBlur": 0 }, "labelLine": { "show": true, "length": 10, "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "color": "#666", "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "#000" }, "length2": 14, "smooth": false } } },
			funnel: { "tooltip": { "backgroundColor": "#123", "textStyle": { "color": "#fff" } }, "backgroundColor": "transparent", "color": ["#ff9227", "#efc398", "#ffba59", "#fed424", "#bde5cd", "#77c15f", "#e6e0b4", "#a8b4d8"], "title": { "borderType": "solid", "padding": 2, "shadowOffsetX": 0, "backgroundColor": "transparent", "borderColor": "#ccc", "shadowOffsetY": 0, "shadowBlur": 0, "bottom": "auto", "show": true, "right": "auto", "top": "auto", "borderRadius": 0, "left": "center", "borderWidth": 0, "textStyle": { "textBorderWidth": 0, "color": "#666", "textShadowColor": "transparent", "fontSize": 14, "lineHeight": 12, "textShadowOffsetX": 0, "textShadowOffsetY": 0, "textBorderType": "solid", "fontWeight": 500, "textBorderColor": "#ccc", "textShadowBlur": 0 }, "shadowColor": "transparent" }, "legend": { "padding": 5, "itemGap": 10, "shadowOffsetX": 0, "backgroundColor": "transparent", "borderColor": "#ccc", "shadowOffsetY": 0, "orient": "vertical", "shadowBlur": 0, "bottom": "auto", "itemHeight": 2, "show": true, "icon": "roundRect", "itemStyle": { "borderType": "solid", "shadowOffsetX": 0, "borderColor": "inherit", "shadowOffsetY": 0, "color": "inherit", "shadowBlur": 0, "borderWidth": 0, "opacity": 1, "shadowColor": "transparent" }, "top": "auto", "borderRadius": 0, "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "color": "inherit", "shadowBlur": 0, "width": "auto", "type": "inherit", "opacity": 1, "shadowColor": "transparent" }, "left": "left", "borderWidth": 0, "width": "auto", "itemWidth": 2, "textStyle": { "textBorderWidth": 0, "color": "inherit", "textShadowColor": "transparent", "ellipsis": "...", "overflow": "none", "fontSize": 12, "lineHeight": 20, "textShadowOffsetX": 0, "textShadowOffsetY": 0, "textBorderType": "solid", "fontWeight": 500, "textBorderColor": "transparent", "textShadowBlur": 0 }, "shadowColor": "rgba(0,0,0,.3)", "height": "auto" }, "series": { "itemStyle": { "borderType": "solid", "shadowOffsetX": 0, "borderColor": "#000", "shadowOffsetY": 0, "color": "", "shadowBlur": 0, "borderWidth": 0, "opacity": 1, "shadowColor": "#000" }, "label": { "borderType": "solid", "rotate": 0, "padding": 0, "textBorderWidth": 0, "backgroundColor": "transparent", "borderColor": "#fff", "color": "", "show": true, "textShadowColor": "transparent", "distanceToLabelLine": 5, "ellipsis": "...", "overflow": "none", "borderRadius": 0, "borderWidth": 0, "fontSize": 12, "lineHeight": 18, "textShadowOffsetX": 0, "position": "outside", "textShadowOffsetY": 0, "textBorderType": "solid", "textBorderColor": "#fff", "textShadowBlur": 0 }, "labelLine": { "show": true, "length": 10, "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "shadowBlur": 0, "width": 1, "type": "solid", "opacity": 1, "shadowColor": "#000" }, "length2": 14, "smooth": false } } },
			boardBase: { "funnelNum": 8, "lineNum": 8, "gaugeNum": 8, "barNum": 8, "pieNum": 8 },
			gauge: { "tooltip": { "backgroundColor": "#123", "textStyle": { "color": "#fff" } }, "backgroundColor": "transparent", "color": ["#ff9227", "#efc398", "#ffba59", "#fed424", "#bde5cd", "#77c15f", "#e6e0b4", "#a8b4d8"], "title": { "top": "top", "left": "left", "textStyle": { "fontSize": 14, "lineHeight": 24, "color": "#333", "fontWeight": 600 } }, "series": { "pointer": { "offsetCenter": [0, "10%"], "icon": "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z", "width": 8, "length": "80%" }, "axisLine": { "lineStyle": { "shadowOffsetX": 0, "shadowOffsetY": 0, "opacity": 0.5, "shadowBlur": 1, "shadowColor": "#000" }, "roundCap": true }, "anchor": { "show": true, "itemStyle": { "color": "inherit" }, "size": 18, "showAbove": true }, "emphasis": { "disabled": false }, "progress": { "show": true, "roundCap": true, "overlap": true }, "splitNumber": 25, "detail": { "formatter": "{value}", "backgroundColor": "inherit", "color": "#fff", "borderRadius": 3, "width": 20, "fontSize": 12, "height": 10 }, "title": { "fontSize": 14 }, "animation": true } },
			newsList: [],
			newsDetail: {},
			newsVisible: false,
			tags: {
				'重要通知': "10B981",
				'活动提醒': "3B82F6",
				'紧急公告': "EF4444",
				'功能更新': "F59E0B",
				'规则调整': "6366F1",
				'系统维护': "9CA3AF",
			},
		};
	},
	mounted() {
		this.init();
		window.addEventListener('scroll', this.handleScroll)
		setTimeout(() => {
			this.handleScroll()
		}, 100)
	},
	computed: {
		avatar() {
			return this.$storage.get('headportrait') ? this.$storage.get('headportrait') : ''
		},
	},
	methods: {
		handleScroll() {
			let arr = [
				{ id: 'home-title', css: 'animate__zoomIn' },
				{ id: 'news-box', css: 'animate__zoomIn' },
			]

			for (let i in arr) {
				let doc = document.getElementById(arr[i].id)
				if (doc) {
					let top = doc.offsetTop
					let win_top = window.innerHeight + window.pageYOffset
					// console.log(top,win_top)
					if (win_top > top && doc.classList.value.indexOf(arr[i].css) < 0) {
						// console.log(doc)
						doc.classList.add(arr[i].css)
					}
				}
			}
		},
		// 统计图动画
		myChartInterval(type, xAxisData, seriesData, myChart) {
			this.$nextTick(() => {
				setInterval(() => {
					let xAxis = xAxisData.shift()
					xAxisData.push(xAxis)
					let series = seriesData.shift()
					seriesData.push(series)

					if (type == 1) {
						myChart.setOption({
							xAxis: [{
								data: xAxisData
							}],
							series: [{
								data: seriesData
							}]
						});
					}
					if (type == 2) {
						myChart.setOption({
							yAxis: [{
								data: xAxisData
							}],
							series: [{
								data: seriesData
							}]
						});
					}
				}, $template2.back.board.bar.base.interval);
			})
		},
		init() {
			if (this.$storage.get('Token')) {

			} else {
				router.push({ name: 'login' })
			}
			this.getNewsList()
		},
		getNewsList() {
			let params = {
				page: 1,
				limit: 6,
			}
			this.$http({
				url: `xitonggonggao/page`,
				method: "get",
				params: params
			}).then(res => {
				if (res.data && res.data.code == 0) {
					this.newsList = res.data.data.records
				}
			});
		},
		newsDetailClick(row) {
			this.newsDetail = row
			this.newsVisible = true
		},
	}
};
</script>
<style lang="scss" scoped>
.home-content {
	padding: 10px 10px;
	background: url(http://codegen.caihongy.cn/20250113/1850a0344214414e90c092c5a85195d9.png) no-repeat center top / cover;
	display: flex;
	width: 100%;
	min-height: 100vh;
	justify-content: flex-start;
	align-items: flex-start;
	flex-wrap: wrap;

	.home-title {
		border-radius: 5px;
		padding: 10px 0;
		box-shadow: 0 0px 0px rgba(0, 0, 0, .3);
		margin: 10px 0;
		background: none;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		transition: 0.3s;

		.titles {
			padding: 0 0 0 12px;
			color: #333;
			font-size: 26px;
			line-height: 44px;

			span {}
		}
	}

	.home-title:hover {
		transform: translate3d(0, 0px, 0);
		z-index: 1;
		background: rgba(255, 255, 255, .12);
	}

	.statis-box {
		padding: 0;
		margin: 10px auto;
		display: flex;
		width: calc(100% - 0px);
		justify-content: center;
		align-items: center;

		.statis1 {
			border: 0px solid #ccc;
			border-radius: 10px;
			padding: 30px 10px;
			margin: 0 10px 10px;
			background: url(http://codegen.caihongy.cn/20241007/b2e53d281ddc42e3a52a535647f4388f.png) no-repeat center top / 100% 100%;
			display: flex;
			width: calc(20% - 20px);
			justify-content: center;
			transition: 0.3s;

			.left {
				border-radius: 20%;
				background: linear-gradient(0deg, rgba(255, 232, 227, 1) 0%, rgba(255, 168, 148, 1) 100%);
				display: none;
				width: 96px;
				justify-content: center;
				align-items: center;
				height: 66px;

				.iconfont {
					color: #FD6149;
					font-size: 40px;
				}
			}

			.right {
				flex-direction: row;
				display: flex;
				width: 160px;
				justify-content: center;
				align-items: center;

				.num {
					margin: 0 10px 0 0;
					color: #000;
					font-weight: 500;
					font-size: 32px;
					line-height: 24px;
					height: 24px;
				}

				.name {
					margin: 5px 0;
					color: #666;
					font-size: 15px;
					line-height: 24px;
					height: 24px;
				}
			}
		}

		.statis1:hover {
			transform: translate3d(0, 0px, 0);
			z-index: 1;
		}

		.statis2 {
			border: 0px solid #ccc;
			border-radius: 10px;
			padding: 30px 10px;
			margin: 0 10px 10px;
			background: url(http://codegen.caihongy.cn/20241007/b2e53d281ddc42e3a52a535647f4388f.png) no-repeat center top / 100% 100%;
			display: flex;
			width: calc(20% - 20px);
			justify-content: center;
			transition: 0.3s;

			.left {
				border-radius: 20%;
				background: linear-gradient(0deg, rgba(234, 240, 255, 1) 0%, rgba(198, 218, 255, 1) 100%);
				display: none;
				width: 96px;
				justify-content: center;
				align-items: center;
				height: 66px;

				.iconfont {
					color: #237AFA;
					font-size: 40px;
				}
			}

			.right {
				flex-direction: row;
				display: flex;
				width: 160px;
				justify-content: center;
				align-items: center;

				.num {
					margin: 0 10px 0 0;
					color: #000;
					font-weight: 500;
					font-size: 32px;
					line-height: 24px;
					height: 24px;
				}

				.name {
					margin: 5px 0;
					color: #666;
					font-size: 15px;
					line-height: 24px;
					height: 24px;
				}
			}
		}

		.statis2:hover {
			transform: translate3d(0, 0px, 0);
			z-index: 1;
		}

		.statis3 {
			border: 0px solid #ccc;
			border-radius: 10px;
			padding: 30px 10px;
			margin: 0 10px 10px;
			background: url(http://codegen.caihongy.cn/20241007/b2e53d281ddc42e3a52a535647f4388f.png) no-repeat center top / 100% 100%;
			display: flex;
			width: calc(20% - 20px);
			justify-content: center;
			transition: 0.3s;

			.left {
				border-radius: 20%;
				background: linear-gradient(0deg, rgba(255, 232, 227, 1) 0%, rgba(255, 168, 148, 1) 100%);
				display: none;
				width: 96px;
				justify-content: center;
				align-items: center;
				height: 66px;

				.iconfont {
					color: #fa6161;
					font-size: 40px;
				}
			}

			.right {
				flex-direction: row;
				display: flex;
				width: 160px;
				justify-content: center;
				align-items: center;

				.num {
					margin: 0 10px 0 0;
					color: #000;
					font-weight: 500;
					font-size: 32px;
					line-height: 24px;
					height: 24px;
				}

				.name {
					margin: 5px 0;
					color: #666;
					font-size: 15px;
					line-height: 24px;
					height: 24px;
				}
			}
		}

		.statis3:hover {
			transform: translate3d(0, 0px, 0);
			z-index: 1;
		}

		.statis4 {
			border: 0px solid #ccc;
			border-radius: 10px;
			padding: 30px 10px;
			margin: 0 10px 10px;
			background: url(http://codegen.caihongy.cn/20241007/b2e53d281ddc42e3a52a535647f4388f.png) no-repeat center top / 100% 100%;
			display: flex;
			width: calc(20% - 20px);
			justify-content: center;
			transition: 0.3s;

			.left {
				border-radius: 20%;
				background: linear-gradient(0deg, rgba(227, 255, 249, 1) 0%, rgba(149, 255, 204, 1) 100%);
				display: none;
				width: 96px;
				justify-content: center;
				align-items: center;
				height: 66px;

				.iconfont {
					color: #24BF74;
					font-size: 40px;
				}
			}

			.right {
				flex-direction: row;
				display: flex;
				width: 160px;
				justify-content: center;
				align-items: center;

				.num {
					margin: 0 10px 0 0;
					color: #000;
					font-weight: 500;
					font-size: 32px;
					line-height: 24px;
					height: 24px;
				}

				.name {
					margin: 5px 0;
					color: #666;
					font-size: 15px;
					line-height: 24px;
					height: 24px;
				}
			}
		}

		.statis4:hover {
			transform: translate3d(0, 0px, 0);
			z-index: 1;
		}

		.statis5 {
			border: 0px solid #ccc;
			border-radius: 10px;
			padding: 30px 10px;
			margin: 0 10px 10px;
			background: url(http://codegen.caihongy.cn/20241007/b2e53d281ddc42e3a52a535647f4388f.png) no-repeat center top / 100% 100%;
			display: flex;
			width: calc(20% - 20px);
			justify-content: center;
			transition: 0.3s;

			.left {
				border-radius: 20%;
				background: linear-gradient(0deg, rgba(255, 232, 227, 1) 0%, rgba(255, 168, 148, 1) 100%);
				display: none;
				width: 96px;
				justify-content: center;
				align-items: center;
				height: 66px;

				.iconfont {
					color: #FD6149;
					font-size: 40px;
				}
			}

			.right {
				flex-direction: row;
				display: flex;
				width: 160px;
				justify-content: center;
				align-items: center;

				.num {
					margin: 0 10px 0 0;
					color: #000;
					font-weight: 500;
					font-size: 32px;
					line-height: 24px;
					height: 24px;
				}

				.name {
					margin: 5px 0;
					color: #666;
					font-size: 15px;
					line-height: 24px;
					height: 24px;
				}
			}
		}

		.statis5:hover {
			transform: translate3d(0, 0px, 0);
			z-index: 1;
		}
	}

	.news-box {
		border: 2px solid #f1f1f1;
		padding: 0px;
		margin: 10px;
		display: block;
		min-height: 452px;
		transition: 0.3s;
		border-radius: 10px;
		box-shadow: 0 0px 0px rgba(0, 0, 0, .3);
		flex-direction: column;
		background: #fff;
		width: calc(50% - 20px);
		justify-content: center;
		align-items: center;

		.news-title {
			padding: 0 10px;
			margin: 0 0 10px;
			color: #fff;
			font-weight: 500;
			font-size: 16px;
			border-color: #e6e6e6;
			line-height: 44px;
			border-radius: 10px 10px 0 0;
			background: #ff9227;
			width: 100%;
			border-width: 0 0 2px;
			border-style: solid;
			text-align: center;
		}

		.news-list {
			flex-direction: column;
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
		}

		.news-item {
			border: 1px dashed #eee;
			cursor: pointer;
			padding: 10px 20px;
			display: flex;
			width: 100%;
			border-width: 0 0 1px;
			justify-content: space-between;
			align-items: center;

			.news-text {
				overflow: hidden;
				color: #000;
				white-space: nowrap;
				font-weight: 500;
				width: 100%;
				font-size: 15px;
				text-overflow: ellipsis;
			}

			.news-time {
				color: #999;
				width: 180px;
				// display: none;
				font-size: 14px;
			}
		}
	}

	.news-box:hover {
		transform: translate3d(0, 0px, 0);
	}

	// echarts4
	.type4 {
		padding: 0;
		align-content: flex-start;
		background: none;
		display: flex;
		width: 100%;
		justify-content: space-between;
		flex-wrap: wrap;
		height: auto;

		.echarts1 {
			border: 2px solid #f1f1f1;
			border-radius: 10px;
			padding: 20px;
			margin: 10px;
			background: rgba(255, 255, 255, 1);
			width: calc(50% - 20px);
			transition: 0.3s;
			height: 360px;
		}

		.echarts1:hover {
			transform: translate3d(0, 0px, 0);
			z-index: 1;
			background: rgba(255, 255, 255, 1);
		}

		.echarts2 {
			border: 2px solid #f1f1f1;
			border-radius: 10px;
			padding: 20px;
			margin: 10px;
			background: rgba(255, 255, 255, 1);
			width: calc(50% - 20px);
			transition: 0.3s;
			height: 360px;
		}

		.echarts2:hover {
			transform: translate3d(0, 0px, 0);
			z-index: 1;
			background: rgba(255, 255, 255, 1);
		}

		.echarts3 {
			border: 2px solid #f1f1f1;
			border-radius: 10px;
			padding: 20px;
			margin: 10px;
			background: rgba(255, 255, 255, 1);
			width: calc(50% - 20px);
			transition: 0.3s;
			height: 360px;
		}

		.echarts3:hover {
			transform: translate3d(0, 0px, 0);
			z-index: 1;
			background: rgba(255, 255, 255, 1);
		}

		.echarts4 {
			border: 2px solid #f1f1f1;
			border-radius: 10px;
			padding: 20px;
			margin: 10px;
			background: rgba(255, 255, 255, 1);
			width: calc(50% - 20px);
			transition: 0.3s;
			height: 360px;
		}

		.echarts4:hover {
			transform: translate3d(0, 0px, 0);
			z-index: 1;
			background: rgba(255, 255, 255, 1);
		}
	}
}

.echarts-flag-2 {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 10px 20px;
	background: rebeccapurple;

	&>div {
		width: 32%;
		height: 300px;
		margin: 10px 0;
		background: rgba(255, 255, 255, .1);
		border-radius: 8px;
		padding: 10px 20px;
	}
}

.animate__animated {
	animation-fill-mode: none;
}
</style>
