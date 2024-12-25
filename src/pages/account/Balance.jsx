import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { getAccountBalance } from '../../utils/tokenUtils';

const icons = {
  icon01: `<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.155762 5.33387C0.155762 3.67701 1.49891 2.33387 3.15576 2.33387H5.52356V4.33387H3.15576C2.60348 4.33387 2.15576 4.78158 2.15576 5.33387V17.627C2.15576 18.7316 3.05119 19.627 4.15576 19.627H13.8964C15.001 19.627 15.8964 18.7316 15.8964 17.627V5.33387C15.8964 4.78158 15.4487 4.33387 14.8964 4.33387H12.5876V2.33387H14.8964C16.5533 2.33387 17.8964 3.67701 17.8964 5.33387V17.627C17.8964 19.8361 16.1056 21.627 13.8964 21.627H4.15576C1.94662 21.627 0.155762 19.8361 0.155762 17.627V5.33387Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.04059 9.71471C5.04059 9.16242 5.4883 8.71471 6.04059 8.71471H11.9592C12.5115 8.71471 12.9592 9.16242 12.9592 9.71471C12.9592 10.267 12.5115 10.7147 11.9592 10.7147H6.04059C5.4883 10.7147 5.04059 10.267 5.04059 9.71471Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.04059 14.2462C5.04059 13.6939 5.4883 13.2462 6.04059 13.2462H9.69672C10.249 13.2462 10.6967 13.6939 10.6967 14.2462C10.6967 14.7985 10.249 15.2462 9.69672 15.2462H6.04059C5.4883 15.2462 5.04059 14.7985 5.04059 14.2462Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.49988 2.16797C4.49988 1.0634 5.39531 0.167969 6.49988 0.167969H11.4999C12.6044 0.167969 13.4999 1.0634 13.4999 2.16797V3.83259C13.4999 4.93716 12.6044 5.83259 11.4999 5.83259H6.49988C5.39531 5.83259 4.49988 4.93716 4.49988 3.83259V2.16797ZM11.4999 2.16797L6.49988 2.16797V3.83259L11.4999 3.83259V2.16797Z" fill="black"/>
  </svg>`,
  icon02: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.0263 6.4752C21.2762 7.02894 20.961 7.65553 20.3851 7.8489C19.8092 8.04227 19.1917 7.72809 18.928 7.18078C18.4211 6.12859 17.7082 5.18437 16.8276 4.4061C15.6712 3.38416 14.2665 2.68427 12.7543 2.37663C11.2421 2.069 9.67553 2.16444 8.21184 2.65338C6.74815 3.14232 5.43877 4.00756 4.41506 5.16232C3.39135 6.31707 2.6893 7.72073 2.37934 9.23248C2.06938 10.7442 2.16241 12.3109 2.6491 13.7753C3.13579 15.2398 3.99903 16.5505 5.15221 17.576C6.03043 18.3569 7.0533 18.9516 8.15867 19.3287C8.73364 19.5248 9.11958 20.1002 8.99664 20.6952C8.8737 21.2901 8.2894 21.6781 7.7097 21.4964C6.22784 21.0319 4.85694 20.2575 3.69026 19.22C2.24878 17.9381 1.16974 16.2997 0.561377 14.4692C-0.0469867 12.6386 -0.163277 10.6803 0.224171 8.79059C0.611619 6.90091 1.48918 5.14634 2.76882 3.7029C4.04847 2.25945 5.68519 1.17789 7.5148 0.566719C9.34441 -0.0444564 11.3026 -0.163755 13.1929 0.22079C15.0831 0.605335 16.839 1.4802 18.2845 2.75762C19.4543 3.79153 20.3875 5.05971 21.0263 6.4752Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9868 7.95398C9.63116 7.95398 8.53223 9.05292 8.53223 10.4085V11.4994C8.53223 12.855 9.63116 13.954 10.9868 13.954C12.3424 13.954 13.4413 12.855 13.4413 11.4994V10.4085C13.4413 9.05292 12.3424 7.95398 10.9868 7.95398ZM10.9868 9.59035C11.4386 9.59035 11.805 9.95666 11.805 10.4085V11.4994C11.805 11.9513 11.4386 12.3176 10.9868 12.3176C10.5349 12.3176 10.1686 11.9513 10.1686 11.4994V10.4085C10.1686 9.95666 10.5349 9.59035 10.9868 9.59035Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.4411 14.454C17.0855 14.454 15.9866 15.5529 15.9866 16.9085V17.9994C15.9866 19.355 17.0855 20.454 18.4411 20.454C19.7967 20.454 20.8957 19.355 20.8957 17.9994V16.9085C20.8957 15.5529 19.7967 14.454 18.4411 14.454ZM18.4411 16.0903C18.893 16.0903 19.2593 16.4567 19.2593 16.9085V17.9994C19.2593 18.4513 18.893 18.8176 18.4411 18.8176C17.9893 18.8176 17.6229 18.4513 17.6229 17.9994V16.9085C17.6229 16.4567 17.9893 16.0903 18.4411 16.0903Z" fill="black"/>
<path d="M18.5721 9.14338C19.0198 9.46674 19.1206 10.0918 18.7973 10.5395L12.2972 19.5395C11.9738 19.9872 11.3487 20.088 10.901 19.7646C10.4533 19.4413 10.3525 18.8162 10.6758 18.3685L17.1759 9.36855C17.4993 8.92083 18.1244 8.82001 18.5721 9.14338Z" fill="black"/>
</svg>`,
  icon03: `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9998 0.0996094C14.0057 0.0996094 15.8063 0.910869 17.1049 2.05996C18.1298 2.96682 18.9093 4.14852 19.1794 5.39497C20.1895 5.53263 21.1304 5.90792 21.8817 6.52944C22.8708 7.34776 23.471 8.5472 23.471 9.9998C23.471 11.4525 22.8708 12.6519 21.8817 13.4702C21.1406 14.0833 20.2149 14.4568 19.2204 14.599C19.0024 16.1973 18.2209 17.4766 17.0522 18.3762C15.6949 19.421 13.89 19.9004 11.9998 19.9004C11.4475 19.9004 10.9998 19.4527 10.9998 18.9004C10.9998 18.3481 11.4475 17.9004 11.9998 17.9004C13.5793 17.9004 14.9157 17.4969 15.8323 16.7914C16.6626 16.1523 17.2106 15.2217 17.2759 13.9284L17.2824 13.6649V6.33513C17.2824 5.49337 16.7733 4.43712 15.7796 3.55776C14.8043 2.69476 13.4636 2.09961 11.9998 2.09961C10.5359 2.09961 9.19526 2.69476 8.21999 3.55776C7.29247 4.3785 6.78719 5.35332 6.72394 6.16403L6.71716 6.33513V13.6649C6.71716 14.1777 6.33112 14.6004 5.83378 14.6582L5.71716 14.6649L5.69674 14.6647C4.36123 14.6607 3.08327 14.2686 2.11824 13.4702C1.12912 12.6519 0.528931 11.4525 0.528931 9.9998C0.528931 8.5472 1.12912 7.34776 2.11824 6.52944C2.86941 5.90799 3.81018 5.53271 4.82011 5.39502C5.09023 4.14855 5.86976 2.96683 6.89462 2.05996C8.19321 0.910869 9.99388 0.0996094 11.9998 0.0996094ZM4.71716 7.44447C4.18793 7.56656 3.73817 7.78498 3.39313 8.0704C2.86634 8.5063 2.52893 9.1392 2.52893 9.9998C2.52893 10.8604 2.86634 11.4934 3.39313 11.9292C3.73817 12.2147 4.18793 12.4331 4.71716 12.5552V7.44447ZM19.2824 7.44439V12.5553C19.8118 12.4332 20.2617 12.2147 20.6068 11.9292C21.1336 11.4934 21.471 10.8604 21.471 9.9998C21.471 9.1392 21.1336 8.5063 20.6068 8.0704C20.2617 7.78492 19.8118 7.56646 19.2824 7.44439Z" fill="black"/>
</svg>`,
  icon04: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11C0 4.92472 4.92472 0 11 0C17.0753 0 22 4.92472 22 11C22 17.0753 17.0753 22 11 22C4.92472 22 0 17.0753 0 11ZM11 2C6.02928 2 2 6.02928 2 11C2 15.9707 6.02928 20 11 20C15.9707 20 20 15.9707 20 11C20 6.02928 15.9707 2 11 2Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.52513 5.52513C9.1815 4.86875 10.0717 4.5 11 4.5C11.9283 4.5 12.8185 4.86875 13.4749 5.52513C14.1313 6.1815 14.5 7.07174 14.5 8C14.5 8.92826 14.1313 9.8185 13.4749 10.4749C12.8185 11.1313 11.9283 11.5 11 11.5C10.0717 11.5 9.1815 11.1313 8.52513 10.4749C7.86875 9.8185 7.5 8.92826 7.5 8C7.5 7.07174 7.86875 6.1815 8.52513 5.52513ZM11 6.5C10.6022 6.5 10.2206 6.65804 9.93934 6.93934C9.65804 7.22064 9.5 7.60218 9.5 8C9.5 8.39783 9.65804 8.77936 9.93934 9.06066C10.2206 9.34196 10.6022 9.5 11 9.5C11.3978 9.5 11.7794 9.34196 12.0607 9.06066C12.342 8.77936 12.5 8.39783 12.5 8C12.5 7.60218 12.342 7.22064 12.0607 6.93934C11.7794 6.65804 11.3978 6.5 11 6.5Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.99974 14.5C6.88103 14.5 5.14611 16.1484 5.00857 18.2319C4.97219 18.783 4.49596 19.2002 3.94487 19.1638C3.39379 19.1274 2.97653 18.6512 3.01291 18.1001C3.21937 14.9726 5.82045 12.5 8.99974 12.5H12.9997C16.1748 12.5 18.7735 14.966 18.9859 18.0876C19.0234 18.6386 18.6072 19.1157 18.0561 19.1532C17.5051 19.1907 17.0281 18.7744 16.9906 18.2234C16.849 16.144 15.1157 14.5 12.9997 14.5H8.99974Z" fill="black"/>
</svg>`
};

const BalanceScreen = ({ navigation }) => {
  const [balance, setBalance] = useState(0);
  // 获取存储的余额
  const getBalance = async () => {
    try {
      const savedBalance = await getAccountBalance();
      if (savedBalance !== null) {
        setBalance(parseFloat(savedBalance));
      }
    } catch (error) {
      console.log('Error reading balance from AsyncStorage', error);
    }
  };

  // 在页面获得焦点时检查是否需要更新余额
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getBalance();
    });
    return unsubscribe;
  }, [navigation]);
  const renderIcon = (iconXml) => {
    if (Platform.OS === 'web') {
      // Web 平台直接使用 dangerouslySetInnerHTML
      return (
        <div
          style={{ width: 24, height: 24 }}
          dangerouslySetInnerHTML={{ __html: iconXml }}
        />
      );
    }
    // 移动端使用 SvgXml
    return <SvgXml xml={iconXml} width={24} height={24} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <ImageBackground
          source={require('../../../assets/img/Vector.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.balanceBox}>
          <Text style={styles.balanceText}>{balance}</Text>
          <Text style={styles.descriptionText}>可用余额</Text>
          <TouchableOpacity
            style={styles.rechargeButton}
            onPress={() => navigation.navigate('AccountStack', { screen: 'Recharge' })}
          >
            <Text style={styles.rechargeButtonText}>充值</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.balanceBox}>
          <Text style={styles.balanceText}>0</Text>
          <Text style={styles.descriptionText}>返佣手续费</Text>
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawButtonText}>提现</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 设置与服务 */}
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceTitle}>设置与服务</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.iconCircle}>
              {renderIcon(icons.icon01)}
            </View>
            <Text style={styles.iconText}>返佣明细</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.iconCircle}>
              {renderIcon(icons.icon02)}
            </View>
            <Text style={styles.iconText}>返现规则</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.iconCircle}>
              {renderIcon(icons.icon03)}
            </View>
            <Text style={styles.iconText}>在线客服</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.iconCircle}>
              {renderIcon(icons.icon04)}
            </View>
            <Text style={styles.iconText}>关于我们</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 资产明细 */}
      <TouchableOpacity style={styles.detailButton}>
        <Text style={styles.detailText}>资产明细</Text>
        <Text style={styles.arrowText}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#F3F3F3',
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    right: -50,
    width: '100%',
    height: '100%',
  },
  balanceBox: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  divider: {
    width: 1,
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  rechargeButton: {
    backgroundColor: '#80FFE9',
    height: 42,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  withdrawButton: {
    backgroundColor: '#000',
    height: 42,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  rechargeButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  withdrawButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  serviceContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(238, 238, 238, 1)',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    alignItems: 'center',
    width: '25%',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconText: {
    fontSize: 12,
    color: '#333',
  },
  detailButton: {
    width: '100%',
    height: 40,
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  arrowText: {
    fontSize: 20,
    color: '#999',
  }
});

export default BalanceScreen;
