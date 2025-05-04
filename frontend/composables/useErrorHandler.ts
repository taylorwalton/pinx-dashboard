import { useMessage } from 'naive-ui'

export function useErrorHandler() {
  const message = useMessage()
  
  function handleError(error: any, defaultMessage = 'An error occurred') {
    console.error('Error:', error)
    
    const errorMessage = error?.message || defaultMessage
    message.error(errorMessage)
    
    return errorMessage
  }
  
  return {
    handleError
  }
}