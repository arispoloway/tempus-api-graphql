import CachedByKeyResource from "./cached_by_key_resource";

class CachedResource extends CachedByKeyResource {
  constructor(loader, options = {}) {
    super(loader, { ...options, max: 1 });
  }

  load() {
    return super.load("0"); // Just use 0 as the cache key for everything
  }
}

export default CachedResource;
