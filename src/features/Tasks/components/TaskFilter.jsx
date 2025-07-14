import { SearchBox } from '@/components/FormFields/SearchBox'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Stack, Typography } from '@mui/material'

export function TaskFilter({ loading, total = 0, onAddNew, filter, onFilterChange }) {
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
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => onAddNew?.()}
          loading={loading}
          disabled={loading}
          sx={{ height: 40 }}
        >
          Add new
        </Button>
      </Box>

      <Box>
        <SearchBox onSearchChange={handleSearchName} placeholder="Search by name..." />
      </Box>
    </Stack>
  )
}
