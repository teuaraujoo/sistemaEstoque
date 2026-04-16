import { Mail, Lock, Package } from "lucide-react";
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from "react";
import { useLoginForm } from "../hooks/Login/useLoginForm";
import { Navigate } from "react-router-dom";

function LoginPage() {
    const formRef = useRef(null);
    const ref = useRef(null);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        async function validarUser() {
            try {
                const response = await fetch('http://localhost:8800/api/v1/usuario/user', {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (response.ok) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                };
            } catch {
                setIsAuth(false);
            }
        }
        validarUser();
    }, []);

    useEffect(() => {
        gsap.fromTo(
            formRef.current,
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            }
        );
    }, []);

    const handleSubmit = useLoginForm({ ref });

    if (isAuth) {
        return <Navigate to="/" replace />
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-[#f5f3fb] to-[#eef1ff] text-slate-800 overflow-hidden" id="loginPage">
            <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[-120px] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-white/50 blur-3xl" />
                    <div className="absolute right-[-140px] top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-indigo-100/40 blur-3xl" />
                </div>

                <div className="relative z-10 flex w-full max-w-5xl items-center justify-center gap-16">
                    <div className="w-full max-w-md text-center">
                        <div className="mb-5 flex justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-[0_18px_40px_rgba(79,70,229,0.28)]">
                                <Package className="text-white w-8 h-8" />
                            </div>
                        </div>

                        <h1 className="text-5xl font-bold text-indigo-700">
                            StockManager
                        </h1>

                        <div
                            className="mt-10 rounded-3xl border border-white/60 bg-white/70 p-11 text-left shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl" ref={formRef} >
                            <h2 className="text-[38px] font-semibold text-slate-900 text-center">
                                Welcome Back
                            </h2>
                            <p className="mt-3 text-lg leading-relaxed text-slate-500 text-center">
                                Enter your credentials to access your dashboard.
                            </p>

                            {/* FORM */}

                            <form
                                className="mt-10 space-y-7"
                                ref={ref}
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label className="mb-3 block text-xs tracking-[0.22em] font-semibold uppercase text-slate-500">
                                        Email Address
                                    </label>
                                    <div className="flex h-14 items-center gap-3 rounded-2xl bg-[#f6f4fb] px-4 text-slate-400 ring-1 ring-transparent transition focus-within:ring-2 focus-within:ring-indigo-400">
                                        <Mail className="w-5 h-5" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="name@company.com"
                                            className="w-full bg-transparent text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-3 flex items-center justify-between">
                                        <label className="block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                            Password
                                        </label>
                                    </div>
                                    <div className="flex h-14 items-center gap-3 rounded-2xl bg-[#f6f4fb] px-4 text-slate-400 ring-1 ring-transparent transition focus-within:ring-2 focus-within:ring-indigo-400">
                                        <Lock className="w-5 h-5" />
                                        <input
                                            type="password"
                                            name="senha"
                                            placeholder="••••••••"
                                            className="w-full bg-transparent text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="cursor-pointer group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-400 text-xl font-semibold text-white shadow-[0_16px_30px_rgba(99,102,241,0.35)] transition hover:scale-[1.01] hover:shadow-[0_20px_35px_rgba(99,102,241,0.38)] active:scale-[0.99]"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>

                        <p className="mt-10 text-lg text-slate-600">
                            Don't have an account?{' '}
                            <a
                                href="mailto:empresarial.mateus25@gmail.com?subject=Conta%20Sistema%20de%20Estoque&body=Mateus%2C%20preciso%20de%20uma%20conta%20no%20sistema%20de%20estoquemailto:empresarial.mateus25@gmail.com?subject=Conta%20Sistema%20de%20Estoque&body=Mateus%2C%20preciso%20de%20uma%20conta%20no%20sistema%20de%20estoque"
                                className="font-semibold text-indigo-700 hover:text-indigo-800"
                            >
                                Contact your Administrator
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;