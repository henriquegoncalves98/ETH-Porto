import { dataOperators } from "@group-generators/helpers/data-operators";
import { BigQueryProvider } from "@group-generators/helpers/data-providers/big-query/big-query";
import { AccountSource, GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const groups: GroupWithData[] = [];
    const bigQueryProvider = new BigQueryProvider();
    const query = `
      -- returns 133,628 addresses as of 16/03/2023
      SELECT
        address, 1 as value
      FROM
        \`bigquery-public-data.crypto_ethereum.balances\`
      WHERE
        eth_balance >= 32000000000000000000.0;
        `;

    const richUsers = dataOperators.Map(await bigQueryProvider.fetch(query), 1);

    groups.push({
      name: `ethereum-balances-at-least-32`,
      timestamp: context.timestamp,
      description: `Ethereum users with at least 32 ETH`,
      specs: "Be Rich",
      data: richUsers,
      accountSources: [AccountSource.ETHEREUM],
      valueType: ValueType.Score,
      tags: [Tags.User, Tags.Mainnet],
    });
    return groups;
  },
};

export default generator;
