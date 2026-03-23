import { Suspense } from 'react';
import GrowtopiaLogin from './GrowtopiaLogin';

export default function HomePage() {
  return (
    <Suspense fallback={<div className='w-screen h-screen flex justify-center items-center'>Loading...</div>}>
      <GrowtopiaLogin />
    </Suspense>
  );
}