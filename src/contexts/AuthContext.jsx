import { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset as fbConfirmPasswordReset,
  verifyPasswordResetCode as fbVerifyPasswordResetCode,
  sendEmailVerification,
  applyActionCode,
  checkActionCode
} from 'firebase/auth';
import { app } from '../firebase/firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // FIXED: Dynamic action URL for localhost vs Vercel
  const getActionUrl = () => {
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    
    if (isProduction) {
      // Use your exact Vercel domain
      return "https://yobo-production-neke.vercel.app/complete-action";
    } else {
      // Use localhost for development
      return "http://localhost:5173/complete-action";
    }
  };

  // Action code settings
  const actionCodeSettings = {
    url: getActionUrl(),
    handleCodeInApp: true
  };

  // Sign up with email and password
  const signUp = async (email, password, firstName, lastName) => {
    try {
      console.log('🔄 Signing up...');
      console.log('🔗 Using action URL:', getActionUrl());
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with name
      const fullName = `${firstName} ${lastName}`;
      await updateProfile(user, {
        displayName: fullName,
      });

      // Send email verification link
      await sendEmailVerification(user, actionCodeSettings);

      console.log('✅ Sign up successful, verification email sent.');
      return { 
        success: true, 
        message: 'Registration successful! A verification email has been sent to your inbox. Please verify your email before signing in.',
        email: email
      };
    } catch (error) {
      console.error('❌ Sign up failed:', error);
      let errorMessage;
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Try signing in.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is too weak. Please choose a stronger one.';
          break;
        default:
          errorMessage = `Registration failed: ${error.message}`;
      }
      return { success: false, error: errorMessage };
    }
  };

  // Rest of your AuthContext methods remain the same...
  const signIn = async (email, password) => {
    try {
      console.log('🔄 Signing in...');
      await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Sign in successful.');
      return { success: true };
    } catch (error) {
      console.error('❌ Sign in failed:', error);
      let errorMessage;
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password. Please check your credentials.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Invalid password.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errorMessage = `Sign in failed: ${error.message}`;
      }
      return { success: false, error: errorMessage };
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('🔄 Signing in with Google...');
      await signInWithPopup(auth, googleProvider);
      console.log('✅ Google Sign in successful.');
      return { success: true };
    } catch (error) {
      console.error('❌ Google Sign in failed:', error);
      let errorMessage;
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in window closed. Please try again.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in was interrupted. Please try again.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Sign-in popup was blocked. Please allow popups for this site.';
          break;
        default:
          errorMessage = `Google sign-in failed: ${error.message}`;
      }
      return { success: false, error: errorMessage };
    }
  };

  const resetPassword = async (email) => {
    try {
      console.log('🔄 Sending password reset email to:', email);
      console.log('🔗 Using action URL:', getActionUrl());
      
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      
      console.log('✅ Password reset email sent successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Password reset failed:', error);
      let errorMessage;
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'If an account with that email exists, a password reset link has been sent.';
          break;
        default:
          errorMessage = `Password reset failed: ${error.message}`;
      }
      return { success: false, error: errorMessage };
    }
  };

  const verifyEmail = async (oobCode) => {
    try {
      console.log('🔄 Verifying email with code:', oobCode.substring(0, 10) + '...');
      const info = await checkActionCode(auth, oobCode);
      const email = info.data.email;
      
      await applyActionCode(auth, oobCode);

      if (auth.currentUser && auth.currentUser.email === email) {
        await auth.currentUser.reload();
      }
      
      console.log('✅ Email verification successful for:', email);
      return { success: true, email };
    } catch (error) {
      console.error('❌ Email verification failed:', error);
      let errorMessage;
      switch (error.code) {
        case 'auth/invalid-action-code':
          errorMessage = 'The verification link is invalid or has expired. Please request a new verification email.';
          break;
        case 'auth/expired-action-code':
          errorMessage = 'The verification link has expired. Please request a new one.';
          break;
        default:
          errorMessage = `Email verification failed: ${error.message}`;
      }
      return { success: false, error: errorMessage };
    }
  };

  const verifyResetCode = async (oobCode) => {
    try {
      console.log('🔄 Verifying reset code:', oobCode.substring(0, 10) + '...');
      const email = await fbVerifyPasswordResetCode(auth, oobCode);
      console.log('✅ Password reset code verified for:', email);
      return { success: true, email };
    } catch (error) {
      console.error('❌ Password reset code verification failed:', error);
      let errorMessage;
      switch (error.code) {
        case 'auth/expired-action-code':
          errorMessage = 'The reset link has expired. Please request a new password reset.';
          break;
        case 'auth/invalid-action-code':
          errorMessage = 'The reset link is invalid or malformed. Please use the latest reset link from your email.';
          break;
        default:
          errorMessage = `Reset link verification failed: ${error.message}`;
      }
      return { success: false, error: errorMessage };
    }
  };

  const confirmPasswordReset = async (oobCode, newPassword) => {
    try {
      console.log('🔄 Confirming password reset...');
      await fbConfirmPasswordReset(auth, oobCode, newPassword);
      console.log('✅ Password reset successful.');
      return { success: true };
    } catch (error) {
      console.error('❌ Password reset confirmation failed:', error);
      let errorMessage;
      switch (error.code) {
        case 'auth/expired-action-code':
          errorMessage = 'The reset link has expired. Please request a new one.';
          break;
        case 'auth/invalid-action-code':
          errorMessage = 'The reset link is invalid. Please ensure you clicked the latest link from your email.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is too weak. Please choose a stronger password.';
          break;
        default:
          errorMessage = `Password reset failed: ${error.message}`;
      }
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('🔄 Auth state changed:', user ? user.email : 'No user');
      
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          firstName: user.displayName?.split(' ')[0] || 'User',
          lastName: user.displayName?.split(' ')[1] || '',
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const value = {
    user,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword,
    verifyEmail,
    verifyResetCode,
    confirmPasswordReset,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};