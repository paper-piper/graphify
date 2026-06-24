// Thin fetch wrapper shared by every API module.
window.GraphExplorer = window.GraphExplorer || {};

(function () {
  const cfg = () => GraphExplorer.config;

  function buildUrl(path, query) {
    const url = new URL(cfg().BASE_URL + path);
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
      }
    }
    return url.toString();
  }

  async function request(method, path, { body, query } = {}) {
    const res = await fetch(buildUrl(path, query), {
      method,
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const err = new Error(`${method} ${path} -> ${res.status}`);
      err.status = res.status;
      throw err;
    }
    if (res.status === 204) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  GraphExplorer.http = {
    request,
    get: (path, opts) => request('GET', path, opts),
    post: (path, opts) => request('POST', path, opts),
    del: (path, opts) => request('DELETE', path, opts),
  };
})();
