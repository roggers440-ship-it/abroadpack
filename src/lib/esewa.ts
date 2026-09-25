import crypto from "crypto";
import { BASE_URL } from "@/lib/site";

const SECRET = process.env.ESEWA_SECRET!;
export const PRODUCT_CODE = process.env.ESEWA_PRODUCT_CODE!;
export const ESEWA_URL = process.env.ESEWA_URL!;

export function sign(message: string) {
  return crypto.createHmac("sha256", SECRET).update(message).digest("base64");
}

export function paymentFields(opts: { totalRupees: string; uuid: string }) {
  const signed = "total_amount,transaction_uuid,product_code";
  const message = `total_amount=${opts.totalRupees},transaction_uuid=${opts.uuid},product_code=${PRODUCT_CODE}`;
  const base = BASE_URL;

  return {
    amount: opts.totalRupees,
    tax_amount: "0",
    total_amount: opts.totalRupees,
    transaction_uuid: opts.uuid,
    product_code: PRODUCT_CODE,
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: `${base}/api/payments/esewa/callback`,
    failure_url: `${base}/api/payments/esewa/failed`,
    signed_field_names: signed,
    signature: sign(message),
  };
}

export function verifyCallback(encoded: string) {
  const data = JSON.parse(Buffer.from(encoded, "base64").toString("utf-8"));
  const message = String(data.signed_field_names)
    .split(",")
    .map((f) => `${f}=${data[f]}`)
    .join(",");
  return { data, valid: sign(message) === data.signature };
}