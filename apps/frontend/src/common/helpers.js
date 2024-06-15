export const convertTimeStamp = (value) => {
  const date = new Date(value)

  return date.toISOString().split('T')[0]
}
