import { Route, Routes } from 'react-router-dom';

import Contact from '../pages/contact';
import Detail from '../pages/contact/detail';


export function ContactRoute() {
  return (
    <Routes>
      <Route path="/" element={<Contact />} />
      <Route path="/detail/:contactId" element={<Detail />} />
    </Routes>
  );
}
