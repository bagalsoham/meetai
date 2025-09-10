import { DEFAULT_PAGE } from "@/constants";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";

// Example enum (adjust based on your domain)
export enum AgentStat {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
}

export const useAgentsFilter = () => {
  return useQueryStates({
    search: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),

    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),

    status: parseAsStringEnum(Object.values(AgentStat))
      .withOptions({ clearOnDefault: true }),

    agentId: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
  });
};
