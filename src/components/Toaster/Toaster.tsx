import React, { useEffect } from 'react';

const Toaster = (props: toastMessageType) => {
  const { showToaster, setShowToaster } = props;

  useEffect(() => {
    if (showToaster?.show) {
      setTimeout(() => {
        setShowToaster({
          status: '',
          message: '',
          show: false,
        });
      }, 4000);
    }
  }, [showToaster]);
  return (
    <>
      <div
        className={`fixed top-12 toster-modal ${showToaster.show ? 'right-6' : ''}`}>
        <div className="relative w-full">
          <div className={`rounded-lg shadow p-5 text-center bg-red border border-red ${showToaster?.status === 'error' ? '' : 'hidden'}`}>
            <p className="text-left text-white text-sm font-normal">
              {showToaster?.message}
            </p>
          </div>
          {/* <div className={`rounded-lg shadow p-5 text-center bg-yellowLight border-errorText ${showToaster?.status === 'success' ? '' : 'hidden'}`}>
            <p className="text-left text-errorText text-sm font-normal">
              {showToaster?.message}
            </p>
          </div> */}
          <div className={`rounded-lg shadow p-5 text-center bg-green border-green ${showToaster?.status === 'success' ? '' : 'hidden'}`}>
            <p className="text-left text-white text-sm font-normal">
              {showToaster?.message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Toaster;