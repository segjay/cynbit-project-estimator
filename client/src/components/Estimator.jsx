import { useState } from "react";
import {services,URGENT_MULTIPLIER,URGENT_DAYS_MULTIPLIER} from "../data/pricing";
import LeadForm from "./LeadForm";

function Estimator() {
  const [serviceId, setServiceId] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);
  const [urgent, setUrgent] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const service = services.find((s) => s.id === serviceId);

  const toggleModule = (id) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter((m) => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
    setShowForm(false);
  };

  // ---- calculation ----
  let price = 0;
  let days = 0;
  let chosen = [];

  if (service) {
    chosen = service.modules.filter((m) => selectedModules.includes(m.id));
    price = service.basePrice;
    days = service.baseDays;

    chosen.forEach((m) => {
      price += m.price;
      days += m.days;
    });

    if (urgent) {
      price = price * URGENT_MULTIPLIER;
      days = Math.round(days * URGENT_DAYS_MULTIPLIER);
    }
  }

  const priceMin = Math.round(price * 0.9);
  const priceMax = Math.round(price * 1.1);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-lg sm:p-8">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Project Estimator
        </h2>
        <p className="mt-1 text-slate-500">
          Pick a service and see a rough cost before sharing any details.
        </p>

        <h3 className="mb-3 mt-8 text-xs font-bold uppercase tracking-widest text-teal-800">
          1. Choose a service
        </h3>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <button
              key={s.id}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${
                serviceId === s.id
                  ? "bg-teal-800 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              onClick={() => {
                setServiceId(s.id);
                setSelectedModules([]);
                setShowForm(false);
              }}
            >
              {s.name}
            </button>
          ))}
        </div>

        {service && (
          <div>
            <h3 className="mb-3 mt-8 text-xs font-bold uppercase tracking-widest text-teal-800">
              2. Pick what you need
            </h3>
            <div className="space-y-2">
              {service.modules.map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 ${
                    selectedModules.includes(m.id)
                      ? "border-teal-700 bg-teal-50"
                      : "border-slate-200"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-teal-800"
                      checked={selectedModules.includes(m.id)}
                      onChange={() => toggleModule(m.id)}
                    />
                    {m.name}
                  </span>
                  <span className="text-sm text-slate-500">
                    ₹{m.price.toLocaleString("en-IN")}
                  </span>
                </label>
              ))}
            </div>

            <h3 className="mb-3 mt-8 text-xs font-bold uppercase tracking-widest text-teal-800">
              3. Timeline
            </h3>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                className="h-4 w-4 accent-teal-800"
                checked={urgent}
                onChange={() => {
                  setUrgent(!urgent);
                  setShowForm(false);
                }}
              />
              Urgent delivery (+30% cost, about 30% faster)
            </label>

            <div className="mt-8 rounded-2xl bg-teal-800 p-5 text-white">
              <p className="text-xs uppercase tracking-widest text-teal-200">
                Estimated cost
              </p>
              <p className="mt-1 text-3xl font-extrabold">
                ₹{priceMin.toLocaleString("en-IN")} – ₹
                {priceMax.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-teal-100">
                Estimated time: about {days} days
              </p>
            </div>

            <button
              className="mt-4 w-full rounded-full bg-amber-700 px-5 py-3 font-bold text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={selectedModules.length === 0}
              onClick={() => setShowForm(true)}
            >
              Get a detailed quote
            </button>

            {showForm && selectedModules.length > 0 && (
              <LeadForm
                estimate={{
                  service: service.name,
                  modules: chosen.map((m) => m.name),
                  urgent: urgent,
                  priceMin: priceMin,
                  priceMax: priceMax,
                  days: days,
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Estimator;
