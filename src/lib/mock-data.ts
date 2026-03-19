import { User, RFS, Contribution, Skill, Purchase } from "./types"

export const users: User[] = [
  {
    id: "user-1",
    name: "Alex Chen",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e",
  },
  {
    id: "user-2",
    name: "Jordan Smith",
    walletAddress: "0x8ba1f109551bD432803012645Ac136ddd64DBA7",
  },
  {
    id: "user-3",
    name: "Morgan Lee",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
  },
]

export const rfsList: RFS[] = [
  {
    id: "rfs-1",
    title: "Next.js middleware CSRF hardening",
    description: "Implement robust CSRF protection patterns in Next.js middleware",
    scope: "Create comprehensive guide covering token validation, SameSite cookies, and double-submit patterns",
    fundingThreshold: 75,
    currentAmount: 0,
    status: "open",
    authorId: "user-2",
    claimantId: null,
    createdAt: "2025-03-15T10:00:00Z",
  },
  {
    id: "rfs-2",
    title: "GraphQL batching attack prevention",
    description: "Defense strategies against GraphQL batching and query complexity attacks",
    scope: "Document rate limiting, depth limiting, and query cost analysis techniques",
    fundingThreshold: 100,
    currentAmount: 62,
    status: "open",
    authorId: "user-3",
    claimantId: null,
    createdAt: "2025-03-14T14:30:00Z",
  },
  {
    id: "rfs-3",
    title: "BetterAuth session fixation defense",
    description: "Secure session management patterns using BetterAuth",
    scope: "Cover session regeneration, token rotation, and secure cookie handling",
    fundingThreshold: 50,
    currentAmount: 48,
    status: "open",
    authorId: "user-2",
    claimantId: null,
    createdAt: "2025-03-13T09:15:00Z",
  },
  {
    id: "rfs-4",
    title: "Rate limiting for LLM proxy endpoints",
    description: "Implement effective rate limiting strategies for LLM API proxies",
    scope: "Token-based limiting, sliding windows, and adaptive throttling patterns",
    fundingThreshold: 125,
    currentAmount: 125,
    status: "funded",
    authorId: "user-1",
    claimantId: null,
    createdAt: "2025-03-12T11:45:00Z",
  },
  {
    id: "rfs-5",
    title: "SQL injection patterns in Drizzle ORM",
    description: "Security best practices for preventing SQL injection with Drizzle",
    scope: "Parameterized queries, prepared statements, and safe query building",
    fundingThreshold: 85,
    currentAmount: 85,
    status: "funded",
    authorId: "user-3",
    claimantId: null,
    createdAt: "2025-03-11T16:20:00Z",
  },
  {
    id: "rfs-6",
    title: "WebSocket authentication in Socket.io",
    description: "Secure WebSocket connection patterns with Socket.io",
    scope: "JWT validation, namespace authorization, and connection lifecycle security",
    fundingThreshold: 95,
    currentAmount: 95,
    status: "fulfilled",
    authorId: "user-2",
    claimantId: "user-1",
    createdAt: "2025-03-10T13:00:00Z",
  },
  {
    id: "rfs-7",
    title: "Server Actions input validation for Next.js 16",
    description: "Comprehensive input validation strategies for Next.js Server Actions",
    scope: "Zod integration, type safety, and error handling patterns",
    fundingThreshold: 60,
    currentAmount: 60,
    status: "published",
    authorId: "user-1",
    claimantId: "user-1",
    createdAt: "2025-03-09T10:30:00Z",
  },
  {
    id: "rfs-8",
    title: "OAuth state parameter CSRF protection",
    description: "Implement secure OAuth flows with proper state parameter handling",
    scope: "State generation, validation, and session binding techniques",
    fundingThreshold: 70,
    currentAmount: 70,
    status: "published",
    authorId: "user-3",
    claimantId: "user-3",
    createdAt: "2025-03-08T15:45:00Z",
  },
  {
    id: "rfs-9",
    title: "API key rotation strategy for multi-tenant apps",
    description: "Key rotation and revocation patterns for multi-tenant architectures",
    scope: "Versioning, grace periods, and audit logging for key management",
    fundingThreshold: 110,
    currentAmount: 110,
    status: "published",
    authorId: "user-2",
    claimantId: "user-2",
    createdAt: "2025-03-07T12:15:00Z",
  },
  {
    id: "rfs-10",
    title: "Content Security Policy for SSR React apps",
    description: "CSP implementation strategies for server-side rendered React applications",
    scope: "Nonce generation, inline script handling, and policy configuration",
    fundingThreshold: 80,
    currentAmount: 80,
    status: "published",
    authorId: "user-1",
    claimantId: "user-1",
    createdAt: "2025-03-06T09:00:00Z",
  },
  {
    id: "rfs-11",
    title: "JWT refresh token rotation patterns",
    description: "Secure JWT refresh token implementation and rotation strategies",
    scope: "Token lifecycle, storage, and revocation mechanisms",
    fundingThreshold: 65,
    currentAmount: 65,
    status: "published",
    authorId: "user-3",
    claimantId: "user-3",
    createdAt: "2025-03-05T14:30:00Z",
  },
]

export const contributions: Contribution[] = [
  {
    id: "contrib-1",
    userId: "user-1",
    rfsId: "rfs-2",
    amount: 25,
    createdAt: "2025-03-14T15:00:00Z",
  },
  {
    id: "contrib-2",
    userId: "user-2",
    rfsId: "rfs-2",
    amount: 37,
    createdAt: "2025-03-14T16:30:00Z",
  },
  {
    id: "contrib-3",
    userId: "user-1",
    rfsId: "rfs-3",
    amount: 48,
    createdAt: "2025-03-13T10:00:00Z",
  },
  {
    id: "contrib-4",
    userId: "user-3",
    rfsId: "rfs-4",
    amount: 75,
    createdAt: "2025-03-12T12:00:00Z",
  },
  {
    id: "contrib-5",
    userId: "user-2",
    rfsId: "rfs-4",
    amount: 50,
    createdAt: "2025-03-12T13:15:00Z",
  },
  {
    id: "contrib-6",
    userId: "user-1",
    rfsId: "rfs-5",
    amount: 85,
    createdAt: "2025-03-11T17:00:00Z",
  },
]

export const skills: Skill[] = [
  {
    id: "skill-1",
    rfsId: "rfs-7",
    title: "Server Actions input validation for Next.js 16",
    content: `Server Actions in Next.js 16 require robust input validation to prevent security vulnerabilities and ensure data integrity. This skill covers implementing Zod schemas for type-safe validation, handling validation errors gracefully, and integrating validation middleware into your action handlers. Learn how to validate form submissions, API requests, and user-generated content with comprehensive error messages that guide users toward correct input.`,
    createdAt: "2025-03-09T11:00:00Z",
  },
  {
    id: "skill-2",
    rfsId: "rfs-8",
    title: "OAuth state parameter CSRF protection",
    content: `The OAuth state parameter is critical for preventing CSRF attacks during the authorization flow. This skill teaches you how to generate cryptographically secure state values, store them securely in sessions, and validate them upon callback. Understand the complete OAuth flow security model, including state binding to user sessions, timeout handling, and recovery from state mismatches. Implement these patterns across multiple OAuth providers.`,
    createdAt: "2025-03-08T16:30:00Z",
  },
  {
    id: "skill-3",
    rfsId: "rfs-9",
    title: "API key rotation strategy for multi-tenant apps",
    content: `Managing API keys across multiple tenants requires careful planning for rotation, revocation, and audit trails. This skill covers implementing versioned API keys with grace periods for rotation, tracking key usage and access patterns, and handling revocation across distributed systems. Learn how to minimize downtime during key rotation, implement automatic rotation policies, and maintain comprehensive audit logs for compliance and security investigations.`,
    createdAt: "2025-03-07T13:00:00Z",
  },
  {
    id: "skill-4",
    rfsId: "rfs-10",
    title: "Content Security Policy for SSR React apps",
    content: `Content Security Policy (CSP) is essential for protecting server-side rendered React applications from XSS attacks. This skill teaches you how to generate nonces for inline scripts, configure CSP headers for SSR environments, and handle dynamic content safely. Learn the trade-offs between strict policies and application functionality, implement report-only mode for testing, and debug CSP violations effectively in production environments.`,
    createdAt: "2025-03-06T10:00:00Z",
  },
  {
    id: "skill-5",
    rfsId: "rfs-11",
    title: "JWT refresh token rotation patterns",
    content: `Refresh token rotation is a critical security pattern for long-lived sessions while maintaining JWT's stateless benefits. This skill covers implementing refresh token rotation with family-based revocation, handling token expiration gracefully, and storing tokens securely. Learn how to detect and respond to token theft, implement sliding window expiration, and maintain backward compatibility during token rotation rollouts across your infrastructure.`,
    createdAt: "2025-03-05T15:30:00Z",
  },
]

export const purchases: Purchase[] = [
  {
    id: "purchase-1",
    userId: "user-1",
    skillId: "skill-1",
    amount: 0.005,
    createdAt: "2025-03-09T12:00:00Z",
  },
  {
    id: "purchase-2",
    userId: "user-1",
    skillId: "skill-3",
    amount: 0.008,
    createdAt: "2025-03-07T14:30:00Z",
  },
]

export function getRFSById(id: string): RFS | undefined {
  return rfsList.find((rfs) => rfs.id === id)
}

export function getContributionsForRFS(rfsId: string): Contribution[] {
  return contributions.filter((contrib) => contrib.rfsId === rfsId)
}

export function getSkillForRFS(rfsId: string): Skill | undefined {
  return skills.find((skill) => skill.rfsId === rfsId)
}

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id)
}

export function getCurrentUser(): User {
  const user = users.find((u) => u.id === "user-1")
  if (!user) throw new Error("Current user not found")
  return user
}

export function getUserContributions(userId: string): Contribution[] {
  return contributions.filter((contrib) => contrib.userId === userId)
}

export function getUserPurchases(userId: string): Purchase[] {
  return purchases.filter((purchase) => purchase.userId === userId)
}
