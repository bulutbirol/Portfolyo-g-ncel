# birolweb.dev

Birol Bulut's portfolio, built with React, Vite, and Tailwind CSS. ServiceFlow is the featured project.

## Local development

```bash
npm ci
npm run dev
```

Run `npm run lint` and `npm run build` before publishing. Vite writes the static site to `dist/`.

## Publish through cPanel or FTP

1. In the hosting panel, identify the **document root for `birolweb.dev`** and back up its current contents.
2. Upload the **contents of `dist/`** into that document root, so `index.html` and `assets/` are at its top level.
3. Replace older hashed files in `assets/` if desired. Keep the existing `cv.pdf` and `api/contact.php`: they are hosted separately and are **not** part of this repository or Vite's build output.
4. Check the home page, the ServiceFlow demo and source links, `/cv.pdf`, and the contact form on the live domain. The contact form submits to `/api/contact.php` and needs the existing PHP endpoint on the hosting server.

The built site uses root-relative asset paths and should be hosted at the domain root.
