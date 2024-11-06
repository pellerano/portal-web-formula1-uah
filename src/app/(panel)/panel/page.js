import AdminPanel from './panels/AdminPanel';
import TeamLeadPanel from './panels/TeamLeadPanel';

export default function Panel() {
  const userRole = 'admin';

  return <>{userRole === 'admin' ? <AdminPanel /> : <TeamLeadPanel />}</>;
}
