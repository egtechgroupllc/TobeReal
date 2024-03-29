import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';

export default function usePagination(
  keyArr = [],
  callFunc = () => {},
  {keyQuery} = {},
) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const {isLoading, isError, data, ...props} = useQuery({
    queryKey: [...keyArr, page],
    queryFn: () => callFunc({page, ...keyQuery}),
    placeholderData: e => console.log(e, 127367812387),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...keyArr, page + 1],
        queryFn: () => callFunc({...keyQuery, page: page + 1}),
      });
    },
  });

  return {
    data,
    page,
    setPage,
    isLoading,
    isError,
    ...props,
  };
}
