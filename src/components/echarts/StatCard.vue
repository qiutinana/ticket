<template>
  <div class="stat-card">
    <div class="stat-icon" :class="bgClass">
      <i :class="iconClass"></i>
    </div>
    <div class="stat-info">
      <div class="stat-value">{{ value }}</div>
      <div class="stat-label">{{ label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    // 显示的值
    value: {
      type: [String, Number],
      required: true
    },
    // 标签文本
    label: {
      type: String,
      required: true
    },
    // 图标类名
    iconClass: {
      type: String,
      required: true
    },
    // 背景类名
    bgClass: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.stat-card {
  flex: 1;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: white;
  margin-right: 16px;
  flex-shrink: 0;
}

.stat-info {
  flex-grow: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  line-height: 1.2;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

// 颜色定义
.bg-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-success {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.bg-warning {
  background: linear-gradient(135deg, #ffb627 0%, #ffda56 100%);
}

.bg-info {
  background: linear-gradient(135deg, #27ffed 0%, #56f4ff 100%);
}
</style>
