import { Job } from '../types';

export const mockJobs : Job[] = [
  {
    id: '1',
    pickupCity: 'Hamburg',
    pickupAddress: 'Speicherstadt 1, 20457',
    dropoffCity: 'Berlin',
    dropoffAddress: 'Alexanderplatz 5, 10178',
    priority: 'Express',
    estimatedDuration: '2h 30min',
    status: 'ACCEPTED',
  },
  {
    id: '2',
    pickupCity: 'Munich',
    pickupAddress: 'Marienplatz 1, 80331',
    dropoffCity: 'Frankfurt',
    dropoffAddress: 'Römerberg 10, 60311',
    priority: 'Standard',
    estimatedDuration: '3h 15min',
    status: 'ACCEPTED',
  },
  {
    id: '3',
    pickupCity: 'Cologne',
    pickupAddress: 'Domplatz 4, 50667',
    dropoffCity: 'Düsseldorf',
    dropoffAddress: 'Königsallee 20, 40212',
    priority: 'Same-day',
    estimatedDuration: '45min',
    status: 'ACCEPTED',
  },
];