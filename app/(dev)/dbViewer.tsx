import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { UserDB } from '@/components/database/UserDB';
import Colors from '@/components/Colors';

type User = {
  id: number;
  name: string;
  email: string;
  pass: string;
  city: string;
  role: 'Farmer' | 'DroneOwner' | 'Pilot';
};

export default function DBViewer() {
  const [users, setUsers] = useState<User[]>([]);
  const { getAllUsers } = UserDB();
  const { dropTable } = UserDB();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, []);

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <Text style={styles.userText}>ID: {item.id}</Text>
      <Text style={styles.userText}>Name: {item.name}</Text>
      <Text style={styles.userText}>Email: {item.email}</Text>
      <Text style={styles.userText}>Password: {item.pass}</Text>
      <Text style={styles.userText}>City: {item.city}</Text>
      <Text style={styles.userText}>Role: {item.role}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Users in Database</Text>
      
        {users.length === 0 ? (
          <Text style={styles.noData}>No users found in the database.</Text>
        ) : (
          <FlatList
            data={users}
            renderItem={renderUser}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
          />
        )}
      
      {/* <TouchableOpacity onPress={dropTable}><Text>Drop Table</Text></TouchableOpacity> // only for testing, not fooall purposes */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BGCOLOR,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Gaga',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  userCard: {
    backgroundColor: Colors.BGCOLOR2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  userText: {
    fontSize: 16,
    fontFamily: 'Gaga',
    color: '#000',
    marginBottom: 5,
  },
  noData: {
    fontSize: 18,
    fontFamily: 'Gaga',
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
});