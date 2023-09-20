import Image from 'next/image';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSearch } from '@fortawesome/free-solid-svg-icons';

import NoOptionFound from './NoOptionFound';
import { RootState } from 'src/redux/store';
// import { loader } from 'src/redux/reducer/Loader';
import { getDestinationDetails } from 'src/redux/action/AirportDetails';
import { getEligibleOriginToDestinations } from 'src/redux/action/SearchFlights';
import { getFieldName, getImageSrc } from 'components/SearchFlight/SitecoreContent';

const DropdownModal = ({
  name,
  tabName,
  loading,
  // textSize,
  closeModal,
  setLoading,
  originCode,
  errorMessage,
  flightDetails,
  selectOptions,
  destinationCode,
  // dropdownOptions,
  openSelectModal,
  setErrorMessage,
  setFlightDetails,
  setSelectOptions,
  setOpenSelectModal,
  searchDataWithDelay,
}: dropdownModal) => {
  const dispatch = useDispatch();

  // const searchFlightContent = useSelector(
  //   (state: RootState) => state?.sitecore?.searchFlight?.fields
  // );
  const modalContent = useSelector((state: RootState) => state?.sitecore?.searchAirport?.fields);

  const dropdownChangeEvent = (code: string) => {
    // dispatch(
    //   loader({
    //     show: true,
    //     name: 'search',
    //   })
    // );
    //new-added
    // if (originCode === 'MLE' && destinationCode !== code && destinationCode?.length > 0) {
    //   dispatch(
    //     getEligibleOriginToDestinations(
    //       {
    //         OriginCode: code,
    //         DestinationCode: destinationCode,
    //       },
    //       true,
    //       // {
    //       //   ...flightDetails,
    //       //   originCode: code as string,
    //       // },
    //       // setFlightDetails,
    //       name
    //     ) as unknown as AnyAction
    //   );
    // }
    dispatch(
      getDestinationDetails(
        code,
        name,
        destinationCode,
        flightDetails,
        setFlightDetails,
        errorMessage,
        setErrorMessage,
        setOpenSelectModal
      ) as unknown as AnyAction
    );
  };

  const dropdownEventArrival = (code: string) => {
    setLoading(false);
    setFlightDetails({
      ...flightDetails,
      departDate:
        destinationCode?.length > 0 && destinationCode !== code ? '' : flightDetails?.departDate,
      returnDate:
        destinationCode?.length > 0 && destinationCode !== code ? '' : flightDetails?.returnDate,
      destinationCode: code,
    });
    //new-added
    if (destinationCode?.length > 0 && destinationCode !== code) {
      dispatch(
        getEligibleOriginToDestinations(
          {
            OriginCode: originCode,
            DestinationCode: code,
          },
          true,
          tabName
        ) as unknown as AnyAction
      );
    }

    (
      errorMessage as {
        departure: string;
        returnDate: string;
        arrival: string;
      }
    )?.arrival?.length &&
      setErrorMessage({
        ...errorMessage,
        arrival: '',
      });

    if (destinationCode?.length === 0) {
      dispatch(
        getEligibleOriginToDestinations(
          {
            OriginCode: originCode,
            DestinationCode: code,
          },
          true,
          tabName
        ) as unknown as AnyAction
      );
    }
    closeModal && closeModal();
  };

  return (
    <div>
      {(openSelectModal || name === 'destination') && (
        <>
          <div
            id="select-city"
            style={{ display: 'flex' }}
            className="linear h-screen fixed top-0 left-0 right-0 z-50 hidden xl:p-4 sm:p-0 overflow-x-hidden overflow-y-auto md:inset-0 xl:h-[calc(100% 1rem)] max-h-full xl:flex justify-center items-center flex h-screen"
          >
            <div className="relative w-full max-w-md max-h-full rounded-lg bg-white m-auto ">
              <div className="relative bg-white rounded-lg shadow    calendar-modal">
                <FontAwesomeIcon
                  icon={faXmark}
                  aria-hidden="true"
                  className="arrow-modal cursor-pointer text-black"
                  onClick={() => {
                    name === 'destination'
                      ? closeModal && closeModal()
                      : (setOpenSelectModal(false), (document.body.style.overflow = 'unset'));
                  }}
                />
                <div className="px-4 pt-5 text-center ">
                  <p className="font-black text-xl text-black">
                    {getFieldName(modalContent, 'heading')}
                  </p>
                  <div className="my-3">
                    <label
                      htmlFor="search"
                      className="text-sm font-medium text-black flex items-start mb-1"
                    >
                      {getFieldName(modalContent, 'searchCity')}
                    </label>
                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                          <FontAwesomeIcon
                            icon={faSearch}
                            aria-hidden="true"
                            className="text-hilightgray text-sm font-black h-5 w-5"
                          />
                        </div>
                        <input
                          type="text"
                          id="search"
                          className="block w-full px-4 py-2  text-base text-black border border-slategray rounded focus:border-blue-500  dark:focus:border-blue-500"
                          placeholder={getFieldName(modalContent, 'searchCityPlaceholder')}
                          onChange={(e) => {
                            setLoading(true);
                            setSelectOptions([]);
                            searchDataWithDelay(e?.target?.value);
                          }}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="mt-3 text-left overflow-y-scroll h-64 ">
                      <p className="font-black text-xl text-black">
                        {selectOptions?.length > 0 && getFieldName(modalContent, 'content')}
                      </p>
                      {loading ? (
                        getFieldName(modalContent, 'loading')
                      ) : selectOptions?.length ? (
                        selectOptions
                          ?.filter((item) =>
                            name === 'destination' ? item?.code !== originCode : true
                          )
                          ?.map((item, index) => {
                            return (
                              <div
                                className="flex justify-between items-center my-3 cursor-pointer"
                                key={index}
                                onClick={() => {
                                  name === 'destination'
                                    ? dropdownEventArrival(item?.code)
                                    : dropdownChangeEvent(item?.code);
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <div>
                                    <Image
                                      src={getImageSrc(modalContent, 'cityLogo') as string}
                                      className="h-6 w-6 object-cover"
                                      alt=""
                                      height={8}
                                      width={8}
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium text-base text-black">
                                      {item?.Label}
                                    </p>
                                    <p className="font-normal text-xs text-slategray">
                                      {item?.country}
                                    </p>
                                  </div>
                                </div>
                                <div className="bg-black px-2 py-1 rounded w-16 flex justify-center">
                                  <p className="font-black text-sm text-white">{item?.code}</p>
                                </div>
                              </div>
                            );
                          })
                      ) : (
                        <NoOptionFound />
                      )}
                    </div>
                    <div className="lg:flex md:flex block h-full items-center justify-center relative gap-3 sm:w-full py-3 m-auto">
                      <button
                        type="button"
                        className={`w-full text-lg font-black xs:justify-center xs:text-center text-white bg-aqua  rounded-lg text-md inline-flex items-center px-5 py-2 text-center  ${
                          selectOptions?.length > 0 ? 'opacity-40' : ''
                        }`}
                        onClick={() => {
                          if (selectOptions.length === 0) {
                            name === 'destination'
                              ? closeModal && closeModal()
                              : (setOpenSelectModal(false),
                                (document.body.style.overflow = 'unset'));
                          }
                        }}
                      >
                        {selectOptions?.length
                          ? getFieldName(modalContent, 'searchButton')
                          : getFieldName(modalContent, 'closeButton')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DropdownModal;