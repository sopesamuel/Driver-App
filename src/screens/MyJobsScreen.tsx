import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useJobStore } from '../store/jobstore';
import { RootStackParamList } from '../navigation';
import { Job } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function MyJobCard({ job }: { job: Job }) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}>
      <View style={styles.row}>
        <Text style={styles.city}>{job.pickupCity} → {job.dropoffCity}</Text>
        <Text style={[styles.status, styles[job.status]]}>{job.status.replace('_', ' ')}</Text>
      </View>
      <Text style={styles.address}>{job.pickupAddress}</Text>
      <Text style={styles.address}>{job.dropoffAddress}</Text>
      <Text style={styles.duration}>⏱ {job.estimatedDuration}</Text>
    </TouchableOpacity>
  );
}

export default function MyJobsScreen() {
  const myJobs = useJobStore((state) => state.myJobs);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={myJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MyJobCard job={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No active jobs</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', margin: 12, borderRadius: 10, padding: 16, gap: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  city: { fontSize: 16, fontWeight: '600' },
  address: { fontSize: 13, color: '#666' },
  duration: { fontSize: 13, color: '#888' },
  status: { fontSize: 12, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  ACCEPTED: { backgroundColor: '#e8f5e9', color: '#2e7d32' },
  PICKED_UP: { backgroundColor: '#fff3e0', color: '#e65100' },
  DELIVERED: { backgroundColor: '#ede7f6', color: '#4527a0' },
  empty: { textAlign: 'center', marginTop: 40, color: '#999' },
});