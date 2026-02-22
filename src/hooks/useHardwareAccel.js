import { useEffect, useMemo, useState } from "react";
import { getGPUTier } from "@pmndrs/detect-gpu";
import { toast } from "react-toastify";

export function useHardwareAccel({ toastKey = "hw_accel_toast_v1" } = {}) {
  const [hwAccel, setHwAccel] = useState(true);

  const canUseWebGL = useMemo(() => {
    if (typeof window === "undefined") return false;
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl") || c.getContext("experimental-webgl") || c.getContext("webgl2"));
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!canUseWebGL) {
        if (!cancelled) setHwAccel(false);
        return;
      }

      try {
        const r = await getGPUTier({ failIfMajorPerformanceCaveat: true });
        if (cancelled) return;
        setHwAccel((r?.tier ?? 0) > 0);
      } catch {
        if (!cancelled) setHwAccel(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [canUseWebGL]);

  useEffect(() => {
    if (hwAccel) return;
    try {
      if (localStorage.getItem(toastKey)) return;
      localStorage.setItem(toastKey, "1");
    } catch { /* empty */ }

    toast.info(
      "En iyi deneyim için tarayıcınızda Donanım Hızlandırma’yı aktif edin. Chrome: Ayarlar > Sistem > “Kullanılabiliyorsa donanım hızlandırmayı kullan” > Açın ve yeniden başlatın.",
      { autoClose: 9000 }
    );
  }, [hwAccel, toastKey]);

  return { hwAccel };
}