import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import { useLanguage } from "../LanguageContext";
import { Reveal } from "../components/Reveal";
import { Spotlight } from "../components/Spotlight";
import { SplitText } from "../components/SplitText";
import { ease, fadeUp, stagger } from "../motion";

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LAST = 3;
const EMPTY = { needs: [], when: "", fullName: "", email: "", message: "" };

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

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir * 48, filter: "blur(6px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (dir) => ({ opacity: 0, x: dir * -48, filter: "blur(6px)" }),
};

function Choice({ active, multi, onClick, children }) {
  return (
    <motion.button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={active}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-base transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        active ? "border-ember bg-ember/10 text-white" : "border-white/10 bg-white/[0.02] text-fog hover:border-white/25 hover:text-white"
      }`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`grid h-5 w-5 shrink-0 place-items-center border transition-colors duration-300 ${multi ? "rounded-md" : "rounded-full"} ${
          active ? "border-ember bg-ember text-ink" : "border-white/20"
        }`}
      >
        <AnimatePresence>
          {active && (
            <motion.span initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
              <FiCheck className="h-3.5 w-3.5" strokeWidth={3} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

// Builds up line by line while the visitor answers, like a draft of the message they are sending.
function Preview({ text, form }) {
  const lines = [
    form.needs.length > 0 && { key: "need", label: text.summaryNeed, value: form.needs.join(", ") },
    form.when && { key: "when", label: text.summaryWhen, value: form.when },
    form.fullName.trim() && { key: "name", label: text.fullName, value: form.fullName.trim() },
    form.email.trim() && { key: "email", label: text.email, value: form.email.trim() },
    form.message.trim() && { key: "msg", label: text.message, value: form.message.trim() },
  ].filter(Boolean);

  return (
    <Spotlight className="mt-12 hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 lg:block" aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <span className="h-2 w-2 rounded-full bg-ember" />
        <span className="text-sm font-medium text-white">{text.previewTitle}</span>
      </div>
      <motion.div layout className="space-y-3 pt-4 text-sm">
        <AnimatePresence initial={false} mode="popLayout">
          {lines.length === 0 ? (
            <motion.p key="empty" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-mute">
              {text.previewEmpty}
            </motion.p>
          ) : (
            lines.map((l) => (
              <motion.div
                key={l.key}
                layout
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
                className="grid grid-cols-[6.5rem_1fr] gap-3"
              >
                <span className="text-mute">{l.label}</span>
                <span className="line-clamp-3 break-words text-white">{l.value}</span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
        <motion.span layout className="inline-block h-4 w-[2px] animate-pulse bg-ember align-middle" />
      </motion.div>
    </Spotlight>
  );
}

function Sent({ text, name, onAgain }) {
  return (
    <motion.div
      key="sent"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease }}
      className="flex min-h-[420px] flex-col items-start justify-center"
      role="status"
    >
      <div className="relative mb-8 grid h-16 w-16 place-items-center">
        <motion.span
          className="absolute inset-0 rounded-full border border-ember"
          initial={{ scale: 0.6, opacity: 1 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
        <motion.span className="absolute inset-0 rounded-full bg-ember" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} />
        <svg viewBox="0 0 24 24" className="relative h-7 w-7 text-ink" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.25, ease }} />
        </svg>
      </div>
      <h3 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{text.thanks.replace("{name}", name)}</h3>
      <p className="mt-4 max-w-sm text-lg text-fog">{text.thanksText}</p>
      <button
        type="button"
        onClick={onAgain}
        className="mt-10 text-sm font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {text.again}
      </button>
    </motion.div>
  );
}

export default function Contact() {
  const { language, copy } = useLanguage();
  const text = copy.contact;
  const [form, setForm] = useState(EMPTY);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [sentTo, setSentTo] = useState("");
  const [token, setToken] = useState("");
  const captchaRef = useRef(null);
  const widgetId = useRef(null);
  const stepRef = useRef(null);
  const moved = useRef(false);
  const advanceTimer = useRef(null);

  const onLast = step === LAST && !sentTo;

  // The widget lives only on the last step, so it renders when that step mounts.
  useEffect(() => {
    if (!SITE_KEY || !onLast) return;
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
      setToken("");
    };
  }, [language, onLast]);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  // Answers are stored in the visitor's language, so switching it clears the choice lists.
  useEffect(() => {
    setForm((p) => ({ ...p, needs: [], when: "" }));
  }, [language]);

  const validateStep = (s) => {
    const e = {};
    if (s === 0 && form.needs.length === 0) e.need = "need";
    if (s === 1 && !form.when) e.when = "when";
    if (s === 2) {
      if (!form.fullName.trim()) e.fullName = "fullName";
      if (!EMAIL_RE.test(form.email.trim())) e.email = "email";
    }
    if (s === LAST && SITE_KEY && !token) e.captcha = "captcha";
    return e;
  };

  const go = (to) => {
    moved.current = true;
    setDir(to > step ? 1 : -1);
    setErrors({});
    setStep(to);
  };

  const next = () => {
    const e = validateStep(step);
    if (Object.keys(e).length) return setErrors(e);
    go(step + 1);
  };

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const toggleNeed = (value) => {
    setForm((p) => ({ ...p, needs: p.needs.includes(value) ? p.needs.filter((n) => n !== value) : [...p.needs, value] }));
    setErrors({});
  };

  const pickWhen = (value) => {
    setForm((p) => ({ ...p, when: value }));
    setErrors({});
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => go(2), 320);
  };

  const send = async () => {
    const e = validateStep(LAST);
    if (Object.keys(e).length) return setErrors(e);

    setIsSending(true);
    // contact.php only knows name, email and message, so the answers ride along at the top of the message.
    const summary = `${text.summaryNeed}: ${form.needs.join(", ")}\n${text.summaryWhen}: ${form.when}`;
    const message = form.message.trim() ? `${summary}\n\n${form.message.trim()}` : summary;

    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: form.fullName.trim(), email: form.email.trim(), message, turnstileToken: token }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok || !data?.ok) {
        const msg = language === "en" && data?.error ? String(data.error) : text.messageFailed;
        toast.error(msg, { position: "top-right", theme: "dark", autoClose: 3000 });
        if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
        setToken("");
        return;
      }

      setSentTo(form.fullName.trim().split(/\s+/)[0]);
    } catch {
      toast.error(text.serverError, { position: "top-right", theme: "dark", autoClose: 3000 });
      if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
      setToken("");
    } finally {
      setIsSending(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isSending) return;
    if (step < LAST) next();
    else send();
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setSentTo("");
    setDir(-1);
    setStep(0);
  };

  const focusStep = () => {
    if (!moved.current) return;
    moved.current = false;
    stepRef.current?.querySelector("input, textarea, button")?.focus({ preventScroll: true });
  };

  const field = (name) =>
    `w-full border-0 border-b bg-transparent px-0 py-3 text-xl text-white placeholder:text-mute outline-none transition-colors duration-300 focus:ring-0 ${
      errors[name] ? "border-red-400/70 focus:border-red-400" : "border-white/15 focus:border-ember"
    }`;

  const error = (key) => errors[key] && <p className="mt-3 text-sm text-red-400">{text.errors[key]}</p>;

  const question = (id, label, hint) => (
    <div className="mb-8">
      <h3 id={id} className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">{label}</h3>
      {hint && <p className="mt-2 text-sm text-mute">{hint}</p>}
    </div>
  );

  const steps = [
    <div key="need">
      {question("contact-need", text.needQuestion, text.needHint)}
      <div role="group" aria-labelledby="contact-need" className="grid gap-3 sm:grid-cols-2">
        {text.needs.map((n) => (
          <Choice key={n} multi active={form.needs.includes(n)} onClick={() => toggleNeed(n)}>{n}</Choice>
        ))}
      </div>
      {error("need")}
    </div>,
    <div key="when">
      {question("contact-when", text.whenQuestion)}
      <div role="radiogroup" aria-labelledby="contact-when" className="grid gap-3">
        {text.whens.map((w) => (
          <Choice key={w} active={form.when === w} onClick={() => pickWhen(w)}>{w}</Choice>
        ))}
      </div>
      {error("when")}
    </div>,
    <div key="contact" className="space-y-8">
      {question("contact-reach", text.contactQuestion)}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-fog">{text.fullName}</label>
        <input id="contact-name" type="text" name="fullName" autoComplete="name" value={form.fullName} onChange={onChange} placeholder={text.namePlaceholder} aria-invalid={errors.fullName ? true : undefined} className={field("fullName")} />
        {error("fullName")}
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-fog">{text.email}</label>
        <input id="contact-email" type="email" name="email" autoComplete="email" value={form.email} onChange={onChange} placeholder={text.emailPlaceholder} aria-invalid={errors.email ? true : undefined} className={field("email")} />
        {error("email")}
      </div>
    </div>,
    <div key="details">
      {question("contact-details", text.detailsQuestion)}
      <label htmlFor="contact-message" className="block text-sm font-medium text-fog">
        {text.message} <span className="text-mute">· {text.optional}</span>
      </label>
      <textarea id="contact-message" name="message" value={form.message} onChange={onChange} rows={4} placeholder={text.messagePlaceholder} className={`${field("message")} min-h-[120px] max-h-[260px] resize-y`} />
    </div>,
  ];

  return (
    <Reveal as="section" id="contact" variants={stagger(0.1)} className="relative w-full scroll-mt-28 py-14 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <motion.div variants={fadeUp}>
          <h2 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white md:text-7xl">
            <SplitText text={text.heading} after={<span className="text-ember">.</span>} />
          </h2>
          <Preview text={text} form={form} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <AnimatePresence mode="wait" initial={false}>
            {sentTo ? (
              <Sent key="sent" text={text} name={sentTo} onAgain={reset} />
            ) : (
              <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }} transition={{ duration: 0.35, ease }}>
                <div className="mb-10">
                  <div className="flex gap-1.5" aria-hidden="true">
                    {text.steps.map((s, i) => (
                      <div key={s} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                        <motion.div className="h-full origin-left bg-ember" initial={false} animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ duration: 0.6, ease }} />
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 flex justify-between font-mono text-xs uppercase tracking-[0.15em] text-mute" aria-live="polite">
                    <span className="sr-only">{text.stepOf.replace("{n}", step + 1).replace("{total}", LAST + 1)}</span>
                    <span aria-hidden="true">{String(step + 1).padStart(2, "0")} / {String(LAST + 1).padStart(2, "0")}</span>
                    <span>{text.steps[step]}</span>
                  </p>
                </div>

                <div className="relative -mx-1 min-h-[300px] overflow-hidden px-1 pb-1">
                  <AnimatePresence mode="wait" custom={dir} initial={false}>
                    <motion.div
                      key={step}
                      ref={stepRef}
                      custom={dir}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease }}
                      onAnimationComplete={(def) => def === "center" && focusStep()}
                    >
                      {steps[step]}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {onLast && SITE_KEY && (
                  <div className="mt-6">
                    <div ref={captchaRef} className="min-h-[65px]" />
                    {error("captcha")}
                  </div>
                )}

                <div className="mt-10 flex items-center justify-between gap-4">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => go(step - 1)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-fog transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      <FiArrowLeft aria-hidden="true" />
                      {text.back}
                    </button>
                  ) : (
                    <span />
                  )}
                  <motion.button
                    type="submit"
                    disabled={isSending}
                    whileTap={{ scale: 0.97 }}
                    className={`group inline-flex items-center gap-3 rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-ink shadow-[0_0_40px_-8px] shadow-ember/60 transition hover:bg-ember/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                      isSending ? "cursor-not-allowed opacity-60" : ""
                    }`}
                  >
                    {step < LAST ? text.next : isSending ? text.sending : text.send}
                    <FiArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Reveal>
  );
}
