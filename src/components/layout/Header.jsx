import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon,
  UserCircleIcon, 
  DocumentTextIcon,
  BriefcaseIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

function Header() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    ...(isAuthenticated ? [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'CV Builder', href: '/cv-builder' },
      { name: 'Job Applications', href: '/job-application' },
      { name: 'Templates', href: '/templates' },
      { name: 'Profile', href: '/profile' },
    ] : [])
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-blue-600">LinkedCV</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {currentUser?.firstName}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                Log out <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-xl font-bold text-blue-600">LinkedCV</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log out
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition.Root>
    </header>
  );
}

export default Header;