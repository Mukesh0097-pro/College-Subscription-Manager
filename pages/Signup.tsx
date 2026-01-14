import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';

export const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just navigate to login or dashboard
        navigate('/student');
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background-light">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center px-4 md:px-16 lg:px-24 py-12 bg-white z-10">
                <div className="mb-8">
                    <Link to="/" className="flex items-center gap-2 text-primary w-fit">
                        <Icon name="school" size={32} />
                        <span className="text-xl font-bold text-text-main">CampusPass</span>
                    </Link>
                </div>

                <div className="max-w-md w-full mx-auto">
                    <h1 className="text-3xl font-bold text-text-main mb-2">Create an account</h1>
                    <p className="text-slate-500 mb-8">Start your journey with CampusPass today.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-main" htmlFor="name">Full Name</label>
                            <div className="relative">
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Icon name="person" size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-main" htmlFor="email">Email</label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                    placeholder="john@university.edu"
                                    required
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Icon name="mail" size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-main" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                    placeholder="Create a password"
                                    required
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Icon name="lock" size={20} />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="h-11 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 mt-2">
                            Create Account
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-400">Or sign up with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="h-11 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                            <span className="text-sm font-medium text-text-main">Google</span>
                        </button>
                        <button className="h-11 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                            <Icon name="apple" size={20} />
                            <span className="text-sm font-medium text-text-main">Apple</span>
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-primary hover:text-primary-dark">Sign in</Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image/Background */}
            <div className="hidden lg:flex relative bg-slate-900 items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40"></div>
                <div className="relative z-10 p-12 text-white max-w-lg">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
                        <Icon name="groups" size={32} />
                    </div>
                    <h2 className="text-4xl font-bold mb-6 leading-tight">Join the community.</h2>
                    <p className="text-slate-300 text-lg leading-relaxed">Connect with peers, organize meetups, and make the most of your campus life with CampusPass.</p>
                </div>
            </div>
        </div>
    );
};
