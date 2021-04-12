import { User } from '../../user/models/user';
import { Company } from '../../company/models/company';

export interface Project {
    name: { type: object, empty: false, required: true };
    description: { type: object, empty: true, required: false };
    meta: { type: object, empty: true, required: false };
    data: { type: object, empty: true, required: false };
    scaling: { type: object, empty: true, required: false };
    device: { type: object, empty: true, required: false};
    dashboard: { type: object, empty: true, required: false };
    connections: { type: object, empty: true, required: false};
    exportOptions: { type: string, empty: true, required: false};
    idUser: User;
    idCompany: { type: Company, empty: true, required: false}

}
