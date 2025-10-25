import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CompleteAction = () => {
  const [mode, setMode] = useState(null);
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPasswordShow] = useState(false);
  const [oobCode, setOobCode] = useState(null);
  const [verifiedEmail, setVerifiedEmail] = useState(null);

  const { verifyEmail, confirmPasswordReset, verifyResetCode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hasProcessedAction = useRef(false);

  // FIXED: Enhanced URL parsing for Vercel
  const extractActionParameters = () => {
    console.log('🔗 Current URL:', window.location.href);
    console.log('🔗 Location search:', location.search);
    console.log('🔗 Full location object:', location);

    // Method 1: Check if we're on the complete-action page with direct parameters
    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      const modeParam = searchParams.get('mode');
      const code = searchParams.get('oobCode');
      
      if (modeParam && code) {
        console.log('✅ Found parameters in search:', { 
          mode: modeParam, 
          code: code.substring(0, 10) + '...' 
        });
        return { mode: modeParam, oobCode: code };
      }
    }

    // Method 2: Check the full URL
    try {
      const url = new URL(window.location.href);
      const modeParam = url.searchParams.get('mode');
      const code = url.searchParams.get('oobCode');
      
      if (modeParam && code) {
        console.log('✅ Found parameters in full URL:', { 
          mode: modeParam, 
          code: code.substring(0, 10) + '...' 
        });
        return { mode: modeParam, oobCode: code };
      }
    } catch (err) {
      console.error('❌ Error parsing URL:', err);
    }

    // Method 3: Check for Firebase-style redirect (apiKey, mode, oobCode)
    try {
      const url = new URL(window.location.href);
      const modeParam = url.searchParams.get('mode');
      const code = url.searchParams.get('oobCode');
      const apiKey = url.searchParams.get('apiKey');
      
      if (modeParam && code && apiKey) {
        console.log('✅ Found Firebase-style parameters:', { 
          mode: modeParam, 
          code: code.substring(0, 10) + '...' 
        });
        return { mode: modeParam, oobCode: code };
      }
    } catch (err) {
      console.error('❌ Error parsing Firebase URL:', err);
    }

    console.log('❌ No valid parameters found in URL');
    return { mode: null, oobCode: null };
  };

  useEffect(() => {
    if (hasProcessedAction.current) return;

    // Handle success messages from navigation
    if (location.state?.message) {
      setMode('message');
      setStatus('success');
      setMessage(location.state.message);
      setVerifiedEmail(location.state?.email || null);
      hasProcessedAction.current = true;
      return;
    }

    const { mode: modeParam, oobCode: code } = extractActionParameters();
    
    if (!modeParam || !code) {
      setStatus('error');
      setError('The action link is invalid or incomplete. Please ensure you copied the entire URL from your email or request a new action link.');
      hasProcessedAction.current = true;
      return;
    }

    setOobCode(code);
    setMode(modeParam);

    const processAction = async () => {
      hasProcessedAction.current = true;
      setStatus('loading');

      try {
        if (modeParam === 'verifyEmail') {
          setMessage('Verifying your email...');
          const result = await verifyEmail(code);
          if (result.success) {
            setStatus('success');
            setMessage('Email verified successfully! You can now sign in.');
            setVerifiedEmail(result.email);
          } else {
            setStatus('error');
            setError(result.error || 'Email verification failed. Please request a new verification email.');
          }
        } else if (modeParam === 'resetPassword') {
          setMessage('Verifying reset link...');
          const result = await verifyResetCode(code);
          if (result.success) {
            setStatus('form');
            setVerifiedEmail(result.email);
            setMessage(`Create a new password for ${result.email}`);
          } else {
            setStatus('error');
            setError(result.error || 'Reset link verification failed. Please request a new password reset.');
          }
        } else {
          setStatus('error');
          setError('Unknown action type in the link.');
        }
      } catch (err) {
        console.error("❌ Action Processing Error:", err);
        setStatus('error');
        setError('Failed to process action. The link may be expired or invalid. Please request a new link.');
      }
    };

    processAction();
  }, [location, verifyEmail, verifyResetCode]);

  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();

    if (!oobCode) {
      setError('Invalid reset link or code missing.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setStatus('loading');
    setError('');
    setMessage('Applying new password...');

    try {
      const result = await confirmPasswordReset(oobCode, password);
        
      if (result.success) {
        setStatus('success');
        setMessage('Password reset successfully! Redirecting to sign in...');
        
        setTimeout(() => {
          navigate('/signin', { 
            state: { 
              message: 'Password reset successful! Please sign in.',
              email: verifiedEmail 
            },
            replace: true
          });
        }, 3000);
      } else {
        setStatus('form'); 
        setError(result.error || 'Password reset failed. Please try again.');
        setMessage(`Create a new password for ${verifiedEmail}`);
      }
    } catch (err) {
      setStatus('form');
      setError(err.message || 'Password reset failed. Please try again.');
    }
  };

  const handleGoToSignIn = () => {
    navigate('/signin', { 
      state: { email: verifiedEmail },
      replace: true
    });
  };

  const handleGoToHome = () => {
    navigate('/', { replace: true });
  };

  const handleRequestNewLink = () => {
    if (mode === 'resetPassword') {
      navigate('/forgot-password', { replace: true });
    } else {
      navigate('/signin', { replace: true });
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'checking':
      case 'loading':
        return (
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">{message || 'Processing your request...'}</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              {mode === 'verifyEmail' ? 'Email Verified! 🎉' : 'Verification Sent'}
            </h2>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-400/30 rounded-2xl p-6 mb-6">
              <p className="text-gray-200 text-center">{message}</p>
            </div>
            <button 
              onClick={handleGoToSignIn}
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              Go to Sign In
            </button>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold text-white mb-2">Action Failed</h2>
            <p className="text-red-300 mb-4">{error}</p>
            <p className="text-gray-400 text-sm mb-6">
              Please request a new {mode === 'resetPassword' ? 'password reset' : 'verification'} link.
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={handleRequestNewLink}
                className="w-full px-4 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors"
              >
                Request New Link
              </button>
              <button 
                onClick={handleGoToSignIn}
                className="w-full px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
              >
                Back to Sign In
              </button>
              <button 
                onClick={handleGoToHome}
                className="w-full px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        );

      case 'form':
        return (
          <form onSubmit={handlePasswordResetSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-cyan-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Reset Password
              </h2>
              <p className="text-gray-300 mt-2">{message}</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter new password (min 6 chars)"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmPasswordShow(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              {status === 'loading' ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-full max-w-md relative z-10 shadow-2xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default CompleteAction;