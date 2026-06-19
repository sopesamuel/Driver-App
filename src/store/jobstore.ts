import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '../types';
import { mockJobs } from '../data/mockJobs';

type JobStore = {
  availableJobs: Job[];
  myJobs: Job[];
  hasHydrated: boolean;
  acceptJob: (job: Job) => void;
  updateJobStatus: (jobId: string, status: Job['status']) => void;
};

export const useJobStore = create<JobStore>()(
  persist(
    (set) => ({
      availableJobs: mockJobs,
      myJobs: [],
      hasHydrated: false,

      acceptJob: (job) =>
        set((state) => ({
          availableJobs: state.availableJobs.filter((j) => j.id !== job.id),
          myJobs: [...state.myJobs, { ...job, status: 'ACCEPTED' }],
        })),

      updateJobStatus: (jobId, status) =>
        set((state) => ({
          myJobs: state.myJobs.map((j) => (j.id === jobId ? { ...j, status } : j)),
        })),
    }),
    {
      name: 'job-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.hasHydrated && (state.hasHydrated = true);
        if (state) state.hasHydrated = true;
      },
    }
  )
);