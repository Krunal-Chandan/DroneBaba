// DropdownRenderer.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';
import { PaperProvider } from 'react-native-paper';

type DropdownRendererProps = {
  items: { value: string; label: string }[];
  label: string;
  placeholder: string;
  style?: object
}

export default function DropdownRenderer ({ items, label, placeholder, style }: DropdownRendererProps) {
  const [selectedItems, setSelectedItems] = useState<string>()

  return (
    <PaperProvider>
      <View style={[styles.container,style]}>
        <Dropdown
          label={label}
          options={items.map(item => ({ label: item.value, value: item.label }))}
          value={selectedItems}
          onSelect={setSelectedItems}
          placeholder={placeholder}
          mode="flat"
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});

