// lib/types/authType.ts

export interface CreatorProfile {
  id:              string;
  channelLogo?:    string | null;
  platforms:       string[];
  contentType:     string;
  socialMediaLink: string;
  followers:       number;
  eventAttendance: string;
  rank:            string;
  currentLevel:    string;
  totalPoints:     number;
  levelProgress:   number;
  streamCount:     number;
  shortCount:      number;
  reelCount:       number;
  totalReach:      number;
  totalViews:      number;
  isApproved:      boolean;
  isActive:        boolean;
  cohortMonth?:    number | null;
  joinedAt?:       string | null;
}

export interface User {
  id:         string;
  email?:     string | null;
  phone?:     string | null;
  phoneKey?:  string | null;
  firstName:  string;
  lastName:   string;
  username:   string;
  role:       "USER" | "ADMIN";
  isVerified: boolean;
  isActive:   boolean;
  externalId?: string | null;
  provider?:  string | null;
  createdAt:  string;
  updatedAt:  string;
  lastLogin?: string | null;
  profile?:   CreatorProfile | null;
}

export interface AuthContextType {
  user:                     User | null;
  loading:                  boolean;
  error:                    string | null;
  isAuthenticated:          boolean;
  initializationComplete:   boolean;
  sendWhatsAppRegisterOTP:  (name: string, phone: string, phoneKey: string) => Promise<boolean>;
  verifyWhatsAppRegisterOTP:(phone: string, otp: string) => Promise<boolean>;
  sendEmailRegisterOTP:     (name: string, email: string) => Promise<boolean>;
  verifyEmailRegisterOTP:   (email: string, otp: string) => Promise<boolean>;
  sendWhatsAppLoginOTP:     (phone: string, phoneKey: string) => Promise<boolean>;
  verifyWhatsAppLoginOTP:   (phone: string, otp: string) => Promise<boolean>;
  sendEmailLoginOTP:        (email: string) => Promise<boolean>;
  verifyEmailLoginOTP:      (email: string, otp: string) => Promise<boolean>;
  logout:                   () => Promise<void>;
  refreshUser:              (forceRefresh?: boolean) => Promise<void>;
  clearAuthError:           () => void;
  invalidateUserCache:      () => void;
}