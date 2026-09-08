import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const { login, register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok =
      mode === 'login'
        ? await login(form.email, form.password)
        : await register(form);
    if (ok) navigate('/shop');
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="bg-[#181A20] border border-[#2B2D3A] rounded-3xl p-8 space-y-6">
        <div className="flex gap-2 text-xs font-bold">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-xl transition ${mode === 'login' ? 'bg-neon-blue text-midnight' : 'bg-[#22252D] text-textMuted'}`}
          >
            Log In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-xl transition ${mode === 'register' ? 'bg-neon-blue text-midnight' : 'bg-[#22252D] text-textMuted'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-3">
              <input
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="bg-white text-midnight rounded-lg p-2.5 focus:outline-none"
              />
              <input
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="bg-white text-midnight rounded-lg p-2.5 focus:outline-none"
              />
            </div>
          )}
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-white text-midnight rounded-lg p-2.5 focus:outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full bg-white text-midnight rounded-lg p-2.5 focus:outline-none"
          />

          {error && <p className="text-red-400 text-[11px]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-neon-blue text-midnight font-black py-3 rounded-full transition disabled:opacity-50"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
