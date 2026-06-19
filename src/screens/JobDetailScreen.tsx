import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useJobStore } from '../store/jobstore';
import { RootStackParamList } from '../navigation';
import { colors, spacing, radius, fontSize, fontFamily } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'JobDetail'>;

const steps = ['ACCEPTED', 'PICKED_UP', 'DELIVERED'] as const;

export default function JobDetailScreen({ route }: Props) {
  const { jobId } = route.params;
  const myJobs = useJobStore((state) => state.myJobs);
  const availableJobs = useJobStore((state) => state.availableJobs);
  const updateJobStatus = useJobStore((state) => state.updateJobStatus);
  const isAvailable = availableJobs.some((j) => j.id === jobId);
  const acceptJob = useJobStore((state) => state.acceptJob);

  const job = [...myJobs, ...availableJobs].find((j) => j.id === jobId);
  console.log('current job status:', job?.status);

  if (!job) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.address}>Job not found</Text>
      </SafeAreaView>
    );
  }

  const currentStep = steps.indexOf(job.status);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.heading}>{job.pickupCity} → {job.dropoffCity}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color={colors.textMuted} />
            <View>
              <Text style={styles.label}>Pickup</Text>
              <Text style={styles.value}>{job.pickupAddress}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="flag-outline" size={18} color={colors.textMuted} />
            <View>
              <Text style={styles.label}>Drop-off</Text>
              <Text style={styles.value}>{job.dropoffAddress}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="pricetag-outline" size={18} color={colors.textMuted} />
            <View>
              <Text style={styles.label}>Priority</Text>
              <Text style={styles.value}>{job.priority}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color={colors.textMuted} />
            <View>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>{job.estimatedDuration}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <View style={styles.steps}>
            {steps.map((step, index) => (
              <View key={step} style={styles.stepRow}>
                <Ionicons
                  name={index <= currentStep ? 'checkmark-circle' : 'ellipse-outline'}
                  size={20}
                  color={index <= currentStep ? colors.success : colors.border}
                />
                <Text style={[styles.stepLabel, index <= currentStep && styles.stepLabelActive]}>
                  {step.replace('_', ' ')}
                </Text>
              </View>
            ))}
          </View>
        </View>

       {isAvailable && job.status === 'ACCEPTED' && (
        <TouchableOpacity style={styles.btn} onPress={() => acceptJob(job)}>
            <Text style={styles.btnText}>Accept Job</Text>
        </TouchableOpacity>
        )}

        {!isAvailable && job.status === 'ACCEPTED' && (
        <TouchableOpacity style={styles.btn} onPress={() => updateJobStatus(job.id, 'PICKED_UP')}>
            <Text style={styles.btnText}>Confirm Pickup</Text>
        </TouchableOpacity>
        )}

        {job.status === 'PICKED_UP' && (
          <TouchableOpacity style={styles.btn} onPress={() => updateJobStatus(job.id, 'DELIVERED')}>
            <Text style={styles.btnText}>Confirm Delivery</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  heading: { fontSize: fontSize.xl, fontFamily: fontFamily.bold, color: colors.text, marginBottom: spacing.xs },
  infoRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  label: { fontSize: fontSize.sm, fontFamily: fontFamily.regular, color: colors.textMuted, textTransform: 'uppercase' },
  value: { fontSize: fontSize.lg, fontFamily: fontFamily.regular, color: colors.text },
  sectionTitle: { fontSize: fontSize.lg, fontFamily: fontFamily.semibold, color: colors.text },
  steps: { gap: spacing.md },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  stepLabel: { fontSize: fontSize.md, fontFamily: fontFamily.regular, color: colors.textMuted },
  stepLabelActive: { color: colors.success, fontFamily: fontFamily.semibold },
  btn: { backgroundColor: colors.accent, borderRadius: radius.md, padding: spacing.lg, alignItems: 'center' },
  btnText: { color: colors.accentText, fontFamily: fontFamily.semibold, fontSize: fontSize.lg },
  address: { fontSize: fontSize.md, fontFamily: fontFamily.regular, color: colors.textMuted },
});