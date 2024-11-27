import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ListItem, Icon } from '@rneui/themed';

const faqData = [
  {
    id: 1,
    question: '1. 如何充值？',
    answer: 'APP暂时还未开放充值渠道，请等待下次版本更新'
  },
  {
    id: 2,
    question: '2. 什么是跟单交易？',
    answer: '跟单交易帮助投资者实时复制有经验的加密货币投资者的交易。当带单交易者进行交易，系统会自动为跟单用户复制相同的交易'
  },
  {
    id: 3,
    question: '3. 跟单失败原因',
    answer: '当跟单失败时，系统会为跟单用户发送邮件和站内信通知跟单用户并解释其原因，跟单是一个复杂的过程，涉及到多个因素，详细失败原因请查看交易日志'
  },
  {
    id: 4,
    question: '4. 跟单比例介绍',
    answer: '比例跟单是相对于固定保证金跟单的一种新型跟单模式，跟单用户可以设置跟随交易员的倍率来进行跟单，具体来说，跟单的每笔订单价值=交易员订单价值* 跟单用户设置的跟单倍率，如交易员某次开出价值10000USDT的仓位，跟单用户设置的跟随比例是0.1，则跟单用户将跟出价值10000USDT*0.1=1000USDT的仓位。比例跟单可以支持用户每次跟随交易员投入不同的金额，可以更好地跟随交易员策略，把握市场机会，整体跟单盈亏也将与交易员更加贴近'
  }
];

const HomeFAQ = () => {
  const [expanded, setExpanded] = useState([]);

  const toggleAccordion = (id) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter(item => item !== id));
    } else {
      setExpanded([...expanded, id]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>常见问题</Text>
      <View style={styles.faqContainer}>
        {faqData.map((item, index) => (
          <View key={item.id} style={[
            styles.questionWrapper,
            index === 0 && styles.firstQuestion
          ]}>
            <ListItem.Accordion
              content={
                <ListItem.Content>
                  <Text style={styles.questionText}>{item.question}</Text>
                </ListItem.Content>
              }
              isExpanded={expanded.includes(item.id)}
              onPress={() => toggleAccordion(item.id)}
              icon={<Icon name="chevron-down" type="feather" size={20} color="#666" />}
              expandIcon={<Icon name="chevron-up" type="feather" size={20} color="#666" />}
              containerStyle={styles.accordionItem}
            >
              <ListItem containerStyle={styles.answerContainer}>
                <ListItem.Content>
                  <Text style={styles.answerText}>{item.answer}</Text>
                </ListItem.Content>
              </ListItem>
            </ListItem.Accordion>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  faqContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  questionWrapper: {
    backgroundColor: '#FAFAFA',
    marginBottom: 8,
    borderRadius: 12,
  },
  firstQuestion: {
    borderTopLeftRadius: 12,
  },
  accordionItem: {
    padding: 16,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  answerContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  questionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  }
});

export default HomeFAQ;