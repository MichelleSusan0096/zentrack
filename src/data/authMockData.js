/**
 * Mock authentication data for development
 */
// Mock users for development
export const MOCK_USERS = [
    {
        id: 'user-1',
        email: 'admin@zentrack.com',
        password: 'Admin@123456',
        fullName: 'Admin User',
        role: 'government',
        phoneNumber: '+91-9876543210',
        createdAt: '2026-01-15',
        isVerified: true,
    },
    {
        id: 'user-2',
        email: 'trainee@zentrack.com',
        password: 'Trainee@123456',
        fullName: 'Michelle D\'Souza',
        role: 'trainee',
        phoneNumber: '+91-9876543211',
        createdAt: '2026-01-20',
        isVerified: true,
    },
    {
        id: 'user-3',
        email: 'provider@zentrack.com',
        password: 'Provider@123456',
        fullName: 'Apex Institute',
        role: 'provider',
        phoneNumber: '+91-9876543212',
        createdAt: '2026-02-01',
        isVerified: true,
    },
    {
        id: 'user-4',
        email: 'employer@zentrack.com',
        password: 'Employer@123456',
        fullName: 'ABC Technologies',
        role: 'employer',
        phoneNumber: '+91-9876543213',
        createdAt: '2026-02-10',
        isVerified: true,
    },
];
// Demo credentials for quick testing
export const DEMO_CREDENTIALS = {
    government: {
        email: 'admin@zentrack.com',
        password: 'Admin@123456',
    },
    trainee: {
        email: 'trainee@zentrack.com',
        password: 'Trainee@123456',
    },
    provider: {
        email: 'provider@zentrack.com',
        password: 'Provider@123456',
    },
    employer: {
        email: 'employer@zentrack.com',
        password: 'Employer@123456',
    },
};
