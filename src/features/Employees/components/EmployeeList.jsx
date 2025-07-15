import { Delete, Edit } from '@mui/icons-material'
import { Box, Chip, Tooltip, alpha } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'

export function EmployeeList({
  data = [],
  total = 0,
  loading,
  params = { page: 1, limit: 5 },
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

  const rows = data.map((item, index) => ({
    key: (params.page - 1) * params.limit + index + 1,
    ...item,
  }))

  const columns = [
    {
      field: 'key',
      headerName: '#',
      width: 60,
      align: 'center',
      headerAlign: 'center',
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
      width: 130,
      align: 'center',
      headerAlign: 'center',
      ...baseColProps,
      renderCell: ({ row }) => {
        return (
          <Chip
            size="small"
            label={row.role || 'unknown'}
            sx={{
              fontWeight: 500,
              color: (theme) => theme.palette.warning.main,
              bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
            }}
          />
        )
      },
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      ...baseColProps,
      renderCell: ({ row }) => {
        const active = !!row.isActive
        const color = (theme) => (active ? theme.palette.success.main : theme.palette.error.main)
        return (
          <Chip
            size="small"
            label={active ? 'Active' : 'Inactive'}
            sx={{
              fontWeight: 500,
              color,
              bgcolor: (theme) => alpha(color(theme), 0.1),
            }}
          />
        )
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      ...baseColProps,
      getActions: ({ row }) => [
        <GridActionsCellItem
          key="edit"
          icon={
            <Tooltip title="Edit">
              <Edit color="primary" />
            </Tooltip>
          }
          label="Edit"
          onClick={() => onEdit?.(row)}
        />,
        <GridActionsCellItem
          key="delete"
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

  const handlePageChange = (model) => {
    onPaginationModelChange?.({
      ...params,
      page: model.page + 1,
      limit: model.pageSize,
    })
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
        '.MuiDataGrid-cell, .MuiDataGrid-columnHeader': {
          px: 2,
        },
      }}
    >
      <DataGrid
        loading={loading}
        rows={rows}
        getRowId={(row) => row.id}
        columns={columns}
        disableRowSelectionOnClick
        pagination
        paginationMode="server"
        rowCount={total}
        paginationModel={{
          page: params.page - 1,
          pageSize: params.limit,
        }}
        onPaginationModelChange={handlePageChange}
        pageSizeOptions={[5, 10, 25, 50]}
        disableColumnSelector
        autoHeight={false}
      />
    </Box>
  )
}
