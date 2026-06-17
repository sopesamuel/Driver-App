export type JobStatus = 'ACCEPTED' | 'PICKED_UP' | 'DELIVERED';

export type JobPriority = 'Standard' | 'Express' | 'Same-day';

export type Job = {
  id: string;
  pickupCity: string;
  pickupAddress: string;
  dropoffCity: string;
  dropoffAddress: string;
  priority: JobPriority;
  estimatedDuration: string;
  status: JobStatus;
};