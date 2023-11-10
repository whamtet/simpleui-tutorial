## SimpleUI Tutorial

### Development

For now we need advanced optimizations to clean out js that Cloudflare doesn't like.

#### Backend
```bash
npm i
clj -M:watch
npm run dev
```

#### Frontend
```bash
ls index.template.html | entr -s 'npm run format-watch'
npm run styles-watch
python -m http.server
```

### Deploy

#### Backend
```bash
clj -M:release
npm run deploy
```

#### Frontend
```bash
npm run format
npm run styles
```

Then upload to CDN (not automated yet).
