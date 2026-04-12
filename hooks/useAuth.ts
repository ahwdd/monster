// hooks/useAuth.ts
"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchCurrentUser,
  sendWhatsAppRegisterOTP,
  verifyWhatsAppRegisterOTP,
  sendEmailRegisterOTP,
  verifyEmailRegisterOTP,
  sendWhatsAppLoginOTP,
  verifyWhatsAppLoginOTP,
  sendEmailLoginOTP,
  verifyEmailLoginOTP,
  signOut,
  clearError,
  invalidateCache,
} from "@/lib/store/authSlice";
import { AuthContextType } from "@/lib/types/authType";

export const useAuth = (): AuthContextType => {
  const dispatch = useAppDispatch();
  const router   = useRouter();
  const { user, loading, error, isAuthenticated, otpLoading } =
    useAppSelector((s) => s.auth);

  const fetchedOnce = useRef(false);
  const [initializationComplete, setInitializationComplete] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !loading && !fetchedOnce.current) {
      fetchedOnce.current = true;
      dispatch(fetchCurrentUser({ forceRefresh: false })).finally(() =>
        setInitializationComplete(true)
      );
    } else if (isAuthenticated) {
      setInitializationComplete(true);
    }
  }, [isAuthenticated, loading, dispatch]);

  // ── Register handlers ──────────────────────────────────────
  const sendWhatsAppRegisterOTPHandler = async (
    name: string,
    phone: string,
    phoneKey: string
  ): Promise<boolean> => {
    const result = await dispatch(
      sendWhatsAppRegisterOTP({ name, phone, phone_key: phoneKey })
    );
    return sendWhatsAppRegisterOTP.fulfilled.match(result);
  };

  const verifyWhatsAppRegisterOTPHandler = async (
    phone: string,
    otp: string
  ): Promise<boolean> => {
    const result = await dispatch(verifyWhatsAppRegisterOTP({ phone, otp }));
    return verifyWhatsAppRegisterOTP.fulfilled.match(result);
  };

  const sendEmailRegisterOTPHandler = async (
    name: string,
    email: string
  ): Promise<boolean> => {
    const result = await dispatch(sendEmailRegisterOTP({ name, email }));
    return sendEmailRegisterOTP.fulfilled.match(result);
  };

  const verifyEmailRegisterOTPHandler = async (
    email: string,
    otp: string
  ): Promise<boolean> => {
    const result = await dispatch(verifyEmailRegisterOTP({ email, otp }));
    return verifyEmailRegisterOTP.fulfilled.match(result);
  };

  // ── Login handlers ─────────────────────────────────────────
  const sendWhatsAppLoginOTPHandler = async (
    phone: string,
    phoneKey: string
  ): Promise<boolean> => {
    const result = await dispatch(
      sendWhatsAppLoginOTP({ phone, phone_key: phoneKey })
    );
    return sendWhatsAppLoginOTP.fulfilled.match(result);
  };

  const verifyWhatsAppLoginOTPHandler = async (
    phone: string,
    otp: string
  ): Promise<boolean> => {
    const result = await dispatch(verifyWhatsAppLoginOTP({ phone, otp }));
    return verifyWhatsAppLoginOTP.fulfilled.match(result);
  };

  const sendEmailLoginOTPHandler = async (email: string): Promise<boolean> => {
    const result = await dispatch(sendEmailLoginOTP({ email }));
    return sendEmailLoginOTP.fulfilled.match(result);
  };

  const verifyEmailLoginOTPHandler = async (
    email: string,
    otp: string
  ): Promise<boolean> => {
    const result = await dispatch(verifyEmailLoginOTP({ email, otp }));
    return verifyEmailLoginOTP.fulfilled.match(result);
  };

  // ── Auth management ────────────────────────────────────────
  const logout = async (): Promise<void> => {
    await dispatch(signOut());
    router.push("/auth/signin");
  };

  const refreshUser = async (forceRefresh = true): Promise<void> => {
    await dispatch(fetchCurrentUser({ forceRefresh }));
  };

  const clearAuthError     = () => dispatch(clearError());
  const invalidateUserCache = () => dispatch(invalidateCache());

  return {
    user,
    loading: loading || otpLoading,
    error,
    isAuthenticated,
    initializationComplete,
    sendWhatsAppRegisterOTP:   sendWhatsAppRegisterOTPHandler,
    verifyWhatsAppRegisterOTP: verifyWhatsAppRegisterOTPHandler,
    sendEmailRegisterOTP:      sendEmailRegisterOTPHandler,
    verifyEmailRegisterOTP:    verifyEmailRegisterOTPHandler,
    sendWhatsAppLoginOTP:      sendWhatsAppLoginOTPHandler,
    verifyWhatsAppLoginOTP:    verifyWhatsAppLoginOTPHandler,
    sendEmailLoginOTP:         sendEmailLoginOTPHandler,
    verifyEmailLoginOTP:       verifyEmailLoginOTPHandler,
    logout,
    refreshUser,
    clearAuthError,
    invalidateUserCache,
  };
};