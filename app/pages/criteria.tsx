import { useState } from "react";

const eligibleGroups: { groupId: string; title: string }[] = [
  { groupId: "0x20c4ce0ee0687df3a3408c1659c3bafb", title: "Rich" },
  { groupId: "0xa69deca1b885c135699a4883ab218d2d", title: "Richer" },
  { groupId: "0x28e737a66c60878a0a2f45d440ffb042", title: "Very Rich" },
];

const CriteriaPage = () => {
  const [eligible, setEligible] = useState<boolean>(false);
  return (
    <div className="flex gap-2 flex-col">
      {eligibleGroups.map((group) => (
        <CriteriaPageComponent {...group} key={group.groupId} />
      ))}
      <input
        type="text"
        placeholder="Type here"
        className="input w-full max-w-xs"
      />
      <div className="card w-96 bg-base-100 shadow-xl">
        <button className="btn">Hello daisyUI</button>
      </div>
    </div>
  );
};

const CriteriaPageComponent = () => {
  return (
    <div className="border p-2 flex flex-row">
      <div></div>
    </div>
  );
};

export default CriteriaPage;
