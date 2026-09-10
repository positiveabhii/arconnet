export const DEMO_SESSION_COOKIE = 'arcon_demo_session';

export const getDemoRole = () => {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookie = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${DEMO_SESSION_COOKIE}=`));

  const role = cookie?.split('=')[1];
  return role === 'user' || role === 'admin' ? role : null;
};

export const setDemoSession = (username) => {
  const role = username === 'admin' ? 'admin' : 'user';
  document.cookie = `${DEMO_SESSION_COOKIE}=${role}; Max-Age=1800; Path=/; SameSite=Lax`;
  localStorage.setItem('auth_user', username);
  localStorage.removeItem('demo_session');
};

export const clearDemoSession = () => {
  document.cookie = `${DEMO_SESSION_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
  document.cookie = 'demo_session=; Max-Age=0; Path=/; SameSite=Lax';
  localStorage.removeItem('auth_user');
  localStorage.removeItem('demo_session');
};