import { Box, Stack, Typography } from '@mui/material'

export function ConversationList({ selectedTaskId, taskList, onClick }) {
  return (
    <Stack spacing={2}>
      {Array.isArray(taskList) &&
        taskList.map((item, idx) => (
          <Box key={idx} sx={{ cursor: 'pointer' }}>
            <Box
              boxShadow={3}
              sx={{
                borderRadius: 2,
                p: 3,
                backgroundColor: selectedTaskId === item.id ? 'primary.main' : 'white',
                color: selectedTaskId === item.id ? 'white' : 'grey.700',
                '&:hover': {
                  backgroundColor: selectedTaskId === item.id ? 'primary.main' : 'grey.100',
                },
              }}
              onClick={() => onClick?.(item.id)}
            >
              <Typography variant="h6" fontWeight={600}>
                {item.title}
              </Typography>

              {item.lastMessage?.content && (
                <Typography fontStyle="italic">
                  <strong>Latest:</strong> {item.lastMessage.content}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
    </Stack>
  )
}
