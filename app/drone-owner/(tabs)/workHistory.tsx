import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function WorkHistory() {
  const workHistory = [
    {
      id: 1,
      name: 'John Doe, Nagpur',
      date: '2025-04-05',
      earnings: '₹2500',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'Jane Smith, Pune',
      date: '2025-04-04',
      earnings: '₹1800',
      status: 'Completed',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Work History</Text>
      <ScrollView style={styles.scrollView}>
        {workHistory.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDetails}>Date: {item.date}</Text>
            <Text style={styles.cardDetails}>Earnings: {item.earnings}</Text>
            <Text style={styles.cardStatus}>{item.status}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 8,
  },
  cardDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: '#28a745',
    marginTop: 8,
  },
});