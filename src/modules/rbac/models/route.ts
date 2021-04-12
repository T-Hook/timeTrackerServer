export interface Route {
    name: { type: string, empty: false, required: true, index: { unique: true } };
    description: { type: string, empty: true, required: false, default: 'no description for this Route ' };
    url: { type: string, empty: false, required: true};
    method: { type: string, empty: false, required: true };
    data: { type: string, empty: true, required: false, default: '' };
    active: { type: boolean, empty: false, required: false, default: false};

}