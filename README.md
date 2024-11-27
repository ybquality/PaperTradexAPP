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

## Switch 开关组件

用于表示两种相互对立的状态间的切换，例如 开/关。

### 引入

```javascript
import Switch from "@/components/common/switch";
```

### 基础用法

```javascript
// 基础用法
<Switch />

// 默认开启
<Switch defaultChecked />

// 禁用状态
<Switch disabled />
<Switch disabled defaultChecked />

// 异步控制
const [checked, setChecked] = useState(false);
const [loading, setLoading] = useState(false);

<Switch
  checked={checked}
  loading={loading}
  onChange={async (val) => {
    setLoading(true);
    try {
      await mockRequest();
      setChecked(val);
    } finally {
      setLoading(false);
    }
  }}
/>
```

### Props

| 参数           | 说明             | 类型                                        | 默认值 |
| -------------- | ---------------- | ------------------------------------------- | ------ |
| checked        | 开关状态         | boolean                                     | -      |
| defaultChecked | 默认开关状态     | boolean                                     | false  |
| disabled       | 是否禁用         | boolean                                     | false  |
| loading        | 加载状态         | boolean                                     | false  |
| onChange       | 变化时的回调函数 | (checked: boolean) => void \| Promise<void> | -      |

## TopTabNavigator 标签页导航组件

用于同层级内容的切换展示，支持横向滚动。

### 引入

```javascript
import TopTabNavigator from "@/components/common/topTabNavigator";
```

### 基础用法

```javascript
const [activeTab, setActiveTab] = useState("tab1");

const tabs = [
  { key: "tab1", title: "推荐" },
  { key: "tab2", title: "广场" },
  { key: "tab3", title: "KOL" },
];

<TopTabNavigator
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>;
```

### Props

| 参数               | 说明                 | 类型                                | 默认值 |
| ------------------ | -------------------- | ----------------------------------- | ------ |
| tabs               | 标签页配置           | Array<{key: string, title: string}> | []     |
| activeTab          | 当前激活的标签页     | string                              | -      |
| onTabChange        | 切换标签页的回调函数 | (key: string) => void               | -      |
| tabStyle           | 标签样式             | ViewStyle                           | -      |
| activeTabStyle     | 激活标签样式         | ViewStyle                           | -      |
| tabTextStyle       | 标签文字样式         | TextStyle                           | -      |
| activeTabTextStyle | 激活标签文字样式     | TextStyle                           | -      |
| containerStyle     | 容器样式             | ViewStyle                           | -      |

## Ellipsis 文本省略组件

用于长文本的展开收起功能。

### 引入

```javascript
import Ellipsis from "@/components/common/ellipsis";
```

### 基础用法

```javascript
// 单行省略
<Ellipsis>这是一段很长的文本...</Ellipsis>

// 多行省略
<Ellipsis rows={3}>这是一段很长的文本...</Ellipsis>

// 默认展开
<Ellipsis rows={3} defaultExpanded>这是一段很长的文本...</Ellipsis>

// 自定义样式
<Ellipsis
  rows={2}
  style={{ fontSize: 16 }}
  expandText="查看更多"
  collapseText="收起内容"
>
  这是一段很长的文本...
</Ellipsis>
```

### Props

| 参数            | 说明         | 类型      | 默认值 |
| --------------- | ------------ | --------- | ------ |
| children        | 文本内容     | string    | -      |
| rows            | 展示几行     | number    | 1      |
| defaultExpanded | 是否默认展开 | boolean   | false  |
| style           | 文本样式     | TextStyle | -      |
| expandText      | 展开按钮文字 | string    | "展开" |
| collapseText    | 收起按钮文字 | string    | "收起" |

## Toast 轻提示组件

用于对操作结果的轻量级反馈，无需用户操作即可自行消失。

### 引入

```javascript
import Toast from "@/components/common/toast";
```

### 基础用法

```javascript
// 带icon的用法
<Button
  onPress={() =>
    Toast.show({
      icon: <Icon name="success" type="feather" color="#07C160" size={20} />,
      content: "保存成功",
    })
  }
>
  成功
</Button>;

// 自定义显示时长
Toast.show({
  icon: <Icon name="error" type="feather" color="#07C160" size={20} />,
  content: "操作失败",
  duration: 3000,
});
```

### Options

| 参数     | 说明                 | 类型      | 默认值 |
| -------- | -------------------- | --------- | ------ |
| content  | 提示内容             | string    | -      |
| icon     | 图标节点             | ReactNode | null   |
| duration | 显示时长，单位为毫秒 | number    | 2000   |

## Popup 弹出层组件

从底部、顶部或两侧滑出的弹出层组件，支持手势滑动关闭。

### 引入

```javascript
import Popup from "@/components/common/popup";
```

### 用法

```javascript
const [visible, setVisible] = useState(false);

return (
  <>
    <Button onPress={() => setVisible(true)}>
      显示弹出层
    </Button>

    <Popup
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <Text>这是弹出层内容</Text>
    </Popup>
  </>
);

// 顶部弹出
<Popup position="top" visible={visible} onClose={() => setVisible(false)}>
  <Text>顶部弹出内容</Text>
</Popup>

// 左侧弹出
<Popup position="left" visible={visible} onClose={() => setVisible(false)}>
  <Text>左侧弹出内容</Text>
</Popup>

// 右侧弹出
<Popup position="right" visible={visible} onClose={() => setVisible(false)}>
  <Text>右侧弹出内容</Text>
</Popup>

// 修改内容区域样式
<Popup
  visible={visible}
  bodyStyle={{
    padding: 16,                    // 修改内边距
    borderTopLeftRadius: 32,        // 修改圆角
    borderTopRightRadius: 32,
    backgroundColor: '#ffffff',     // 修改背景色
    maxHeight: '80%',               // 限制最大高度
  }}
>
  <Text>自定义样式内容</Text>
</Popup>

// 完全自定义内容区域
<Popup visible={visible}>
  <View style={styles.customContainer}>
    {/* 自定义滑动指示器 */}
    <View style={styles.indicator} />

    {/* 自定义内容 */}
    <View style={styles.content}>
      <Text>完全自定义的内容</Text>
    </View>

    {/* 自定义底部 */}
    <View style={styles.footer}>
      <Button title="确定" />
    </View>
  </View>
</Popup>
```

### Props

| 参数             | 说明               | 类型                                   | 默认值   |
| ---------------- | ------------------ | -------------------------------------- | -------- |
| visible          | 是否显示弹出层     | boolean                                | false    |
| position         | 弹出位置           | 'bottom' \| 'top' \| 'left' \| 'right' | 'bottom' |
| mask             | 是否显示遮罩层     | boolean                                | true     |
| closeOnMaskClick | 点击遮罩层是否关闭 | boolean                                | false    |
| closeOnSwipe     | 是否支持滑动关闭   | boolean                                | true     |
| onClose          | 关闭时触发         | () => void                             | -        |
| onMaskClick      | 点击遮罩层时触发   | (event) => void                        | -        |
| afterClose       | 完全关闭后触发     | () => void                             | -        |
| afterShow        | 完全展示后触发     | () => void                             | -        |
| bodyStyle        | 内容区域自定义样式 | ViewStyle                              | -        |
| children         | 弹出层内容         | ReactNode                              | -        |

注意事项：

1. bodyStyle 会覆盖组件默认样式
2. 可以通过 children 完全自定义内容区域
3. 弹出位置不同时注意调整相应的圆角和内边距
4. 建议保留滑动指示器以提升用户体验
