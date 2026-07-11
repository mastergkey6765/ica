/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AuthProvider } from './lib/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminRoute from './components/layout/AdminRoute';

const About = lazy(() => import('./pages/About'));
const DrLord = lazy(() => import('./pages/DrLord'));
const Leadership = lazy(() => import('./pages/Leadership'));
const AdvisoryBoard = lazy(() => import('./pages/AdvisoryBoard'));
const TDIModel = lazy(() => import('./pages/TDIModel'));
const Assessment = lazy(() => import('./pages/Assessment'));
const ICAConsultants = lazy(() => import('./pages/ICAConsultants'));
const Training = lazy(() => import('./pages/Training'));
const ICAAcademy = lazy(() => import('./pages/ICAAcademy'));
const JoinICA = lazy(() => import('./pages/JoinICA'));
const Contact = lazy(() => import('./pages/Contact'));
const Home = lazy(() => import('./pages/Home'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const ArticleViewer = lazy(() => import('./pages/ArticleViewer'));
const CustomPageViewer = lazy(() => import('./pages/CustomPageViewer'));
const Profile = lazy(() => import('./pages/Profile'));
const Checkout = lazy(() => import('./pages/Checkout'));
const PaymentConfirmation = lazy(() => import('./pages/PaymentConfirmation'));

const CourseDetails = lazy(() => import('./pages/CourseDetails'));

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <Loader2 size={40} className="animate-spin text-brand-deep-teal" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
          <Navbar />
          <main className="flex-grow pt-[80px]"> {/* Added padding top for fixed nav */}
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/dr-lord" element={<DrLord />} />
                <Route path="/leadership" element={<Leadership />} />
                <Route path="/advisory-board" element={<AdvisoryBoard />} />
                <Route path="/tdi-model" element={<TDIModel />} />
                <Route path="/tdi-model-transactional-dementia-intelligence" element={<Training />} />
                <Route path="/training" element={<ICAAcademy />} />
                <Route path="/join-ica" element={<JoinICA />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/ica-consultants" element={<ICAConsultants />} />
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/course/:id" element={<CourseDetails />} />
                <Route path="/course/:id/learn" element={<CoursePlayer />} />
                <Route path="/checkout/:id/:plan" element={<Checkout />} />
                <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
                <Route path="/article/:id" element={<ArticleViewer />} />
                <Route path="/p/:slug" element={<CustomPageViewer />} />
                {/* Additional routes would go here */}
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
