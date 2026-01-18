import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUp, useAuth } from '@clerk/clerk-react';
import { Icon } from '../components/Icon';

export const Signup: React.FC = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            navigate('/student');
        }
    }, [isSignedIn, isLoaded, navigate]);

    // Show loading while checking auth status
    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If already signed in, show redirect message
    if (isSignedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-slate-600">Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background-light">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center px-4 md:px-16 lg:px-24 py-12 bg-white z-10">
                <div className="mb-8">
                    <Link to="/" className="flex items-center gap-2 text-primary w-fit">
                        <Icon name="subscriptions" size={32} />
                        <span className="text-xl font-bold text-text-main">SubTrack</span>
                    </Link>
                </div>

                <div className="max-w-md w-full mx-auto">
                    <h1 className="text-3xl font-bold text-text-main mb-2">Create your SubTrack account</h1>
                    <p className="text-slate-500 mb-8">Start tracking your subscriptions today.</p>

                    {/* Clerk Sign Up Component */}
                    <SignUp 
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-none p-0 w-full",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                socialButtonsBlockButton: "h-11 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors",
                                socialButtonsBlockButtonText: "text-sm font-medium text-text-main",
                                dividerLine: "bg-slate-100",
                                dividerText: "text-slate-400 text-sm",
                                formFieldLabel: "text-sm font-medium text-text-main",
                                formFieldInput: "h-11 rounded-lg border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10",
                                formButtonPrimary: "h-11 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg shadow-primary/30",
                                footerAction: "hidden",
                                footer: "hidden",
                            },
                        }}
                        routing="hash"
                        signInUrl="/login"
                        fallbackRedirectUrl="/student"
                    />

                    <p className="mt-8 text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-primary hover:text-primary-dark">Sign in</Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image/Background */}
            <div className="hidden lg:flex relative bg-slate-900 items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40"></div>
                <div className="relative z-10 p-12 text-white max-w-lg">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
                        <Icon name="savings" size={32} />
                    </div>
                    <h2 className="text-4xl font-bold mb-6 leading-tight">Join the community.</h2>
                    <p className="text-slate-300 text-lg leading-relaxed">Connect with fellow users, share savings tips, and take control of your subscriptions with SubTrack.</p>
                </div>
            </div>
        </div>
    );
};
