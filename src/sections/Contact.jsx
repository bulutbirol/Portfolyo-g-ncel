import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useLanguage } from "../LanguageContext";
import { Reveal } from "../components/Reveal";
import { SectionLabel } from "../components/SectionLabel";
import { SplitText } from "../components/SplitText";
import { fadeUp, stagger } from "../motion";

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  return new Promise((resolve, reject) => {
    let script = document.querySelector(`script[src="${TURNSTILE_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = TURNSTILE_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => resolve(window.turnstile));
    script.addEventListener("error", reject);
  });
}

export default function Contact() {
  const { language, copy } = useLanguage();
  const text = copy.contact;
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [token, setToken] = useState("");
  const captchaRef = useRef(null);
  const widgetId = useRef(null);

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !captchaRef.current) return;
        widgetId.current = turnstile.render(captchaRef.current, {
          sitekey: SITE_KEY,
          theme: "dark",
          language,
          callback: (value) => {
            setToken(value);
            setErrors((p) => ({ ...p, captcha: "" }));
          },
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (widgetId.current !== null) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [language]);

  const resetCaptcha = () => {
    if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
    setToken("");
  };

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!form.fullName.trim()) {
      newErrors.fullName = "fullName";
    }

    if (!emailRegex.test(form.email)) {
      newErrors.email = "email";
    }

    if (form.message.trim().length < 10) {
      newErrors.message = "message";
    }

    if (SITE_KEY && !token) {
      newErrors.captcha = "captcha";
    }

    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error(text.fixFields, {
        position: "top-right",
        theme: "dark",
        autoClose: 2500,
      });
      return;
    }

    setIsSending(true);

    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken: token }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok || !data?.ok) {
        const msg = language === "en" && data?.error
          ? String(data.error)
          : text.messageFailed;
        toast.error(msg, {
          position: "top-right",
          theme: "dark",
          autoClose: 3000,
        });
        return;
      }

      toast.success(text.messageSent, {
        position: "top-right",
        theme: "dark",
        autoClose: 2500,
      });

      setForm({ fullName: "", email: "", message: "" });
      setErrors({});
    } catch {
      toast.error(text.serverError, {
        position: "top-right",
        theme: "dark",
        autoClose: 3000,
      });
    } finally {
      setIsSending(false);
      resetCaptcha();
    }
  };

  const field = (name) =>
    `w-full border-0 border-b bg-transparent px-0 py-3 text-lg text-white placeholder:text-mute outline-none transition-colors duration-300 focus:ring-0 ${
      errors[name] ? "border-red-400/70 focus:border-red-400" : "border-white/15 focus:border-white"
    }`;

  return (
    <Reveal as="section" id="contact" variants={stagger(0.1)} className="relative w-full scroll-mt-28 py-14 md:py-32">
      <SectionLabel index={4}>{copy.nav.contact}</SectionLabel>

      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <motion.h2 variants={fadeUp} className="text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-7xl">
          <SplitText text={text.heading} after={<span className="text-mute">.</span>} />
        </motion.h2>

        <motion.form variants={fadeUp} onSubmit={onSubmit} className="space-y-8">
          <div>
            <label htmlFor="contact-name" className="block font-mono text-xs uppercase tracking-[0.15em] text-fog">{text.fullName}</label>
            <input
              id="contact-name"
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              placeholder="Birol Bulut"
              required
              aria-invalid={errors.fullName ? true : undefined}
              className={field("fullName")}
            />
            {errors.fullName && <p className="mt-2 text-xs text-red-400">{text.errors[errors.fullName]}</p>}
          </div>

          <div>
            <label htmlFor="contact-email" className="block font-mono text-xs uppercase tracking-[0.15em] text-fog">{text.email}</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="birolblood@gmail.com"
              required
              aria-invalid={errors.email ? true : undefined}
              className={field("email")}
            />
            {errors.email && <p className="mt-2 text-xs text-red-400">{text.errors[errors.email]}</p>}
          </div>

          <div>
            <label htmlFor="contact-message" className="block font-mono text-xs uppercase tracking-[0.15em] text-fog">{text.message}</label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={onChange}
              rows={4}
              placeholder={text.messagePlaceholder}
              required
              aria-invalid={errors.message ? true : undefined}
              className={`${field("message")} min-h-[120px] max-h-[260px] resize-y`}
            />
            {errors.message && <p className="mt-2 text-xs text-red-400">{text.errors[errors.message]}</p>}
          </div>

          {SITE_KEY && (
            <div>
              <div ref={captchaRef} data-turnstile data-sitekey={SITE_KEY} className="min-h-[65px]" />
              {errors.captcha && <p className="mt-2 text-xs text-red-400">{text.errors.captcha}</p>}
            </div>
          )}

          <button
            type="submit"
            disabled={isSending}
            className={`group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.98] ${
              isSending ? "cursor-not-allowed opacity-60" : ""
            }`}
          >
            {isSending ? text.sending : text.send}
            <FiArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.form>
      </div>
    </Reveal>
  );
}
