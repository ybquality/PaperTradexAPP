import React, { useState, useCallback, useRef } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Platform, Text } from 'react-native';
import axios from 'axios';
import TopTabNavigator from '../../../components/common/topTabNavigator';
import ArticleUpdatesCard1 from '../../../components/ArticleUpdatesCard1';
import GlobalLoader from '../../../components/GlobalLoader';
import { showLoading, hideLoading } from '../../../utils/loadingManager';
import * as rssParser from 'react-native-rss-parser';
import ExchangesAnnouncement from '../../../components/article/exchangesAnnouncement';

const PAGE_SIZE = 5; // 每页加载条数

const RSS_FEEDS = {
  binance: [
    'https://rsshub.papertradex.io/binance/announcement/new-cryptocurrency-listing',
    'https://rsshub.papertradex.io/binance/announcement/delisting'
  ],
  bitget: [
    'https://rsshub.papertradex.io/bitget/announcement/new-listing/zh-CN'
  ]
};

const NEWS_API = 'https://www.techflowpost.com/rss.aspx'; // 添加快讯接口

const RecommendedScreen = () => {
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState('news');
  const pageRef = useRef(1);
  const allArticlesRef = useRef([]); // 存储所有文章数据的引用
  const [error, setError] = useState(null);

  const tabs = [
    { key: 'news', title: '快讯' },
    { key: 'exchange', title: '交易所公告' },
  ];

  // 添加清理 HTML 标签的函数
  const cleanHtmlTags = useCallback((html) => {
    if (!html) return '';
    return html
      .replace(/<[^>]*>/g, '') // 移除所有HTML标签
      .replace(/&nbsp;/g, ' ') // 替换特殊字符
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();
  }, []);

  const fetchArticles = useCallback(async (isRefresh = false) => {
    if (loading || (!hasMore && !isRefresh)) return;
    
    try {
      setLoading(true);
      const response = await axios.get(NEWS_API);
      const parsedFeed = await rssParser.parse(response.data);
      
      const articles = parsedFeed.items.map(item => ({
        title: cleanHtmlTags(item.title),
        description: cleanHtmlTags(item.description),
        pubDate: item.published,
        link: item.links[0]?.url || ''
      }));

      if (isRefresh) {
        return articles;
      } else {
        const startIndex = (pageRef.current - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const newArticles = articles.slice(startIndex, endIndex);
        setArticles(prev => [...prev, ...newArticles]);
        pageRef.current += 1;
      }

      setHasMore(articles.length >= PAGE_SIZE);
      allArticlesRef.current = articles;
      
    } catch (error) {
      console.error('获取快讯失败:', error);
      return [];
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [loading, hasMore, cleanHtmlTags]);

  const fetchExchangeAnnouncements = useCallback(async (isRefresh = false) => {
    if (loading || (!hasMore && !isRefresh)) return;
    
    try {
      setLoading(true);
      // 使用 Promise.all 并行请求所有 feed
      const feedPromises = Object.entries(RSS_FEEDS).flatMap(([exchange, urls]) =>
        urls.map(async (feedUrl) => {
          try {
            const response = await axios.get(feedUrl);
            const parsedFeed = await rssParser.parse(response.data);
            return parsedFeed.items.map(item => ({
              title: cleanHtmlTags(item.title),
              description: cleanHtmlTags(item.description),
              pubDate: item.published,
              exchange,
              link: item.links[0]?.url || ''
            }));
          } catch (error) {
            console.error(`Error fetching ${exchange} feed:`, error);
            return [];
          }
        })
      );

      const results = await Promise.all(feedPromises);
      const allFeeds = results.flat().sort((a, b) => 
        new Date(b.pubDate) - new Date(a.pubDate)
      );
      
      if (isRefresh) {
        return allFeeds;
      } else {
        const startIndex = (pageRef.current - 1) * PAGE_SIZE;
        const newArticles = allFeeds.slice(startIndex, startIndex + PAGE_SIZE);
        setArticles(prev => [...prev, ...newArticles]);
      }

      setHasMore(allFeeds.length >= PAGE_SIZE);
      allArticlesRef.current = allFeeds;
      
    } catch (error) {
      console.error('Error fetching announcements:', error);
      return [];
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [loading, hasMore, cleanHtmlTags]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (activeTab === 'exchange') {
      await fetchExchangeAnnouncements(true);
    } else {
      await fetchArticles(true);
    }
    setRefreshing(false);
  }, [fetchArticles, fetchExchangeAnnouncements, activeTab]);

  const onEndReached = useCallback(() => {
    if (!loading && hasMore) {
      pageRef.current += 1;
      if (activeTab === 'exchange') {
        fetchExchangeAnnouncements();
      } else {
        fetchArticles();
      }
    }
  }, [loading, hasMore, fetchArticles, fetchExchangeAnnouncements, activeTab]);

  const renderItem = useCallback(({ item }) => (
    <ArticleUpdatesCard1
      title={item.title}
      description={item.description}
      pubDate={item.pubDate}
    />
  ), []);

  const renderExchangeItem = useCallback(({ item }) => (
    <ExchangesAnnouncement
      title={item.title}
      description={item.description}
      pubDate={item.pubDate}
      exchange={item.exchange}
    />
  ), []);

  const keyExtractor = useCallback((item, index) => 
    `${item.title}-${index}`, []
  );

  // 添加 getItemLayout 函数
  const getItemLayout = useCallback((data, index) => ({
    length: 150, // 每个 item 的高度，需要根据实际情况设置
    offset: 150 * index,
    index,
  }), []);

  // 在数据加载失败时设置错误状态
  const handleError = useCallback((error) => {
    setError(error.message);
    hideLoading();
  }, []);

  // 在渲染中处理错误状态
  const renderContent = useCallback(() => {
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }
    switch (activeTab) {
      case 'news':
        return (
          <FlatList
            data={articles}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            initialNumToRender={PAGE_SIZE}
            maxToRenderPerBatch={PAGE_SIZE}
            windowSize={5}
            removeClippedSubviews={true}
            contentContainerStyle={styles.listContainer}
            getItemLayout={getItemLayout}
          />
        );
      case 'exchange':
        return (
          <FlatList
            data={articles}
            renderItem={renderExchangeItem}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            initialNumToRender={PAGE_SIZE}
            maxToRenderPerBatch={PAGE_SIZE}
            windowSize={5}
            removeClippedSubviews={true}
            contentContainerStyle={styles.listContainer}
            getItemLayout={getItemLayout}
          />
        );
      default:
        return null;
    }
  }, [activeTab, articles, refreshing, onRefresh, onEndReached, renderItem, renderExchangeItem, error, getItemLayout]);

  // 添加缓存状态
  const cacheRef = useRef({
    news: [],
    exchange: []
  });

  // 在数据加载时更新缓存
  const updateCache = useCallback((type, data) => {
    cacheRef.current[type] = data;
  }, []);

  // 切换 tab 时优先使用缓存数据
  const handleTabChange = useCallback((newTab) => {
    setArticles(cacheRef.current[newTab] || []); // 先显示缓存数据
    setActiveTab(newTab);
    pageRef.current = 1;
    setHasMore(true);
    
    // 然后在后台更新数据
    const loadData = async () => {
      showLoading();
      try {
        let newArticles = [];
        if (newTab === 'exchange') {
          const response = await fetchExchangeAnnouncements(true);
          newArticles = response || [];
        } else {
          const response = await fetchArticles(true);
          newArticles = response || [];
        }
        setArticles(newArticles);
        updateCache(newTab, newArticles);
      } catch (error) {
        handleError(error);
      } finally {
        hideLoading();
      }
    };

    loadData();
  }, [fetchExchangeAnnouncements, fetchArticles, updateCache, handleError]);

  // 添加初始化加载的 useEffect
  React.useEffect(() => {
    const initData = async () => {
      try {
        showLoading();
        let newArticles = [];
        if (activeTab === 'exchange') {
          const response = await fetchExchangeAnnouncements(true);
          newArticles = response || [];
        } else {
          const response = await fetchArticles(true);
          newArticles = response || [];
        }
        setArticles(newArticles);
      } catch (error) {
        console.error('初始化数据加载失败:', error);
      } finally {
        hideLoading();
      }
    };

    initData();
  }, []); // 空依赖数组，只在组件挂载时执行一次

  return (
    <View style={styles.container}>
      <GlobalLoader />
      <TopTabNavigator
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  listContainer: {
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default RecommendedScreen;