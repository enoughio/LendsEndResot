"use client";

import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const WorkWithUsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/work-with-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to send your message.");
      }

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", position: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send your message right now.";
      setSubmitError(message);
      if (process.env.NODE_ENV === "development") console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="space-y-4 rounded-md border border-green-200 bg-green-50 p-6">
        <h3 className="text-xl font-semibold text-green-800">Application sent</h3>
        <p className="text-green-700">Thanks for your interest. We&apos;ll review and contact you soon.</p>
        <button onClick={() => setSubmitSuccess(false)} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name *" className={`w-full px-4 py-3 bg-white border-2 rounded-md focus:outline-none focus:border-green-600 transition-colors ${errors.name ? "border-red-500" : "border-gray-300"}`} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Your Email *" className={`w-full px-4 py-3 bg-white border-2 rounded-md focus:outline-none focus:border-green-600 transition-colors ${errors.email ? "border-red-500" : "border-gray-300"}`} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone *" className={`w-full px-4 py-3 bg-white border-2 rounded-md focus:outline-none focus:border-green-600 transition-colors ${errors.phone ? "border-red-500" : "border-gray-300"}`} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <input name="position" value={formData.position} onChange={handleChange} placeholder="Position you&apos;re interested in (optional)" className="w-full px-4 py-3 bg-white border-2 rounded-md focus:outline-none focus:border-green-600 transition-colors border-gray-300" />
      </div>

      <div>
        <textarea name="message" value={formData.message} onChange={handleChange} rows={6} placeholder="Tell us about yourself *" className={`w-full px-4 py-3 bg-white border-2 rounded-md focus:outline-none focus:border-green-600 transition-colors resize-none ${errors.message ? "border-red-500" : "border-gray-300"}`} />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-12 py-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? "Sending..." : "Send Application"}
        </button>
      </div>

      {submitError && <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">{submitError}</div>}
    </form>
  );
};

export default WorkWithUsForm;
