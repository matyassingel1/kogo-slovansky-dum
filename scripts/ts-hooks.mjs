// Umožní spouštět datové soubory webu (TypeScript) přímo v Node: doplní
// příponu .ts k importům bez přípony a JSON načte jako modul.
export async function resolve(spec, ctx, next) {
  if (/^\.\.?\//.test(spec) && !/\.[a-z]+$/i.test(spec)) {
    try { return await next(spec + '.ts', ctx); } catch {}
  }
  return next(spec, ctx);
}
export async function load(url, ctx, next) {
  if (url.endsWith('.json')) return next(url, { ...ctx, importAttributes: { type: 'json' } });
  return next(url, ctx);
}
