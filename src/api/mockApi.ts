import { rtkQueryApi } from './rtkQueryApi';
import { DivisionType, MockData, MoneyOperation } from './types';

const BASE_URL = `/data`;

type ApiType = {
  type: DivisionType | ''
};

const mockApi = rtkQueryApi.injectEndpoints({
  endpoints: (build) => ({
    getData: build.query<MockData, ApiType>({
      query: ({ type }) => ({
        url: `${BASE_URL}/${type}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDataQuery } = mockApi;

export default mockApi;
