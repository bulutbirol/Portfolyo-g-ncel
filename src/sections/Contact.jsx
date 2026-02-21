import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted fields.", {
        position: "top-right",
        theme: "dark",
        autoClose: 2500,
      });
      return;
    }

    toast.success("Message sent successfully!", {
      position: "top-right",
      theme: "dark",
      autoClose: 2500,
    });

    setForm({ fullName: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <section id="contact" className="pt-12 md:pt-20 flex justify-center">
      <ToastContainer />

      <div className="w-full max-w-3xl px-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-8 text-center">
          Let’s Talk
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.45)] p-8 md:p-10">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-white/70 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={onChange}
                placeholder="Birol Bulut"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:ring-2 focus:ring-purple-500/70"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="birolblood@gmail.com"
                required
                className={`w-full rounded-xl border ${
                  errors.email ? "border-red-500/70" : "border-white/10"
                } bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:ring-2 focus:ring-purple-500/70`}
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={4}
                placeholder="Describe your project scope, goals, and timeline..."
                required
                className={`w-full resize-y min-h-[110px] max-h-[260px] rounded-xl border ${
                  errors.message ? "border-red-500/70" : "border-white/10"
                } bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:ring-2 focus:ring-purple-500/70`}
              />
              {errors.message && (
                <p className="mt-2 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-xl 
                         bg-white/5 backdrop-blur-xl 
                         px-4 py-3.5 font-medium text-white/85 
                         transition-all duration-300
                         hover:bg-white/10 
                         border border-transparent hover:border-white/20
                         shadow-[0_14px_40px_rgba(0,0,0,0.35)]
                         active:scale-[0.99]"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="transition-all duration-300 group-hover:opacity-0">
                  Send
                </span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute h-5 w-5 stroke-white/90 
                             opacity-0 translate-x-[-20px] translate-y-[12px]
                             transition-all duration-300
                             group-hover:opacity-100 
                             group-hover:translate-x-0 
                             group-hover:translate-y-0"
                >
                  <path d="M22 2 11 13" />
                  <path d="M22 2 15 22 11 13 2 9 22 2Z" />
                </svg>
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}