# Validation Rules

## Name Rules (First Name & Last Name)

- Required
- Minimum 2 characters long
- Maximum 50 characters
- Cannot be empty or contain only spaces
- No numeric digits allowed
- No special characters allowed (e.g., !@#$%^&\*(),.?":{}|<>)
- No consecutive spaces allowed

## Email Rule

- Required
- Must be a valid email address format
- Domain must contain a dot (e.g., example.com)

## Phone Number Rule

- Required
- Must be a valid phone number format
- Supports international format (+923146601881), country code (923146601881), or national format (03146601881)
- Phone number length must be correct for the selected country
- Auto-detects country from input

## Message Rule

- Required
- Minimum 10 characters long
- Maximum 500 characters

## Password Rule

- Required

## Confirm Password Rule

- Required
- Must match the password field

## Verification Code Rule

- Required
- Must be exactly 6 digits
- Must contain only numbers

## Terms Accepted Rule

- Required
- Must be accepted (true)

## Medical Data Consent Rule

- Required
- Must be accepted (true)

## Selected Service Rule

- Required
- Must select at least one service
- Valid options: IN_HOSPITAL, TELEMEDICINE, HOME_VISIT, PET_SERVICES

## Pet Type Rule

- Required
- Valid options: DOG, CAT, BIRD, OTHER

## Breed Rule

- Optional (nullable)

## Gender Rule

- Optional (nullable)
- Valid options: MALE, FEMALE, UNKNOWN

## Age Rule

- Optional (nullable)
- Must be a number
- Must be an integer
- Must be a positive number

## Weight Rule

- Optional (nullable)
- Must be a number
- Minimum 0.1
- Must be a positive number

## Photo Rule

- Optional (nullable)
- Allowed file types: JPEG, PNG
- Maximum file size: 2MB
