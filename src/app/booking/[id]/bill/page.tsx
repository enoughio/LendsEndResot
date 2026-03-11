'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'

function formatInr(value: number) {
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		maximumFractionDigits: 0,
	}).format(value)
}

export default function BookingDetailsPage() {
	const params = useParams<{ id: string }>()
	const bookingId = params?.id

	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [city, setCity] = useState('')
	const [specialRequest, setSpecialRequest] = useState('')
	const [loadingBill, setLoadingBill] = useState(true)
	const [billError, setBillError] = useState<string | null>(null)

	const [roomCharges, setRoomCharges] = useState(0)
	const [packageCharges, setPackageCharges] = useState(0)
	const [additionalActivities, setAdditionalActivities] = useState<Array<{ id: string; name: string; price: number }>>([])
	const [additionalActivitiesTotal, setAdditionalActivitiesTotal] = useState(0)
	const [subTotal, setSubTotal] = useState(0)
	const [tax, setTax] = useState(0)
	const [finalTotal, setFinalTotal] = useState(0)

	useEffect(() => {
		if (!bookingId) return

		const loadBill = async () => {
			try {
				setLoadingBill(true)
				setBillError(null)

				const res = await fetch(`/api/bookings/${bookingId}/bill`)
				const json = await res.json()
				
				if (!res.ok) {
					throw new Error(json?.error?.message || 'Failed to load bill')
				}
				console.log(res)

				const bill = json?.data
				setRoomCharges(Number(bill?.roomCharges || 0))
				setPackageCharges(Number(bill?.packageCharges || 0))
				setAdditionalActivities((bill?.additionalActivities || []).map((item: { id: string; name: string; price: number }) => ({
					id: item.id,
					name: item.name,
					price: Number(item.price || 0),
				})))
				setAdditionalActivitiesTotal(Number(bill?.additionalActivitiesAmount || 0))
				setSubTotal(Number(bill?.subTotal || 0))
				setTax(Number(bill?.taxAmount || 0))
				setFinalTotal(Number(bill?.totalAmount || 0))
			} catch (error) {
				setBillError(error instanceof Error ? error.message : 'Failed to load bill')
			} finally {
				setLoadingBill(false)
			}
		}

		void loadBill()
	}, [bookingId])

	const canPay = useMemo(() => {
		return Boolean(fullName.trim() && email.trim() && phone.trim())
	}, [fullName, email, phone])

	return (
		<main className="min-h-screen bg-slate-50 px-4 py-8 mt-10">
			<div className="mx-auto max-w-6xl">
				<h1 className="mb-6 text-2xl font-semibold text-slate-900">Guest Details & Final Bill</h1>

				<div className="grid gap-6 lg:grid-cols-2">
					<section className="rounded-xl border border-slate-200 bg-white p-6">
						<h2 className="mb-4 text-lg font-medium text-slate-900">Guest Form</h2>

						<div className="space-y-4">
							<div>
								<label className="mb-1 block text-sm text-slate-700">Full Name</label>
								<input
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									placeholder="Enter full name"
									className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-green-600"
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm text-slate-700">Email</label>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter email"
									className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-green-600"
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm text-slate-700">Phone</label>
								<input
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									placeholder="Enter phone"
									className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-green-600"
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm text-slate-700">City</label>
								<input
									value={city}
									onChange={(e) => setCity(e.target.value)}
									placeholder="Enter city"
									className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-green-600"
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm text-slate-700">Special Request</label>
								<textarea
									value={specialRequest}
									onChange={(e) => setSpecialRequest(e.target.value)}
									placeholder="Add any special request"
									className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-green-600"
								/>
							</div>
						</div>
					</section>

					<section className="rounded-xl border border-slate-200 bg-white p-6">
						<h2 className="mb-4 text-lg font-medium text-slate-900">Final Bill</h2>

						{loadingBill ? (
							<p className="text-slate-600">Loading bill...</p>
						) : billError ? (
							<p className="text-red-600">{billError}</p>
						) : (
						<div className="space-y-3">
							<div className="flex items-center justify-between text-slate-700">
								<span>Room Charges</span>
								<span>{formatInr(roomCharges)}</span>
							</div>

							{packageCharges > 0 && (
								<div className="flex items-center justify-between text-slate-700">
									<span>Package Charges</span>
									<span>{formatInr(packageCharges)}</span>
								</div>
							)}

							<div className="pt-1 text-sm text-slate-600">Additional Activities</div>
							{additionalActivities.map((item) => (
								<div key={item.id} className="flex items-center justify-between text-sm text-slate-700">
									<span>{item.name}</span>
									<span>{formatInr(item.price)}</span>
								</div>
							))}

							<div className="flex items-center justify-between text-slate-700">
								<span>Additional Activities Total</span>
								<span>{formatInr(additionalActivitiesTotal)}</span>
							</div>

							<div className="flex items-center justify-between text-slate-700">
								<span>Subtotal</span>
								<span>{formatInr(subTotal)}</span>
							</div>

							<div className="flex items-center justify-between text-slate-700">
								<span>Tax (18%)</span>
								<span>{formatInr(tax)}</span>
							</div>

							<div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-lg font-semibold text-slate-900">
								<span>Total</span>
								<span>{formatInr(finalTotal)}</span>
							</div>

							<button
								type="button"
								disabled={!canPay}
								className="mt-4 w-full rounded-md bg-green-600 py-3 text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
							>
								Pay
							</button>
						</div>
						)}
					</section>
				</div>
			</div>
		</main>
	)
}
