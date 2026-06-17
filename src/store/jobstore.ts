import { create } from 'zustand';
import { Job } from '../types';

type JobStore = {
  availableJobs: Job[];
  myJobs: Job[];
  acceptJob: (job: Job) => void;
  updateJobStatus: (jobId: string, status: Job['status']) => void;
};

export const useJobStore = create<JobStore>((set) => ({
  availableJobs: [],
  myJobs: [],

  acceptJob: (job) =>
    set((state) => ({
      availableJobs: state.availableJobs.filter((j) => j.id !== job.id),
      myJobs: [...state.myJobs, { ...job, status: 'ACCEPTED' }],
    })),

  updateJobStatus: (jobId, status) =>
    set((state) => ({
      myJobs: state.myJobs.map((j) => (j.id === jobId ? { ...j, status } : j)),
    })),
}));