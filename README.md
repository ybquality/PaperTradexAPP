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

## NavBar 导航栏组件

用于页面导航的顶部栏组件。

### 引入

```javascript
import NavBar from "@/components/common/navbar";
```

### 基础用法

```javascript
// 基础用法
<NavBar
  onBack={() => navigation.goBack()}
>
  标题
</NavBar>

// 自定义左右内容
<NavBar
  left={<Text>左侧</Text>}
  right={<Text>右侧</Text>}
>
  标题
</NavBar>
```

### Props

| 参数     | 说明                                         | 类型                 | 默认值 |
| -------- | -------------------------------------------- | -------------------- | ------ |
| back     | 返回区域的文字，如果为 null 则不显示返回区域 | ReactNode \| null    | ''     |
| backIcon | 是否显示返回箭头，可传入 ReactNode 自定义    | boolean \| ReactNode | true   |
| children | 标题内容                                     | ReactNode            | -      |
| left     | 左侧内容，显示在返回区域右侧                 | ReactNode            | -      |
| onBack   | 点击返回区域的回调函数                       | () => void           | -      |
| right    | 右侧内容                                     | ReactNode            | -      |
