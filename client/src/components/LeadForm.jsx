import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function LeadForm({ estimate }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    companySize: "",
    brief: "",
    consent: false,
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.trim() === "") {
      setError("Please enter your name");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!form.consent) {
      setError("Please accept the terms");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...estimate }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch (err) {
      setError("Could not send your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-700";

  if (submitted) {
    return (
      <p className="mt-6 rounded-2xl bg-teal-50 p-5 font-semibold text-teal-800">
        Thank you! Cynbit will contact you within 24 hours.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-5"
    >
      <h3 className="text-xl font-extrabold text-slate-900">
        Get a detailed quote
      </h3>

      <input
        className={inputClass}
        name="name"
        placeholder="Full name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        className={inputClass}
        name="email"
        placeholder="Work email"
        value={form.email}
        onChange={handleChange}
      />

      <select
        className={inputClass}
        name="companySize"
        value={form.companySize}
        onChange={handleChange}
      >
        <option value="">Company size</option>
        <option value="1-10">1-10</option>
        <option value="11-50">11-50</option>
        <option value="51-200">51-200</option>
        <option value="200+">200+</option>
      </select>

      <textarea
        className={`${inputClass} h-28`}
        name="brief"
        placeholder="Project brief"
        value={form.brief}
        onChange={handleChange}
      />

      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 h-4 w-4 accent-teal-800"
          checked={form.consent}
          onChange={handleChange}
        />
        I agree to the Terms and authorize Cynbit to process my data
      </label>

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-teal-800 px-5 py-3 font-bold text-white hover:bg-teal-700 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Submit request"}
      </button>
    </form>
  );
}

export default LeadForm;