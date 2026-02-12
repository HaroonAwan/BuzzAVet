import * as yup from 'yup';

const nameRule = yup
  .string()
  .required('Required')
  .min(2, 'At least 2 characters long')
  .max(50, 'Cannot exceed 50 characters')
  .trim('Cannot be empty')
  .test('not-only-spaces', 'Cannot be empty', (value) => value?.trim() !== '')
  .test('no-numeric', 'Numbers not allowed', (value) => !/\d/.test(value || ''))
  .test(
    'no-special-chars',
    'Special characters not allowed',
    (value) => !/[!@#$%^&*(),.?":{}|<>]/.test(value || '')
  )
  .test(
    'no-consecutive-spaces',
    'No consecutive spaces allowed',
    (value) => !/\s{2,}/.test(value || '')
  );

const lastNameRule = nameRule.clone();
const firstNameRule = nameRule.clone();
const emailRule = yup
  .string()
  .required('Required')
  .email('Invalid email address')
  .test('dot-in-domain', 'Invalid email address', (value) => {
    if (!value) return false;
    const domainPart = value.split('@')[1];
    return !!(domainPart && domainPart.includes('.'));
  });

const phoneNumberRule = yup.string().required('Required');

const messageRule = yup
  .string()
  .required('Required')
  .min(10, 'At least 10 characters long')
  .max(500, 'Cannot exceed 500 characters');
const passwordRule = yup
  .string()
  .required('Required')
  .min(8, 'At least 8 characters long')
  .test('has-number', 'Must contain at least 1 number', (value) => /\d/.test(value || ''))
  .test('has-special-char', 'Must contain at least 1 special character', (value) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(value || '')
  )
  .test('has-uppercase', 'Must contain at least 1 uppercase letter', (value) =>
    /[A-Z]/.test(value || '')
  )
  .test('has-lowercase', 'Must contain at least 1 lowercase letter', (value) =>
    /[a-z]/.test(value || '')
  );
const confirmPasswordRule = yup
  .string()
  .required('Required')
  .oneOf([yup.ref('password')], 'Passwords must match');
const verificationCodeRule = yup
  .string()
  .required('Required')
  .length(6, 'Verification code must be 6 digits')
  .matches(/^\d{6}$/, 'Verification code must contain only numbers');
const termsAcceptedRule = yup
  .boolean()
  .oneOf([true], 'You must accept the Terms of Service')
  .required('You must accept the Terms of Service');
const medicalDataConsentRule = yup
  .boolean()
  .oneOf([true], 'You must consent to the processing of medical data')
  .required('You must consent to the processing of medical data');
const selectedServiceRule = yup
  .array()
  .of(
    yup
      .string()
      .oneOf(
        ['IN_HOSPITAL', 'TELEMEDICINE', 'HOME_VISIT', 'PET_SERVICES'] as const,
        'Invalid service selected'
      )
      .required()
  )
  .min(1, 'Please select at least one service')
  .required('Please select at least one service');
const petTypeRule = yup
  .string()
  .oneOf(['DOG', 'CAT', 'BIRD', 'OTHER'] as const, 'Invalid pet type')
  .required('Please select a pet type');
const breedRule = yup.string().nullable();
const genderRule = yup
  .string()
  .oneOf(['MALE', 'FEMALE', 'UNKNOWN'] as const, 'Invalid pet gender')
  .nullable();
const ageRule = yup
  .number()
  .typeError('Age must be a number')
  .integer('Age must be an integer')
  .positive('Age must be a positive number')
  .nullable();
const weightRule = yup
  .number()
  .typeError('Weight must be a number')
  .min(0.1, 'Weight must be greater than 0')
  .positive('Weight must be a positive number')
  .nullable();
const photoRule = yup
  .mixed()
  .nullable()
  .test('fileType', 'Unsupported file format. Only JPEG and PNG are allowed.', (value) => {
    if (!value) return true;
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes((value as File).type);
  })
  .test('fileSize', 'File size must be less than 2MB', (value) => {
    if (!value) return true;
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    return (value as File).size <= maxSizeInBytes;
  });
const mediaRule = yup
  .mixed()
  .optional()
  .test('fileSize', 'File size must be less than 5MB', (value) => {
    if (!value) return true;
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    return (value as File).size <= maxSizeInBytes;
  });

const booleanRule = yup
  .boolean()
  .required('Required')
  .oneOf([true, false], 'Must be true or false');

/* =================================================================================
                                EXPORT ALL RULES
   =================================================================================
*/

export {
  nameRule,
  emailRule,
  firstNameRule,
  lastNameRule,
  messageRule,
  phoneNumberRule,
  passwordRule,
  confirmPasswordRule,
  verificationCodeRule,
  termsAcceptedRule,
  medicalDataConsentRule,
  selectedServiceRule,
  petTypeRule,
  breedRule,
  genderRule,
  ageRule,
  weightRule,
  photoRule,
  mediaRule,
  booleanRule,
};
