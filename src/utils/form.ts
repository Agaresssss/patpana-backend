export const escapeHtml = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const nl2br = (value: unknown): string => escapeHtml(value).replace(/\r?\n/g, '<br/>');

// Strip CR/LF so user input can't inject mail headers
export const singleLine = (value: unknown): string => String(value ?? '').replace(/[\r\n]+/g, ' ').trim();

export const isEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type Rule = { max: number; required: boolean; email?: boolean };

export type FieldErrorCode =
  | 'required'
  | 'too_long'
  | 'invalid_email'
  | 'file_too_many'
  | 'file_too_large'
  | 'file_type_invalid';

export type FieldError = {
  path: string;
  code: FieldErrorCode;
  params?: Record<string, number>;
  message: string; // English fallback
};

/**
 * Validate string fields. Collects every error so the client can show them per field.
 */
export const validateFields = <K extends string>(
  input: Record<string, unknown>,
  rules: Record<K, Rule>
): { values: Record<K, string> } | { errors: FieldError[] } => {
  const values = {} as Record<K, string>;
  const errors: FieldError[] = [];
  for (const key of Object.keys(rules) as K[]) {
    const rule = rules[key];
    const raw = input[key];
    const v = typeof raw === 'string' ? raw.trim() : '';
    values[key] = v;
    if (rule.required && !v) {
      errors.push({ path: key, code: 'required', message: `${key} is required` });
    } else if (v.length > rule.max) {
      errors.push({
        path: key,
        code: 'too_long',
        params: { max: rule.max },
        message: `${key} must be at most ${rule.max} characters`,
      });
    } else if (rule.email && v && !isEmail(v)) {
      errors.push({ path: key, code: 'invalid_email', message: `${key} is invalid` });
    }
  }
  return errors.length ? { errors } : { values };
};

/**
 * Unified response shape:
 *   success: { data, error: null }
 *   failure: { data: null, error: { code, message, errors? } }
 */
export const respondOk = (ctx: any, data: unknown = { ok: true }) => {
  ctx.status = 200;
  ctx.body = { data, error: null };
  return ctx.body;
};

export const respondError = (
  ctx: any,
  status: number,
  code: string,
  message: string,
  errors?: FieldError[]
) => {
  ctx.status = status;
  ctx.body = { data: null, error: { code, message, ...(errors ? { errors } : {}) } };
  return ctx.body;
};
