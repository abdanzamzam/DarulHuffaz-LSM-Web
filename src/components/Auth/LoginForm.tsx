import React, { useState } from 'react';
import { GraduationCap, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(email, password);
    
    if (!success) {
      setError('Email atau password salah. Silakan coba lagi.');
    }
    
    setIsLoading(false);
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@pesantren.id', password: 'password' },
    { role: 'Guru', email: 'teacher@pesantren.id', password: 'password' },
    { role: 'Siswa', email: 'student@pesantren.id', password: 'password' },
  ];

  const fillDemo = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">LMS Darul Huffaz</h1>
          <p className="text-sm sm:text-base text-gray-600">Sistem Pembelajaran Digital</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {error && (
              <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-xs sm:text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="masukkan email Anda"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="masukkan password Anda"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-semibold hover:from-emerald-600 hover:to-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 text-center">Akun Demo untuk Testing:</p>
            <div className="space-y-2">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => fillDemo(account.email, account.password)}
                  className="w-full text-left p-2.5 sm:p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base font-medium text-gray-900">{account.role}</span>
                    <span className="text-xs sm:text-sm text-gray-500 truncate ml-2">{account.email}</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 sm:mt-3 text-center">
              Password untuk semua akun: <code className="bg-gray-100 px-1 rounded">password</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;