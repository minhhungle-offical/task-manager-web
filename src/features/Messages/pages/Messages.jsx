import { Box, Divider, Stack, Typography } from '@mui/material'
import { ChatInput } from '../components/ChatInput'
import socket from '@/utils/socket'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { ConversationList } from '../components/ConversationList'
import { taskGetAll } from '@/stores/slices/taskSlice'
import { messageAction, messageGetAll } from '@/stores/slices/messageSlice'

export default function Messages() {
  const { profile } = useSelector((state) => state.auth)

  const { data: taskList, filter } = useSelector((state) => state.task)
  const [selectedTaskId, setSelectedTaskId] = useState('')

  const { data: messageList } = useSelector((state) => state.message)

  const conversationList = taskList?.map((task) => {
    const messages = messageList?.filter((msg) => msg.taskId === task.id) || []
    const lastMessage = messages.sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
    )[0]

    return {
      ...task,
      lastMessage,
    }
  })

  const dispatch = useDispatch()
  const endOfMessagesRef = useRef(null)

  useEffect(() => {
    dispatch(taskGetAll(filter))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => {
    if (!selectedTaskId && taskList?.length > 0) {
      setSelectedTaskId(taskList?.[0]?.id)
    }
  }, [taskList, selectedTaskId])

  useEffect(() => {
    if (selectedTaskId) {
      dispatch(messageGetAll({ taskId: selectedTaskId }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTaskId])

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messageList])

  useEffect(() => {
    if (selectedTaskId) {
      socket.emit('joinTaskConversation', selectedTaskId)
      dispatch(messageAction.setData([]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTaskId])

  useEffect(() => {
    const handleNewMessage = (msg) => {
      dispatch(messageAction.setData([...messageList, msg]))
    }

    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('newMessage', handleNewMessage)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageList])

  function handleSubmit(content) {
    socket.emit('createMessage', {
      content,
      taskId: selectedTaskId,
      createdBy: profile?.id,
      name: profile?.name,
    })
  }
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ p: 3, height: 'calc(100vh - 64px)' }}
    >
      <Box sx={{ width: 250, height: '100%' }}>
        <ConversationList
          selectedTaskId={selectedTaskId}
          taskList={conversationList}
          onClick={(id) => setSelectedTaskId(id)}
        />
      </Box>

      <Stack height="100%" spacing={3} sx={{ width: 'calc(100% - 272px)', overflow: 'hidden' }}>
        <Box
          sx={{
            width: '100%',
            border: '1px solid',
            borderColor: 'grey.500',
            borderRadius: 3,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Stack spacing={2} sx={{ p: 2, height: '100%', overflow: 'auto' }}>
            {Array.isArray(messageList) &&
              messageList.length > 0 &&
              messageList.map((item, key) => (
                <Box
                  key={key}
                  sx={{
                    display: 'flex',
                    justifyContent: item.createdBy === profile?.id ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      maxWidth: '70%',
                      bgcolor: item.createdBy === profile?.id ? 'primary.main' : 'grey.300',
                      color: item.createdBy === profile?.id ? 'white' : 'black',
                    }}
                  >
                    <Typography gutterBottom sx={{ whiteSpace: 'pre-wrap' }}>
                      {item.content}
                    </Typography>

                    <Typography
                      variant="caption"
                      fontStyle="italic"
                      sx={{ whiteSpace: 'pre-wrap' }}
                    >
                      {dayjs(item.createdAt).format('HH:mm')}
                    </Typography>
                  </Box>
                </Box>
              ))}
            <div ref={endOfMessagesRef} />
          </Stack>
        </Box>

        <Box>
          <ChatInput onSubmit={handleSubmit} />
        </Box>
      </Stack>
    </Stack>
  )
}
