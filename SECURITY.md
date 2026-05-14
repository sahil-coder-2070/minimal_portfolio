# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this portfolio project, please report it by emailing the maintainer directly. Please do not open a public issue.

## Security Measures

This project implements several security best practices:

- Content Security Policy (CSP) headers
- X-Frame-Options to prevent clickjacking
- X-Content-Type-Options to prevent MIME sniffing
- Referrer-Policy for privacy
- Permissions-Policy to restrict browser features
- Input validation using Zod schemas
- Secure environment variable handling

## Dependencies

We regularly update dependencies to patch known vulnerabilities. Run `npm audit` to check for security issues.

## Supported Versions

Only the latest version of this project is supported with security updates.

