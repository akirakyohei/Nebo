import { useGetCurrentUserQuery } from "../../../data/api";
import { useGetHistorySessionQuery } from "../../../data/report.api";
import { HistorySession, ListResponse, User } from "../../../types";
import UAParserUtils from "../../../utils/UAParser";
import { HistorySessionModel } from "../types";

export type Data = {
  currentUser?: User;
  historySessions?: ListResponse<HistorySessionModel>;
  isLoading?: boolean;
  isFetching?: boolean;
};

export const useGetAccountSettingData = (): Data => {
  const {
    data: currentUser,
    isLoading: isLoadingCurrentUser,
    isFetching: isFetchingCurrentUser,
  } = useGetCurrentUserQuery();

  const {
    data: historySessions,
    isLoading: isLoadingHistorySession,
    isFetching: isFetchingHistorySession,
  } = useGetHistorySessionQuery({ limit: 5 });

  const historySessionModel: ListResponse<HistorySessionModel> | undefined =
    historySessions
      ? {
          ...historySessions,
          data: historySessions.data.map((session) => {
            const ua = UAParserUtils.parse(session.user_agent);
            return {
              ...session,
              browser: ua.browser,
              os: ua.os,
              device: ua.device,
            };
          }),
        }
      : undefined;

  const isLoading = isLoadingCurrentUser || isLoadingHistorySession;
  const isFetching = isFetchingCurrentUser || isFetchingHistorySession;

  return {
    currentUser,
    historySessions: historySessionModel,
    isLoading,
    isFetching,
  };
};
