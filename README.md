# Chunithm Intl Profile Server

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm run start:dev
```

## Fetching Data from Chunithm-NET
```
javascript:(function(d,s){s=d.createElement('script');s.src='https://unpkg.com/chuni_intl_fetcher/index.min.js?%27+Date.now();d.getElementsByTagName(%27head%27)[0].appendChild(s);})(document);
```