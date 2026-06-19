import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useJobStore } from '../store/jobstore';
import { RootStackParamList } from '../navigation';
import { Job } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function JobCard({ job }: { job: Job }) {
  const navigation = useNavigation<NavigationProp>();
  const acceptJob = useJobStore((state) => state.acceptJob);

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}>
      <View style={styles.row}>
        <Text style={styles.city}>{job.pickupCity} → {job.dropoffCity}</Text>
        <Text style={[styles.priority, styles[job.priority]]}>{job.priority}</Text>
      </View>
      <Text style={styles.address}>{job.pickupAddress}</Text>
      <Text style={styles.address}>{job.dropoffAddress}</Text>
      <Text style={styles.duration}>⏱ {job.estimatedDuration}</Text>
      <TouchableOpacity style={styles.acceptBtn} onPress={() => acceptJob(job)}>
        <Text style={styles.acceptText}>Accept Job</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function JobFeedScreen() {
  const availableJobs = useJobStore((state) => state.availableJobs);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={availableJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobCard job={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No available jobs</Text>}
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
  priority: { fontSize: 12, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  Standard: { backgroundColor: '#e0f0ff', color: '#0066cc' },
  Express: { backgroundColor: '#fff3e0', color: '#e65100' },
  'Same-day': { backgroundColor: '#fce4ec', color: '#c62828' },
  acceptBtn: { backgroundColor: '#2e7d32', borderRadius: 8, padding: 10, alignItems: 'center', marginTop: 6 },
  acceptText: { color: '#fff', fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 40, color: '#999' },
});