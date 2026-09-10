import { cookies } from 'next/headers';
import App from '../src/App.jsx';

export default async function RouteApp({ initialPath = '/' }) {
  const cookieStore = await cookies();
  const role = cookieStore.get('arcon_demo_session')?.value;
  const initialRole = role === 'user' || role === 'admin' ? role : null;

  return <App initialRole={initialRole} initialPath={initialPath} />;
}
