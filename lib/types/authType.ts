// src/lib/types/authType.ts
export type RegistrationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type SubmissionStatus   = "PENDING" | "APPROVED" | "REJECTED";

export interface CreatorProfile {
  id:                  string;
  channelLogo?:        string | null;
  platforms:           string[];
  platformLinks?:      { platform: string; url: string }[];
  primarySocialLink?:  string;
  contentType:         string;
  followers:           number;
  eventAttendance:     string;
  rank:                string;
  status:              RegistrationStatus;
  adminNotes?:         string | null;
  approvedAt?:         string | null;
  currentRankReach:    number;
  totalReachAllTime:   number;
  pictureCount:        number;
  storyCount:          number;
  reelCount:           number;
  longVideoCount:      number;
  postCount:           number;
  streamCount:         number;
  liveCount:           number;
  totalPictureCount:   number;
  totalStoryCount:     number;
  totalReelCount:      number;
  totalLongVideoCount: number;
  totalPostCount:      number;
  totalStreamCount:    number;
  totalLiveCount:      number;
  engagementRate:      number;
  commitmentScore:     number;
  adminGradeScore:     number;
  isActive:            boolean;
  joinedAt?:           string | null;
}

export interface User {
  id:          string;
  email?:      string | null;
  phone?:      string | null;
  phoneKey?:   string | null;
  firstName:   string;
  lastName:    string;
  username:    string;
  role:        "USER" | "ADMIN";
  isVerified:  boolean;
  isActive:    boolean;
  externalId?: string | null;
  provider?:   string | null;
  createdAt:   string;
  updatedAt:   string;
  lastLogin?:  string | null;
  profile?:    CreatorProfile | null;
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
  sendWhatsAppLoginOTP:     (phone: string, phoneKey: string) => Promise<boolean | "notRegistered">;
  verifyWhatsAppLoginOTP:   (phone: string, otp: string) => Promise<boolean | "requiresName">;
  sendEmailLoginOTP:        (email: string) => Promise<boolean | "notRegistered">;
  verifyEmailLoginOTP:      (email: string, otp: string) => Promise<boolean | "requiresName">;
  logout:                   () => Promise<void>;
  refreshUser:              (forceRefresh?: boolean) => Promise<void>;
  clearAuthError:           () => void;
  invalidateUserCache:      () => void;
}