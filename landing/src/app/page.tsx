import { getApplicationStatus } from '@/lib/config';
import HomeClient from '@/components/HomeClient';

export default async function Home() {
  const isApplicationOpen = await getApplicationStatus();

  return <HomeClient isApplicationOpen={isApplicationOpen} />;
}
