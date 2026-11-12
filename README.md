# birolweb.dev

Birol Bulut's portfolio, built with React, Vite, and Tailwind CSS. ServiceFlow is the featured project.

## Local development

```bash
npm ci
npm run dev
```

Run `npm run lint` and `npm run build` before publishing. Vite writes the static site to `dist/`.

`npm test` checks the built output in `dist/`, so run `npm run build` first.

## Publish through cPanel or FTP

1. In the hosting panel, identify the **document root for `birolweb.dev`** and back up its current contents.
2. Upload the **contents of `dist/`** into that document root, so `index.html` and `assets/` are at its top level.
3. The CV ships with the build: `public/cv.pdf` is copied to `dist/cv.pdf`. To update it, replace `public/cv.pdf` and rebuild. Keep the existing `api/contact.php` on the server.
4. Check the home page, the ServiceFlow demo and source links, `/cv.pdf`, and the contact form on the live domain. The contact form submits to `/api/contact.php` and needs the existing PHP endpoint on the hosting server.

The built site uses root-relative asset paths and should be hosted at the domain root.
