export async function apiCall(
  url: string,
  options: { method?: string; body?: unknown } = {}
): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  try {
    const res = await fetch(url, {
      method: options.method ?? "GET",
      headers: options.body ? { "Content-Type": "application/json" } : undefined,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    let payload: Record<string, unknown> = {};
    try {
      payload = await res.json();
    } catch {
      /* empty body */
    }

    if (!res.ok) {
      if (res.status === 401) return { ok: false, error: "Session expired — log in again" };
      return {
        ok: false,
        error: (payload.error as string) ?? `Request failed (${res.status})`,
      };
    }

    return { ok: true, data: payload };
  } catch {
    return { ok: false, error: "Network error — check your connection" };
  }
}