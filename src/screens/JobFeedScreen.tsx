import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useJobStore } from '../store/jobstore';
import { RootStackParamList } from '../navigation';
import { Job } from '../types';
import { colors, spacing, radius, fontSize, fontFamily } from '../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const priorityStyles = {
  Standard: { bg: colors.background, text: colors.textMuted },
  Express: { bg: colors.warningBg, text: colors.warning },
  'Same-day': { bg: colors.dangerBg, text: colors.danger },
};

function JobCard({ job }: { job: Job }) {
  const navigation = useNavigation<NavigationProp>();
  const acceptJob = useJobStore((state) => state.acceptJob);
  const priorityStyle = priorityStyles[job.priority];

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}>
      <View style={styles.row}>
        <Text style={styles.city}>{job.pickupCity} → {job.dropoffCity}</Text>
        <View style={[styles.badge, { backgroundColor: priorityStyle.bg }]}>
          <Text style={[styles.badgeText, { color: priorityStyle.text }]}>{job.priority}</Text>
        </View>
      </View>

      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={16} color={colors.textMuted} />
        <Text style={styles.address}>{job.pickupAddress}</Text>
      </View>
      <View style={styles.locationRow}>
        <Ionicons name="flag-outline" size={16} color={colors.textMuted} />
        <Text style={styles.address}>{job.dropoffAddress}</Text>
      </View>

      <View style={styles.locationRow}>
        <Ionicons name="time-outline" size={16} color={colors.textMuted} />
        <Text style={styles.duration}>{job.estimatedDuration}</Text>
      </View>

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
        contentContainerStyle={{ padding: spacing.lg }}
        renderItem={({ item }) => <JobCard job={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No available jobs</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.xs,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs },
  city: { fontSize: fontSize.xl, fontFamily: fontFamily.bold, color: colors.text },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  address: { fontSize: fontSize.md, fontFamily: fontFamily.regular, color: colors.textMuted },
  duration: { fontSize: fontSize.md, fontFamily: fontFamily.regular, color: colors.textMuted },
  badge: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.sm },
  badgeText: { fontSize: fontSize.sm, fontFamily: fontFamily.semibold },
  acceptBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  acceptText: { color: colors.accentText, fontFamily: fontFamily.semibold, fontSize: fontSize.md },
  empty: { textAlign: 'center', marginTop: 40, color: colors.textMuted },
});