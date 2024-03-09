import { FC, useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import { useDebounce } from 'usehooks-ts';

import axiosClient from '@/apis/axios-client';
import EnhancedTable from '@/components/table';
import { CharacterType, IPagination, InputChangeEvent } from '@/interfaces';

const CharacterList: FC = () => {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);

  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    axiosClient
      .get('/character/', {
        params: {
          name: debouncedSearch,
        },
      })
      .then((response: IPagination<CharacterType>) => {
        const {
          info: { count },
        } = response;
        const promises: Promise<any>[] = [];
        for (let i = 1; i <= Math.ceil(count / 20); i++) {
          promises.push(
            new Promise(
              (
                resolve: (value: CharacterType[]) => void,
                reject: (value: Error) => void,
              ) => {
                axiosClient
                  .get('/character', {
                    params: {
                      name: debouncedSearch,
                      page: i,
                    },
                  })
                  .then((response: IPagination<CharacterType>) => {
                    const { results } = response;
                    resolve(results);
                  })
                  .catch((err: Error) => {
                    reject(err);
                  });
              },
            ),
          );
        }
        Promise.all(promises)
          .then((values: any[]) => {
            const resJson = values.flatMap((value) => value as CharacterType[]);
            setCharacters(resJson);
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between">
        <TextField
          id="id-search-input"
          label="Search"
          value={search}
          placeholder="Search name of the character"
          onChange={(e: InputChangeEvent) => setSearch(e.target.value)}
          sx={{ flexShrink: 0 }}
        />
      </div>
      <EnhancedTable tableRows={characters} />
    </div>
  );
};

export default CharacterList;
