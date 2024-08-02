import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import OPTVerification from './pages/Auth/OTP/OTPVerification'
import { DEVELOPMENT_CONTENT } from './pages/Externals/Development/content'
import JobRequirementModal from './pages/Externals/Employers/jobRequirement/JobRequirementModal'
// COMPONENTS
import { ChangePassword } from './components'

const HomePage = lazy(() => import('./pages/Externals/Home'))
const AboutUs = lazy(() => import('./pages/Externals/AboutUs'))
const Intro = lazy(() => import('./pages/Externals/Intro'))
const Faq = lazy(() => import('./pages/Externals/Faqs'))
const Register = lazy(() => import('./pages/Auth/studentRegistration/Register'))
const SignIn = lazy(() => import('./pages/Auth/login/SignIn'))
const ForgotPassword = lazy(() => import('./pages/Auth/forgotPassword/ForgotPassword'))
const AdminSignup = lazy(() => import('./pages/Auth/adminSignup/AdminRegistration'))
const Employers = lazy(() => import('./pages/Externals/Employers'))
const ContactUs = lazy(() => import('./pages/Externals/ContactUs'))
const Development = lazy(() => import('./pages/Externals/Development'))

import { useEffect } from 'react'
import { useCallback } from 'react'

import packageJson from '../package.json'

import SpinnerComponent from './components/global/skeletonLoader/SpinnerComponent'
import { useGetUpcomingCoursesMutation } from './pages/Externals/api/externalApi'
import { selectExternalCourses } from './pages/Externals/api/externalSlice'
import CyberSecurity from './pages/Externals/SingleCourse/CyberSecurity'
import DataScience from './pages/Externals/SingleCourse/DataScience'
import DigitalMarketing from './pages/Externals/SingleCourse/DigitalMarketing'
import FrontendEngineering from './pages/Externals/SingleCourse/FrontendEngineering'
import FullStackDevelopment from './pages/Externals/SingleCourse/FullStackDevelopment'
import UiUxDevelopment from './pages/Externals/SingleCourse/UiUxDevelopment'
import { Blog, PageNotFound, SingleBlogPage } from './pages'

const App = () => {
  const [getUpcomingCourses, { isLoading }] = useGetUpcomingCoursesMutation()
  const upcomingCourses = useSelector(selectExternalCourses)
  const fetchUpcomingCourses = useCallback(async () => {
    await getUpcomingCourses().unwrap()
  }, [getUpcomingCourses])

  useEffect(() => {
    fetchUpcomingCourses()
  }, [fetchUpcomingCourses])

  useEffect(() => {
    let version = localStorage.getItem('version')
    if (version !== packageJson.version) {
      if (window.caches) {
        // Corrected condition
        caches.keys().then((names) => {
          // Delete all the cache files
          names.forEach((name) => {
            caches.delete(name)
          })
        })
      }

      // Makes sure the page reloads. Changes are only visible after you refresh.
      window.location.reload()
    }

    localStorage.clear()
    localStorage.setItem('version', packageJson.version)
  }, [])

  const { fullStackDevelopment, datascience, UIUXDevelopment, frontendDevelopment, cyberSecurity, digitalMarketing } = DEVELOPMENT_CONTENT

  const getCourseContent = (course) => {
    switch (course.title?.toLowerCase()) {
      case `product design ui/ux`:
        return {
          content: UIUXDevelopment,
          path: `/course/product-design`,
          job: `Product Designer`,
          query: `product design`,
          courseName: course.title,
          courseID: course.id,
        }
      case `fullstack development`:
        return {
          content: fullStackDevelopment,
          path: `/course/fullstack`,
          job: `Fullstack Developer`,
          query: `fullstack`,
          courseName: course.title,
          courseID: course.id,
        }
      case `data science`:
        return {
          content: datascience,
          path: `/course/data-science`,
          job: `Data Scientist`,
          query: `science`,
          courseName: course.title,
          courseID: course.id,
        }
      case `frontend engineering`:
        return {
          content: frontendDevelopment,
          path: `/course/frontend`,
          job: `Frontend Web Developer`,
          query: `frontend javascript`,
          courseName: course.title,
          courseID: course.id,
        }
      case `digital marketing`:
        return {
          content: digitalMarketing,
          path: `/course/digital-marketing`,
          job: `Digital Marketing Expert`,
          query: `digital marketing`,
          courseName: course.title,
          courseID: course.id,
        }

      case `cyber security`:
        return {
          content: cyberSecurity,
          path: `/course/cyber-security`,
          job: `Cyber Security Expert`,
          query: `cyber security`,
          courseName: course.title,
          courseID: course.id,
        }
      default:
        return {}
    }
  }

  const displayUpcomingCoursesDetails = upcomingCourses.map((course) => {
    return (
      <Route
        key={course.id}
        path={getCourseContent(course).path}
        element={
          isLoading ? (
            <SpinnerComponent />
          ) : (
            <Development
              content={getCourseContent(course).content}
              job={getCourseContent(course).job}
              query={getCourseContent(course).query}
              name={getCourseContent(course).courseName}
              courseID={getCourseContent(course).courseID}
            />
          )
        }
      />
    )
  })

  return (
    <Suspense
      fallback={
        <div style={{ width: `100%`, height: `100vh` }} className='d-flex align-items-center justify-content-center'>
          <SpinnerComponent />
        </div>
      }
    >
      <Routes>
        {/* public routes */}
        <Route index path='/' element={<HomePage />} />
        <Route path='/our-courses' element={<Intro />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/student/register' element={<Register />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/change-password/:token' element={<ChangePassword />} />
        <Route path='/admin/register' element={<AdminSignup />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/course/frontend' element={<FrontendEngineering />} />
        <Route path='/course/digital-marketing' element={<DigitalMarketing />} />
        <Route path='/course/cyber-security' element={<CyberSecurity />} />
        <Route path='/course/data-science' element={<DataScience />} />
        <Route path='/course/fullstack' element={<FullStackDevelopment />} />
        <Route path='/course/product-design' element={<UiUxDevelopment />} />
        {displayUpcomingCoursesDetails}
        {/* protected Routes */}
        {/* End of protected route */}
        {/* 404 PAGE NOT FOUND ROUTE */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {/* </div> */}
      {/* dashboard routes */}
    </Suspense>
  )
}

export default App
