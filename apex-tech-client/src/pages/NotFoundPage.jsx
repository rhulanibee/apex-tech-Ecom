import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-4">
      <h1 className="text-4xl font-black text-white">404</h1>
      <p className="text-sm text-textMuted">This page doesn&apos;t exist.</p>
      <Link to="/" className="inline-block bg-white text-midnight font-black px-6 py-3 rounded-full text-xs">
        Back to Home
      </Link>
    </div>
  );
}
