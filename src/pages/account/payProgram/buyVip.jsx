import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const BuyVipScreen = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = React.useState(0);

  const vipBenefits = [
    '无限API账号',
    '无限跟单',
    '实时推送',
    '授权账户手续费返现',
  ];

  const vipPlans = [
    { months: 1, price: '100', tag: '限时免费 7天' },
    { months: 3, price: '300', tag: '限时免费 7天' },
    { months: 12, price: '1200', tag: '限时免费 7天' },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.container}>
        <LinearGradient
          colors={['#000000', '#090909']}
          style={StyleSheet.absoluteFillObject}
        >
          <Image 
            source={require('../../../../assets/img/vipbackground.png')}
            style={styles.backgroundImage}
          />
        </LinearGradient>
        <SafeAreaView style={styles.safeArea}>
          {/* 头部导航 */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon 
                name="chevron-left"
                type="font-awesome"
                color="#FFF"
                size={20}
              />
            </TouchableOpacity>
          </View>

          {/* VIP标题 */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>加入VIP</Text>
          </View>

          {/* VIP权益卡片 */}
          <LinearGradient
            colors={['#090909', '#4B4B4B']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.benefitsCard}
          >
            {/* 背景图片 */}
            <Image 
              source={require('../../../../assets/img/VIPCardBackground.png')}
              style={styles.cardBackground}
            />
            
            <View style={styles.benefitsHeader}>
              <Image 
                source={require('../../../../assets/VIP.png')}
                style={styles.vipIcon}
              />
              <Text style={styles.benefitsTitle}>会员权益</Text>
            </View>
            {vipBenefits.map((benefit, index) => (
              <Text 
                key={index} 
                style={[
                  styles.benefitItem,
                  index < vipBenefits.length - 1 && styles.benefitItemMargin
                ]}
              >
                • {benefit}
              </Text>
            ))}
          </LinearGradient>

          {/* VIP套餐选择 */}
          {vipPlans.map((plan, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedPlan(index)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#090909', '#4B4B4B']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[
                  styles.planCard,
                  selectedPlan === index && styles.selectedPlan
                ]}
              >
                <Text style={styles.planDuration}>{plan.months}个月</Text>
                <Text style={styles.planPrice}>$ {plan.price}</Text>
                {plan.tag && (
                  <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>{plan.tag}</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}

          {/* 底部按钮 */}
          <LinearGradient
            colors={['#80FFE9', '#FFE485']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientButton}
          >
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>开始免费体验(7天)</Text>
            </TouchableOpacity>
          </LinearGradient>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.6,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 44,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  benefitsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 48,
    marginHorizontal: 48,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    position: 'relative',
  },
  cardBackground: {
    position: 'absolute',
    right: -10,
    bottom: -15,
    width: 111,
    height: 111,
    opacity: 0.5,
    resizeMode: 'contain',
  },
  benefitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  vipIcon: {
    width: 20,
    height: 20,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
    marginLeft: 8,
  },
  benefitItem: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  benefitItemMargin: {
    marginBottom: 10,
  },
  planCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginHorizontal: 36,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  selectedPlan: {
    borderColor: 'rgba(255, 228, 133, 1)',
    borderWidth: 1,
  },
  planDuration: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
  tagContainer: {
    position: 'absolute',
    right: 16,
    top: -10,
    backgroundColor: 'rgba(128, 255, 233, 1)',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  gradientButton: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    borderRadius: 32,
  },
  buttonTouchable: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 1)',
  },
});

export default BuyVipScreen;
