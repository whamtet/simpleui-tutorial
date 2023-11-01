## SimpleUI Cloudflare

### Development

For now we need advanced optimizations to clean out js that Cloudflare doesn't like.

```bash
clj -M:watch
npm run dev
```

### Deploy

```bash
clj -M:release
npm run deploy
```
