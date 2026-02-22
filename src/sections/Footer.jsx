import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/bulutbirol",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/birol-bulut/",
      icon: FaLinkedinIn,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/bulutbiroll/",
      icon: FaInstagram,
    },
  ];

  return (
    <footer className="w-full px-6 pb-8 pt-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-end gap-6">
        
        <div />

        <div className="text-center text-sm text-white/60 tracking-wide">
          © 2026 Birol Bulut | All Rights Reserved.
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl 
                          bg-white/5 border border-white/10 
                          backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 grid place-items-center 
                             rounded-xl text-white/70 
                             transition-all duration-200 
                             hover:bg-white/10 hover:text-white"
                >
                  <Icon className="text-lg" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}