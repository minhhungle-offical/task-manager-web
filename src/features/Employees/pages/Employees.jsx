import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { EmployeeFilter } from '../components/EmployeeFilter'
import { EmployeeList } from '../components/EmployeeList'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS } from '@/constants/common'
import { AddEditEmployeeForm } from '../components/AddEditEmployeeForm'
import {
  employeeActions,
  employeeCreate,
  employeeGetActive,
  employeeGetAll,
  employeeRemove,
  employeeUpdate,
} from '@/stores/slices/employeeSlice'
import AddIcon from '@mui/icons-material/Add'

export default function Employees() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [removeItem, setRemoveItem] = useState(null)
  const [showAddEdit, setShowAddEdit] = useState(false)

  const dispatch = useDispatch()
  const formRef = useRef(null)

  const { status, data, filter, pagination } = useSelector((state) => state.employee)
  const loading = status === STATUS.LOADING

  const fetchData = useCallback((filter) => {
    dispatch(employeeGetAll(filter))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (filter) {
      fetchData(filter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  function handleClose() {
    setSelectedItem(null)
    setRemoveItem(null)
    setShowAddEdit(false)
  }

  useEffect(() => {
    if (status === STATUS.CREATED || status === STATUS.UPDATED || status === STATUS.REMOVED) {
      fetchData(filter)
      dispatch(employeeGetActive())
      handleClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  function handleAddNew() {
    setSelectedItem(null)
    setShowAddEdit(true)
  }

  function handleEdit(data) {
    setSelectedItem(data)
    setShowAddEdit(true)
  }

  function handleRemove(id) {
    dispatch(employeeRemove(id))
  }

  function handleSubmit(formValues) {
    console.log('formValues: ', formValues)
    if (selectedItem) {
      dispatch(
        employeeUpdate({
          ...formValues,
          id: selectedItem.id,
        }),
      )

      return
    }

    dispatch(employeeCreate(formValues))
  }

  function handleFilterChange(newFilter) {
    dispatch(employeeActions.setFilter(newFilter))
  }

  return (
    <Box sx={{ p: 3, height: '100%' }}>
      <Box
        sx={{
          flexGrow: 1,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 4,
          bgcolor: 'background.paper',
          boxShadow: 2,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5" fontWeight={600}>
              Employees management
            </Typography>

            <Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleAddNew?.()}
                loading={loading === STATUS.LOADING}
                disabled={loading === STATUS.LOADING}
              >
                Add new
              </Button>
            </Box>
          </Stack>
        </Box>

        <Divider />

        <Box sx={{ p: 3 }}>
          <EmployeeFilter
            filter={filter}
            loading={status === STATUS.LOADING}
            total={pagination?.total || 0}
            onAddNew={handleAddNew}
            onFilterChange={handleFilterChange}
          />
        </Box>

        <Divider />

        <Box>
          <EmployeeList
            loading={loading}
            params={filter}
            total={pagination?.total}
            data={data}
            onRemove={(item) => setRemoveItem(item)}
            onEdit={(item) => handleEdit(item)}
            onPaginationModelChange={handleFilterChange}
          />
        </Box>
      </Box>

      <Dialog fullWidth maxWidth="sm" open={showAddEdit} onClose={handleClose}>
        <DialogTitle variant="h5" fontWeight={600}>
          {selectedItem ? 'Create Update Employee' : 'Create Employee'}
        </DialogTitle>
        <DialogContent dividers>
          <Box>
            <AddEditEmployeeForm ref={formRef} onSubmit={handleSubmit} data={selectedItem} />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            loading={loading}
            disabled={loading}
            variant="contained"
            color="success"
            onClick={() => formRef?.current?.submit()}
          >
            {selectedItem ? 'Save' : 'Create '}
          </Button>

          <Button loading={loading} disabled={loading} variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!removeItem} onClose={handleClose}>
        <DialogTitle fontWeight={600}>Confirm Deletion</DialogTitle>

        <DialogContent dividers>
          Are you sure you want to{' '}
          <strong style={{ color: 'red' }}>delete {removeItem?.name || 'this item'}</strong>? This
          action is <strong>permanent</strong> and cannot be undone.
          <br />
          <br />
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            If you just want to temporarily disable this employee, consider marking them as{' '}
            <strong>Inactive</strong> instead of deleting.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={() => handleRemove(removeItem?.id)} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
