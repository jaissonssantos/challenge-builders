import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import theme from '../../styleguide'
import styles from './styles';

const Loading: React.FC = () => {
  return (
      <View style={styles.container}>
          <ActivityIndicator color={theme.colors.white} />
          <Text style={styles.textWhite}>
              Aguarde...
          </Text>
      </View>
  );
}

export default Loading;