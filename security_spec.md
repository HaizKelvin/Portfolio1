# Security Specification

## Data Invariants
- Only verified administrators can add, update, or remove projects.
- Projects must have a title, type, image URL, and a server-generated timestamp.
- The `createdAt` field is immutable after document creation.
- Project IDs must follow a strict alphanumeric pattern to prevent injection.

## The Dirty Dozen (Threat Models)
1. **Unauthenticated Write**: Attempting to create a project without logging in. (Denied by `isAdmin`)
2. **Identity Spoofing**: Logged-in user without admin record attempting to write. (Denied by `exists(/admins/...)`)
3. **Ghost Fields**: Adding extra fields like `isFeatured` during creation to bypass future filters. (Denied by `isValidProject` size check)
4. **ID Poisoning**: Using a 1MB string as a `projectId`. (Denied by `isValidId` size check)
5. **Timestamp Spoofing**: Client sending a fake `createdAt` in the past. (Denied by `request.time` check)
6. **Immutability Breach**: Updating a project's `createdAt` date. (Denied by `resource.data.createdAt` comparison)
7. **Type Mismatch**: Sending an array instead of a string for `title`. (Denied by `is string` check)
8. **Malicious Link**: Sending a 10KB string for a link. (Denied by `size()` constraints)
9. **Recursive Read Attack**: Attempting to list projects with a query that ignores `resource.data`. (N/A for public read, but restricted for write)
10. **Shadow Admin**: Creating a document in `/admins` to gain privileges. (Denied by `allow write: if false`)
11. **Update Hijacking**: Modifying another user's project (All projects are global for this portfolio, but only admins can touch them).
12. **PII Leak**: Attempting to read `/admins` data of other users. (Denied by `request.auth.uid == adminId`)

## Test Runner
Verified via security logic in `firestore.rules`.
