import { SearchBox } from '@/components/FormFields/SearchBox'
import { Box, Button, Stack, Typography } from '@mui/material'

export function TaskFilter({ total = 0, filter, onFilterChange }) {
  function handleSearchName(value) {
    const newFilter = {
      ...filter,
      name: value,
    }
    onFilterChange?.(newFilter)
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Box flexGrow={1}>
        <Typography fontWeight={600}>{total} items</Typography>
      </Box>

      <Box>
        <SearchBox onSearchChange={handleSearchName} placeholder="Search by name..." />
      </Box>
    </Stack>
  )
}
