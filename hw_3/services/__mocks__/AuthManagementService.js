import { fakeJwtToken } from '../../mocks';

export class AuthManagementService {
    authenticate = async () => Promise.resolve({ token: fakeJwtToken });
}
