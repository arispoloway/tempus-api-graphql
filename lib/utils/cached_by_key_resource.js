import LRU from "lru-cache";

class CachedByKeyResource {
  constructor(loader, options = {}) {
    const timeout = options.timeout || 60;
    const max = options.max || 100;

    this.loader = loader;
    this.keyFunc = options.keyFunc || ((x) => JSON.stringify(x));

    // insired by https://spin.atomicobject.com/2018/09/10/javascript-concurrency/
    // My knowledge of JS's runtime is not good enough to fully vet this, but seems reasonable ish
    // Also I don't really need concurrency guarantees for this project anyway
    this.inFlight = {};
    this.cache = new LRU({ max, maxAge: timeout * 1000 });
  }

  set(item, value) {
    this.cache.set(this.keyFunc(item), value);
  }

  async load(item) {
    if (item === null) return null;
    const key = this.keyFunc(item);

    const { inFlight } = this;

    if (!inFlight[key]) {
      inFlight[key] = (async () => {
        try {
          const cached = this.cache.get(key);

          if (cached) {
            // Something with the inFlight delete doesn't work without awaiting in here
            // I know it's dumb, I'll figure out the reason later
            return await (async () => cached)();
          }

          const r = await this.loader(item);
          this.cache.set(key, r);
          return r;
        } finally {
          delete inFlight[key];
        }
      })();
    }

    return inFlight[key];
  }

  clearCache() {
    this.cache.reset();
  }
}

export default CachedByKeyResource;
