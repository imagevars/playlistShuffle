import React from 'react';
import { LiaToolsSolid } from 'react-icons/lia';
import Navbar from '../Navbar/Navbar';

function AboutPage() {
  return (
    <div className="bg-bgWhite dark:bg-bgBlack h-screen">
      <Navbar />
      <div className="flex text-primaryColor dark:text-DarkPrimaryColor justify-center items-center h-2/4">
        <LiaToolsSolid size={50} />
      </div>
    </div>
  );
}

export default AboutPage;
