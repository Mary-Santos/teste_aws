interface Contact {
    type: 'email' | 'phone';
    value: string;
    isPrimary: boolean;
  }
  
  interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
  }
  
  export interface Client {
    id: string;
    name: string;
    birthDate: string;
    status: 'active' | 'inactive';
    addresses: Address[];
    contacts: Contact[];
  }
  