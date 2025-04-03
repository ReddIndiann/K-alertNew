import { ReactNode } from "react";
export type GoogleAuthProps = {
    type: "signIn" | "signUp";
    onClick: () => void;
};

export type NavLinkItem = {
    to: string;
    icon: React.ReactNode;
    label: string;
};

export type NavItemProps = {
    to: string;
    icon: React.ReactNode;
    label: string;
    isDisabled: boolean;
    onClick: () => void;
};
export interface DefaultLayoutProps {
    children: ReactNode;
}

export interface ProtectedRouteProps {
    children: React.ReactElement;
}

export interface RedirectIfAuthenticatedProps {
    children: React.ReactElement;
}

export interface User {
    uid: string;
    email: string;
    name: string;
}

export interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean
    profileImage: string | null;
  updateProfileImage: () => Promise<void>;
}

export interface ServiceList {
    id:string,
    isAvailable: boolean,
    price: number,
    
    service_name: string,
    description: string
}

 export interface ProfileData {
    name: string;
    email: string;
    phoneNumber: string;
    uuid: string;
    provider: string;
    location: string;
    createdAt: string;
  }
  // lib/types.ts
export interface Payment {
    clienttransid: string;
    createdAt: { toDate: () => Date };
    documentId: string;
    paymentId: string;
    reason: string;
    status: boolean;
    statusdate: string;
    transactionid: string;
    walletnumber: string;
    paymentFor: string;
    recipientNumber?: string;
    userId?: string;
  }
  
  export interface Request {
    address: string;
    createdAt: { toDate: () => Date };
    documentURL: string;
    isDocumentValid: boolean;
    name: string;
    paymentStatus: boolean;
    phoneNumber: string;
    serviceType: string;
    status: boolean;
    userId: string;
    documentId: string;
    resultsUrl: string;
  }

  
  export interface ServiceList {
    id: string;
    service_name: string;
    description: string;
    price: number;
  }
  
  export interface FormData {
    name: string;
    number: string;
    address: string;
    document: File | null;
    documentPreview: string | null;
  }
  
  export interface PaymentPayload {
    amount: number;
    appid: string;
    clientreference: string;
    clienttransid: string;
    description: string;
    nickname: string;
    paymentoption: string;
    walletnumber: string;
    documentId: string;
    userId: string;
    recipientNumber: string;
    service: string;
    paymentFor:string;
  }
  export interface UserBooking {
    id: string;
    selectedSlot: Date;
    name: string;
    email: string;
    phone: string;
    consultationType: string;
    description: string;
    topic: string;
    status: string;
    paymentStatus: boolean;
    serviceType:string;
    createdAt: Date;
  }
  type ConsultationType =  'General Consultancy/Advisory' | 'Land Survey' | 'Property Registration';

  export interface ConsultFormData {
    name: string;
    email: string;
    phone: string;
    consultationType: ConsultationType;
    description: string;
  }



  
  export interface Service {
    title: string;
    description: string;
    price: string;
    icon: string;
    url: string;
  }
  
  export interface ContactAd {
    headline: string;
    description: string;
    contact: {
      heading: string;
      email: string;
      address: string;
    };
    advertImageUrl?: string;
  }