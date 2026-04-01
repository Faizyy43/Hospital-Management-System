import { useState } from "react";
import Approval from "../components/Approval";
import ApprovalDetails from "../components/ApprovalDetails";

const ApprovalList = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="grid grid-cols-3 h-full">

      {/* LEFT: LIST */}
      <div className="col-span-1 border-r">
        <Approval onSelect={setSelectedId} />
      </div>

      {/* RIGHT: DETAILS */}
      <div className="col-span-2">
        {selectedId ? (
          <ApprovalDetails hospitalId={selectedId} />
        ) : (
          <p className="p-6">Select a hospital</p>
        )}
      </div>

    </div>
  );
};

export default ApprovalList;