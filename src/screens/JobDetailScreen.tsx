import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useJobStore } from '../store/jobstore';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'JobDetail'>;

export default function JobDetailScreen({ route }: Props) {
  const { jobId } = route.params;
  const myJobs = useJobStore((state) => state.myJobs);
  const availableJobs = useJobStore((state) => state.availableJobs);
  const updateJobStatus = useJobStore((state) => state.updateJobStatus);

  const job = [...myJobs, ...availableJobs].find((j) => j.id === jobId);

  if (!job) return <SafeAreaView><Text>Job not found</Text></SafeAreaView>;

  const steps = ['ACCEPTED', 'PICKED_UP', 'DELIVERED'];
  const currentStep = steps.indexOf(job.status);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.heading}>{job.pickupCity} → {job.dropoffCity}</Text>
          <Text style={styles.label}>Pickup</Text>
          <Text style={styles.value}>{job.pickupAddress}</Text>
          <Text style={styles.label}>Drop-off</Text>
          <Text style={styles.value}>{job.dropoffAddress}</Text>
          <Text style={styles.label}>Priority</Text>
          <Text style={styles.value}>{job.priority}</Text>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>{job.estimatedDuration}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <View style={styles.steps}>
            {steps.map((step, index) => (
              <View key={step} style={styles.stepRow}>
                <View style={[styles.dot, index <= currentStep && styles.dotActive]} />
                <Text style={[styles.stepLabel, index <= currentStep && styles.stepLabelActive]}>
                  {step.replace('_', ' ')}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {job.status === 'ACCEPTED' && (
          <TouchableOpacity style={styles.btn} onPress={() => updateJobStatus(job.id, 'PICKED_UP')}>
            <Text style={styles.btnText}>Confirm Pickup</Text>
          </TouchableOpacity>
        )}

        {job.status === 'PICKED_UP' && (
          <TouchableOpacity style={[styles.btn, styles.btnDeliver]} onPress={() => updateJobStatus(job.id, 'DELIVERED')}>
            <Text style={styles.btnText}>Confirm Delivery</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16, gap: 16 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 16, gap: 8 },
  heading: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  label: { fontSize: 12, color: '#999', textTransform: 'uppercase' },
  value: { fontSize: 15, color: '#333' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  steps: { gap: 12 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#ddd' },
  dotActive: { backgroundColor: '#2e7d32' },
  stepLabel: { fontSize: 14, color: '#999' },
  stepLabelActive: { color: '#2e7d32', fontWeight: '600' },
  btn: { backgroundColor: '#2e7d32', borderRadius: 10, padding: 16, alignItems: 'center' },
  btnDeliver: { backgroundColor: '#1565c0' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});