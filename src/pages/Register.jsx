import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const password = watch('password', '');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await registerUser(data.firstName, data.lastName, data.email, data.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Failed to register');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                    ring-inset ${errors.firstName ? 'ring-red-300' : 'ring-gray-300'} 
                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                    {...register('firstName', { 
                      required: 'First name is required',
                      minLength: {
                        value: 2,
                        message: 'First name must have at least 2 characters'
                      }
                    })}
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                    ring-inset ${errors.lastName ? 'ring-red-300' : 'ring-gray-300'} 
                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                    {...register('lastName', { 
                      required: 'Last name is required',
                      minLength: {
                        value: 2,
                        message: 'Last name must have at least 2 characters'
                      }
                    })}
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ${errors.email ? 'ring-red-300' : 'ring-gray-300'} 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: { 
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    } 
                  })}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ${errors.password ? 'ring-red-300' : 'ring-gray-300'} 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must have at least 8 characters'
                    }
                  })}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ${errors.confirmPassword ? 'ring-red-300' : 'ring-gray-300'} 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600`}
                {...register('terms', { 
                  required: 'You must agree to the terms and conditions'
                })}
              />
              <label htmlFor="terms" className="ml-3 block text-sm leading-6 text-gray-900">
                I agree to the{' '}
                <Link to="/terms" className="font-semibold text-blue-600 hover:text-blue-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-semibold text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms.message}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;