// lib/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/lib/types/authType";

interface AuthState {
  user:                  User | null;
  loading:               boolean;
  error:                 string | null;
  isAuthenticated:       boolean;
  otpLoading:            boolean;
  lastFetchTime:         number | null;
  cacheValidityDuration: number;
}

const FIVE_MINUTES = 5 * 60 * 1000;

const initialState: AuthState = {
  user:                  null,
  loading:               false,
  error:                 null,
  isAuthenticated:       false,
  otpLoading:            false,
  lastFetchTime:         null,
  cacheValidityDuration: FIVE_MINUTES,
};

function isCacheValid(lastFetchTime: number | null, duration: number): boolean {
  if (!lastFetchTime) return false;
  return Date.now() - lastFetchTime < duration;
}

// ── Fetch current user ───────────────────────────────────────
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async ({ forceRefresh = false }: { forceRefresh?: boolean } = {}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const { lastFetchTime, cacheValidityDuration, user } = state.auth;
      if (!forceRefresh && user && isCacheValid(lastFetchTime, cacheValidityDuration)) {
        return user;
      }
      const res = await fetch("/api/users/user", { credentials: "include" });
      if (res.status === 401) throw new Error("Unauthorized");
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch user");
      }
      const data = await res.json();
      return data?.user ?? null;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to fetch user");
    }
  }
);

// ── Register — WhatsApp ──────────────────────────────────────
export const sendWhatsAppRegisterOTP = createAsyncThunk(
  "auth/sendWhatsAppRegisterOTP",
  async ({ name, phone, phone_key }: { name: string; phone: string; phone_key: string }, { rejectWithValue }) => {
    try {
      const res  = await fetch("/api/auth/register/whatsapp/send-otp", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, phone_key }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to send OTP");
      return data;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to send OTP");
    }
  }
);

export const verifyWhatsAppRegisterOTP = createAsyncThunk(
  "auth/verifyWhatsAppRegisterOTP",
  async ({ phone, otp }: { phone: string; otp: string }, { rejectWithValue }) => {
    try {
      const res  = await fetch("/api/auth/register/whatsapp/verify-otp", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to verify OTP");
      return data.data?.user ?? null;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to verify OTP");
    }
  }
);

// ── Register — Email ─────────────────────────────────────────
export const sendEmailRegisterOTP = createAsyncThunk(
  "auth/sendEmailRegisterOTP",
  async ({ name, email }: { name: string; email: string }, { rejectWithValue }) => {
    try {
      const res  = await fetch("/api/auth/register/email/send-otp", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to send OTP");
      return data;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to send OTP");
    }
  }
);

export const verifyEmailRegisterOTP = createAsyncThunk(
  "auth/verifyEmailRegisterOTP",
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const res  = await fetch("/api/auth/register/email/verify-otp", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to verify OTP");
      return data.data?.user ?? null;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to verify OTP");
    }
  }
);

// ── Login — WhatsApp ─────────────────────────────────────────
export const sendWhatsAppLoginOTP = createAsyncThunk(
  "auth/sendWhatsAppLoginOTP",
  async ({ phone, phone_key }: { phone: string; phone_key: string }, { rejectWithValue }) => {
    try {
      const res  = await fetch("/api/auth/login/whatsapp/send-otp", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, phone_key }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to send OTP");
      return data;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to send OTP");
    }
  }
);

export const verifyWhatsAppLoginOTP = createAsyncThunk(
  "auth/verifyWhatsAppLoginOTP",
  async ({ phone, otp }: { phone: string; otp: string }, { rejectWithValue }) => {
    try {
      const res  = await fetch("/api/auth/login/whatsapp/verify-otp", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to verify OTP");
      // New user — no local account yet. Pass the flag through to the page.
      if (data.requiresName) return { requiresName: true as const };
      return data.data?.user ?? null;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to verify OTP");
    }
  }
);

// ── Login — Email ────────────────────────────────────────────
export const sendEmailLoginOTP = createAsyncThunk(
  "auth/sendEmailLoginOTP",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const res  = await fetch("/api/auth/login/email/send-otp", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to send OTP");
      return data;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to send OTP");
    }
  }
);

export const verifyEmailLoginOTP = createAsyncThunk(
  "auth/verifyEmailLoginOTP",
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const res  = await fetch("/api/auth/login/email/verify-otp", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to verify OTP");
      // New user — no local account yet. Pass the flag through to the page.
      if (data.requiresName) return { requiresName: true as const };
      return data.data?.user ?? null;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to verify OTP");
    }
  }
);

// ── Sign out ─────────────────────────────────────────────────
export const signOut = createAsyncThunk("auth/signOut", async (_, { rejectWithValue }) => {
  try {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : "Sign out failed");
  } finally {
    location.reload();
  }
});

// ── Slice ────────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.lastFetchTime = Date.now();
      }
    },
    invalidateCache: (state) => { state.lastFetchTime = null; },
  },
  extraReducers: (builder) => {
    builder
      // fetchCurrentUser
      .addCase(fetchCurrentUser.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = action.payload !== null;
        state.lastFetchTime = Date.now();
      })
      .addCase(fetchCurrentUser.rejected,  (state, action) => {
        state.loading = false; 
        // state.error = action.payload as string;
        const msg = action.payload as string;
        state.error = msg === "Unauthorized" ? null : msg;
        state.user = null; state.isAuthenticated = false; state.lastFetchTime = null;
      })

      // sendWhatsAppRegisterOTP
      .addCase(sendWhatsAppRegisterOTP.pending,   (state) => { state.otpLoading = true; state.error = null; })
      .addCase(sendWhatsAppRegisterOTP.fulfilled, (state) => { state.otpLoading = false; })
      .addCase(sendWhatsAppRegisterOTP.rejected,  (state, action) => { state.otpLoading = false; state.error = action.payload as string; })

      // verifyWhatsAppRegisterOTP
      .addCase(verifyWhatsAppRegisterOTP.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(verifyWhatsAppRegisterOTP.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) { state.user = action.payload; state.isAuthenticated = true; state.lastFetchTime = Date.now(); }
      })
      .addCase(verifyWhatsAppRegisterOTP.rejected,  (state, action) => {
        state.loading = false; state.error = action.payload as string;
        state.user = null; state.isAuthenticated = false; state.lastFetchTime = null;
      })

      // sendEmailRegisterOTP
      .addCase(sendEmailRegisterOTP.pending,   (state) => { state.otpLoading = true; state.error = null; })
      .addCase(sendEmailRegisterOTP.fulfilled, (state) => { state.otpLoading = false; })
      .addCase(sendEmailRegisterOTP.rejected,  (state, action) => { state.otpLoading = false; state.error = action.payload as string; })

      // verifyEmailRegisterOTP
      .addCase(verifyEmailRegisterOTP.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(verifyEmailRegisterOTP.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) { state.user = action.payload; state.isAuthenticated = true; state.lastFetchTime = Date.now(); }
      })
      .addCase(verifyEmailRegisterOTP.rejected,  (state, action) => {
        state.loading = false; state.error = action.payload as string;
        state.user = null; state.isAuthenticated = false; state.lastFetchTime = null;
      })

      // sendWhatsAppLoginOTP
      .addCase(sendWhatsAppLoginOTP.pending,   (state) => { state.otpLoading = true; state.error = null; })
      .addCase(sendWhatsAppLoginOTP.fulfilled, (state) => { state.otpLoading = false; })
      .addCase(sendWhatsAppLoginOTP.rejected,  (state, action) => { state.otpLoading = false; state.error = action.payload as string; })

      // verifyWhatsAppLoginOTP
      .addCase(verifyWhatsAppLoginOTP.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(verifyWhatsAppLoginOTP.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        // Guard: { requiresName: true } means no local user yet — don't touch auth state.
        if (!payload || (typeof payload === "object" && "requiresName" in payload)) return;
        state.user = payload as User;
        state.isAuthenticated = true;
        state.lastFetchTime = Date.now();
      })
      .addCase(verifyWhatsAppLoginOTP.rejected,  (state, action) => {
        state.loading = false; state.error = action.payload as string;
        state.user = null; state.isAuthenticated = false; state.lastFetchTime = null;
      })

      // sendEmailLoginOTP
      .addCase(sendEmailLoginOTP.pending,   (state) => { state.otpLoading = true; state.error = null; })
      .addCase(sendEmailLoginOTP.fulfilled, (state) => { state.otpLoading = false; })
      .addCase(sendEmailLoginOTP.rejected,  (state, action) => { state.otpLoading = false; state.error = action.payload as string; })

      // verifyEmailLoginOTP
      .addCase(verifyEmailLoginOTP.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(verifyEmailLoginOTP.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        // Guard: { requiresName: true } means no local user yet — don't touch auth state.
        // The signin page handles the name step; auth completes via /api/auth/complete-profile.
        if (!payload || (typeof payload === "object" && "requiresName" in payload)) return;
        state.user = payload as User;
        state.isAuthenticated = true;
        state.lastFetchTime = Date.now();
      })
      .addCase(verifyEmailLoginOTP.rejected,  (state, action) => {
        state.loading = false; state.error = action.payload as string;
        state.user = null; state.isAuthenticated = false; state.lastFetchTime = null;
      })

      // signOut
      .addCase(signOut.pending,   (state) => { state.loading = true; })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false; state.user = null;
        state.isAuthenticated = false; state.error = null; state.lastFetchTime = null;
      })
      .addCase(signOut.rejected,  (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { clearError, updateUser, invalidateCache } = authSlice.actions;
export default authSlice.reducer;