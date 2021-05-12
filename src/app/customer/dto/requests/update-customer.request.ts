export class UpdateCustomerRequest {
    constructor(
        public id: string,
        public name: string,
        public emailAddress: string,
        public phoneNumber: string
    ) {}
}
