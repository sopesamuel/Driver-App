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

const statusStyles = {
  ACCEPTED: { bg: colors.successBg, text: colors.success },
  PICKED_UP: { bg: colors.warningBg, text: colors.warning },
  DELIVERED: { bg: colors.background, text: colors.textMuted },
};

function MyJobCard({ job }: { job: Job }) {
  const navigation = useNavigation<NavigationProp>();
  const statusStyle = statusStyles[job.status];

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}>
      <View style={styles.row}>
        <Text style={styles.city}>{job.pickupCity} → {job.dropoffCity}</Text>
        <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.badgeText, { color: statusStyle.text }]}>{job.status.replace('_', ' ')}</Text>
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
        contentContainerStyle={{ padding: spacing.lg }}
        renderItem={({ item }) => <MyJobCard job={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No active jobs</Text>}
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
  empty: { textAlign: 'center', marginTop: 40, color: colors.textMuted },
});