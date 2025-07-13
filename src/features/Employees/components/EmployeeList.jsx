import { Delete, Edit } from '@mui/icons-material'
import { Box, Chip, Tooltip, alpha } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'

export function EmployeeList({
  params = { page: 1, limit: 5 },
  data,
  total = 0,
  loading,
  onPaginationModelChange,
  onEdit,
  onRemove,
}) {
  const baseColProps = {
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    headerClassName: 'header',
  }

  const rows = data?.map((item, idx) => ({
    key: (params.page - 1) * params.limit + idx + 1,
    ...item,
  }))

  const columns = [
    {
      field: 'key',
      headerName: '#',
      width: 60,
      headerAlign: 'center',
      align: 'center',
      ...baseColProps,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      ...baseColProps,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      ...baseColProps,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      ...baseColProps,
    },

    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      ...baseColProps,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.role || 'unknown'}
          sx={{
            fontWeight: 500,
            borderRadius: '4px',
            color: (theme) =>
              row.role === 'manager' ? theme.palette.success.main : theme.palette.warning.main,
            bgcolor: (theme) =>
              alpha(
                row.role === 'manager' ? theme.palette.success.main : theme.palette.warning.main,
                0.1,
              ),
          }}
        />
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      ...baseColProps,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Publish' : 'Draft'}
          sx={{
            fontWeight: 500,
            color: (theme) =>
              row.isActive ? theme.palette.success.main : theme.palette.error.main,
            bgcolor: (theme) =>
              alpha(row.isActive ? theme.palette.success.main : theme.palette.error.main, 0.1),
          }}
        />
      ),
    },

    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      ...baseColProps,
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Edit">
              <Edit color="primary" />
            </Tooltip>
          }
          label="Edit"
          onClick={() => onEdit?.(row)}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete">
              <Delete color="error" />
            </Tooltip>
          }
          label="Delete"
          onClick={() => onRemove?.(row)}
        />,
      ],
    },
  ]

  const handlePaginationModelChange = (model) => {
    const newParams = {
      ...params,
      page: model.page + 1,
      limit: model.pageSize,
    }
    onPaginationModelChange?.(newParams)
  }

  return (
    <Box
      sx={{
        height: '100%',
        '.MuiDataGrid-root': {
          border: 0,
          minHeight: 611,
        },
        '.header .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 600,
        },
        '.MuiDataGrid-columnHeaders': {
          borderBottom: '2px solid #ccc',
        },
        '.MuiDataGrid-cell': {
          px: 2,
        },
        '.MuiDataGrid-columnHeader': {
          px: 2,
        },
      }}
    >
      <DataGrid
        loading={loading}
        rows={rows || []}
        getRowId={(row) => row.id}
        columns={columns}
        disableRowSelectionOnClick
        pagination
        paginationMode="server"
        rowCount={total || 0}
        paginationModel={{
          page: params?.page - 1 || 0,
          pageSize: params?.limit || 10,
        }}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[5, 10, 25, 50]}
        disableColumnSelector
      />
    </Box>
  )
}
