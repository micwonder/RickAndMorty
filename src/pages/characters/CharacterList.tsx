import { FC, useState, useEffect } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useDebounce } from 'usehooks-ts';

import axiosClient from '@/apis/axios-client';
import Table from '@/components/table';
import { CharacterType, IPagination, InputChangeEvent } from '@/interfaces';

const CharacterList: FC = () => {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);

  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    axiosClient
      .get('/character', {
        params: {
          page: currentPage,
          limit: pageSize,
          name: debouncedSearch,
        },
      })
      .then((response: IPagination<CharacterType>) => {
        const {
          info: { pages },
          results,
        } = response;
        setCharacters(results);
        setCurrentPage(0);
        setTotalPage(pages);
      })
      .catch(() => {});
  }, [debouncedSearch, currentPage, pageSize]);

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
        <FormControl sx={{ flexShrink: 0 }}>
          <InputLabel id="id-limit-select-label">Rows Per Page</InputLabel>
          <Select
            id="id-limit-select"
            labelId="id-limit-select-label"
            label="Rows Per Page"
            value={pageSize.toString()}
            onChange={(e: SelectChangeEvent) =>
              setPageSize(Number(e.target.value))
            }
          >
            {[10, 20, 50].map((size: number) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Table tableRows={characters} />
    </div>
  );
};

export default CharacterList;
