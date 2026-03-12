'use client';

import { FormEvent, ReactNode, useEffect, useState } from 'react';

type Stage = 'email' | 'otp';

export default function AdminLayout({ children }: { children: ReactNode }) {
	const [checking, setChecking] = useState(true);
	const [authenticated, setAuthenticated] = useState(false);
	const [stage, setStage] = useState<Stage>('email');
	const [email, setEmail] = useState('');
	const [otp, setOtp] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await fetch('/api/admin/auth/me');
				const json = await res.json();
				setAuthenticated(Boolean(json?.data?.authenticated));
			} finally {
				setChecking(false);
			}
		};

		void checkAuth();
	}, []);

	const requestOtp = async (event: FormEvent) => {
		event.preventDefault();
		try {
			setLoading(true);
			setError(null);

			const res = await fetch('/api/admin/auth/request-otp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});

			const json = await res.json();
			if (!res.ok) {
				throw new Error(json?.error?.message || 'Failed to send OTP.');
			}

			setStage('otp');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to send OTP.');
		} finally {
			setLoading(false);
		}
	};

	const verifyOtp = async (event: FormEvent) => {
		event.preventDefault();
		try {
			setLoading(true);
			setError(null);

			const res = await fetch('/api/admin/auth/verify-otp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, otp }),
			});

			const json = await res.json();
			if (!res.ok) {
				throw new Error(json?.error?.message || 'Invalid OTP.');
			}

			setAuthenticated(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Invalid OTP.');
		} finally {
			setLoading(false);
		}
	};

	if (checking) {
		return <div className="min-h-screen flex items-center justify-center">Checking admin session...</div>;
	}

	if (!authenticated) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
				<div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-6">
					<h1 className="text-2xl font-semibold text-slate-900 mb-2">Admin Login</h1>
					<p className="text-slate-600 mb-6">Sign in with your admin email and OTP.</p>

					{stage === 'email' ? (
						<form onSubmit={requestOtp} className="space-y-4">
							<div>
								<label className="block text-sm text-slate-700 mb-1">Admin Email</label>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full rounded-md border border-slate-300 px-3 py-2"
									placeholder="admin@example.com"
									required
								/>
							</div>
							{error && <p className="text-sm text-red-600">{error}</p>}
							<button
								type="submit"
								disabled={loading}
								className="w-full rounded-md bg-slate-900 text-white py-2.5 disabled:opacity-60"
							>
								{loading ? 'Sending OTP...' : 'Send OTP'}
							</button>
						</form>
					) : (
						<form onSubmit={verifyOtp} className="space-y-4">
							<p className="text-sm text-slate-600">OTP sent to {email}</p>
							<div>
								<label className="block text-sm text-slate-700 mb-1">OTP</label>
								<input
									type="text"
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
									className="w-full rounded-md border border-slate-300 px-3 py-2"
									placeholder="6 digit code"
									required
								/>
							</div>
							{error && <p className="text-sm text-red-600">{error}</p>}
							<button
								type="submit"
								disabled={loading}
								className="w-full rounded-md bg-slate-900 text-white py-2.5 disabled:opacity-60"
							>
								{loading ? 'Verifying...' : 'Verify OTP'}
							</button>
							<button
								type="button"
								onClick={() => setStage('email')}
								className="w-full rounded-md border border-slate-300 text-slate-700 py-2.5"
							>
								Change Email
							</button>
						</form>
					)}
				</div>
			</div>
		);
	}

	return <>{children}</>;
}
