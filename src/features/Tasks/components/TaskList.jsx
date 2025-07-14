import { Delete, Edit } from '@mui/icons-material'
import { Box, Chip, Tooltip, alpha } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import Visibility from '@mui/icons-material/Visibility'
import dayjs from 'dayjs'

export function TaskList({
  params = { page: 1, limit: 5 },
  data,
  total = 0,
  loading,
  onPaginationModelChange,
  onEdit,
  onRemove,
  canEdit,
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
      field: 'title',
      headerName: 'Title',
      flex: 1,
      ...baseColProps,
    },
    {
      field: 'employeeName',
      headerName: 'Employee Name',
      flex: 1,
      ...baseColProps,
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      flex: 1,
      ...baseColProps,
      valueGetter(params) {
        return dayjs(params).format('DD/MM/YYYY')
      },
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
          label={row.status}
          sx={{
            fontWeight: 500,
            color: (theme) => theme.palette.warning.main,
            bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
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
      getActions: ({ row }) => {
        if (canEdit) {
          return [
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
          ]
        }

        return [
          <GridActionsCellItem
            icon={
              <Tooltip title="View">
                <Visibility color="primary" />
              </Tooltip>
            }
            label="View"
            onClick={() => onEdit?.(row)}
          />,
        ]
      },
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
