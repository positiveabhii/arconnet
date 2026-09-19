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
        <Script src="https://demo.insurgeai.com/embed/insurgeai.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
