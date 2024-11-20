import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Platform } from 'react-native';
import axios from 'axios';
import ArticleUpdatesCard1 from '../../../components/ArticleUpdatesCard1';
import GlobalLoader from '../../../components/GlobalLoader';
import { showLoading, hideLoading } from '../../../utils/loadingManager';

const RecommendedScreen = () => {
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const cleanHtml = (html) => {
    if (!html) return '';
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // 移除 style 标签及其内容
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // 移除 script 标签及其内容
      .replace(/<[^>]+>/g, '') // 移除所有剩余的HTML标签
      .replace(/[pP](?=[^a-zA-Z]|$)/g, '') // 移除单独的p字母
      .replace(/&#?[a-zA-Z0-9]+;/g, '') // 移除其他HTML实体
      .replace(/\s+/g, ' ') // 合并多个空格为一个
      .trim(); // 移除首尾空格
  };

  const parseXML = (xmlText) => {
    const getTagContent = (tag, text) => {
      const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, 'gs');
      const matches = text.match(regex);
      if (matches) {
        return matches.map(match => {
          // 先移除标签本身
          let content = match.replace(new RegExp(`<\/?${tag}[^>]*>`, 'g'), '');
          // 然后清理内容中的其他HTML标签和实体
          return cleanHtml(content);
        });
      }
      return [];
    };

    const items = xmlText.split('<item>').slice(1).map(item => {
      return {
        title: getTagContent('title', item)[0],
        description: getTagContent('description', item)[0],
        pubDate: getTagContent('pubDate', item)[0],
        link: getTagContent('link', item)[0],
      };
    });

    return items;
  };

  const fetchArticles = async () => {
    try {
      showLoading();
      const baseUrl = 'https://www.techflowpost.com/rss.aspx';
      const url = Platform.select({
        web: `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl)}`,
        default: baseUrl,
      });

      const response = await axios.get(url);
      const articles = parseXML(response.data);
      setArticles(articles);
    } catch (error) {
      console.error('获取文章失败:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
    } finally {
      hideLoading();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchArticles();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <View style={styles.container}>
      <GlobalLoader />
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ArticleUpdatesCard1
            title={item.title}
            description={item.description}
            pubDate={item.pubDate}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />
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
});

export default RecommendedScreen;