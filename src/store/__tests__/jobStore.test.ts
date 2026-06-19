import { useJobStore } from '../jobstore';
import { mockJobs } from '../../data/mockJobs';

describe('jobStore', () => {
  beforeEach(() => {
    useJobStore.setState({ availableJobs: mockJobs, myJobs: [] });
  });

  it('moves a job from availableJobs to myJobs when accepted', () => {
    const job = mockJobs[0];

    useJobStore.getState().acceptJob(job);

    const state = useJobStore.getState();
    const stillAvailable = state.availableJobs.some((j) => j.id === job.id);
    const nowInMyJobs = state.myJobs.some((j) => j.id === job.id);

    expect(stillAvailable).toBe(false);
    expect(nowInMyJobs).toBe(true);
  });

  it('updates job status correctly', () => {
  const job = mockJobs[0];
  useJobStore.getState().acceptJob(job);

  useJobStore.getState().updateJobStatus(job.id, 'PICKED_UP');

  const state = useJobStore.getState();
  const updatedJob = state.myJobs.find((j) => j.id === job.id);

  expect(updatedJob?.status).toBe('PICKED_UP');
});
});