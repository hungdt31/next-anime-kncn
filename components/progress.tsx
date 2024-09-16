'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NextNProgressClient = () => {
  return <ProgressBar color="#FF4500" options={{ showSpinner: false }} />;
};

export default NextNProgressClient;