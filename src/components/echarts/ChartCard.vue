<template>
  <el-card class="chart-card">
    <div class="chart-header">
      <h3>{{ title }}</h3>
    </div>
    <div :id="chartId" class="chart-content"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'ChartCard',
  props: {
    // 图表标题
    title: {
      type: String,
      required: true
    },
    // 图表DOM元素ID - 确保唯一
    chartId: {
      type: String,
      required: true
    },
    // 图表类型：pie, bar, line
    chartType: {
      type: String,
      required: true,
      validator: value => ['pie', 'bar', 'line'].includes(value)
    },
    // 图表数据 - 支持多系列数据
    chartData: {
      type: Object,
      required: true,
      default: () => ({
        // 基础数据（适用于单系列）
        data: [],
        nameField: '',
        valueField: '',
        xAxisField: '',
        yAxisField: '',

        // 多系列数据配置
        series: [], // 系列数组 [{ name: '系列1', dataField: 'value1' }, ...]
        categories: [], // 分类数据（x轴数据）

        // 坐标轴名称
        xAxisName: '', // X轴名称
        yAxisName: ''  // Y轴名称
      })
    },
    // 图表主题
    theme: {
      type: String,
      default: 'default'
    },
    // 颜色系列
    colorSeries: {
      type: Array,
      default: () => [
        '#4facfe', '#00f2fe', '#36d399', '#fa709a', '#f7ba1e',
        '#ff9a9e', '#6667eaa', '#764ba2', '#38b2ac', '#ed64a6'
      ]
    }
  },
  data() {
    return {
      chartInstance: null
    }
  },
  watch: {
    // 深度监听数据变化，更新图表
    chartData: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (this.isDataValid(newVal)) {
          this.initOrUpdateChart();
        }
      }
    }
  },
  mounted() {
    // 确保DOM渲染完成后初始化图表
    this.$nextTick(() => {
      if (this.isDataValid(this.chartData)) {
        this.initOrUpdateChart();
      }
    });

    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    // 移除事件监听
    window.removeEventListener('resize', this.handleResize);
    // 销毁图表实例
    this.disposeChart();
  },
  methods: {
    // 验证数据是否有效
    isDataValid(data) {
      if (!data) return false;

      // 多系列数据验证
      if (data.series && data.series.length > 0) {
        return data.categories && data.categories.length > 0 &&
          data.data && data.data.length > 0;
      }

      // 单系列数据验证
      return data.data && data.data.length > 0;
    },

    // 初始化或更新图表
    initOrUpdateChart() {
      // 如果图表实例不存在，则创建
      if (!this.chartInstance) {
        const chartDom = document.getElementById(this.chartId);
        if (chartDom) {
          this.chartInstance = echarts.init(chartDom, this.theme);
        } else {
          console.error(`图表容器ID为${this.chartId}的元素不存在`);
          return;
        }
      }

      // 更新图表数据
      this.updateChart();
    },

    // 更新图表数据
    updateChart() {
      if (!this.chartInstance) return;

      let option = {};

      // 根据图表类型设置不同的配置
      switch (this.chartType) {
        case 'pie':
          option = this.getPieOption();
          break;
        case 'bar':
          option = this.getBarOption();
          break;
        case 'line':
          option = this.getLineOption();
          break;
        default:
          option = this.getPieOption();
      }

      this.chartInstance.setOption(option);
    },

    // 处理窗口大小变化
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    },

    // 销毁图表
    disposeChart() {
      if (this.chartInstance) {
        this.chartInstance.dispose();
        this.chartInstance = null;
      }
    },

    // 获取饼图配置
    getPieOption() {
      const { data, nameField, valueField, series } = this.chartData;

      // 处理多系列饼图（嵌套饼图）
      if (series && series.length > 0) {
        return {
          title: {
            // text: this.title,
            left: 'center',
            textStyle: {
              fontSize: 14,
              color: '#666'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#eee',
            borderWidth: 1,
            textStyle: { color: '#333' },
            extraCssText: 'box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            textStyle: {
              fontSize: 12
            },
            formatter: function (name) {
              if (name.length > 6) {
                return name.substring(0, 6) + '...';
              }
              return name;
            }
          },
          series: series.map((seriesItem, index) => ({
            name: seriesItem.name,
            type: 'pie',
            radius: [index * 20 + 30 + '%', index * 20 + 50 + '%'],
            center: ['60%', '55%'],
            data: data.map(item => ({
              name: item[nameField],
              value: parseFloat(item[seriesItem.dataField])
            })),
            itemStyle: {
              borderRadius: 4,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              fontSize: 12
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              },
              scale: true
            }
          }))
        };
      }

      // 单系列饼图
      const pieData = data.map(item => ({
        name: item[nameField],
        value: parseFloat(item[valueField])
      }));

      return {
        title: {
          // text: this.title,
          left: 'center',
          textStyle: {
            fontSize: 14,
            color: '#666'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#eee',
          borderWidth: 1,
          textStyle: { color: '#333' },
          extraCssText: 'box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          textStyle: {
            fontSize: 12
          },
          formatter: function (name) {
            if (name.length > 6) {
              return name.substring(0, 6) + '...';
            }
            return name;
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['35%', '70%'],
            center: ['60%', '55%'],
            data: pieData,
            itemStyle: {
              borderRadius: 4,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              fontSize: 12
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              },
              scale: true
            },
            animationDuration: 1000,
            animationEasingUpdate: 'cubicOut'
          }
        ]
      }
    },

    // 获取柱状图配置 - 支持多系列
    getBarOption() {
      const { data, xAxisField, yAxisField, series, categories, xAxisName, yAxisName } = this.chartData;
      const isMultiSeries = series && series.length > 0;

      // 多系列柱状图
      if (isMultiSeries) {
        return {
          title: {
            // text: this.title,
            left: 'center',
            textStyle: {
              fontSize: 14,
              color: '#666'
            }
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#eee',
            borderWidth: 1,
            textStyle: { color: '#333' },
            extraCssText: 'box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);'
          },
          legend: {
            data: series.map(s => s.name),
            top: 5,
            textStyle: {
              fontSize: 12
            }
          },
          grid: {
            left: xAxisName ? '10%' : '4%',  // 为Y轴名称预留空间
            right: '4%',
            bottom: xAxisName ? '10%' : '3%',  // 为X轴名称预留空间
            top: yAxisName ? '15%' : '10%',    // 为Y轴名称预留空间
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: categories,
            name: xAxisName,
            nameLocation: 'end',  // X轴名称在最右侧
            nameGap: 30,          // 名称与轴线的距离
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              align: 'right'      // 文本右对齐
            },
            axisLabel: {
              rotate: seriesData.length > 15 ? 30 : 20,
              interval: categories.length > 15 ? 3 : 0,
              fontSize: 12
            }
          },
          yAxis: {
            type: 'value',
            name: yAxisName,
            nameLocation: 'start',  // Y轴名称在最上方
            nameGap: 30,            // 名称与轴线的距离
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              align: 'left'         // 文本左对齐
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: series.map((seriesItem, index) => ({
            name: seriesItem.name,
            data: data.map(item => parseFloat(item[seriesItem.dataField])),
            type: 'bar',
            barWidth: '20%',
            itemStyle: {
              color: this.colorSeries[index % this.colorSeries.length]
            },
            emphasis: {
              itemStyle: {
                color: this.darkenColor(this.colorSeries[index % this.colorSeries.length], 0.2)
              }
            },
            animationDuration: 1000
          }))
        };
      }

      // 单系列柱状图
      const xAxisData = data.map(item => item[xAxisField]);
      const seriesData = data.map(item => parseFloat(item[yAxisField]));

      return {
        title: {
          // text: this.title,
          left: 'center',
          textStyle: {
            fontSize: 14,
            color: '#666'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#eee',
          borderWidth: 1,
          textStyle: { color: '#333' },
          extraCssText: 'box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);'
        },
        grid: {
          left: xAxisName ? '10%' : '6%',
          right: '4%',
          bottom: xAxisName ? '10%' : '3%',
          top: yAxisName ? '15%' : '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          name: xAxisName,
          nameLocation: 'end',
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            align: 'right'
          },
          axisLabel: {
            rotate: seriesData.length > 15 ? 30 : 20,
            interval: seriesData.length > 15 ? 3 : 0,
            fontSize: 12
          }
        },
        yAxis: {
          type: 'value',
          name: yAxisName,
          nameLocation: 'start',
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            align: 'left'
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [{
          data: seriesData,
          type: 'bar',
          barWidth: '60%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#4facfe' },
              { offset: 1, color: '#00f2fe' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#3988e0' },
                { offset: 1, color: '#00c8d4' }
              ])
            }
          },
          animationDuration: 1000
        }]
      }
    },

    // 获取折线图配置 - 支持多系列
    getLineOption() {
      const { data, xAxisField, yAxisField, series, categories, xAxisName, yAxisName } = this.chartData;
      const isMultiSeries = series && series.length > 0;

      // 多系列折线图
      if (isMultiSeries) {
        return {
          title: {
            // text: this.title,
            left: 'center',
            textStyle: {
              fontSize: 14,
              color: '#666'
            }
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#eee',
            borderWidth: 1,
            textStyle: { color: '#333' },
            extraCssText: 'box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);'
          },
          legend: {
            data: series.map(s => s.name),
            top: 5,
            textStyle: {
              fontSize: 12
            }
          },
          grid: {
            left: xAxisName ? '10%' : '6%',
            right: '4%',
            bottom: xAxisName ? '10%' : '3%',
            top: yAxisName ? '15%' : '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: categories,
            name: xAxisName,
            nameLocation: 'end',
            nameGap: 30,
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              align: 'right'
            },
            axisLabel: {
              rotate: seriesData.length > 15 ? 30 : 20,
              interval: categories.length > 15 ? 3 : 0,
              fontSize: 12
            }
          },
          yAxis: {
            type: 'value',
            name: yAxisName,
            nameLocation: 'start',
            nameGap: 30,
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              align: 'left'
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: series.map((seriesItem, index) => ({
            name: seriesItem.name,
            data: data.map(item => parseFloat(item[seriesItem.dataField])),
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              width: 3,
              color: this.colorSeries[index % this.colorSeries.length]
            },
            itemStyle: {
              color: this.colorSeries[index % this.colorSeries.length]
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: this.addAlpha(this.colorSeries[index % this.colorSeries.length], 0.3) },
                { offset: 1, color: this.addAlpha(this.colorSeries[index % this.colorSeries.length], 0) }
              ])
            },
            animationDuration: 1000
          }))
        };
      }

      // 单系列折线图
      const xAxisData = data.map(item => item[xAxisField]);
      const seriesData = data.map(item => parseFloat(item[yAxisField]));

      return {
        title: {
          // text: this.title,
          left: 'center',
          textStyle: {
            fontSize: 14,
            color: '#666'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#eee',
          borderWidth: 1,
          textStyle: { color: '#333' },
          extraCssText: 'box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);'
        },
        grid: {
          right: xAxisName ? '10%' : '3%',
          left: '6%',
          bottom: xAxisName ? '10%' : '3%',
          top: yAxisName ? '15%' : '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
          name: xAxisName,
          nameLocation: 'end',
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            align: 'right'
          },
          axisLabel: {
            rotate: seriesData.length > 15 ? 30 : 20,
            interval: seriesData.length > 15 ? 3 : 0,
            fontSize: 12
          }
        },
        yAxis: {
          type: 'value',
          name: yAxisName,
          nameLocation: 'end',
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            align: 'left'
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [{
          data: seriesData,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            width: 3,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#ff9a9e' },
              { offset: 1, color: '#fad0c4' }
            ])
          },
          itemStyle: {
            color: '#fa709a'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(250, 112, 154, 0.3)' },
              { offset: 1, color: 'rgba(250, 112, 154, 0)' }
            ])
          },
          animationDuration: 1000
        }]
      }
    },

    // 辅助方法：调整颜色透明度
    addAlpha(color, alpha) {
      // 简单处理十六进制颜色
      if (color.startsWith('#')) {
        const hex = color.slice(1);
        return `rgba(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4, 6), 16)}, ${alpha})`;
      }
      return color;
    },

    // 辅助方法：加深颜色
    darkenColor(color, percent) {
      if (color.startsWith('#')) {
        const hex = color.slice(1);
        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4, 6), 16);

        r = Math.floor(r * (1 - percent));
        g = Math.floor(g * (1 - percent));
        b = Math.floor(b * (1 - percent));

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      }
      return color;
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-card {
  flex: 1;
  min-width: 300px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }

  ::v-deep .el-card__body {
    padding: 0;
  }
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f5f7fa;

  h3 {
    font-size: 16px;
    color: #333;
    margin: 0;
    font-weight: 600;
  }
}

.chart-content {
  width: 100%;
  height: 360px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
