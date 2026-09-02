import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const { register, error } = useAuthStore();
  const navigate = useNavigate();
  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value });
  const submit = async (e: React.FormEvent) => { e.preventDefault(); try { await register(form); navigate('/dashboard'); } catch { /* store exposes the error */ } };
  return <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12"><form onSubmit={submit} className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
    <h1 className="text-2xl font-bold">Create your account</h1><p className="mb-6 mt-2 text-sm text-slate-500">Join the Dev.Nexus26 learning community.</p>
    {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {(['name', 'email', 'password', 'confirmPassword'] as const).map((field) => <label key={field} className="mb-4 block text-sm font-medium capitalize">{field.replace('confirmPassword', 'confirm password')}<input required minLength={field.includes('password') ? 8 : undefined} type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'} value={form[field]} onChange={update(field)} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" /></label>)}
    <button className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white">Create account</button>
    <p className="mt-5 text-center text-sm text-slate-500">Already a member? <Link className="font-semibold text-blue-600" to="/login">Sign in</Link></p>
  </form></div>;
}
