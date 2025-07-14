import { STATUS } from '@/constants/common'
import {
  taskActions,
  taskCreate,
  taskGetAll,
  taskRemove,
  taskUpdate,
} from '@/stores/slices/taskSlice'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddEditTaskForm } from '../components/AddEditTaskForm'
import { TaskFilter } from '../components/TaskFilter'
import { TaskList } from '../components/TaskList'
import AddIcon from '@mui/icons-material/Add'
import socket from '@/utils/socket'

export default function Tasks() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [removeItem, setRemoveItem] = useState(null)
  const [showAddEdit, setShowAddEdit] = useState(false)

  const dispatch = useDispatch()
  const formRef = useRef(null)

  const { status, data, filter, pagination } = useSelector((state) => state.task)
  const { activeData } = useSelector((state) => state.employee)
  const { profile } = useSelector((state) => state.auth)

  const loading = status === STATUS.LOADING

  const canEdit = profile?.role === 'manager'

  const fetchData = useCallback((filter) => {
    dispatch(taskGetAll(filter))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (status === STATUS.CREATED || status === STATUS.UPDATED || status === STATUS.REMOVED) {
      fetchData(filter)
      handleClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  useEffect(() => {
    if (filter) {
      fetchData(filter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => {
    if (!socket || !profile?.id) return

    socket.emit('joinRoom', profile.id)

    const handleTaskAssigned = () => {
      fetchData(filter)
    }

    socket.on('task-assigned', handleTaskAssigned)

    return () => {
      socket.off('task-assigned', handleTaskAssigned)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id])

  function handleClose() {
    setSelectedItem(null)
    setRemoveItem(null)
    setShowAddEdit(false)
  }

  function handleAddNew() {
    setSelectedItem(null)
    setShowAddEdit(true)
  }

  function handleEdit(data) {
    setSelectedItem(data)
    setShowAddEdit(true)
  }

  function handleRemove(id) {
    dispatch(taskRemove(id))
  }

  function handleFilterChange(newFilter) {
    dispatch(taskActions.setFilter(newFilter))
  }

  function handleSubmit(formValues) {
    if (selectedItem) {
      dispatch(taskUpdate({ ...formValues, id: selectedItem.id }))
      return
    }

    dispatch(taskCreate(formValues))
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
              Task management
            </Typography>

            {profile?.role === 'manager' && (
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
            )}
          </Stack>
        </Box>

        <Divider />

        <Box sx={{ p: 3 }}>
          <TaskFilter
            filter={filter}
            loading={status === STATUS.LOADING}
            total={pagination?.total || 0}
            onAddNew={handleAddNew}
            onFilterChange={handleFilterChange}
          />
        </Box>

        <Divider />

        <Box>
          <TaskList
            loading={loading}
            params={filter}
            canEdit={canEdit}
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
            <AddEditTaskForm
              canEdit={canEdit}
              ref={formRef}
              onSubmit={handleSubmit}
              data={selectedItem}
              userList={
                activeData?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              }
            />
          </Box>
        </DialogContent>

        <DialogActions>
          {canEdit && (
            <Button
              loading={loading}
              disabled={loading}
              variant="contained"
              color="success"
              onClick={() => formRef?.current?.submit()}
            >
              {selectedItem ? 'Save' : 'Create '}
            </Button>
          )}

          <Button loading={loading} disabled={loading} variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!removeItem} onClose={handleClose}>
        <DialogTitle fontWeight={600}>Confirm Deletion</DialogTitle>

        <DialogContent dividers>
          Are you sure you want to{' '}
          <strong style={{ color: 'red' }}>delete {removeItem?.title || 'this item'}</strong>? This
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
