import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';




export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('@/assets/images/react-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>React Native'e Hoş Geldin!</Text>

      <Text style={styles.subtitle}>
        🚀 Bu uygulama ile adım adım mobil uygulama geliştirmeyi öğreneceksin.
      </Text>

      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Ionicons name="code-slash" size={28} color="#4A90E2" />
          <Text style={styles.featureText}>Canlı Kod Örnekleri</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="school-outline" size={28} color="#50E3C2" />
          <Text style={styles.featureText}>Eğitici Quizler</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="rocket-outline" size={28} color="#F5A623" />
          <Text style={styles.featureText}>Uygulamalı Projeler</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('(tabs)')}
      >
        <Text style={styles.buttonText}>Başla</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1E1E1E',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 24,
  },
  features: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
