import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useWindowDimensions } from 'react-native';

const TopTabNavigator = ({ 
  tabs = [], 
  activeTab, 
  onTabChange,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle,
  containerStyle,
}) => {
  const { width } = useWindowDimensions();
  
  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onTabChange(tab.key)}
            style={[
              styles.tab,
              tabStyle,
              activeTab === tab.key && styles.activeTab,
              activeTab === tab.key && activeTabStyle,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                tabTextStyle,
                activeTab === tab.key && styles.activeTabText,
                activeTab === tab.key && activeTabTextStyle,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(243, 243, 243, 1)',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 208, 172, 1)',
    borderRadius: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.4)',
  },
  activeTabText: {
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.9)',
  },
});

export default TopTabNavigator;