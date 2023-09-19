import { useSelector } from 'react-redux';

import { RootState } from 'src/redux/store';
import { getFieldName } from 'components/SearchFlight/SitecoreContent';
import { Accordion } from 'flowbite-react';

const PriceBreakDown = (props: {
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  passengerCount: number;
  fareFamilyName: string;
}) => {
  const { currency, baseAmount, taxAmount, totalAmount, passengerCount, fareFamilyName } = props;

  const priceBreakDownContent = useSelector(
    (state: RootState) => state?.sitecore?.reviewTrip?.fields
  );

  const taxDetails = [{"TaxLabel":"UAE Tax", "TaxAmount": "500"},{"TaxLabel":"UAR", "CAA":"300"}]

  return (
    <div>
      <div className="bg-purpal p-4 rounded-bl-2xl rounded-br-2xl">
        <h1 className="font-black text-base black text-black">
          {getFieldName(priceBreakDownContent, 'priceBreakdown')}
        </h1>
        <div className="flex justify-between py-1">
          <p className="font-medium text-xs text-pearlgray">
            {fareFamilyName} {getFieldName(priceBreakDownContent, 'ticket')} x{passengerCount}
          </p>
          <p className="font-medium text-xs text-pearlgray">
            {(currency ? currency : '') + ' ' + (baseAmount ? baseAmount : '')}
          </p>
        </div>
        {/* <div className="flex justify-between py-1">
          <p className="font-medium text-xs text-pearlgray">
            {getFieldName(priceBreakDownContent, 'seatUpgrade')} x{passengerCount}
          </p>
          <p className="font-medium text-xs text-pearlgray">0</p>
        </div> */}
        <div className="flex justify-between py-1">
          <p className="font-medium text-xs text-pearlgray">
            {getFieldName(priceBreakDownContent, 'taxesCharges')}
          </p>
          <p className="font-medium text-xs text-pearlgray">
            {(currency ? currency : '') + ' ' + (taxAmount ? taxAmount : '')}
          </p>
        </div>
        {taxDetails && (
              <div className='shedule-accordian'>
                <Accordion className="" collapseAll>
                  <Accordion.Panel>
                    <Accordion.Title>
                      <div className="flex align-center mb-2 gap-3">
                        <p className="font-medium text-xs text-pearlgray">
                          {getFieldName(priceBreakDownContent, 'taxesCharges')}
                        </p>
                        <p className="font-medium text-xs text-pearlgray">
                          {(currency ? currency : '') + ' ' + (taxAmount ? taxAmount : '')}
                        </p>
                      </div>
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className=" gap-3 py-2">
                        {taxDetails && taxDetails?.length > 0
                          ? taxDetails?.map(
                              (
                                item: {
                                  TaxLabel: string;
                                  TaxAmount: string;
                                },
                                dt: number
                              ) => {
                                return (
                                  <div className="flex justify-between w-full" key={dt}>
                                    <div className="flex items-center gap-2">
                                      <div>
                                        
                                      </div>
                                      <div className="text-black font-medium text-sm">
                                        {item?.TaxLabel}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="text-pearlgraya text-sm  font-medium">
                                        {item?.TaxAmount}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          : 'No tax details available'}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
              </div>
            )}
        <div className="flex justify-between py-1">
          <p className="font-black text-sm text-black">
            {getFieldName(priceBreakDownContent, 'totalPrice')}
          </p>
          <p className="font-black text-sm text-black">
            {(currency ? currency : '') + ' ' + (totalAmount ? totalAmount : '')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakDown;
