import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/layout/root-layout';
import { HomePage } from './pages/home';
import { PropertiesPage } from './pages/properties';
import { PropertyDetailPage } from './pages/property-detail';
import { AreaDetailPage } from './pages/area-detail';
import { AboutPage } from './pages/about';
import { ContactPage } from './pages/contact';
import { NotFoundPage } from './pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'properties', Component: PropertiesPage },
      { path: 'property/:id', Component: PropertyDetailPage },
      { path: 'area/:slug', Component: AreaDetailPage },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});
