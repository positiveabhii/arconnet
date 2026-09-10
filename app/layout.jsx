import '../src/index.css';

export const metadata = {
  title: 'Workspace',
  description: 'Arcon workspace'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
