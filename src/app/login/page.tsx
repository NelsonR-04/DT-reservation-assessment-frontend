'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { login } from '@/features/auth/store/authSlice';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';

const LoginPage = () => {
  const [email, setEmail] = useState('nelson@assessment.com');
  const [password, setPassword] = useState('contraseña');
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      push('/places');
    }
  }, [isAuthenticated, push]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      dispatch(
        login({
          id: 1,
          name: email.split('@')[0] || 'Usuario',
          email: email,
          role: 'employee',
        }),
      );

      push('/places');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Dashboard de Empleados
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistema de gestión de reservas CoWork Space
          </p>
        </div>

        <Card className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyUp={handleKeyPress}
                  placeholder="empleado@coworkspace.com"
                  className="appearance-none relative block w-full px-3 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyUp={handleKeyPress}
                  placeholder="••••••••"
                  className="appearance-none relative block w-full px-3 py-2"
                  required
                />
              </div>
            </div>

            <div className="h-full">
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : null}
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
