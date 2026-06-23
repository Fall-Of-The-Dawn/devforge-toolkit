import { faker } from '@faker-js/faker';

export const DATA_TYPES = [
  { id: 'uuid', label: 'UUID / ID', group: 'System', fn: () => faker.string.uuid() },
  { id: 'fullName', label: 'Full Name', group: 'Personal', fn: () => faker.person.fullName() },
  { id: 'email', label: 'Email Address', group: 'Personal', fn: () => faker.internet.email() },
  { id: 'phone', label: 'Phone Number', group: 'Personal', fn: () => faker.phone.number() },
  { id: 'jobTitle', label: 'Job Title', group: 'Work', fn: () => faker.person.jobTitle() },
  { id: 'company', label: 'Company Name', group: 'Work', fn: () => faker.company.name() },
  { id: 'amount', label: 'Price / Amount', group: 'Finance', fn: () => faker.finance.amount({ min: 10, max: 1000, dec: 2 }) },
  { id: 'boolean', label: 'True / False', group: 'System', fn: () => String(faker.datatype.boolean()) },
];
