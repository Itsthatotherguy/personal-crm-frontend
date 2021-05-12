export class CreateCustomerRequest {
    constructor(
        public name: string,
        public emailAddress: string,
        public phoneNumber: string
    ) {}
}
