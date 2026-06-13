import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getDb(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  const db = (env as Record<string, unknown>).DB as D1Database | undefined;
  if (!db) throw new Error("D1 database binding not available");
  return db;
}

export async function getR2(): Promise<R2Bucket> {
  const { env } = await getCloudflareContext({ async: true });
  const bucket = (env as Record<string, unknown>).FILES as R2Bucket | undefined;
  if (!bucket) throw new Error("R2 bucket binding not available");
  return bucket;
}
