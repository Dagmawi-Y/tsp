import { getApplicationStatus } from '@/lib/config';
import ApplyClient from '@/components/ApplyClient';

export default async function ApplyPage() {
  const isApplicationOpen = await getApplicationStatus();

  return <ApplyClient isApplicationOpen={isApplicationOpen} />;
}
