import '../src/index.css';
import Script from 'next/script';

export const metadata = {
  title: 'Workspace',
  description: 'Arcon workspace'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://api.insurgeai.com/static/browser-control-helper.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
