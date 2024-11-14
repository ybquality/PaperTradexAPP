import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  Dimensions,
  ScrollView,
  TouchableOpacity 
} from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 40;
const BANNER_HEIGHT = 160;

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = React.useRef(null);

  const banners = [
    { id: 1, image: require('../../../assets/banner.png') },
    { id: 2, image: require('../../../assets/banner.png') },
    { id: 3, image: require('../../../assets/banner.png') },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      setActiveIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * BANNER_WIDTH,
        animated: true
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / BANNER_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {banners.map((banner, index) => (
          <TouchableOpacity 
            key={banner.id}
            activeOpacity={0.9}
            onPress={() => console.log(`Banner ${index + 1} clicked`)}
            style={styles.bannerContainer}
          >
            <Image
              source={banner.image}
              style={styles.banner}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex && styles.activeDot
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    width: BANNER_WIDTH,
    position: 'relative',
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
  },
  banner: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    zIndex: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 16,
  },
});

export default Banner;
