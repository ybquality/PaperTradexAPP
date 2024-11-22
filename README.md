# PaperTradexAPP

# 通用组件

## Modal 模态框组件

基础的模态框组件,用于展示弹窗内容。

### 引入

```javascript
import Modal from "@/components/common/modal";
```

### 基础用法

```javascript
const [visible, setVisible] = useState(false);
return (
  <Modal visible={visible} onClose={() => setVisible(false)} title="标题">
    <Text>这是弹窗内容</Text>
  </Modal>
);
```

### 带按钮的弹窗

```javascript
const [visible, setVisible] = useState(false);
return (
  <Modal
    visible={visible}
    onClose={() => setVisible(false)}
    title="退出登录"
    showConfirmButton={true}
    showCancelButton={true}
    onConfirm={handleConfirm}
    onCancel={() => setVisible(false)}
    confirmText="确定"
    cancelText="取消"
  >
    <Text>确定要退出登录吗？</Text>
  </Modal>
);
```

### Props

| 参数              | 说明               | 类型            | 默认值 |
| ----------------- | ------------------ | --------------- | ------ |
| visible           | 是否显示弹窗       | boolean         | -      |
| onClose           | 关闭弹窗的回调函数 | () => void      | -      |
| title             | 弹窗标题           | string          | -      |
| showCloseIcon     | 是否显示关闭图标   | boolean         | true   |
| children          | 弹窗内容           | React.ReactNode | -      |
| showConfirmButton | 是否显示确认按钮   | boolean         | false  |
| showCancelButton  | 是否显示取消按钮   | boolean         | false  |
| onConfirm         | 确认按钮回调       | () => void      | -      |
| onCancel          | 取消按钮回调       | () => void      | -      |
| confirmText       | 确认按钮文字       | string          | '确定' |
| cancelText        | 取消按钮文字       | string          | '取消' |

### 样式变量

| 名称            | 默认值             | 说明         |
| --------------- | ------------------ | ------------ |
| width           | 屏幕宽度的 80%     | 弹窗宽度     |
| borderRadius    | 24px               | 圆角大小     |
| backgroundColor | #FFFFFF            | 背景颜色     |
| overlayColor    | rgba(0, 0, 0, 0.5) | 遮罩层颜色   |
| padding         | 16px               | 内边距       |
| titleFontSize   | 16px               | 标题字体大小 |
| titleColor      | #333333            | 标题颜色     |
| closeIconSize   | 24px               | 关闭图标大小 |
| closeIconColor  | #999999            | 关闭图标颜色 |
