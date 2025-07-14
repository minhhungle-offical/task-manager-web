import { SearchBox } from '@/components/FormFields/SearchBox'
import { SortField } from '@/components/FormFields/SortField'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Stack, Typography } from '@mui/material'

export function EmployeeFilter({ total, filter, onFilterChange }) {
  function handleSearchName(value) {
    const newFilter = {
      ...filter,
      name: value,
    }
    onFilterChange?.(newFilter)
  }

  function handleSearchEmail(value) {
    const newFilter = {
      ...filter,
      email: value,
    }
    onFilterChange?.(newFilter)
  }

  function handleSearchPhone(value) {
    const newFilter = {
      ...filter,
      phone: value,
    }
    onFilterChange?.(newFilter)
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Box flexGrow={1}>
        <Typography fontWeight={600}>{total < 10 ? `0${total}` : total} items</Typography>
      </Box>

      <Box>
        <SearchBox onSearchChange={handleSearchName} placeholder="Search by name..." />
      </Box>

      <Box>
        <SearchBox onSearchChange={handleSearchEmail} placeholder="Search by email..." />
      </Box>

      <Box>
        <SearchBox onSearchChange={handleSearchPhone} placeholder="Search by phone..." />
      </Box>
    </Stack>
  )
}
