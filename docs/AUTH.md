# Proxy Middleware: Use Cases and Testing Guide

## Overview

The proxy middleware is a Next.js middleware layer that manages user authentication and authorization across the BuzzAVet application. It acts as a gatekeeper between users and protected routes, ensuring that only authenticated and properly verified users can access specific portions of the application. The proxy uses browser cookies to maintain state and controls the flow of users through the authentication and onboarding process.

---

## Use Cases and User Flows

### Use Case 1: Unauthenticated User Accessing Public Routes

**Scenario**: A new visitor lands on the application without any authentication credentials.

**What Happens**:

- The proxy checks for an authentication token in the user's cookies
- If no token exists, the user is considered unauthenticated
- If the user is trying to access a public route (such as landing page, login, register, terms of service, or privacy policy), they are allowed to proceed
- The proxy does not perform any redirects for these public paths

**Flow**:

1. User visits `/landing`, `/auth/login`, or `/auth/register` without authentication
2. Proxy checks for `auth_token` cookie - finds none
3. Proxy checks if path is in the public paths list
4. Path is public, so proxy returns `NextResponse.next()` allowing access
5. User can view the page normally

**Public Routes**:

- `/landing` - Main landing page for new visitors
- `/auth/login` - User login page
- `/auth/register` - Initial registration page
- `/auth/register/email` - Email entry step during registration
- `/auth/register/email/otp` - OTP verification page during registration
- `/terms-of-service` - Terms page accessible anytime
- `/privacy-policy` - Privacy page accessible anytime

---

### Use Case 2: Unauthenticated User Trying to Access Protected Routes

**Scenario**: An unauthenticated user attempts to access protected areas of the application like the home page, appointments, or hospitals listing.

**What Happens**:

- The proxy detects no authentication token
- The proxy checks if the requested path is protected (not in the public list)
- Since the user is not authenticated and trying to access a protected route, they are redirected to the landing page
- The original requested path is preserved as a query parameter so users can return after login

**Flow**:

1. Unauthenticated user tries to access `/appointments`
2. Proxy checks for `auth_token` - finds none
3. Proxy checks if `/appointments` is public - it is not
4. Proxy creates redirect URL: `/landing?from=/appointments`
5. User is redirected to landing page with the original destination preserved
6. After login, the application can use the `from` parameter to redirect the user back to where they wanted to go

**Protected Routes** (examples):

- `/appointments` - User's appointment management
- `/hospitals` - Hospitals listing
- `/services` - Service browsing
- `/explore` - Exploration features
- `/telemedicine` - Telemedicine consultations
- `/mobile-vets` - Mobile veterinary services
- `/` - Home dashboard

---

### Use Case 3: User Successfully Logs In

**Scenario**: A user enters correct credentials on the login page and the authentication is successful.

**What Happens**:

1. User submits login credentials (email, password, portal type, timezone) to the backend
2. Backend validates credentials and returns a login response with an access token
3. The application receives the response and dispatches a Redux action to store the token and email
4. The token and email are also saved as cookies: `auth_token` and `email`
5. An additional cookie `is_verified` is set based on the backend response
6. If the user has not yet verified their email, `is_verified` is set to false
7. The Redux store is updated with user credentials and authentication state

**Cookies Set**:

- `auth_token`: The JWT token for API authentication (max age: 7 days by default)
- `email`: The user's email address for quick reference
- `is_verified`: Boolean flag indicating if email is verified (true/false)

**Redux State Updated**:

- `user` object with user details from backend
- `token` with the authentication token
- `isAuthenticated` set to true
- `email` with user's email address
- `isVerified` based on backend response
- `portalType` set to CUSTOMER

**What Follows**:

- If email is not verified (`is_verified = false`), user is restricted to the OTP verification page
- If email is verified (`is_verified = true`), user can proceed further but may need to complete onboarding if they don't have a profile yet

---

### Use Case 4: Authenticated but Not Verified User (Email Not Confirmed)

**Scenario**: User has successfully logged in but has not yet confirmed their email address via OTP.

**What Happens**:

- The proxy detects the presence of `auth_token` (authenticated) but `is_verified` is false
- The proxy allows access ONLY to the OTP verification page at `/auth/register/email/otp`
- All other routes (public, protected, onboarding) are blocked and the user is forcefully redirected to the OTP page
- This ensures users cannot bypass email verification

**Flow**:

1. User logs in with correct credentials
2. Backend responds with `is_verified: false` (email not yet verified)
3. Cookies are set: `auth_token=xyz`, `is_verified=false`
4. User is redirected to `/auth/register/email/otp`
5. Proxy checks: is user authenticated? Yes (has token). Is verified? No. Is on OTP page? Yes.
6. Access is allowed
7. If user tries to navigate to `/home` or any other route, proxy redirects back to OTP page
8. User must complete OTP verification here

**OTP Verification Flow**:

- User receives OTP via email
- User enters OTP on the verification page
- Application calls the `verifyOtp` endpoint with the OTP code
- Backend validates OTP and returns success
- Upon successful verification, `is_verified` cookie is updated to true
- User can now proceed to next steps

---

### Use Case 5: Authenticated and Verified User Without Profile

**Scenario**: User has verified their email but has not yet created their profile (pet owner profile).

**What Happens**:

- Proxy detects `auth_token` is present and `is_verified = true`
- Proxy checks for `has_profile` cookie
- If `has_profile` is not set or undefined, user has not initiated their profile yet
- Proxy redirects user to the onboarding flow at `/auth/register/onboarding`
- User cannot access any protected routes (except terms and privacy) until they create a profile

**Flow**:

1. User completes email verification
2. Proxy checks: authenticated? Yes. Verified? Yes. Has profile? No.
3. Proxy redirects to `/auth/register/onboarding`
4. During onboarding, user provides profile information and pet details
5. When profile is created via API call, the backend response triggers the `getCurrentUser` query
6. The `getCurrentUser` handler sets the `has_profile` cookie with the profile ID and `onboarding_step` cookie with the current onboarding step
7. User can now progress through the onboarding steps

**Profile Creation**:

- Onboarding is a multi-step process
- Step 1: Terms acceptance and medical data consent
- Step 2: Service selection
- Step 3: Pet information (name, type, breed, gender, age, weight, photo)
- Step 4: Medical history and conditions (optional)
- Once profile is initiated, `has_profile` cookie is set with the profile ID

---

### Use Case 6: Authenticated, Verified, and Partially Onboarded User

**Scenario**: User has created a profile but has not completed all onboarding steps.

**What Happens**:

- Proxy detects user is authenticated and verified with a profile
- Proxy checks the `onboarding_step` cookie to determine progress
- If the onboarding step is less than 2 and the user has a profile (meaning they started but didn't complete), the proxy redirects to `/auth/register/onboarding` to continue
- If `onboarding_step` is not set but `has_profile` exists, proxy also redirects to onboarding (indicating profile exists but onboarding status is unknown)
- User cannot access main app features until onboarding is fully complete

**Flow**:

1. User created profile but only completed step 1
2. Cookies show: `auth_token=xyz`, `is_verified=true`, `has_profile=profileId123`, `onboarding_step=1`
3. User tries to navigate to `/home`
4. Proxy checks: authenticated? Yes. Verified? Yes. Has profile? Yes. Onboarding step? 1 (which is < 2).
5. Proxy redirects to `/auth/register/onboarding` to continue from where they left off
6. User completes remaining steps (step 2, 3, 4)
7. Onboarding step is updated to 2 or complete
8. User can now access the main application

**Onboarding Completion**:

- Onboarding is mandatory for new users
- Access to onboarding routes is always allowed for verified users
- Users can be on any step and still access the onboarding pages
- Once onboarding reaches step 2 or higher, main app access is granted (assuming all other conditions are met)

---

### Use Case 7: Fully Authenticated and Onboarded User

**Scenario**: User has completed the entire authentication and onboarding flow and now accesses the main application.

**What Happens**:

- Proxy detects all positive states: authenticated, verified, has profile, and onboarding complete (step >= 2)
- Proxy allows unrestricted access to protected routes
- User can access the full application including appointments, hospitals, services, telemedicine, etc.
- User can still access public pages like terms of service and privacy policy
- If user tries to access authentication pages (`/auth/login`, `/auth/register`), they are redirected to home (`/`)

**Flow**:

1. Fully onboarded user navigates to `/home`
2. Proxy checks all conditions: authenticated? Yes. Verified? Yes. Has profile? Yes. Onboarding step? 2+. On OTP page? No.
3. All checks pass
4. Proxy returns `NextResponse.next()` allowing access
5. User sees the home dashboard
6. User can navigate to any protected route and proxy checks pass each time
7. If user tries to go to `/auth/login` while fully authenticated, proxy detects they're on a public auth route and redirects them to `/`

**Available Routes**:

- All protected routes are now accessible
- `/home` - Home dashboard
- `/appointments` - Appointment management
- `/hospitals` - Hospital listing and search
- `/explore` - Explore veterinary services
- `/telemedicine` - Telemedicine consultations
- `/mobile-vets` - Mobile veterinary services
- `/services/[slug]` - Service details
- `terms-of-service` and `/privacy-policy` remain accessible even when authenticated

---

### Use Case 8: User Logout

**Scenario**: An authenticated user chooses to log out from the application.

**What Happens**:

- User clicks the logout button in the application UI
- The application dispatches the logout Redux action
- The logout reducer clears all authentication-related cookies:
  - `auth_token` is removed
  - `is_verified` is removed
  - `has_profile` is removed
  - `onboarding_step` is removed (if it exists)
- Redux state is reset to initial state (user: null, token: null, isAuthenticated: false, isVerified: false)
- User's local session data is cleared
- Next time proxy checks, it detects no auth_token
- User is redirected to landing page if they try to access protected routes

**Flow**:

1. Authenticated user clicks logout button
2. Application calls logout action
3. All cookies are cleared from the browser
4. Redux state is reset
5. User is redirected to landing page
6. If user manually navigates to `/appointments`, proxy detects no token and redirects to `/landing?from=/appointments`
7. User must log in again to regain access

---

## Testing Details and Strategy

### Test Category 1: Unauthenticated User Access Tests

**Test 1.1: Access Public Routes Without Authentication**

- **What to Test**: Verify that unauthenticated users can freely access public pages
- **How to Test**:
  - Clear all cookies
  - Navigate to each public route one by one: `/landing`, `/auth/login`, `/auth/register`, `/auth/register/email`, `/auth/register/email/otp`, `/terms-of-service`, `/privacy-policy`
  - Verify that each page loads successfully without redirects
  - Check browser console for any errors or warnings related to authentication
  - Verify that UI elements specific to unauthenticated state are visible (login button, register link)

**Test 1.2: Redirect to Landing When Accessing Protected Routes**

- **What to Test**: Verify that unauthenticated users are redirected to landing page when accessing protected routes
- **How to Test**:
  - Clear all cookies
  - Attempt to navigate directly to protected routes: `/appointments`, `/home`, `/hospitals`, `/explore`, `/services/[any-slug]`
  - Verify that the browser redirects to `/landing` with a query parameter `?from=[original-path]`
  - Check that the `from` parameter correctly preserves the original path that was attempted
  - Verify the redirect happens immediately without loading the protected route content

**Test 1.3: Invalid Path Behavior**

- **What to Test**: Verify that the middleware properly handles non-existent routes
- **How to Test**:
  - Attempt to access a completely invalid path: `/invalid/path/that/does/not/exist`
  - The 404 not-found page should be displayed
  - Verify no unintended redirects occur
  - The behavior should be the same whether or not the user is authenticated

---

### Test Category 2: Authentication (Login) Tests

**Test 2.1: Successful Login and Token Persistence**

- **What to Test**: Verify that successful login creates proper cookies and sets redux state
- **How to Test**:
  - Clear all cookies and Redux state
  - Navigate to `/auth/login`
  - Enter valid credentials (correct email and password)
  - Submit the login form
  - Wait for API response
  - Check browser DevTools → Application → Cookies for the presence of:
    - `auth_token` with a non-empty JWT value
    - `is_verified` with value true or false based on email verification status
    - `email` with the user's email address
  - Check Redux state to verify user object, token, and isAuthenticated are set
  - Verify page redirects appropriately based on verification status

**Test 2.2: Failed Login Attempt**

- **What to Test**: Verify that failed login does not create authentication cookies
- **How to Test**:
  - Clear all cookies
  - Navigate to `/auth/login`
  - Enter invalid credentials (wrong password or non-existent email)
  - Submit the login form
  - Verify API returns error
  - Check browser cookies - no `auth_token` should be present
  - Verify Redux state remains in initial/unauthenticated state
  - Verify error message is displayed to the user
  - User should remain on login page

**Test 2.3: Login with Different Timezones**

- **What to Test**: Verify that timezone is properly sent during login
- **How to Test**:
  - Perform login with system in different timezone (or manually pass different timezone values)
  - Check API request payload to verify timezone is included
  - Verify user's timezone is stored in Redux state (`timeZone` field)
  - Verify user can later access services in their timezone context

**Test 2.4: Session Persistence Across Browser Refresh**

- **What to Test**: Verify that authentication persists after page refresh
- **How to Test**:
  - Complete login process
  - Verify cookies are set
  - Press F5 or Ctrl+R to refresh the page
  - Verify cookies are still present after refresh
  - Verify Redux state is rehydrated (if hydration is implemented) or that cookies are available for state reconstruction
  - Verify user is not logged out due to refresh
  - Verify user can continue using the application normally

---

### Test Category 3: Email Verification (OTP) Tests

**Test 3.1: Access OTP Page When Not Verified**

- **What to Test**: Verify that users with unverified emails can access only the OTP page
- **How to Test**:
  - Perform login but ensure backend returns `is_verified: false`
  - Check that `is_verified` cookie is set to false
  - Verify you can access `/auth/register/email/otp` without redirect
  - Attempt to access `/home`, `/appointments`, or any other protected route
  - Verify each attempt redirects back to `/auth/register/email/otp`
  - Verify user cannot access `/auth/register/onboarding` or other onboarding pages while unverified

**Test 3.2: Cannot Access OTP Page When Already Verified**

- **What to Test**: Verify that already verified users are redirected away from OTP page
- **How to Test**:
  - Complete login with `is_verified: true` and full onboarding
  - Try to navigate directly to `/auth/register/email/otp`
  - Verify redirect to `/` (home page)
  - Verify no OTP verification form is displayed
  - Check browser history shows the redirect happened

**Test 3.3: OTP Verification Success**

- **What to Test**: Verify that successful OTP verification enables access to onboarding
- **How to Test**:
  - Login with unverified email, reach OTP page
  - Enter valid OTP received via email
  - Submit OTP form
  - Verify API call to verify endpoint
  - Verify `is_verified` cookie is updated to true
  - Verify user is redirected to onboarding or home based on profile status
  - Verify user can now access protected routes without being redirected to OTP page

**Test 3.4: OTP Verification Failure**

- **What to Test**: Verify that failed OTP verification keeps user on OTP page
- **How to Test**:
  - Login with unverified email
  - Enter invalid or expired OTP
  - Submit form
  - Verify error message is displayed
  - Verify `is_verified` cookie remains false
  - Verify user stays on `/auth/register/email/otp`
  - Verify user cannot navigate away to protected routes

**Test 3.5: OTP Resend Functionality**

- **What to Test**: Verify that users can request OTP to be resent
- **How to Test**:
  - On the OTP page, click resend OTP button
  - Verify API call to resend endpoint is made
  - Verify confirmation message is shown to user
  - Check that a new OTP is sent to user's email
  - Verify the old OTP becomes invalid and new OTP can be used for verification

---

### Test Category 4: Profile and Onboarding Tests

**Test 4.1: Redirect to Onboarding When No Profile Exists**

- **What to Test**: Verify users without profile are forced to onboard
- **How to Test**:
  - Complete login and email verification
  - Verify `auth_token` and `is_verified` are set to true
  - Check that `has_profile` cookie is NOT set or is empty
  - Attempt to access `/home`, `/hospitals`, `/appointments`
  - Verify each attempt redirects to `/auth/register/onboarding`
  - Verify user cannot bypass onboarding by any means
  - Verify accessing `/auth/register/onboarding` directly is allowed

**Test 4.2: Profile Creation Sets has_profile Cookie**

- **What to Test**: Verify that profile creation triggers has_profile cookie
- **How to Test**:
  - Be on onboarding page with verified email but no profile
  - Check that `has_profile` cookie does not exist
  - Complete onboarding step 1 and 2 to initiate profile creation
  - After profile initiation API call completes, check cookies
  - Verify `has_profile` cookie is now set with the profile ID value
  - Verify `onboarding_step` cookie is also set with the current step value
  - Reload the page and verify cookies persist

**Test 4.3: Incomplete Onboarding Redirects to Onboarding**

- **What to Test**: Verify that users with incomplete onboarding cannot access main app
- **How to Test**:
  - Have a user at onboarding step 1 (only terms accepted)
  - Verify `onboarding_step` cookie is set to 1
  - Attempt to access `/home`, `/appointments`, `/hospitals`
  - Verify each attempt redirects to `/auth/register/onboarding`
  - Try to directly navigate to other protected routes - all should redirect to onboarding
  - Verify user can access onboarding pages: `/auth/register/onboarding` and `/auth/register/onboarding/success`

**Test 4.4: Completed Onboarding Unlocks Main App**

- **What to Test**: Verify that completed onboarding grants full access
- **How to Test**:
  - Complete all onboarding steps (step 1, 2, 3, 4)
  - Verify `onboarding_step` cookie is updated to 2 or higher
  - Verify all profile and pet information is saved
  - Attempt to access all protected routes: `/home`, `/appointments`, `/hospitals`, `/explore`, `/telemedicine`, `/services/[slug]`
  - Verify all routes load without redirect
  - Verify content is displayed correctly for each route
  - Verify no OTP or onboarding pages are forced

**Test 4.5: Pet Photo Upload During Onboarding**

- **What to Test**: Verify that pet photos are properly uploaded and stored during onboarding
- **How to Test**:
  - On onboarding step 3 (pet information)
  - Select a pet photo from device
  - Verify file is uploaded to storage endpoint
  - Verify response contains photo metadata (id, path, fileName, fileSize)
  - Verify photo is displayed as preview to user
  - Complete onboarding and verify photo is persisted
  - Reload page and verify pet photo is still displayed in profile

---

### Test Category 5: Verified but No Onboarding Decision Tests

**Test 5.1: Onboarding_step Not Set But Profile Exists**

- **What to Test**: Verify behavior when has_profile exists but onboarding_step is missing
- **How to Test**:
  - Manually set cookies: `auth_token=valid`, `is_verified=true`, `has_profile=profileId123`
  - Do NOT set `onboarding_step` cookie
  - Attempt to access protected route like `/home`
  - Verify redirect to `/auth/register/onboarding` (due to missing onboarding_step with existing profile)
  - Navigate to onboarding and complete/continue
  - Verify `onboarding_step` cookie is then set properly

**Test 5.2: High Onboarding Step (Step 2+) Allows Full Access**

- **What to Test**: Verify that onboarding_step >= 2 allows full access
- **How to Test**:
  - Set cookies: `auth_token=valid`, `is_verified=true`, `has_profile=profileId123`, `onboarding_step=2`
  - Attempt to access all protected routes
  - Verify NO redirects to onboarding occur
  - Verify all routes load successfully
  - Try with higher values like `onboarding_step=3` or `onboarding_step=4` - same result expected

---

### Test Category 6: Logout and Session Termination Tests

**Test 6.1: Logout Clears All Cookies**

- **What to Test**: Verify that logout completely removes authentication cookies
- **How to Test**:
  - Be fully authenticated and onboarded user
  - Verify all cookies are present: `auth_token`, `is_verified`, `has_profile`, `onboarding_step`
  - Click logout button in the application UI
  - Verify API logout endpoint is called (if applicable)
  - Check browser cookies immediately after logout
  - Verify ALL authentication cookies are removed (have max-age=0)
  - Verify no cookies remain that could reauthorize the user

**Test 6.2: Redux State Reset After Logout**

- **What to Test**: Verify Redux state is cleared after logout
- **How to Test**:
  - Be fully authenticated user with user data in Redux
  - Perform logout
  - Open Redux DevTools or check Redux state through console
  - Verify `user` is set to null
  - Verify `token` is set to null
  - Verify `isAuthenticated` is set to false
  - Verify `isVerified` is set to false
  - Verify `email` is set to null
  - Verify all onboarding state is also cleared

**Test 6.3: Cannot Access Protected Routes After Logout**

- **What to Test**: Verify that logout immediately prevents access to protected routes
- **How to Test**:
  - Be on authenticated user dashboard (`/home`)
  - Perform logout
  - Verify redirect to landing page
  - Try to navigate back to `/home` using browser back button
  - Verify proxy detects no token and redirects to `/landing`
  - Verify cannot access any other protected route either

**Test 6.4: Can Logout Partially**

- **What to Test**: Verify logout behavior when called from different states
- **How to Test**:
  - Test logout while on OTP page (verified but not complete)
  - Verify all auth cookies are still cleared
  - Test logout while on onboarding page
  - Verify all auth cookies are cleared
  - Test logout while on main app
  - Verify all auth cookies are cleared
  - In all cases, verify user ends up at landing page

---

### Test Category 7: Browser Refresh and State Recovery Tests

**Test 7.1: State Recovery on Refresh with Valid Tokens**

- **What to Test**: Verify application state is properly recovered after refresh
- **How to Test**:
  - Be fully authenticated and onboarded
  - Refresh the browser (F5)
  - Verify all cookies still exist
  - Verify application loads correctly to the same page
  - Verify no redirect loops occur
  - Verify Redux state is available (either through hydration or cookie reading)
  - Check that user is not logged out

**Test 7.2: Refresh on OTP Page**

- **What to Test**: Verify OTP page state persists after refresh
- **How to Test**:
  - Be on OTP verification page with unverified email
  - Refresh the page
  - Verify proxy still blocks access to protected routes
  - Verify you're still restricted to OTP page only
  - Verify OTP verification form is still present and functional

**Test 7.3: Refresh on Onboarding Page**

- **What to Test**: Verify onboarding state persists after refresh
- **How to Test**:
  - Be on onboarding page at specific step (e.g., step 2)
  - Refresh the page
  - Verify you're redirected to onboarding if trying to access protected routes
  - Verify form data is preserved (if client-side persistence is implemented)
  - Verify can continue onboarding from where you left off

**Test 7.4: Refresh with Expired Token**

- **What to Test**: Verify behavior when token expires between requests
- **How to Test**:
  - Manually set an expired token in cookies
  - Refresh the page
  - Attempt to access a protected route
  - Verify API returns 401 or similar error
  - Verify application redirects to login page
  - Verify auth cookies are cleared upon token expiration

---

### Test Category 8: Edge Cases and Boundary Tests

**Test 8.1: Simultaneous Tab/Window Session**

- **What to Test**: Verify that logout in one tab affects all tabs
- **How to Test**:
  - Open application in two browser tabs
  - Ensure both tabs are authenticated
  - In tab 1, perform logout
  - In tab 2, perform any action that requires API call
  - Verify tab 2 receives 401 error from API
  - Verify tab 2 also clears its cookies and redirects to login
  - Verify both tabs end up in unauthenticated state

**Test 8.2: Manual Cookie Manipulation**

- **What to Test**: Verify proxy validates cookie integrity
- **How to Test**:
  - Set `auth_token` to random gibberish while other cookies are valid
  - Attempt to access protected route
  - Verify API call with invalid token returns 401
  - Verify proxy doesn't grant access based on valid is_verified or has_profile if token is invalid
  - Set `is_verified` to true manually but keep `auth_token` valid
  - Verify proxy trusts the verified flag from cookie (this tests cookie-based authorization)
  - Set `has_profile` to true manually but other cookies valid
  - Verify proxy trusts the profile flag

**Test 8.3: Missing Individual Cookies**

- **What to Test**: Verify behavior when individual cookies are missing
- **How to Test**:
  - Set `auth_token` but not `is_verified`
  - Verify user is treated as unverified
  - Set `auth_token` and `is_verified=true` but not `has_profile`
  - Verify user is redirected to onboarding
  - Set all cookies except `onboarding_step`
  - Verify proxy redirects to onboarding due to missing step
  - In each case, verify proxy handles gracefully without errors

**Test 8.4: Cookie SameSite and Secure Attributes**

- **What to Test**: Verify cookies are set with proper security attributes
- **How to Test**:
  - Perform login and observe cookies set in DevTools
  - Verify each authentication cookie has `SameSite=Lax` attribute
  - Verify cookies have `path=/` so they're available to entire application
  - Verify cookies have appropriate max-age values
  - Test that cookies persist for configured duration (default 7 days)
  - Test cross-site request behavior to verify SameSite is working

**Test 8.5: Very Long Pathnames**

- **What to Test**: Verify proxy handles dynamic routes with parameters
- **How to Test**:
  - Access routes with URL parameters: `/appointments/[id]`, `/services/[slug]`
  - Try various parameter values including special characters, long strings, numbers
  - Verify proxy correctly identifies these as protected routes
  - Verify redirects preserve the full pathname including parameters
  - Verify `/landing?from=/appointments/123` correctly stores the original path

---

### Test Category 9: Performance and Load Tests

**Test 9.1: Proxy Response Time**

- **What to Test**: Verify proxy doesn't significantly delay page loads
- **How to Test**:
  - Navigate to various routes and measure time to first byte
  - Verify proxy adds minimal overhead (typically < 50ms)
  - Monitor network tab in DevTools
  - Verify no unnecessary API calls are made by proxy middleware itself
  - Compare navigation speed with and without proxy (if possible)

**Test 9.2: Cookie Size and Limits**

- **What to Test**: Verify cookie data doesn't exceed browser limits
- **How to Test**:
  - Check total size of authentication cookies
  - Verify total combined size is under typical cookie limits (4KB per cookie, ~180KB per domain)
  - Add various user profile data and verify cookie sizes remain reasonable
  - Monitor for any cookie truncation or loss issues

---

### Test Category 10: Different Authentication Scenarios

**Test 10.1: Google OAuth Login**

- **What to Test**: Verify proxy works with Google authentication
- **How to Test**:
  - Complete Google OAuth login flow if implemented
  - Verify same cookies are set (auth_token, is_verified, etc.)
  - Verify `fromGoogle` flag is set in user object
  - Verify proxy behavior is identical to email/password login

**Test 10.2: Portal Types (CUSTOMER vs others)**

- **What to Test**: Verify proxy handles different user portal types
- **How to Test**:
  - If application supports multiple portal types, test with CUSTOMER portal type
  - Verify `portalType` is stored in Redux and sent with login request
  - Verify different portal types are redirected appropriately if needed
  - Check that portal type doesn't interfere with proxy logic

**Test 10.3: User Role-Based Access (Future)**

- **What to Test**: Verify foundation for future role-based access control
- **How to Test**:
  - Observe that user's role is stored in Redux (`role` field)
  - Verify current proxy doesn't differentiate by role (treats all verified users equally)
  - Note that if role-based access needed in future, proxy can be extended
  - Current implementation focuses on authentication status, not roles

---

## Testing Tools and Methods

### Manual Testing Approach

**Browser DevTools**:

- Monitor cookies in Application tab
- Watch Redux state changes in Redux DevTools
- Check network requests in Network tab for API calls
- Monitor console for errors

**Test Cases Can Be Executed By**:

- Navigating between routes and observing behavior
- Using browser address bar to visit specific URLs
- Using browser back/forward buttons to test history
- Pressing F5 to refresh and test state persistence
- Using Ctrl+Shift+Delete to clear cookies and test scenarios
- Opening multiple browser tabs for multi-session testing

### Automated Testing Approach (if applicable)

**E2E Testing Framework** (if Playwright, Cypress, or similar is available):

- Create test files for each test category above
- Mock API responses for different login scenarios
- Test complete user flows from login to full app access
- Verify redirects and cookie presence programmatically
- Test error scenarios and edge cases
- Create test fixtures for different user states

**Unit Testing** (for Redux reducers):

- Test setCredentials reducer properly sets auth state
- Test logout reducer clears all auth state
- Verify correct state transitions

---

## Key Testing Checkpoints

1. **Cookie Integrity**: After each operation (login, logout, OTP verification), verify exactly which cookies are present and their values
2. **Redirect Logic**: Verify redirects happen at correct times and preserve necessary information (like `from` parameter)
3. **Access Control**: Verify users in each state can access exactly the routes they should
4. **State Consistency**: Verify Redux state matches cookie state
5. **Error Handling**: Verify errors don't break the authentication flow
6. **Performance**: Verify proxy doesn't slow down navigation significantly
7. **Security**: Verify authentication is properly validated before granting access
8. **Data Persistence**: Verify user data persists through refresh and multi-tab scenarios

---

## Summary

The proxy middleware implements a sophisticated authentication and authorization system that protects the BuzzAVet application. Through careful management of cookies and Redux state, it ensures users progress through proper authentication, email verification, and onboarding flows before accessing the main application. Thorough testing of all scenarios ensures the authentication system is robust, secure, and provides a smooth user experience.
