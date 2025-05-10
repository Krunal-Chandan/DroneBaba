import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export const useRefreshOnFocus = (callback: () => void | Promise<void>) => {
  useFocusEffect(
    useCallback(() => {
      callback(); // Runs when screen comes into focus
    }, [])
  );
};