export type PasswordRule = { id: string; label: string; valid: boolean };

export function getPasswordRules(password: string): PasswordRule[] {
  return [
    { id: "length", label: "At least 8 characters", valid: password.length >= 8 },
    { id: "upper", label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { id: "lower", label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { id: "number", label: "One number", valid: /\d/.test(password) },
    { id: "symbol", label: "One symbol", valid: /[^A-Za-z0-9]/.test(password) },
  ];
}
