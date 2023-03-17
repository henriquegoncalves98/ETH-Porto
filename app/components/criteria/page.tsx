import { THE_ETH32_RICH_USERS, THE_ETH64_RICH_USERS, THE_ETH128_RICH_USERS } from '../../shared/groups';

const eligibleGroups: { groupId: string; title: string }[] = [
  { ...THE_ETH32_RICH_USERS, title: "Rich" },
  { ...THE_ETH64_RICH_USERS, title: "Richer" },
  { ...THE_ETH128_RICH_USERS, title: "Very Rich" },
];

const CriteriaPage = () => {};

const CriteriaPageComponent = () => {
  return <div className="border p-2"></div>;
};

export default CriteriaPage;
