/* eslint-disable react/prop-types */
import SlotPicker from './SlotPicker';

const Machine = ({
  id,
  canBookSlot,
}) => {


  return (
    <div key={id} className="mb-8">
      <h2 className="text-xl font-bold mb-2">Machine {id}</h2>
      <SlotPicker
        machine={id}
        canBookSlot={canBookSlot}
      />
    </div>
  );
};

export default Machine;
