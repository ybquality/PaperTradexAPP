import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ListItem, Icon } from '@rneui/themed';

const faqData = [
  {
    id: 1,
    question: '1. 如何充值？',
    answer: '充值说明...'
  },
  {
    id: 2,
    question: '2. 如何充值？',
    answer: '充值说明...'
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