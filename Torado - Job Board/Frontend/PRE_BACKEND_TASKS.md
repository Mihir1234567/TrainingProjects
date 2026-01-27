# Pre-Backend Implementation Checklist

Current State Analysis:
The frontend is visually complete but relies heavily on static JSON files and simulated logic that is scattered across components. To ensure a smooth transition to a real backend, we need to centralize data management and standardize the "API" calls.

## 1. Authentication & User Context

**Current Status**: `isAuthenticated` and `isRecruiter` are simple booleans in `App.jsx`. `MyAccountPage` uses hardcoded buttons to switch roles.
**Required Actions**:

- [ ] **Enhance Register Form**: Add fields for "Full Name" and "Role Selection" (Candidate/Employer) in `MyAccountPage`. Currently, it only asks for Email/Password and defaults to Candidate.
- [ ] **Create User Context**: Instead of just `isAuthenticated`, store a full `user` object (`{ id, name, email, role, avatar }`).
- [ ] **Standardize Auth Flow**: Ensure Login/Register updates this `user` object globally.

## 2. Dashboard Data Dynamicism

**Current Status**: Dashboard pages like `ManageJobs.jsx` use local static arrays (`initialJobs`).
**Required Actions**:

- [ ] **ManageJobs**: Update to fetch "My Jobs" from `MockDataContext`.
- [ ] **AppliedJobs**: Update to fetch "My Applications" from `MockDataContext`.
- [ ] **ManageApplicants**: Implementation likely needed to show candidates who applied to a specific job.
- [ ] **Profile Page**: Update `MyProfile.jsx` to read/write to the `user` context.

## 3. Data Centralization (Mock Backend)

**Current Status**: Data is split between `src/data/*.json` and `MockDataContext`.
**Required Actions**:

- [ ] **Load JSONs to Context**: Move `freelancers.json`, `candidates.json` into `MockDataContext` state so they can be "modified" (e.g. editing a profile).
- [ ] **CRUD Operations**: Ensure `deleteJob`, `updateJob`, `updateProfile` methods exist in `MockDataContext` and are connected to the UI buttons.

## 4. API Service Layer (Critical for Backend Switch)

**Current Status**: Components call `useMockData` directly.
**Required Actions**:

- [ ] **Create `src/services/api.js`**: Define async functions for every backend interaction:
  - `auth.login(credentials)`
  - `auth.register(data)`
  - `jobs.getAll(filters)`
  - `jobs.getOne(id)`
  - `jobs.create(data)`
  - `jobs.update(id, data)`
  - `jobs.delete(id)`
  - `applications.apply(jobId, data)`
- [ ] **Refactor Components**: Update components to call these service functions instead of direct context/state.
  - _Why?_ When the backend is ready, we only change `src/services/api.js` to fetch from the server instead of the mock, without touching the UI components.

## 5. Global UI States

**Current Status**: Some loading states exist (`status === 'loading'`), but error handling is local.
**Required Actions**:

- [ ] **Global Error Handler**: A way to show toast notifications for API errors (e.g. "Network Error", "Unauthorized").
- [ ] **Loading Interceptors**: If using a service layer, we can implement global loading bars.

## 6. Functional Gaps

- [ ] **Edit Job**: Connect `ManageJobs` "Edit" button to a pre-filled `PostJob` form.
- [ ] **Delete Job**: Connect `ManageJobs` "Delete" button to `MockDataContext.deleteJob`.
- [ ] **Search/Filter**: Ensure Homepage search bar actually filters the `JobListing` page (currently passing params via URL is the best approach, verify it works).

---

### Recommended Next Step

Refactor **`ManageJobs`** and **`MyProfile`** to use `MockDataContext`, then create the **API Service Layer** to abstract the logic.
