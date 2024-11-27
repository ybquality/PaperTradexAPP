import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NavBar from '../../components/common/navbar';
import { Icon } from '@rneui/themed';
import Toast from '../../components/common/toast';

const ReferralScreen = ({ navigation }) => {
  // 邀请码数据
  const inviteCode = '6666';

  // 添加邀请码输入状态
  const [inputCode, setInputCode] = React.useState('');

  // 处理绑定按钮点击
  const handleBind = () => {
    if (!inputCode) {
      Toast.show({
        content: '请输入邀请码'
      });
      return;
    }

    // 这里添加绑定邀请码的逻辑
    Toast.show({
      content: '暂时无法绑定邀请用户'
    });
    setInputCode('');
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../../assets/img/referralbackground.png')}
        style={[StyleSheet.absoluteFillObject]}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <NavBar
            onBack={() => navigation.goBack()}
            backIcon={
              <Icon
                name="arrow-left"
                type="feather"
                size={24}
                color="rgba(255, 255, 255, 1)"
              />
            }
            right={<Text style={styles.rightText}>返佣规则</Text>}
          >
          </NavBar>
          <View style={styles.content}>
            <View style={styles.wrapper}>
              <View>
                <Text style={styles.title}>邀请好友得奖励</Text>
              </View>
              {/* 我的邀请码卡片 */}
              <View style={styles.myCodeCard}>
                <ImageBackground
                  source={require('../../../assets/img/CodeCardBackground.png')}
                  style={styles.cardBackground}
                  resizeMode="cover"
                >
                  <LinearGradient
                    colors={['#FFFFFF', '#EBEBFE']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.cardGradient}
                  >
                    <Image 
                      source={require('../../../assets/img/Vector.png')}
                      style={styles.vectorImage}
                    />
                    <Text style={styles.myCodeTitle}>我的邀请码</Text>
                    <View style={styles.codeContainer}>
                      {inviteCode.split('').map((char, index) => (
                        <Text key={index} style={styles.codeText}>
                          {char}
                        </Text>
                      ))}
                    </View>
                    <LinearGradient
                      colors={['#A0F3F1', '#99B5FF']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.shareButton}
                    >
                      <Text style={styles.shareText}>分享</Text>
                    </LinearGradient>
                  </LinearGradient>
                </ImageBackground>
              </View>
              {/* 绑定邀请码卡片 */}
              <View style={styles.bindCodeCard}>
                <LinearGradient
                  colors={['#090909', '#656272']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.bindCardGradient}
                >
                  <Image 
                    source={require('../../../assets/img/CodeCardBackground.png')}
                    style={styles.bindCardBackgroundImage}
                  />
                  <Text style={styles.bindCodeTitle}>绑定邀请码</Text>
                  <View style={styles.bindCodeInputContainer}>
                    <TextInput
                      placeholder="请输入邀请码"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      style={styles.input}
                      returnKeyType="done"
                      value={inputCode}
                      onChangeText={setInputCode}
                    />
                    <TouchableOpacity 
                      style={styles.bindButton}
                      onPress={handleBind}
                    >
                      <Text style={styles.bindText}>绑定</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </View>
          {/* 邀请记录 */}
          <View style={styles.recordContainer}>
            <Text style={styles.recordTitle}>邀请记录</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  wrapper: {
    margin: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
  rightText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
  },
  myCodeCard: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardBackground: {
    width: '100%',
    overflow: 'hidden',
  },
  cardGradient: {
    width: '100%',
    padding: 20,
    gap: 12,
    alignItems: 'center',
    position: 'relative',
  },
  vectorImage: {
    position: 'absolute',
    top: 0,
    right: -60,
    width: 311,
    height: 142,
    resizeMode: 'contain',
    opacity: 0.8,
  },
  myCodeTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
    width: '100%',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 12,
  },
  codeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: 8,
  },
  shareButton: {
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    width: '100%',
  },
  shareText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 1)',
  },
  bindCodeCard: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bindCardGradient: {
    width: '100%',
    padding: 20,
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    position: 'relative',
  },
  bindCardBackgroundImage: {
    position: 'absolute',
    top: 13,
    left: 130,
    width: 309,
    height: 98,
    resizeMode: 'contain',
    // opacity: 0.8,
  },
  bindCodeTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  bindCodeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    fontWeight: '400',
  },
  bindButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  bindText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 1)',
  },
  recordContainer: {
    marginHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  recordTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
});

export default ReferralScreen;
