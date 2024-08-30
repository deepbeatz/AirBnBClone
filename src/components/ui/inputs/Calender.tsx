'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface CalenderProps {
      value: Range;
      onChange: (value: RangeKeyDict) => void;
      disabledDates?: Date[];

}


const Calender: React.FC<CalenderProps> = ({ value, onChange, disabledDates }) => {

      return (
            <DateRange rangeColors={["#262626"]} 
            className='w-full h-full'
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction='vertical'
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
            />
      )
}

export default Calender